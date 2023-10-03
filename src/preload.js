const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  saveStringValue: value => ipcRenderer.invoke('save-string', value),
  getStringValue: () => ipcRenderer.invoke('get-saved-string'),

})
