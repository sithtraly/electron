const { ipcMain } = require("electron")
const { CustomerModel } = require("../db.config")
const { Op } = require("sequelize")

module.exports = function () {
  ipcMain.handle('getCustomer', async (_, obj = {}) => {
    const { limit = 50, offset = 0, search, from, to } = obj
    let findOption = {}
    if (search) {
      findOption = {
        [Op.or]: {
          name: { [Op.like]: `%${search}%` },
          // address: { [Op.like]: `%${search}%` },
          phone: { [Op.like]: `%${search}%` },
          // code: { [Op.like]: `%${search}%` },
          id: !isNaN(search) ? parseInt(search) : 'NOT NULL',
          customerCode: !isNaN(search) ? parseInt(search) : 'NOT NULL',
        }
      }
    }
    if (from && to) {
      findOption.createdAt = { [Op.and]: { [Op.gte]: from, [Op.lte]: to } }
    } else if (from) {
      findOption.createdAt = { [Op.gte]: from }
    } else if (to) {
      findOption.createdAt = { [Op.lte]: to }
    }
    const customer = await CustomerModel.findAll({ where: findOption, raw: true, limit, offset: offset * limit })
    const count = await CustomerModel.count({ where: findOption, raw: true })
    return { data: customer, total: count }
  })

  ipcMain.handle('getCustomerById', async (_, id) => {
    const customer = await CustomerModel.findByPk(id, { raw: true })
    return customer
  })

  ipcMain.handle('getCustomerByCode', async (_, code) => {
    const customer = await CustomerModel.findOne({ where: { customerCode: code }, raw: true })
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
