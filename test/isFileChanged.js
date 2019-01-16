var assert = require('assert');
var rewire = require('rewire');
var path = require('path');

var gulpGitFlowDiff = rewire('../');

describe('gulp-giflow-diff isFileChanged', function() {
    const basePath = process.cwd();
    it('should return true if there is file in list of changed files', function(done) {
        var fileMocked = {};
        fileMocked.path = path.join(basePath, 'src/file33.js');
        var filesChanged = [
            'src/file11.js',
            'src/file22.js',
            'src/file33.js'
        ].map(filePath => path.join(basePath, filePath));
        var result = gulpGitFlowDiff.isFileChanged(fileMocked, filesChanged);
        assert.equal(result, true);
        done();
    });

    it('should return false if there is no file in list of changed files', function(done) {
        var fileMocked = {};
        fileMocked.path = path.join(basePath, 'src/file44.js');
        var filesChanged = [
            'src/file11.js',
            'src/file22.js',
            'src/file33.js'
        ].map(filePath => path.join(basePath, filePath));
        var result = gulpGitFlowDiff.isFileChanged(fileMocked, filesChanged);
        assert.equal(result, false);
        done();
    });
});
