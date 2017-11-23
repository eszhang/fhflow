const gulp = require('gulp'),
      Copy = require('./util').copy;
module.exports = function(fontObj,cb){
    Copy(fontObj,cb);
}