const { ipcMain, app } = require("electron")
const { SettingModel } = require("../db.config")

module.exports = function () {
  const settings = {}

  ipcMain.handle('setting', async (_, key, value) => {
    if (value) {
      settings[key] = value
      const setting = await SettingModel.findOne({ where: { key }, raw: true })
      if (setting) {
        setting.value = value
        await SettingModel.update({ value }, { where: { key } })
        return setting
      } else {
        const setting = await SettingModel.create({ key, value })
        return setting
      }
    } else {
      if (settings[key]) return { key, value: settings[key] }
      const setting = await SettingModel.findOne({ where: { key }, raw: true })
      if (setting == null) {
        const newSetting = await SettingModel.create({ key, value: 0 })
        settings[key] = newSetting.value
      } else {
        settings[key] = setting.value
      }
      const returnSetting = {}
      returnSetting['key'] = Object.keys(settings).filter(k => k == key)[0]
      returnSetting['value'] = settings[key]
      return returnSetting
    }
  })
}