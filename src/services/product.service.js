const { ipcMain } = require("electron")
const { ProductModel } = require("../db.config")
const { Op } = require("sequelize")

module.exports = function () {
  ipcMain.handle('getProducts', async (_, obj = {}) => {
    const { search, from, to, offset = 0, limit = 50 } = obj
    let findOption = {}
    if (search) {
      findOption = {
        [Op.or]: {
          name: { [Op.like]: `%${search}%` },
          id: search,
        }
      }
    }
    const products = await ProductModel.findAll({ where: findOption, raw: true, limit, offset })
    return products
  })

  ipcMain.handle('getProductById', async (_, id) => {
    const product = await ProductModel.findByPk(id, { raw: true })
    return product
  })

  ipcMain.handle('getProductByCode', async (_, code) => {
    const product = await ProductModel.findOne({ where: { code }, raw: true })
    return product
  })

  ipcMain.handle('newProduct', async (_, data) => {
    try {
      const product = await ProductModel.create(data)
      return product
    } catch (e) {
      console.error(e)
    }
  })

  ipcMain.handle('editProduct', async (_, data) => {
    const { id, ...d } = data
    const product = await ProductModel.update(d, { where: { id } })
    return product
  })
}
