import { SerialPort, DelimiterParser } from 'serialport';
import { BrowserWindow } from 'electron';

export function RFIDhandler(window: BrowserWindow) {
  SerialPort.list()
  .then((ports) => {
    ports.forEach((port) => {
      if (port.productId === "0043" || port.productId === "7523") {
        const serial = new SerialPort({path: port.path, baudRate: 9600});
        const parser = serial.pipe(new DelimiterParser({ delimiter: '\n' }));
        parser.on('data', function (data: Buffer) {
          const controllerData = data.toString();
          if (controllerData.split(':')[0] === "UID") {
            const uid = controllerData.split(':')[1].trim();
            window.webContents.send('send-uid', uid);
          }
        })
      }
    })
  })
}