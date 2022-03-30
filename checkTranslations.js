// Report any missing translation keys in the locale/<lang code>/*.json files.
// Run command: node checkTranslations

var fs = require('fs');
	langsJSON = JSON.parse(fs.readFileSync(`${__dirname}/locales/languages.json`, 'utf8'));
	languages = Object.keys(langsJSON);

function checkForMissingKeys(fileName) {
	var allKeys = {};
	var jsonForLang = {};

	// parse the the given file for each locale and collect the union of all keys found
	languages.forEach((langCode) => {
		if (fs.existsSync(`${__dirname}/locales/${langCode}`)) {
			var jsonFileName = `${__dirname}/locales/${langCode}/${fileName}`
			if (fs.existsSync(jsonFileName)) {
				var json = JSON.parse(fs.readFileSync(jsonFileName, 'utf8'));
				jsonForLang[langCode] = json;
				Object.keys(json).forEach((key) => { allKeys[key] = true; });
			}
		}
	});
	allKeys = Object.keys(allKeys);

	// report any keys missing from particular translations
	languages.forEach((langCode) => {
		var json = jsonForLang[langCode];
		if (json) {
			console.log('  ', langCode);
			allKeys.forEach((key) => {
				if (!json.hasOwnProperty(key)) {
					hasMissingKey = true;
					console.log('       missing:', key);
				}
			});
		}
	});
}

function checkTranslations() {
	var translationFilenames = fs.readdirSync(`${__dirname}/locales/en`);
	translationFilenames.forEach((fName) => {
		console.log(fName);
		var keys = checkForMissingKeys(fName);
	});
}

checkTranslations();
