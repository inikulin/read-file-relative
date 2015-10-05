var path     = require('path');
var fs       = require('fs');
var callSite = require('callsite');

function getAbsPath (relativePath) {
    var caller     = callSite()[2];
    var callerPath = caller.getFileName();
    var basePath   = path.dirname(callerPath);

    return path.join(basePath, relativePath);
}

module.exports = {
    readSync: function (relativePath, binary) {
        var absPath = getAbsPath(relativePath);
        var content = fs.readFileSync(absPath);

        return binary ? content : content.toString();
    },

    read: function (relativePath, callback) {
        var absPath = getAbsPath(relativePath);

        fs.readFile(absPath, callback);
    }
};