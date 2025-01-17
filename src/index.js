const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('node:path');
const started = require('electron-squirrel-startup');
const { connectdb, sequelize, dbPath, configPath, SettingModel } = require('./db.config');
const service = require('./services/service');
const { writeFileSync } = require('node:fs');
const autoUpdate = require('./auto.update');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (started) {
  app.quit();
}

var mainWindow
var splashWindow
var mainWindow
const iconPath = path.join(__dirname, 'favicon.ico')

async function createMainWindow() {
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
    title: 'តេលាខ្មែរ',
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'app.html'));
  // Open the DevTools.
  // mainWindow.webContents.openDevTools();
  mainWindow.maximize()
  mainWindow.removeMenu()
  // Menu.setApplicationMenu(customMenu)

  autoUpdate()
};

async function createSplashWindow() {
  // Create the browser window.
  splashWindow = new BrowserWindow({
    width: 1024,
    height: 720,
    modal: true,
    icon: iconPath,
    title: 'តេលាខ្មែរ'
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

ipcMain.once('restart', () => {
  app.relaunch()
  app.quit()
})

ipcMain.handle('changeDbPath', (_, value) => {
  writeFileSync(configPath, value)
  return true
})

ipcMain.handle('getDbPath', () => dbPath)

ipcMain.handle('minimize', () => mainWindow.minimize())
ipcMain.handle('maximize', () => mainWindow.isMaximized() ? mainWindow.unmaximize() : mainWindow.maximize())
ipcMain.handle('close', () => mainWindow.close())

service()

ipcMain.on('open-file', (event, file) => {
  mainWindow.loadFile(path.join(__dirname, 'views', file))
})
