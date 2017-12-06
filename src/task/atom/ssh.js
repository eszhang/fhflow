const gulp = require('gulp');
const gulpSSH = require('gulp-ssh');
const rap = require('./rap');
const sftp = require('gulp-sftp');
const async = require('async');

function upload2TestJs(config,cb){
    gulp.src(config.srcBase + '/**/*.js')
        .pipe(rap())
        .pipe(gulp.dest(config.destBase)).on('end',function(){
            cb ? cb() : undefined;
        });
}
function upload2TestOther(config,cb){
    gulp.src([config.srcBase + '/**/**','!' + config.srcBase + '/**/*.js'])
        .pipe(gulp.dest(config.destBase)).on('end',function(){
            cb ? cb() : undefined;
        });
}
function upload2T(config,cb){
    gulp.src(['release/**/**'])
        .pipe(sftp(config.sft)).on('end',function(){
            cb ? cb() : undefined;
        });
}
module.exports = function(config,cb){

    async.series([
        function(next){
            upload2TestOther(config,next);
        },
        
        function (next){
            upload2TestJs(config,next);
        },
        function (cb){
            upload2T(config,cb);
        },
        function(next){
            cb ? cb() : undefined;
        }
    ])

}