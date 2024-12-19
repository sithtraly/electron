const { ipcMain } = require("electron")
const { ProductModel } = require("../db.config")
const { Op } = require("sequelize")

module.exports = function () {
  ipcMain.handle('getProducts', async (_, obj = {}) => {
    const {search, from, to, offset = 0, limit = 50} = obj
    let findOption = {}
    if (search) {
      findOption = { name: { [Op.like]: `%${search}%` } }
    }
    const products = await ProductModel.findAll({ where: findOption, raw: true, limit, offset })
    return products
  })

  ipcMain.handle('newProduct', async (_, data) => {
    const product = await ProductModel.create(data)
    return product
  })

  ipcMain.handle('editProduct', async (_, data) => {
    const { id, ...d } = data
    const product = await ProductModel.update(d, { where: { id } })
    return product
  })
}
