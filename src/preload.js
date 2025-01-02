const { ipcRenderer, contextBridge } = require("electron");

contextBridge.exposeInMainWorld('application', {
  restart: () => ipcRenderer.send('restart')
})

contextBridge.exposeInMainWorld('dialog', {
  success: (message) => ipcRenderer.invoke('success', message),
  error: (message) => ipcRenderer.invoke('error', message),
  question: (message) => ipcRenderer.invoke('question', message),
  warning: (message) => ipcRenderer.invoke('warning', message),
  browseFile: (options = {}) => ipcRenderer.invoke('browseFile', options),
  saveFile: (options = {}) => ipcRenderer.invoke('saveFile', options),
})

contextBridge.exposeInMainWorld('api', {
  html2pdf: (options) => ipcRenderer.invoke('html2pdf', options),
  openItemInFolder: (item) => ipcRenderer.invoke('openItemInFolder', item),
  changeDbPath: (value) => ipcRenderer.invoke('changeDbPath', value),
  getDbPath: () => ipcRenderer.invoke('getDbPath'),

  // customer
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

  invoke: (action, ...args) => ipcRenderer.invoke(action, ...args)
})
