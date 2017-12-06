const gulp = require('gulp');
const gulpSSH = require('gulp-ssh');
const rap = require('./rap');
const sftp = require('gulp-sftp');
const async = require('async');

function upload2TestJs(sshObj,cb){
    gulp.src(sshObj.srcBase + '/**/*.js')
        .pipe(rap())
        .pipe(gulp.dest(sshObj.destBase)).on('end',function(){
            cb ? cb() : undefined;
        });
}
function upload2TestOther(sshObj,cb){
    gulp.src([sshObj.srcBase + '/**/**','!' + sshObj.srcBase + '/**/*.js'])
        .pipe(gulp.dest(sshObj.destBase)).on('end',function(){
            cb ? cb() : undefined;
        });
}
function upload2T(sshObj,cb){
    gulp.src(['release/**/**'])
        .pipe(sftp(sshObj.sftOpt)).on('end',function(){
            cb ? cb() : undefined;
        });
}
module.exports = function(sshObj,cb){
    async.series([
        /**
         *  先删除
         */
        function(next){
            upload2TestOther(sshObj,next);
        },
        
        function (next){
            upload2TestJs(sshObj,next);
        },
        // function (cb){
        //     upload2T(sshObj,cb);
        // },
        function(next){
            cb ? cb() : undefined;
        }
    ])

}