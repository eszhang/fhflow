const gulp = require('gulp'),
      Copy = require('./util').copy;
module.exports = function(imgObj,cb){
    Copy(imgObj,cb);
}