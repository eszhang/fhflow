
/**
 *  electron app
 *  暴露全局对象mainWindow
 */

const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');

let mainWindow;
let willClose;


const logo = path.join(__dirname, './logo.ico');

function createMainWindow() {
    mainWindow = new BrowserWindow({
        title: '烽火前端开发环境集成工具',
        width: 992,
        minHeight: 545,
        resizable: false,
        icon: logo
    });

    global.mainWindow = mainWindow;

    if (process.env.NODE_ENV === 'development') {
        mainWindow.loadURL('http:127.0.0.1:8080');
        mainWindow.webContents.openDevTools();
    } else {
        mainWindow.loadURL(url.format({
            pathname: path.join(__dirname, '../app/index.html'),
            protocol: 'file',
            slashes: true
        }));
    }

    mainWindow.on('close', (event) => {
        if (process.platform !== 'win32' && !willClose) {
            app.hide();
            event.preventDefault();
        }
    });

    mainWindow.on('closed', () => {
        mainWindow = null;
    });

    /* eslint-disable */
    require('./menu');
    /* eslint-enable */
}

app.on('ready', createMainWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('before-quit', () => {
    willClose = true;
});

app.on('activate', () => {
    if (mainWindow === null) {
        createMainWindow();
    }

    app.show();
});
