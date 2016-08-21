const fs = require('fs');
const template = require('lodash.template');
const reduce = require('through2-reduce');
const map = require('through2-map');

function createTemplateStream (info) {
    return reduce((file, chunk) => {
    	const convert = template(chunk.toString())
    	const converted = convert(info);
    	return file + converted;
    }, '');
}

module.exports = (info) => {
    return map({objectMode: true}, chunk => {
        return fs.createReadStream(chunk.path)
            .pipe(createTemplateStream(info))
            .pipe(fs.createWriteStream(chunk.path.replace('.tmp/', `${info.name}/`)));
    });
};
