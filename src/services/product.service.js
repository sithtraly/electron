const { ipcMain } = require("electron")
const { ProductModel } = require("../db.config")
const { Op } = require("sequelize")

module.exports = function () {
  ipcMain.handle('getProducts', async (_, search) => {
    let findOption = {}
    if (search) {
      findOption = { name: { [Op.like]: `%${search}%` } }
    }
    const products = await ProductModel.findAll({ where: findOption, raw: true })
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
