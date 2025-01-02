const { ipcMain, BrowserWindow, shell } = require("electron")
const { writeFileSync } = require("original-fs")
const path = require("path")

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
    const exec = require('child_process').exec
    const normalizedPath = path.resolve(item)
    const checkCommand = `powershell.exe Get-Process | Where-Object {$_.MainWindowTitle -like "*${path.basename(normalizedPath)}*"}`;
    exec(checkCommand, (error, stdout, stderr) => {
      if (stdout.trim()) {
        // Folder is already open, focus the window
        const focusCommand = `powershell.exe (Get-Process | Where-Object {$_.MainWindowTitle -like "*${path.basename(normalizedPath)}*"}).MainWindowHandle | ForEach-Object { [void][Windows.Interop.User32]::SetForegroundWindow($_) }`;
        return exec(focusCommand);
      }
    })

    shell.showItemInFolder(item)
  })
}