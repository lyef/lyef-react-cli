const camelCase = require('lodash.camelcase');
const kebabCase = require('lodash.kebabcase');
const humanize = require('humanize-component');

module.exports = parseInfo;

function parseInfo (name, author, description, version) {
	return {
		name,
    	appNameHumanized: humanize(name),
    	authorName: author,
    	appName: kebabCase(name),
    	appNameCamel: camelCase(name),
    	appVersion: version,
    	appDescription: description
	};
}
