"use strict";
exports.__esModule = true;
var electron_1 = require("electron");
electron_1.contextBridge.exposeInMainWorld('electron', {
    openFile: function (fileLink) { return electron_1.ipcRenderer.send('openfile', fileLink); },
    onSendUID: function (callback) { return electron_1.ipcRenderer.on('send-uid', function (_event, value) { return callback(value); }); }
});
