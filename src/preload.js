// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts


const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  openMainWin: () => ipcRenderer.send('open-main-window'),
  validateLogin: (usuario, password) => ipcRenderer.send('validateLogin', usuario, password),
  sendForm: (datos) => ipcRenderer.send('saveData', datos),
  openExcel: () => ipcRenderer.send('openExcel'),
  saveResult: (result) => ipcRenderer.on('saveResult', result),
  loginResult: (login) => ipcRenderer.on('loginResult', login)
})