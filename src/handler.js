const { ipcMain } = require("electron")
const { CustomerModel, ProductModel } = require("./db.config")

module.exports = function () {
  // customer
  ipcMain.handle('getCustomer', async () => {
    const customer = await CustomerModel.findAll({ raw: true })
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

  // product
  ipcMain.handle('getProducts', async () => {
    const products = await ProductModel.findAll({ raw: true })
    return products
  })
}
