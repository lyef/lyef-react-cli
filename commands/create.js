const spawn = require('child_process').spawn;
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
    console.log('[get template] Cloning tempalte repository...')
    stream.on('end', () => console.log('[get template] done'))
    return stream;
}

function processTemplate (info) {
    const stream = gs.create(`./${info.name}/**/*.*`);
    stream
		.pipe(templateTransformer(info));
}

function clean (name) {
   const stream = spawn('rm', ['-vr', `${process.cwd()}/${name}/.git`]).stdout;
   console.log('[remove .git] Removing .git from tempalte...')
   stream.on('end', () => console.log('[remove .git] done'));
   return stream;
}

