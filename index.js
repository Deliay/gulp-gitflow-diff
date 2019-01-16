'use strict';
var gutil = require('gulp-util');
var through = require('through2');
var execSync = require('child_process').execSync;
var path = require('path');

function diffBranches(options) {
    var filesChanged = [];

    if (!options.baseBranch) {
        throw new gutil.PluginError('gulp-gitflow-diff', 'baseBranch param is required');
    }

    var cmd = 'git diff --name-only $(git merge-base ' + options.baseBranch + ' HEAD)..HEAD';
    if (process.platform === 'win32') {
        cmd = 'powershell -NoProfile ' + cmd;
    }
    const executeResult = execSync(cmd, {encoding: 'utf8'});
    if (executeResult) {
        filesChanged = executeResult.split("\n").map(filePath => path.resolve(filePath));
    }
    
    // last entry is just empty string
    filesChanged.pop();

    return through.obj(
        function (file, _enc, cb) {
            if (isFileChanged(file, filesChanged)) {
                this.push(file);
            }
            cb();
        }
    );
};

function isFileChanged(file, filesChanged) {
    if (filesChanged.indexOf(file.path) != -1) {
        return true;
    } else {
        return false;
    }
}

module.exports = diffBranches;
module.exports.isFileChanged = isFileChanged;
