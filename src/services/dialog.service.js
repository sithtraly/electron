const { ipcMain, dialog } = require("electron")

module.exports = function () {
  ipcMain.handle('success', (event, message) => {
    return dialog.showMessageBox(undefined, { message: message, type: 'info' })
  })
  ipcMain.handle('error', (event, message) => {
    return dialog.showMessageBox(undefined, { message: message, type: 'error' })
  })
  ipcMain.handle('question', (event, message) => {
    return dialog.showMessageBox(undefined, { message: message, type: 'question' })
  })
  ipcMain.handle('warning', (event, message) => {
    return dialog.showMessageBox(undefined, { message: message, type: 'warning' })
  })
}