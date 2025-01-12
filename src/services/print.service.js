const { ipcMain, BrowserWindow } = require("electron")

module.exports = function () {
  ipcMain.handle('print', (_, options = {}) => {
    return new Promise((resole, reject) => {
      const win = BrowserWindow.getFocusedWindow()
      win.webContents.print({
        silent: false,
        pageSize: 'A4',
        landscape: false,
        copies: options.copies || 1,
        printBackground: true,
        margins: {
          top: 0,
          bottom: 0
        }
      }, (success, error) => {
        if (success) resole(success)
        else reject(error)
      })
    })
  })
}