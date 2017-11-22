任务流开发目录



CompileSass方法传入的对象
    var compileSassObj = {
        // scss的目录
        src: 'oasisl/scss/**/*.scss',
        // 输出路径
        dest: 'build/assets/css',
        // 是否输出sourcemap,无论是否compass编译都需要设置
        isOpenSourceMap: true,
        // 是否压缩,无论是否compass编译都需要设置
        isCompress: true,
        // compass相关设置
        compassSetting: {
            // scss根目录
            srcBase: 'oasisl/scss',
            // 雪碧图的输出路径
            imageDest: 'build/assets/images',
            // 字体目录
            fontSrc: 'src/fonts',
        },
        // 成功后打印
        logInfo: '编译sass成功'
    }
