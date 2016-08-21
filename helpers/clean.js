const spawn = require('child_process').spawn;
const ora = require('ora');

module.exports = clean;

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
