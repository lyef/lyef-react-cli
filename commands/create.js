const clone = require('../helpers/clone');
const clean = require('../helpers/clean');
const parseInfo = require('../helpers/parseInfo');
const createTmp = require('../helpers/createTmp');
const processTemplates = require('../helpers/processTemplates');

module.exports = create;

function create (name, author, description, version) {
	const info = parseInfo(name, author, description, version);
    clone(name)
        .then(() => createTmp(name))
        .then(() => processTemplates(info))
        .then(() => clean(name));
}
