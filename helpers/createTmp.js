const spawn = require('child_process').spawn;
const ora = require('ora');

module.exports = createTmp;

function createTmp (name) {
    const stream = spawn('cp', ['-r', `${process.cwd()}/${name}`, `${process.cwd()}/.tmp`]).stdout;

    const spinner = ora('Creating .tmp').start();;
    stream.on('finish', spinner.succeed.bind(spinner));
    stream.on('error', spinner.fail.bind(spinner));

    return new Promise((resolve, reject) => {
        stream.on('finish', resolve);
        stream.on('error', reject);
    });
}
