const { ipcMain } = require("electron")
const { ProductModel } = require("../db.config")

module.exports = function () {
  // product
  ipcMain.handle('getProducts', async () => {
    const products = await ProductModel.findAll({ raw: true })
    return products
  })
}
