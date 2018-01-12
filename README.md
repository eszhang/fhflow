#### fhflow
fhflow前端开发环境集成工具，对fh目前前端开发环境、编译打包上传、文档、工具等进行整合，让开发者更专注去书写“实际”代码，而不需要关心太多“额外的事”，且集成相关开发文档及工具，旨在简化前端开发复杂度，前端开发者只需要一个fhflow即满足日常开发要求,主要面向对象为fh公司前端人员及web开发人员使用。

#### fhflow 需要实现的功能点

1. 前端开发环境一键安装
2. 提供构建开发规范目录脚手架、具有编译、压缩、【分模块】打包、上传等功能
3. 提供简单请求转发功能
4. 本地数据模拟功能
5. 开发文档
6. 自定义扩展任务流

#### fhflow 模块划分
1. 【资源管理模块】 展示目前已缓存的项目列表、可对某个项目进行开发调试模式、打包模式、上传模式，每个模式均有对应配置项  
开发调试模式配置项包含是否开启LiveReload浏览器自动刷新、是否开启REM适配解决方案、是否开启文件版本(MD5)去缓存解决方案、是否开启文件变动增量编译支持，可切换全模块包和分模块报开发调试    
打包模式配置项包含打包名称、版本号、自定义命名规则（默认为"[打包名]-[版本号]-[时间日期].zip"）、打包分rar和zip格式  
上传模式配置项包含服务器地址、端口号、用户名、密码、远程路径，上传方式分为FTP和SFTP两种，且支持正则过滤上传文件  
2. 【ajax请求转发】展示ajax 转发路由列表，支持新增、修改、删除。其中每一条路由所需配置项如下匹配的路径正则、重定向的Api域名  
备注：具体配置项由选用的插件配置来进一步确认。
3. 【数据模拟功能】 展示已配置路由接口列表，支持为某个路由指定返回的具有一定规则的数据格式，暂时支持json数据导入及在线代码编辑（新增）、修改、删除
4. 【开发文档模块】 整合UED前端目前自研的文档,如oasis、oasisL、rhyton，以及常用开发文档，如jQuery、loadsh、echart。这模块相对简单，只需要归类提供对应文档链接入口即可。
5. 【环境安装模块】 分为常规环境安装（nodejs、ruby、compass）及常用开发工具包下载（beyond compare、vscode、markdownpad、koala），其中常规环境安装，安装时需要进度条显示安装到哪一步了，目前三步完整安装流程，常用开发工具包下载，不需要进度条，点击即下载，这里需要明显区分出常规环境安装（推荐）和常用开发工具包下载

#### 如何启动: 
Step 1
```
git clone git@github.com:eszhang/fhflow.git
```

Step 2
```
npm i
```

Step 3
```
npm run build
```

#### 如何打包: 
Step 1
```
npm run dist
```

Step 2
```
electron-package:win64
```

#### 如何开发: 
在开发过程中可以通过npm run start 启动页面服务
使用vscode进行断点调试，具体调试代码如下:
```
{
    "version": "0.2.0",
    "configurations": [
        {
            "name": "Debug Main Process",
            "type": "node",
            "request": "launch",
            "cwd": "${workspaceRoot}",
            "env": {
                "NODE_ENV": "development"
            },
            "runtimeExecutable": "${workspaceRoot}/node_modules/.bin/electron.cmd",
            "program": "${workspaceRoot}/src/electron/app.js"
        }
    ]
}
```

#### 可能遇到的问题

在使用npm run electron-package:win64打包过程中拷贝node_modules时可能会存在漏包的情况。如果存在漏报情况需要手动开发环境中的node_modules下的包拷贝到目录electron-package/FhFlow-win32-x64/resources/app/node_modules 下