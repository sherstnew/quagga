import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld(
  'electron',
  {
    openFile: (fileLink: string) => ipcRenderer.send('openfile', fileLink),
    onSendUID: (callback: Function) => ipcRenderer.on('send-uid', (_event, value) => callback(value))
  }
)