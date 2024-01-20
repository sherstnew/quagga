const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld(
  'electron',
  {
    openFile: (fileLink) => ipcRenderer.send('openfile', fileLink)
  }
)