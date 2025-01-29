const { ipcMain, app } = require("electron")
const { SettingModel } = require("../db.config")

module.exports = function () {
  ipcMain.handle('setting', async (_, key, value) => {
    if (key && value) {
      const setting = await SettingModel.findOne({ where: { key }, raw: true })
      if (setting) await SettingModel.update({ value }, { where: { key } })
      return setting
    } else if (key) {
      const setting = await SettingModel.findOne({ where: { key }, raw: true })
      return setting
    } else { return }
  })

  ipcMain.handle('version', () => {
    return app.getVersion()
  })
}