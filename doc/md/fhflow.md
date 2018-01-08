### Fhflow
    
	1.基于react+rudex+electron+node整体设计的前端开发环境集成工具。
    2.当前fhflow提供的主要模块包括：当前前端工作的基本工作流、请求代理、数据模拟、开发文档、开发环境检测安装及常用工具下载。
    3.当前前端工作的基本工作流主要包括开发模式、上传模式、打包模式等功能。支持模块化和非模块化开发。
    4.请求代理模块提供代理设置功能。
    5.数据模块提供rap学习入口
    6.开发文档模块提供常用前端开发文档的快速入口
    7.开发环境安装模块提供开发环境检测与安装，同时提供常用工具的下载功能


### 安装使用
- 下载安装包 fhflow-1.0.0-setup.exe

- 安装fhflow-1.0.0-setup.exe

### 界面预览
![project-menu](../img/project-menu.png)

#### 主菜单
    文件
    ├── 新建项目
    ├── 打开项目
    ├── 刷新
    编辑
    ├── 撤销
    ├── 重做
    ├── 剪切
    ├── 复制
    ├── 粘贴
    ├── 全选
    运行
    ├── Run 开发流程
    ├── Ftp 发布部署
    ├── Pack 项目打包
    项目
    ├── 删除当前项目
    窗口
    ├── 最小化
    ├── 关闭窗口
    ├── 调试模式
    帮助
    ├── FhFlow 官网
    ├── FhFlow 使用帮助
    ├── 报告问题
    ├── 检查更新
    ├── 关于


### 如何使用，Let's do it !

#### 项目管理
页面结构

  * 项目管理的页面主要分为左侧上半部分的项目列表区，左侧中间部分的操作区，左侧下半部分的日志区，以及右侧的项目设置区和开发高级设置区。

  * 项目列表区展示项目列表，可以在此处打开项目的所在路径以及修改项目名称；
  操作区可以新建项目、删除项目、修改工作区、对选中的项目进行开发、上传、打包等操作；

  * 日志区会记录开发、上传、打包等操作的进度，同时提供了清空图标可以对日志进行清空；

  * 项目设置区主要对开发、上传、打包功能进行设置。第一块功能设置，在此处可以通过勾选的方式选择是否开启浏览器自动刷新、REM适配、MD5去缓存等功能。第二块是上传相关的设置，在此处可以设置上传的IP、用户名、密码、端口号、远程路径、需要过滤的文件（此处支持正则），以及上传的方式（FTP/SFTP）。第三块是打包相关设置，可以设置版本号和命名规则以及选择打包类型（rar、zip），其中主要提供${name}、${moduleName}、${version}、${time}等参数，分别对应于项目名、模块名、版本号、时间，用户可自由组合，后台打包时会自动进行替换。

  * 开发高级设置,在此处对项目进行高级设置。例如设置是否含有模块、项目类型等。默认为非模块化项目，项目类型为普通类型。

  ![project-00](../img/project-00.png)

1.新建项目

   a.无任何项目情况下新建项目

  ![project-01](../img/project-01.png)

  b.有项目情况下新建项目

  ![project-02](../img/project-02.png)

  c.打开已有项目

  ![project-03](../img/project-03.png)

2.删除项目

  ![project-04](../img/project-04.png)

3.修改全局工作区路径

  ![project-04](../img/project-05.png)

4.开发模式
  选中项目点击开发按钮，该项目进度开发状态。在该模式下会将src目录中的文件按指定路径编译值build目录下（同时打印出日志），并监听src目录下的变化，当你在日志区看到"启动server成功"后说明项目编译完成。具体目录结构为：
	build（构建目录）
	├── assets   (静态文件)
	│   ├── fonts 
	│   ├── images 
	│   ├── css    
	│   ├── js	   
	│ 	│ 	├── 模块js
	│ 	│ 	└── template
	│ 	│ 		└── helper.js
	│   ├── template  
	│ 	│ 	├── 模块模板
	│ 	│ 	└── template.js
	│ 	├── 平台html

5.上传模式

#### 项目脚手架
  新建项目成功后，会自动生成当前开发环境所需的目录结构

	fhflow.config.json  （存放项目的配置文件）
	src（开发目录）
	├── fonts   (存放字体文件)
    ├── images （存放图片文件）
    ├── js	   （存放js文件）
    ├── scss   （存放scss文件）
	├── tpl	   （存放tpl文件）
    ├── view   （存放html文件）
	
默认情况下，app会使用默认设置（即项目下fhflow.config.json的默认配置），当我们尝试修改app的配置时，将会对该配置文件进行修改。默认配置如下：

	{
      "businessName": "",
      "modules": [],
      "choseModules": [],
      "projectType": "normal",
      "supportREM": true,
      "supportChanged": false,
      "reversion": false,
      "server": {
        "host": "localhost",
        "port": 8089,
        "liverload": true,
        "proxys": []
     },
     "ftp": {
        "host": "",
        "port": "22",
        "user": "",
        "pass": "",
        "remotePath": "/",
        "ignoreFileRegExp": "",
        "ssh": false
     },
     "package": {
        "type": "zip",
        "version": "0.0.1",
        "fileRegExp": "${name}-${moduleName}-${version}-${time}"
     }
	}
	