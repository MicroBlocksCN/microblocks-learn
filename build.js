var fs = require('fs'),
    fse = require('fs-extra'),
    sass = require('sass'),
    handlebars = require('handlebars'),
    http = require('http'),
    WebSocket = require('ws'),
    autoprefixer = require('autoprefixer'),
    postcss = require('postcss'),
    markdown = new (require('showdown')).Converter(),
    args = process.argv.slice(2),
    debugMode = args.includes('--debug'),
    locales = { },
    languages =
        JSON.parse(
            fs.readFileSync(
                `${__dirname}/locales/languages.json`,
                'utf8'
            )
        );
    sitemapUrls = [],
    unwantedPages = [
        // relative to dist folder
        'activity.html',
        'teachers-guide.html',
        'activity-card.html'
    ];


// MarkDown additions

markdown.setOption('strikethrough', true);
markdown.setOption('tables', true);

markdown.addExtension({
    type: 'output',
    filter: function (html) {
        return html.replaceAll(
            /<p>(<img.*)title="(.*)" \/><\/p>/g,
            '<figure class="captioned">$1\/>' +
                '<figcaption class="caption">$2</figcaption></figure>'
        ).replaceAll(
            // fix
            // https://stackoverflow.com/questions/1919982/regex-smallest-possible-match-or-nongreedy-match
            /<img (.*?)\/>/g,
            `<img $1 loading="lazy"\/>`
        ).replaceAll(
            /<p>\[\[(.+?)\]\]/g, `<div class="$1">`
        ).replaceAll(
            /\[\[\/.*\]\]<\/p>/g, `</div>`
        )
    }
});


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

handlebars.registerHelper('join', function () {
    return Array.prototype.slice.call(arguments, 0, -1).join('');
});

handlebars.registerHelper('localize', function () {
    var data = arguments[arguments.length - 1].data.root,
        templateName = data['template-name'],
        locale = data.locale,
        key = arguments[0],
        params = [].slice.call(arguments, 1, -1),
        localized = locale[key];

    if (!localized) {
        // missing locale string, return EN one
        localized = locales.en.pages[templateName][key] ||
            locales.en.pages.global[key];
    }

    params.forEach((param, index) => {
        localized = localized.replace(`@${index + 1}`, param);
    });

    return localized;
});

handlebars.registerHelper('language-name', function (context) {
    return languages[context];
});

handlebars.registerHelper('json', function (context) {
    return JSON.stringify(context);
});

// Thanks to kevlened at StackOverflow for the following boolean helpers
// https://stackoverflow.com/a/31632215

handlebars.registerHelper('and', function () {
    return Array.prototype.ever.call(arguments, Boolean);
});

handlebars.registerHelper('or', function () {
    return Array.prototype.slice.call(arguments, 0, -1).some(Boolean);
});

handlebars.registerHelper('times', function(n, block) {
    var accum = '';
    for(var i = 0; i < n; ++i)
        accum += block.fn(i);
    return accum;
});


// Useful functions

function debug () { if (debugMode) { console.info(...arguments); } };

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

function slugForPath(activityPath, langCode) {
	var pathParts = activityPath.split('/');
	return pathParts[pathParts.length - 4] + '-' + langCode;
}

function slugify (string, langCode) {
    // make all lowercase, allow only alpha characters, and replace spaces with
    // hyphens
    var slug = string.split('').map(
        char => char.toLowerCase().replace(' ','-')
    ).join('').replaceAll(/[^\p{L}-]/gu,''); // \p{L} → letter in any locale

    if (fs.existsSync(`${__dirname}/dist/${langCode}/activities/${slug}`)) {
        // there's another activity with this same slug, let's
        // add a numeric suffix
        if (slug.match(/[0-9]$/)) {
            // this slug already had a numeric suffix, let's
            // increment it
            slug = slug.replace(
                /[0-9]$/,
                slug.match(/[0-9]$/[0] + 1));
        } else {
            // let's add a number prefix to this slug
            slug = slug + '-1';
        }
    }

	// remove accented characters from the slug to avoid folder path issues
	// see: https://stackoverflow.com/questions/990904/remove-accents-diacritics-in-a-string-in-javascript
	return encodeURI(slug.normalize("NFD").replace(/[\u0300-\u036f]/g, ""));
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
    descriptor.languages = languages;

    // store the template name in the descriptor, to be used by "localize"
    descriptor['template-name'] = templateName;

    if (debugMode) { descriptor.livereload = true; }

    // find locale data for this template
    descriptor.locale = locales[langCode].pages[templateName];
    if (!descriptor.locale) {
        debug(`missing locale: ${langCode} (default to EN)`);
        descriptor.locale = {};
        Object.assign(descriptor.locale, locales.en.pages[templateName]);
    }

    // add global strings to all page locales
    Object.keys(locales.en.pages.global).forEach((key) => {
        if (locales[langCode].pages.global &&
                locales[langCode].pages.global[key]) {
            descriptor.locale[key] = locales[langCode].pages.global[key];
        } else {
            descriptor.locale[key] = locales.en.pages.global[key];
        }
    });

    // add local strings to pages ? - Bernat, correct?
    descriptor.locale.code = langCode;

    // collect URLs for sitemap and pass it to the template
    descriptor.pageUrl = `https://learn.microblocks.fun/${langCode}/`
        + (destinationDir ? `${destinationDir}/` : ``)
        + `${descriptor.href || descriptor.slug || templateName}.html`;
    // debug(`url: ${descriptor.pageUrl}`);
    sitemapUrls.push(descriptor.pageUrl);

    // compile the template
    fse.ensureDirSync(`${__dirname}/dist/${langCode}/${destinationDir}`);
    fs.writeFileSync(
        `dist/${langCode}/${destinationDir}/` +
            `${descriptor.href || descriptor.slug || templateName}.html`,
        handlebars.compile(template)(descriptor)
    );
    debug(`compiled template: ${templateName}` +
        `${descriptor.slug ? (' ' + descriptor.slug) : ''} (${langCode})`);
};


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

    // build sitemap
    buildSitemap();

    // delete unwanted html files generated
    deleteUnwantedPages();
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
            debug(`processed locale: ${dirName}`);
        }
    );
};

function buildActivities () {
    var activityDescriptors = [];
    doForFilesInDir(
        'data/activities',
        '/',
        (activityDir, activityPath) => {
            // new activity
            var meta = JSON.parse(
                    fs.readFileSync(
                        `${activityPath}/meta.json`, 'utf8'
                    )
                );

            // get the slugs for each locale
            // unfortunately we need to do two passes over the directory
            meta.translations = [];
            doForFilesInDir(
                `data/activities/${activityDir}/locales/`,
                '/',
                (langCode, localePath) => {
                    var json = JSON.parse(
                            fs.readFileSync(
                                `${localePath}/meta.json`,
                                'utf8'
                            )
                        ),
//                      slug = slugify(json.title || meta.title, langCode);
                        slug = slugForPath(localePath, langCode);

                    meta.translations.push({
                        langCode: langCode,
                        slug: slug,
                        title: json.title || meta.title
                    });
                }
            );
            // process locales, under subdirs
            doForFilesInDir(
                `data/activities/${activityDir}/locales/`,
                '/',
                (langCode, localePath) => {
                    // activities stores the list of all activity descriptors
                    var localeDescriptor = JSON.parse(
                            fs.readFileSync(
                                `${localePath}/meta.json`,
                                'utf8'
                            )
                        ),
                        descriptor = {};
                    localeDescriptor.title =
                        localeDescriptor.title || meta.title;
                    localeDescriptor.author =
                        localeDescriptor.author || meta.author;
                    localeDescriptor.level =
                        localeDescriptor.level || meta.level || 1;
                    localeDescriptor.translations = meta.translations.filter(
                        (each) => { return each.langCode !== langCode });
                    localeDescriptor.components = meta.components || [];
                    localeDescriptor.topics = meta.topics || [];
                    localeDescriptor.time = meta.time || [30, 45];
                    localeDescriptor.boards = meta.boards || [];
//                  localeDescriptor.slug = slugify(localeDescriptor.title, langCode);
                    localeDescriptor.slug = slugForPath(localePath, langCode);
                    localeDescriptor.locale = langCode;
                    localeDescriptor.href = 'index';
                    localeDescriptor['has-card'] =
                        fs.existsSync(
                            `${localePath}/files/activity-card.pdf`) ||
                        fs.existsSync(
                            `${activityPath}/files/activity-card.pdf`) ||
                        meta['card-url'];
                    localeDescriptor['card-url'] =
                        localeDescriptor['card-url'] ||
                        meta['card-url'] ||
                        './activity-card.pdf';
                    localeDescriptor['card-slides-url'] =
                        localeDescriptor['card-slides-url'] ||
                        meta['card-slides-url'];
                    localeDescriptor['has-project'] =
                        fs.existsSync(
                            `${localePath}/files/project.ubp`) ||
                        fs.existsSync(
                            `${activityPath}/files/project.ubp`);
                    localeDescriptor['has-guide'] =
                        fs.existsSync(`${localePath}/teachers-guide.md`);
                    localeDescriptor['has-video'] =
                        ( localeDescriptor['video-url'] || meta['video-url'] ) ? true : false;
                    localeDescriptor['video-url'] =
                        localeDescriptor['video-url'] ||
                        meta['video-url'] ||
                        [];

                    Object.assign(descriptor, meta);
                    // overwrite top-level meta fields with their values in the
                    // locale descriptor
                    Object.keys(localeDescriptor).forEach((key) => {
                        descriptor[key] = localeDescriptor[key];
                    });

                    if (!descriptor.draft) {
                        activityDescriptors.push(descriptor);
                    }

                    debug(`processed activity: ${activityDir} (${langCode})`);

                    collectActivityAssets(localeDescriptor, langCode, activityPath);
                    buildActivity(localeDescriptor, langCode, activityPath);
                }
            );
        }
    );
    fs.writeFileSync(
        'dist/activities.json',
        JSON.stringify(activityDescriptors)
    );
};

function collectActivityAssets (descriptor, langCode, activityPath) {
    // Create a folder containing the assets of each translation of the given ativity.

    Object.keys(locales).forEach(
        (localeCode) => {
            // copy image files from both the activity root and locale
            if (fs.existsSync(`${activityPath}/files/`)) {
                fse.copySync(
                    `${activityPath}/files/`,
                    `${__dirname}/dist/activity-assets/${descriptor.slug}/`
                );
            }
            if (fs.existsSync(`${activityPath}/locales/${langCode}/files/`)) {
                fse.copySync(
                    `${activityPath}/locales/${langCode}/files/`,
                    `${__dirname}/dist/activity-assets/${descriptor.slug}/`
                );
            }
        }
    );
};

function linkActivityAssets(activityDir, assetsDir) {
	// Add links in activityDir to each file in assetsDir.

    var assetFiles = fs.readdirSync(assetsDir);
    assetFiles.forEach(
        (assetPath) => {
            fName = assetPath.split('/').pop();
            if (fName[0] != '.') { // skip .DS_Store on MacOS
                fse.ensureSymlinkSync(
                	`${assetsDir}/${fName}`,
                	`${activityDir}/${fName}`
                );
            }
        }
    );
};

function buildActivity (descriptor, langCode, activityPath) {
    // we need to build the activity page for all available page locales, even
    // though the activity may not be available in all of these languages
    // TODO refactor this humongous thing
    Object.keys(locales).forEach(
        (localeCode) => {
            descriptor.markdown =
                fs.readFileSync(
                    `${activityPath}/locales/${langCode}/index.md`,
                    'utf8'
                );
            compileTemplate(
                'activity',
                descriptor,
                localeCode,
                `activities/${descriptor.slug}`
            );

            // copy image files from both the activity root and locale
//             if (fs.existsSync(`${activityPath}/files/`)) {
//                 fse.copySync(
//                     `${activityPath}/files/`,
//                     `${__dirname}/dist/${localeCode}/` +
//                         `activities/${descriptor.slug}/`
//                 );
//             }
//             if (fs.existsSync(`${activityPath}/locales/${langCode}/files/`)) {
//                 fse.copySync(
//                     `${activityPath}/locales/${langCode}/files/`,
//                     `${__dirname}/dist/${localeCode}/` +
//                         `activities/${descriptor.slug}/`
//                 );
//             }

            // add links to shared activity assets
            linkActivityAssets(
                `${__dirname}/dist/${localeCode}/activities/${descriptor.slug}`,
                `${__dirname}/dist/activity-assets/${descriptor.slug}`);

            if (descriptor['has-guide']) {
                var guideDescriptor = {
                    markdown:
                        fs.readFileSync(
                            `${activityPath}/locales/${langCode}/` +
                                `teachers-guide.md`,
                            'utf8'
                        ),
                    title: descriptor.title,
                    href: 'index',
                    slug: descriptor.slug,
                    time: descriptor.time,
                    level: descriptor.level,
                    topics: descriptor.topics
                };
                compileTemplate(
                    'teachers-guide',
                    guideDescriptor,
                    localeCode,
                    `activities/${descriptor.slug}/guide`
                );
            }
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
    fse.copySync(
        `${__dirname}/data/json/`,
        `${__dirname}/dist/`,
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
            outputStyle: (debugMode ? 'expanded' : 'compressed')
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
        
function buildSitemap () {
    // building a sitemap with all the URLs and referencing it with robots.txt
    let sitemapContents = 'https://learn.microblocks.fun/\n'; // initial
    let robotsContents = 'Sitemap: https://learn.microblocks.fun/sitemap.txt\n' // initial
    let unwantedURLs = [];

    // URLs to disallow and discard

    // populate unwantedURLs
    unwantedPages.forEach( name => {
        Object.entries(languages).forEach(([key, value]) => {
            unwantedURLs.push(`https://learn.microblocks.fun/${key}/${name}`);
        });
    });

    // add all URLs generated by compileTemplate()
    // that aren't listed in unwantedURLs
    sitemapUrls.forEach( url => {
        if ( !unwantedURLs.includes(url) ) {
            sitemapContents += url + '\n';
        }
    })
    
    try {
        fs.writeFileSync('dist/sitemap.txt', sitemapContents);
        fs.writeFileSync('dist/robots.txt', robotsContents);
        console.log(`Sitemap generated: ${sitemapUrls.length} URLs`);
    } catch(err) {
        console.error(err);
    }
};

function deleteUnwantedPages () {
    // Delete unwanted pages generated by the build process,
    // because it's easier that to avoid creating them
    unwantedPages.forEach( name => {
        Object.entries(languages).forEach(([key, value]) => {
            let filePath = `dist/${key}/${name}`;
            fse.removeSync(filePath);
        });
    });
}

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
        } else if (fs.lstatSync(pathTo(fileName)).isDirectory()) {
            if (!req.url.endsWith('/')) {
                // this is a directory, redirect to the same path but with a
                // trailing slash
                res.writeHead(301, { Location: req.url + '/'} );
                res.end();
                return;
            }
            fileName = fileName + '/index.html';
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
            'data', 'locales'
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

