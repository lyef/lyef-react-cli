const spawn = require('child_process').spawn;
const ora = require('ora');
const gs = require('glob-stream');
const templateTransformer = require('../helpers/templateTransformer');
const Readable = require('stream').Readable;
const camelCase = require('lodash.camelcase');
const kebabCase = require('lodash.kebabcase');
const humanize = require('humanize-component');

module.exports = create;

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

function create (name, author, description, version) {
	const info = parseInfo(name, author, description, version);
    clone(name)
        .then(() => createTmp(name))
        .then(() => processTemplate(info))
        .then(clean);
}

function clone (name) {
    const stream = spawn('git', ['clone', 'https://github.com/lyef/lyef-react-template', `${process.cwd()}/${name}`]).stdout;
    const spinner = ora('Cloning template from github').start();
    stream.on('finish', spinner.succeed.bind(spinner));
    stream.on('error', spinner.fail.bind(spinner));
    return new Promise((resolve, reject) => {
        stream.on('finish', resolve);
        stream.on('error', reject);
    });
}

function processTemplate (info) {
    const stream = gs.create(['.tmp/**/*.*', '!.tmp/.git/**/*'])
        .pipe(templateTransformer(info));
    const spinner = ora('Processing templates').start();
    stream.on('finish', spinner.succeed.bind(spinner));
    stream.on('error', spinner.fail.bind(spinner))
    return new Promise((resolve, reject) => {
        stream.on('finish', resolve);
        stream.on('error', reject);
    });
}

function createTmp (name) {
    const stream = spawn('cp', ['-r', `${process.cwd()}/${name}`, `${process.cwd()}/.tmp`]).stdout;
    const spinner = ora('Creating .tmp').start();;
    stream.on('finish', spinner.succeed.bind(spinner));
    stream.on('error', spinner.fail.bind(spinner))
    return new Promise((resolve, reject) => {
        stream.on('finish', resolve);
        stream.on('error', reject);
    });
}

function clean () {
    const stream = spawn('rm', ['-vr', `${process.cwd()}/.tmp`]).stdout;
    const spinner = ora('Removing .tmp').start();
    stream.on('finish', spinner.succeed.bind(spinner));
    stream.on('error', spinner.fail.bind(spinner));
    return new Promise((resolve, reject) => {
        stream.on('finish', resolve);
        stream.on('error', reject);
    });
}

