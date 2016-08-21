const spawn = require('child_process').spawn;
const ora = require('ora');

module.exports = clone;

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

