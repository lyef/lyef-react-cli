const spawn = require('child_process').spawn;
const ora = require('ora');
const promisefyStream = require('./promisefyStream');

module.exports = createTmp;

function createTmp (name) {
    const stream = spawn('cp', ['-r', `${process.cwd()}/${name}`, `${process.cwd()}/.tmp`]).stdout;

    const spinner = ora('Creating .tmp').start();

    return promisefyStream(stream)
        .then(spinner.succeed.bind(spinner))
        .catch(spinner.fail.bind(spinner));
}
