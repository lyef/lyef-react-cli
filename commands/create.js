const spawn = require('child_process').spawn;
const fs = require('fs');

module.exports = create;

function create (name) {
    const stream = clone(name);
    stream.on('close', () => {
        clean(name);
        update(name);
    });
}

function clone (name) {
    const stdout = spawn('git', ['clone', 'https://github.com/lyef/lyef-react-component', `${process.cwd()}/${name}`]).stdout;
    stdout.pipe(process.stdout);
    return stdout;
}

function clean (name) {
   const stdout = spawn('rm', ['-vr', `${process.cwd()}/${name}/.git`]).stdout;
   stdout.pipe(process.stdout);
   return stdout;
}

function update (name) {
    const filename = `${process.cwd()}/${name}/package.json`;
    fs.readFile(filename, (error, content) => {
        if (error) throw error;

        let pkg = JSON.parse(content);
        pkg.name = name;

        fs.writeFile(filename, JSON.stringify(pkg, null, 4), 'utf8', (error) => {
            if (error) throw error;
        });
    });
}
