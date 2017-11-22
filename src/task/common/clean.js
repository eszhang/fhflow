const gulp = require('gulp'),
      del = require('del');
module.exports = function(cleanObj,cb){
    del(cleanObj.src,{force: true}).then(function(){
        console.log( cleanObj.logInfo || `删除成功`);
        cb ? cb(): undefined;
    })
}