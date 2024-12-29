const { app, BrowserWindow, ipcMain, Menu } = require('electron');
const path = require('node:path');
const started = require('electron-squirrel-startup');
const { connectdb, sequelize, dbPath, configPath, SettingModel } = require('./db.config');
const pages = require('./constants/page.constant');
const { customMenu } = require('./menu');
const service = require('./services/service');
const { writeFileSync } = require('node:fs');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (started) {
  app.quit();
}
var splashWindow
var mainWindow
const browsingHistory = []
const iconPath = path.join(__dirname, 'favicon.ico')

const createMainWindow = async () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 720,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: true,
    },
    icon: iconPath,
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'app.html'));
  // Open the DevTools.
  // mainWindow.webContents.openDevTools();
  mainWindow.maximize()
  mainWindow.removeMenu()
  // Menu.setApplicationMenu(customMenu)
};

const createSplashWindow = async () => {
  // Create the browser window.
  splashWindow = new BrowserWindow({
    width: 1024,
    height: 720,
    modal: true,
    icon: iconPath,
  });

  splashWindow.removeMenu()
  splashWindow.loadFile(path.join(__dirname, 'splash.html'))

  await connectdb()
  await sequelize.sync({ alter: true })

  const settings = await SettingModel.findAll({ raw: true })
  if (settings.length < 1) {
    await SettingModel.create({ name: 'station', value: 'Tela Siemreap' })
  }
  splashWindow.close()
  createMainWindow()
}


// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createSplashWindow()

  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createSplashWindow()
      app.dock.setIcon(iconPath)
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
  if (typeof v != 'string') {
    const { file, ...query } = v
    mainWindow.loadFile(file, { query })
  } else {
    mainWindow.loadFile(v)
  }
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

ipcMain.once('restart', () => {
  app.relaunch()
  app.quit()
})

ipcMain.handle('changeDbPath', (_, value) => {
  writeFileSync(configPath, value)
  return true
})

ipcMain.handle('getDbPath', () => dbPath)

service()
