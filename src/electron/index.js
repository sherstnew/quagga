const { app, BrowserWindow, screen, ipcMain, shell } = require("electron");
const path = require('node:path')

function createWindow() {
  const width = screen.getPrimaryDisplay().size.width;
  const height = screen.getPrimaryDisplay().size.height;

  const win = new BrowserWindow({
    width: width / 6,
    height: height / 2.5,
    resizable: false,
    movable: false,
    alwaysOnTop: true,
    transparent: true,
    frame: false,
    roundedCorners: true,
    x: width - width / 6,
    y: height / 3 - 75,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  });
  
  win.loadURL("http://localhost:3000/");
}

app.whenReady().then(() => {
  createWindow();
});


app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

ipcMain.on('openfile', (event, link) => {
  shell.openExternal(link);
})