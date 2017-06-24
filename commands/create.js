const clone = require('../helpers/clone');
const clean = require('../helpers/clean');
const parseInfo = require('../helpers/parseInfo');
const createTmp = require('../helpers/createTmp');
const processTemplates = require('../helpers/processTemplates');

module.exports = create;

function create (name = 'my-component', author = 'my-name', description = 'My description.', version = '0.0.1') {
	const info = parseInfo(name, author, description, version);
    clone(name)
        .then(() => createTmp(name))
        .then(() => processTemplates(info))
        .then(() => clean(name));
}
