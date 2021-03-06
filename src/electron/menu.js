
/**
 *  electron menu 菜单定制
 */

const { app, Menu } = require('electron');
const action = require('./action');

const template = [
    {
        label: '文件',
        submenu: [
            {
                label: '新建项目',
                accelerator: 'CmdOrCtrl+N',
                click() {
                    action.createProject();
                }
            },
            {
                label: '打开项目',
                accelerator: 'CmdOrCtrl+O',
                click() {
                    action.openProject();
                }
            },
            {
                label: '刷新',
                accelerator: 'CmdOrCtrl+R',
                role: 'reload'
            }
        ]
    },
    {
        label: '编辑',
        submenu: [
            {
                label: '撤销',
                accelerator: 'CmdOrCtrl+Z',
                role: 'undo'
            },
            {
                label: '重做',
                accelerator: 'Shift+CmdOrCtrl+Z',
                role: 'redo'
            },
            {
                type: 'separator'
            },
            {
                label: '剪切',
                accelerator: 'CmdOrCtrl+X',
                role: 'cut'
            },
            {
                label: '复制',
                accelerator: 'CmdOrCtrl+C',
                role: 'copy'
            },
            {
                label: '粘贴',
                accelerator: 'CmdOrCtrl+V',
                role: 'paste'
            },
            {
                label: '全选',
                accelerator: 'CmdOrCtrl+A',
                role: 'selectall'
            }
        ]
    },
    {
        label: '运行',
        submenu: [
            {
                label: 'Run 开发流程',
                accelerator: 'CmdOrCtrl+1',
                click() {
                    action.runTask('dev');
                }
            },
            {
                label: 'Ftp 发布部署',
                accelerator: 'CmdOrCtrl+3',
                click() {
                    action.runTask('upload');
                }
            },
            {
                label: 'Pack 项目打包',
                accelerator: 'CmdOrCtrl+4',
                click() {
                    action.runTask('pack');
                }
            }
        ]
    },
    {
        label: '项目',
        submenu: [
            {
                label: '删除当前项目',
                accelerator: 'CmdOrCtrl+shift+D',
                click() {
                    action.delProject();
                }
            }
        ]
    },
    {
        label: '窗口',
        role: 'window',
        submenu: [
            {
                label: '最小化',
                accelerator: 'CmdOrCtrl+M',
                role: 'minimize'
            },
            {
                label: '关闭窗口',
                accelerator: 'CmdOrCtrl+W',
                role: 'close'
            },
            {
                label: '调试模式',
                accelerator: 'Option+CmdOrCtrl+I',
                role: 'toggledevtools'
            }
        ]
    },
    {
        label: '帮助',
        role: 'help',
        submenu: [
            {
                label: 'FhFlow 官网',
                click() {
                    action.openExternal('home');
                }
            },
            {
                label: 'FhFlow 使用帮助',
                click() {
                    action.openExternal('help');
                }
            },
            {
                label: '报告问题',
                click() {
                    action.openExternal('problem');
                }
            }
        ]
    }
];

if (process.platform === 'darwin') {
    const name = app.getName();
    template.unshift({
        label: name,
        submenu: [
            {
                label: '关于 FhFlow',
                click() {
                    action.openExternal('about');
                }
            },
            {
                type: 'separator'
            },
            {
                label: '检查更新…',
                accelerator: '',
                click() {
                    action.checkUpdate();
                }
            },
            {
                type: 'separator'
            },
            {
                label: 'Services',
                role: 'services'
            },
            {
                type: 'separator'
            },
            {
                label: `隐藏 ${name}`,
                accelerator: 'Command+H',
                role: 'hide'
            },
            {
                label: '隐藏其他应用',
                accelerator: 'Command+Alt+H',
                role: 'hideothers'
            },
            {
                label: '显示全部',
                role: 'unhide'
            },
            {
                type: 'separator'
            },
            {
                label: '退出',
                accelerator: 'Command+Q',
                role: 'quit'
            }
        ]
    });
} else if (process.platform === 'win32') {
    // const helpItem = template[template.length - 1];

    // helpItem.submenu.push({
    //     label: '检查更新',
    //     accelerator: '',
    //     click() {
    //         action.checkUpdate();
    //     }
    // });

    // helpItem.submenu.push({
    //     label: '关于',
    //     click() {
    //         action.openExternal('about');
    //     }
    // });
}

const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);
