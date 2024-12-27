const { ipcMain, BrowserWindow, shell } = require("electron")
const { writeFileSync } = require("original-fs")

module.exports = function () {
  ipcMain.handle('html2pdf', (e, options) => {
    return new Promise((resolve, reject) => {
      const win = BrowserWindow.getFocusedWindow()
      win.webContents.printToPDF({
        marginsType: 0,
        pageSize: 'A4',
        printBackground: true,
        printSelectionOnly: false,
        landscape: false,
      }).then(data => {
        try {
          writeFileSync(options.pdfName, data)
          console.log(options.pdfName)
          resolve(options.pdfName)
        } catch (err) {
          console.error(err)
          reject(err)
        }
      })
    })
  })

  ipcMain.handle('openItemInFolder', (_, item) => {
    shell.showItemInFolder(item)
  })
}