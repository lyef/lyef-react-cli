import test from 'ava';
import Duplex from 'stream';
import sinon from 'sinon';
import promisefyStream from '../../helpers/promisefyStream';

function delay(ms = 1) {
    return new Promise((resolve, reject) => setTimeout(resolve, ms));
}

test('ends the stream successfully', async t => {
    const stream = new Duplex(),
        doneSpy = sinon.spy(),
        errorSpy = sinon.spy();

    promisefyStream(stream).catch(errorSpy).then(doneSpy);
    stream.emit('finish', 'this is the end');

    await delay();

    t.is(doneSpy.called, true);
    t.is(errorSpy.called, false);
});

 test('fails the stream', async t => {
    const stream = new Duplex(),
        doneSpy = sinon.spy(),
        errorSpy = sinon.spy();

    promisefyStream(stream).then(doneSpy).catch(errorSpy);
    stream.emit('error', 'some sort of error');

    await delay();

    t.is(errorSpy.called, true);
    t.is(doneSpy.called, false);
 });
