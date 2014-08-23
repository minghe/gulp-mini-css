//one css plugin for gulp

var through = require("through2");
var CleanCss = require("clean-css");
var gutil = require("gulp-util");
var path = require('path');

const PLUGIN_NAME = 'gulp-css';

module.exports = function (opt) {
    opt = opt || {};
    var minflyCss = function (file, enc, callback) {
        if (file.isNull()) {
            throw PluginError(PLUGIN_NAME, "file is null!");
        }

        if (file.isBuffer()) {
            var newContents = new CleanCss(opt).minify(String(file.contents));
            var contents = new Buffer(newContents);
            var filePath = file.path;
            //替换文件后缀
            if (opt && opt.ext) {
                this.push(new gutil.File({
                    contents: contents,
                    path: filePath.replace(/\.css$/, opt.ext),
                    base: path.dirname(filePath)
                }));
            } else {
                file.contents = contents;
                this.push(file);
            }
        }
        return callback(null, file);
    }

    return through.obj(minflyCss);
};
