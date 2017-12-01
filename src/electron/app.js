
/*
 *  electron app
 *  暴露全局对象mainWindow
 */

const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');

let mainWindow,
    willClose,
    logo;


logo = path.join(__dirname, 'assets/img/FhFlow.png');

function createMainWindow() {

    mainWindow = global.mainWindow =  new BrowserWindow({
        title: 'Fhflow前端集成开发环境',
        width: 982,
        minHeight: 545,
        resizable: false
        // icon: logo
    });

    mainWindow.loadURL('http:127.0.0.1:8080');

    mainWindow.on('close', function (event) {
        if (process.platform !== 'win32' && !willClose) {
            app.hide();
            event.preventDefault();
        }
    });

    mainWindow.on('closed', function () {
        mainWindow = null;
    });

    mainWindow.webContents.openDevTools();

    require("./menu");

};

app.on('ready', createMainWindow);

app.on('window-all-closed', function () {

    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('before-quit', function () {
    willClose = true;
});

app.on('activate', function () {

    if (mainWindow === null) {
        createWindow();
    }

    app.show();
})