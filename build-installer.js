const { MSICreator } = require('electron-wix-msi')
const path = require('path')
const package = require('./package.json')

const appDir = path.resolve(path.join(__dirname, 'out', 'Tela Khmer-win32-x64'))
const outDir = path.resolve(path.join(__dirname, 'dist'))

const msiCreator = new MSICreator({
  appDirectory: appDir,
  outputDirectory: outDir,
  // exe: 'Setup-' + package.version + '.exe',
  exe: 'Tela Khmer',
  name: 'Tela Khmer',
  version: package.version,
  manufacturer: "Traly",

  ui: {
    chooseDirectory: true,
  },

  appIconPath: path.resolve(path.join(__dirname, 'src', 'favicon.ico'))
})

async function createMSI() {
  await msiCreator.create()
  await msiCreator.compile()

  console.log('MSI Installer created successfully!')
}
createMSI()