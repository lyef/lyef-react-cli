module.exports = promisefyStream;

function promisefyStream (stream) {
    return new Promise((resolve, reject) => {
        stream.on('error', reject).on('finish', resolve);
    });
}
