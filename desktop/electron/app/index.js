"use strict";
exports.__esModule = true;
var path = require("path");
var electron_1 = require("electron");
var RFIDhandler_1 = require("./RFIDhandler");
function createWindow() {
    var width = electron_1.screen.getPrimaryDisplay().size.width;
    var height = electron_1.screen.getPrimaryDisplay().size.height;
    var window = new electron_1.BrowserWindow({
        width: width / 6,
        height: height / 2,
        resizable: false,
        movable: false,
        alwaysOnTop: true,
        transparent: true,
        frame: false,
        roundedCorners: true,
        skipTaskbar: true,
        x: width - width / 6,
        y: height - height / 2 - 50,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        },
        icon: path.join(__dirname, 'static/quagga.ico')
    });
    window.loadURL("http://localhost:3000/");
    (0, RFIDhandler_1.RFIDhandler)(window);
    var icon = electron_1.nativeImage.createFromPath(path.join(__dirname, 'quagga.ico'));
    var tray = new electron_1.Tray(icon);
    tray.setToolTip('Quagga');
    tray.on("click", function () {
        if (window.isVisible()) {
            window.hide();
        }
        else {
            window.show();
        }
    });
    electron_1.ipcMain.on('openfile', function (event, link) {
        electron_1.shell.openExternal(link);
    });
}
electron_1.app.whenReady().then(function () {
    createWindow();
});
electron_1.app.on('window-all-closed', function () {
    if (process.platform !== 'darwin')
        electron_1.app.quit();
});
