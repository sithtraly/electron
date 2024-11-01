const { ipcMain, ipcRenderer, Menu } = require('electron')
const { app, BrowserWindow } = require('electron/main')
const path = require('path')

let win
const createWindow = () => {
  win = new BrowserWindow({
    width: 1280,
    height: 720,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      preload: path.join(__dirname, 'preload.js')
    }
  })
  win.loadFile('index.html')

  const loadFile = (file) => {
    win.loadFile(path.join(__dirname, 'src', 'pages', file + '.html'))
  }

  const menuTemplate = [
    {
      label: 'File',
      submenu: [
        { label: 'Exit', click: () => app.quit() }
      ]
    },
    {
      label: 'Contact', submenu: [
        { label: "Contact", click: () => loadFile('contact/contact') }
      ]
    },
    {
      label: 'Help',
      submenu: [
        { label: 'About', click: () => loadFile('about/about') }
      ]
    },
  ]

  const menu = Menu.buildFromTemplate(menuTemplate)
  Menu.setApplicationMenu(menu)
}

app.whenReady().then(() => {
  createWindow()
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length == 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

ipcMain.on('changeTo', (e, v) => {
  win.loadFile(path.join(__dirname, 'src', 'pages', v + '.html'))
})
