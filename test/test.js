var assert   = require('assert');
var read     = require('../').read;
var readSync = require('../').readSync;

it('Should read file sync', function () {
    assert.strictEqual(readSync('./data/file1').trim(), '42');
    assert.strictEqual(readSync('./data/file2').trim(), 'Hey ya!');
});

it('Should read file sync as a buffer', function () {
    var content = readSync('./data/file1', true);

    assert.ok(content instanceof Buffer);
    assert.strictEqual(content.toString().trim(), '42');
});

it('Should read file async', function (done) {
    read('./data/file1', function (err, content) {
        assert.strictEqual(content.toString().trim(), '42');
        done();
    });
});
