const { ipcMain } = require("electron")
const { CustomerModel } = require("../db.config")
const { Op } = require("sequelize")

module.exports = function () {
  ipcMain.handle('getCustomer', async (_, obj) => {
    const { limit, offset, search, from, to } = obj
    let findOption = {}
    if (search) {
      findOption = {
        [Op.or]: {
          name: { [Op.like]: `%${search}%` },
          address: { [Op.like]: `%${search}%` },
          phone: { [Op.like]: `%${search}%` },
          code: { [Op.like]: `%${search}%` },
        }
      }
    }
    if (from && to) {
      Object.assign(findOption, {
        createdAt: {
          [Op.and]: { [Op.gte]: from, [Op.lte]: to }
        }
      })
    }
    const customer = await CustomerModel.findAll({ where: findOption, raw: true, limit: limit || 50, offset: offset || 0 })
    return customer
  })
  ipcMain.handle('newCustomer', async (e, data) => {
    const customer = await CustomerModel.create(data)
    return customer
  })
  ipcMain.handle('updateCustomer', async (e, data) => {
    const { id, ...d } = data
    const customer = await CustomerModel.update(d, { where: { id } })
    return customer
  })
}
