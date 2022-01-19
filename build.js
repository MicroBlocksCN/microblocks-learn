var fs = require('fs'),
    fse = require('fs-extra'),
    sass = require('node-sass'),
    handlebars = require('handlebars'),
    http = require('http'),
    WebSocket = require('ws'),
    autoprefixer = require('autoprefixer'),
    postcss = require('postcss'),
    markdown = new (require('showdown')).Converter(),
    args = process.argv.slice(2),
    debugMode = args.includes('--debug'),
    locales = {};

markdown.addExtension({
    type: 'output',
    filter: function (text) {
        return text.replace(
            /<p>\[(.+)\]/g, `<div class="$1">`
        ).replace(
            /\[\/.*\]<\/p>/g, `</div>`
        );
    }
});

// Data

// Useful functions

function debug (string) { if (debugMode) { console.info(string); } };

function doForFilesInDir (dir, extension, action, recursive) {
    // does something for each file of a particular extension in a directory
    var path = `${__dirname}/${dir}`;
    var filenames = fs.readdirSync(path);
    filenames.forEach((fileName) => {
        var fullPath = path + '/' + fileName;
        if (fs.statSync(fullPath).isFile()) {
            var matches = extension ?
                new RegExp(`^([^.]+).${extension}$`).exec(fileName) :
                [fileName];
            if (!matches) { return; }
            var fileContents = fs.readFileSync(fullPath, 'utf8');
            action.call(
                this,
                fileName.replace(/\..*$/,'','g'), // strip file extension
                fileContents,
                fullPath
            );
        } else if (recursive && fs.statSync(fullPath).isDirectory()) {
            // recurse into directory
            doForFilesInDir(dir + '/' + fileName, extension, action, recursive);
        } else if (extension == '/' && fs.statSync(fullPath).isDirectory()) {
            // iterate over directories
            action.call(this, fileName, fullPath); 
        }
    });
};

function slugify (string) {
    // make all lowercase, allow only alpha characters, and replace spaces with
    // hyphens
    return string.split('').map(
        char => char.toLowerCase().replace(' ','-')
    ).join('').replaceAll(/[^\p{L}-]/gu,''); // \p{L} → letter in any locale
};

// Handlebars processing

function registerPartials (dir) {
    // registers handlebars partials in a particular templates/partials subdir
    doForFilesInDir(
        `src/templates/partials/${dir || ''}`,
        'hbs',
        (fileName, fileContents) => {
            // if there's a dir, register the partial as dir.name
            // i.e. svg.icon-plus.svg
            handlebars.registerPartial(
                (dir ? dir + '.' : '') + fileName,
                fileContents
            );
            debug(`registered partial: ${fileName}`);
        }
    );
};

function compileTemplates () {
    // compiles all templates
    doForFilesInDir(
        'src/templates',
        'hbs',
        (fileName, fileContents) => {
            var descriptorPath = `${__dirname}/data/pages/${fileName}.json`,
                descriptor = fs.existsSync(descriptorPath) ?
                    JSON.parse(fs.readFileSync(descriptorPath), 'utf8') : {};
            Object.keys(locales).forEach(
                (langCode) => {
                    compileTemplate(fileName, descriptor, langCode);
                }
            );
        }
    );

};

function compileTemplate (templateName, descriptor, langCode, destinationDir) {
    var template =
            fs.readFileSync(
                `${__dirname}/src/templates/${templateName}.hbs`,
                'utf8'
            ),
        destinationDir = destinationDir || '';

    // make the locale list available to all pages
    descriptor.locales = Object.keys(locales);

    if (debugMode) { descriptor.livereload = true; }

    // find locale data for this template
    descriptor.locale = locales[langCode].pages[templateName];
    if (!descriptor.locale) {
        debug(`missing locale: ${langCode} (default to EN)`);
        descriptor.locale = {};
        Object.assign(descriptor.locale, locales.en.pages[templateName]);
    }

    // add global layout strings to all page locales
    Object.keys(locales.en.pages.layout).forEach((key) => {
        if (locales[langCode].pages.layout &&
                locales[langCode].pages.layout[key]) {
            descriptor.locale[key] = locales[langCode].pages.layout[key];
        } else {
            descriptor.locale[key] = locales.en.pages.layout[key];
        }
    });

    descriptor.locale.code = langCode;

    // compile the template
    fse.ensureDirSync(`${__dirname}/dist/${langCode}/${destinationDir}`);
    fs.writeFileSync(
        `dist/${langCode}/${destinationDir}/` +
            `${descriptor.slug || templateName}.html`,
        handlebars.compile(template)(descriptor)
    );
    debug(`compiled template: ${templateName}` +
        `${descriptor.slug ? (' ' + descriptor.slug) : ''} (${langCode})`);
};

// Handlebars additions

handlebars.registerHelper('markdown', (context, options) => {
    var mdPath = `${__dirname}/data/markdown/${context}.md`,
        md =  options ?
            (options.data.root.markdown || options.fn(this)) :
            context.fn(this),
        html;
    if (fs.existsSync(mdPath)) {
        md = fs.readFileSync(mdPath, 'utf8');
    }
    try {
        html = markdown.makeHtml(md);
    } catch (err) {
        html = `<p>PARSING MARKDOWN FAILED:</p><pre>${md}</pre><br>`;
    }
    return html;
});

handlebars.registerHelper('localize', function () {
    var locale = arguments[arguments.length - 1].data.root.locale,
        key = arguments[0],
        params = [].slice.call(arguments, 1, arguments.length - 1),
        localized = locale[key];

    params.forEach((param, index) => {
        localized = localized.replace(`@${index + 1}`, param);
    });

    return localized
});

// Build script functions

function build () {
    // builds the whole thing

    // remove and remake dist directory
    fse.removeSync(`${__dirname}/dist`);
    fse.ensureDirSync(`${__dirname}/dist`);

    // register all handlebars partials
    registerPartials('svg');
    registerPartials('layouts');
    registerPartials();

    // concat all JS
    concatJS();

    // compile sass stylesheets, autoprefixing the resulting CSS
    compileSass();

    // copy assets and JSON files
    copyAssets();

    // process localization files
    processLocales();

    // process all activity descriptors and build pages for each of them
    buildActivities();

    // compile all templates
    compileTemplates();
};

function processLocales () {
    doForFilesInDir(
        'locales',
        '/',
        (dirName, fullPath) => {
            locales[dirName] = { pages: {} };
            doForFilesInDir(
                `locales/${dirName}`,
                'json',
                (fileName, fileContents) => {
                    locales[dirName].pages[fileName] =
                        JSON.parse(fileContents);
                },
                true // recursive
            )
            console.log(`processed locale: ${dirName}`);
        }
    );
};

function buildActivities () {
    var activityDescriptors = [];
    doForFilesInDir(
        'data/activities',
        '/',
        (slug, activityPath) => {
            // new activity
            var meta = JSON.parse(
                    fs.readFileSync(
                        `${activityPath}/meta.json`, 'utf8'
                    )
                );
            meta.slug = slug;
            // process locales, under subdirs
            doForFilesInDir(
                `data/activities/${slug}`,
                '/',
                (langCode, localePath) => {
                    // activities stores the list of all activity descriptors
                    var activity = JSON.parse(
                            fs.readFileSync(
                                `${localePath}/meta.json`,
                                'utf8'
                            )
                        ),
                        descriptor = {};
                    activity.slug = slugify(activity.title);
                    activity.locale = langCode;

                    Object.assign(descriptor, meta);
                    Object.keys(activity).forEach((key) => {
                        descriptor[key] = activity[key];
                    });

                    activityDescriptors.push(descriptor);

                    debug(`processed activity: ${slug} (${langCode})`);

                    buildActivity(activity, langCode, activityPath);
                }
            );
        }
    );
    fs.writeFileSync(
        'dist/activities.json',
        JSON.stringify(activityDescriptors)
    );
};

function buildActivity (descriptor, langCode, activityPath) {
    // we need to build the activity page for all available page locales, even
    // though the activity may not be available in all of these languages
    Object.keys(locales).forEach(
        (localeCode) => {
            descriptor.markdown =
                fs.readFileSync(
                    `${activityPath}/${langCode}/index.md`,
                    'utf8'
                );
            compileTemplate('activity', descriptor, localeCode, 'activities');
        }
    );
};

function copyAssets () {
    fse.copySync(
        `${__dirname}/src/assets`,
        `${__dirname}/dist/assets`,
        { overwrite: true },
        (err) => { if (err) { console.error(err); } }
    );
};

function concatJS () {
    var fullJS = '';
    doForFilesInDir(
        'src/scripts',
        'js',
        (fileName, fileContents) => {
            fullJS += fileContents;
        }
    );
    fs.writeFileSync(`${__dirname}/dist/main.js`, fullJS);
};

function compileSass () {
    // Compile SASS files and autoprefix the resulting CSS
    sass.render(
        {
            file: `${__dirname}/src/styles/main.scss`,
            outputStyle: (debugMode ? 'nested' : 'compressed')
        },
        (err, result) => {
            if (err) {
                console.error(err);
            } else {
                postcss([ autoprefixer ])
                    .process(result.css, { from: undefined })
                    .then(prefixed => {
                        prefixed.warnings().forEach(warn => {
                            console.warn(warn.toString())
                        });
                        fs.writeFileSync(
                            `${__dirname}/dist/main.css`,
                            prefixed.css
                        );
                    });
            }
        }
    );
};

function serve () {
    // Dead simple (and naive) HTTP static server

    function respondWithFile (res, fileName, params) {
        // Do we need to do anything at all with params? I don't think so
        fs.readFile(
            pathTo(fileName),
            (err, data) => {
                res.setHeader('Content-Type', mimeTypeFor(fileName));
                if (err) {
                    res.writeHead(404);
                    err.fileName = fileName;
                    res.end(JSON.stringify(err));
                    return;
                }
                res.writeHead(200);
                res.end(data);
            });
    };

    function mimeTypeFor (fileName) {
        var extension = fileName.replace(/.*\./,''),
            mimeType = {
                svg: 'image/svg+xml',
                png: 'image/png',
                jpg: 'image/jpg',
                jpeg: 'image/jpg',
                html: 'text/html',
                htm: 'text/html',
                css: 'text/css',
                ttf: 'font/ttf',
                otf: 'font/otf',
                woff: 'font/woff',
                pdf: 'application/pdf',
                zip: 'application/zip',
            }[extension];
        if (!mimeType) { mimeType = 'text/html'; }
        return mimeType;
    };

    function pathTo (fileName) {
        return `${__dirname}/dist/${fileName.replace(/\?.*/,'')}`;
    };

    function getParams (url) {
        url.replace(/.*\?/,'').split('&').map(
            paramString => {
                var pairArray = paramString.split('='),
                    assoc = {};
                assoc[pairArray[0]] = pairArray[1];
                return assoc;
            }
        );
    };

    http.createServer(function (req, res) {
        var fileName = req.url;
        if (req.url === '/') {
            fileName = 'index.html';
        }
        if (!fs.existsSync(pathTo(fileName))) {
            fileName = fileName + '.html';
        }
        respondWithFile(res, fileName, getParams(req.url));
    }).listen(3000);
};

function watchDirs (dirs, action) {
    dirs.forEach(
        (dir) => {
            doForFilesInDir(
                dir,
                null, // all extensions
                (fileName, fileContents, fullPath) => {
                    debug(`watching file: ${fullPath}`);
                    fs.watchFile(fullPath, { interval: 1000 }, (c, p) => {
                        debug(`File ${fullPath} changed. Rebuilding site.`);
                        build();
                        action.call(this);
                    });
                },
                true // recursive
            );
        }
    );
};

function watch () {
    var wss = new WebSocket.Server({ port: 8080 }),
        clients = [];

    watchDirs(
        [
            'src/templates', 'src/styles', 'src/scripts',
            'data'
        ],
        () => {
            clients.forEach(client => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send('reload');
                }
            });
        }
    );

    wss.on('connection', client => {
        clients.push(client);
        client.send('LiveReload connected to server');
    });
};

// Build, watch, and serve

build();

if (debugMode) {
    watch();
    serve();
}

