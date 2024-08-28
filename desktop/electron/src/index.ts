import * as path from 'path';
import { app, BrowserWindow, screen, ipcMain, shell, Tray, nativeImage } from "electron";
import { RFIDhandler } from './RFIDhandler';

function createWindow() {
  const width = screen.getPrimaryDisplay().size.width;
  const height = screen.getPrimaryDisplay().size.height;

  const window = new BrowserWindow({
    width: width / 6,
    height: height / 2 + 100,
    resizable: false,
    movable: false,
    alwaysOnTop: true,
    transparent: true,
    frame: false,
    roundedCorners: true,
    skipTaskbar: true,
    x: width - width / 6,
    y: height - height / 2 - 150,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    },
    icon: path.join(__dirname, 'static/quagga.ico')
  });

  window.loadURL(`http://localhost:9000/`);
  // window.loadURL(`file://${path.join(__dirname, 'dist/index.html')}`);

  RFIDhandler(window);

  const icon = nativeImage.createFromPath(path.join(__dirname, '/static/quagga.ico'));
  const tray = new Tray(icon);
  tray.setToolTip('Quagga');

  tray.on("click", () => {
    if (window.isVisible()) {
      window.hide();
    } else {
      window.show();
    }
  })

  ipcMain.on('openfile', (event, link) => {
    shell.openExternal(link);
  })

  // window.webContents.openDevTools();

}

app.whenReady().then(() => {
  createWindow();
  console.log(`Window created: ${path.join(__dirname, 'dist/index.html')}`);
});


app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})