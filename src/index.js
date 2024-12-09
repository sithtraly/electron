const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('node:path');
const started = require('electron-squirrel-startup');
const { connectdb } = require('./db.confog');
const pages = require('./constants/page.constant');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (started) {
  app.quit();
}
var mainWindow
const browsingHistory = []

const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    modal: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'views/index/index.html'));
  // mainWindow.removeMenu()
  // Open the DevTools.
  // mainWindow.webContents.openDevTools();

  connectdb()
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

ipcMain.on('goto', (e, v) => {
  let file = mainWindow.webContents.getURL()
  file = 'src/' + file.split('/src/')[1]
  browsingHistory.push(file)
  mainWindow.loadFile(v)
})

ipcMain.on('back', () => {
  if (browsingHistory.length > 0) {
    mainWindow.loadFile(browsingHistory[browsingHistory.length - 1])
    browsingHistory.pop()
  }
})

ipcMain.on('back-to-home', () => {
  browsingHistory.length = 0
  mainWindow.loadFile(pages.home)
})
