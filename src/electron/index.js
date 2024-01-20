const { app, BrowserWindow, screen } = require("electron");

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
  });
  
  win.loadURL("http://localhost:3000/");
};

app.whenReady().then(() => {
  createWindow()
})

