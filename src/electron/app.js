
/*
 *  electron app
 */

const { electron, app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url')

require("./menu");

let mainWindow,
    willClose,
    logo;


logo = path.join(__dirname, 'assets/img/WeFlow.png');

function createMainWindow() {
    // Create the browser window.
    mainWindow = new BrowserWindow({
        title: 'Fhflow前端集成开发环境',
        width: 982,
        minHeight: 545,
        resizable: false
        // icon: logo
    });

    // and load the index.html of the app.
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

    //Open the DevTools.
    mainWindow.webContents.openDevTools();


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