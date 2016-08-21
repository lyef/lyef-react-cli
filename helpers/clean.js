const spawn = require('child_process').spawn;
const ora = require('ora');
const promisefyStream = require('./promisefyStream');

module.exports = clean;

function clean (name) {
    const folders = [
        `${process.cwd()}/.tmp`,
        `${process.cwd()}/${name}/.git`
    ];
    const stream = spawn('rm', ['-vr', ...folders]).stdout;

    const spinner = ora('Removing unecessary folders').start();

    return promisefyStream(stream)
        .then(spinner.succeed.bind(spinner))
        .catch(spinner.fail.bind(spinner));
}
