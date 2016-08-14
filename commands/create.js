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
    const stream = clone(name);
    stream.on('close', () => {
        clean(name);
        processTemplate(info);
    });
}

function clone (name) {
    const stream = spawn('git', ['clone', 'https://github.com/lyef/lyef-react-template', `${process.cwd()}/${name}`]).stdout;
    const spinner = ora('Cloning template from github').start();
    stream.on('finish', spinner.succeed.bind(spinner));
    stream.on('error', spinner.fail.bind(spinner));
    return stream;
}

function processTemplate (info) {
    let stream = gs.create(`./${info.name}/**/*.*`);
    const spinner = ora('Processing templates').start();
    stream = stream
		.pipe(templateTransformer(info));
    stream.on('finish', spinner.succeed.bind(spinner));
    stream.on('error', spinner.fail.bind(spinner))
}

function clean (name) {
    const stream = spawn('rm', ['-vr', `${process.cwd()}/${name}/.git`]).stdout;
    const spinner = ora('Cleaning uncessary files from template').start();
    stream.on('finish', spinner.succeed.bind(spinner));
    stream.on('error', spinner.fail.bind(spinner));
    return stream;
}

