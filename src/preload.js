// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

const { ipcRenderer, contextBridge } = require("electron");

contextBridge.exposeInMainWorld('dialog', {
  success: (message) => ipcRenderer.invoke('success', message)
})

contextBridge.exposeInMainWorld('api', {
  getCustomer: () => ipcRenderer.invoke('getCustomer'),
  newCustomer: (data) => ipcRenderer.invoke('newCustomer', data),
  updateCustomer: (data) => ipcRenderer.invoke('updateCustomer', data),
  getProducts: (data) => ipcRenderer.invoke('getProducts', data),
})
