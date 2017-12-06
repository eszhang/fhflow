
/**
 *  rap gulp插件
 */

const through = require('through2');

module.exports = function () {

    let prefixText = '';

    prefixText = new Buffer(prefixText);

    function prefixStream(prefixText) {
        let stream = through();
        stream.write(prefixText);
        return stream;
    }

    return through.obj(function (file, enc, cb) {

        if (file.isNull()) {
            return cb(null, file);
        }

        if (file.isBuffer()) {
            var content = file.contents.toString();
            content = content.replace("RAP.setPrefix('/mockjsdata/');", "");
            content = content.replace(/,*\s*('|")http:\/\/172\.16\.1\.75:8080.*('|")/, "");
            content = content.replace(/,*\s*('|")http:\/\/18\.18\.18\.101:8080.*('|")/, "");
            file.contents = new Buffer(content);
        }

        if (file.isStream()) {
            file.contents = file.contents.pipe(prefixStream(prefixText));
        }

        cb(null, file);
    })
}