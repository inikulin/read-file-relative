var assert    = require('assert');
var path      = require('path');
var read      = require('../').read;
var readSync  = require('../').readSync;
var toAbsPath = require('../').toAbsPath;

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

it('Should read file async with options', function (done) {
    read('./data/file1', 'utf8', function (err, content) {
        assert.strictEqual(content.trim(), '42');
        done();
    });
});

it('Should provide conversion to absolute path', function () {
    assert.strictEqual(toAbsPath('./data/file1'), path.join(__dirname, './data/file1'));
});

it('Should provide support for Array native methods', function () {
    var files = [
        './data/file1',
        './data/file2'
    ];

    var actualPaths = files.map(toAbsPath);

    var expectedPaths = files.map(function (file) {
        return path.join(__dirname, file);
    });

    assert.deepEqual(actualPaths, expectedPaths);

    var actualContent = files.map(function (file) {
        return readSync(file).trim();
    });

    var expectedContent = ['42', 'Hey ya!'];

    assert.deepEqual(actualContent, expectedContent);
});
