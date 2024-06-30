"use strict";
exports.__esModule = true;
exports.RFIDhandler = void 0;
var serialport_1 = require("serialport");
function RFIDhandler(window) {
    serialport_1.SerialPort.list()
        .then(function (ports) {
        ports.forEach(function (port) {
            if (port.productId === "0043" || port.productId === "7523") {
                var serial = new serialport_1.SerialPort({ path: port.path, baudRate: 9600 });
                var parser = serial.pipe(new serialport_1.DelimiterParser({ delimiter: '\n' }));
                parser.on('data', function (data) {
                    var controllerData = data.toString();
                    if (controllerData.split(':')[0] === "UID") {
                        var uid = controllerData.split(':')[1];
                        window.webContents.send('send-uid', uid);
                    }
                });
            }
        });
    });
}
exports.RFIDhandler = RFIDhandler;
