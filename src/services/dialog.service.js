const { ipcMain, dialog, app } = require("electron")
const { join } = require('path')

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

  ipcMain.handle('browseFile', (event, options) => {
    return dialog.showOpenDialog(undefined, {
      title: options.title || 'Browse file',
      buttonLabel: options.buttonLabel || 'Open',
      properties: ['openFile'],
      filters: [
        { name: 'Sqlite Files', extensions: ['sqlite'] },
        { name: 'All Files', extensions: ['*'] },
      ],
      defaultPath: options.defaultPath || undefined
    })
  })

  ipcMain.handle('saveFile', (_, options) => {
    return dialog.showSaveDialog(undefined, {
      title: options.title || 'Save file',
      defaultPath: join(options.defaultPath || app.getPath('downloads'), options.name || 'untitle'),
      buttonLabel: options.buttonLabel || 'Save',
    })
  })

  ipcMain.handle('browseFolder', (_, defaultPath = app.getPath('downloads'), options = {}) => {
    return dialog.showOpenDialog(undefined, {
      title: options.title || 'Browse file',
      buttonLabel: options.buttonLabel || 'Select folder',
      properties: ['openDirectory'],
      defaultPath: defaultPath,
    })
  })
}