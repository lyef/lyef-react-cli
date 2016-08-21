const spawn = require('child_process').spawn;
const ora = require('ora');
const promisefyStream = require('./promisefyStream');

module.exports = clone;

function clone (name) {
    const stream = spawn('git', ['clone', 'https://github.com/lyef/lyef-react-template', `${process.cwd()}/${name}`]).stdout;

    const spinner = ora('Cloning template from github').start();

    return promisefyStream(stream)
        .then(spinner.succeed.bind(spinner))
        .catch(spinner.fail.bind(spinner));
}

