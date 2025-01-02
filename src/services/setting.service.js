const { ipcMain, app } = require("electron")
const { SettingModel } = require("../db.config")

module.exports = function () {
  const settings = {}

  ipcMain.handle('setting', async (_, key, value) => {
    if (value) {
      settings['key'] = value
      const setting = await SettingModel.findOne({ where: { key }, raw: true })
      if (setting) {
        setting.value = value
        await setting.save()
        return setting
      } else {
        const setting = await SettingModel.create({ key, value })
        return setting
      }
    } else {
      if (settings['key']) {
        return { key, value: settings['key'] }
      }
      const setting = await SettingModel.findOne({ where: { key }, raw: true })
      settings['key'] = setting.value || { key, value: app.getPath('downloads') }
      return setting || { key, value: settings['key'] }
    }
  })
}