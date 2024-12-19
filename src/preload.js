// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

const { ipcRenderer, contextBridge } = require("electron");

contextBridge.exposeInMainWorld('dialog', {
  success: (message) => ipcRenderer.invoke('success', message),
  error: (message) => ipcRenderer.invoke('error', message),
  question: (message) => ipcRenderer.invoke('question', message),
  warning: (message) => ipcRenderer.invoke('warning', message),
})

contextBridge.exposeInMainWorld('api', {
  // customer
  getCustomer: (searchObj) => ipcRenderer.invoke('getCustomer', searchObj),
  newCustomer: (data) => ipcRenderer.invoke('newCustomer', data),
  updateCustomer: (data) => ipcRenderer.invoke('updateCustomer', data),
  
  // product
  getProducts: (data) => ipcRenderer.invoke('getProducts', data),
  newProduct: (data) => ipcRenderer.invoke('newProduct', data),
  editProduct: (data) => ipcRenderer.invoke('editProduct', data),

  // order
  getOrder: (data) => ipcRenderer.invoke('getOrder', data),
  newOrder: (data) => ipcRenderer.invoke('newOrder', data),
  editOrder: (data) => ipcRenderer.invoke('editOrder', data),
})
