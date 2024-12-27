const { ipcMain, BrowserWindow } = require("electron");
const { OrderModel, CustomerModel, ProductModel, sequelize } = require("../db.config");

module.exports = function () {
  ipcMain.handle('getOrder', async (_, obj = {}) => {
    const { search, from, to, limit = 50, offset = 0 } = obj
    const orders = await sequelize.query(`
      SELECT o.id, o.qty, o.price, o.isPaid, o.isPrinted, c.id customerId, c.name customer,
      p.id productId, p.name product, o.carNo, o.stockNo, o.transportNo
      FROM tb_order o
      LEFT JOIN tb_customer c ON o.customerId = c.id
      LEFT JOIN tb_product p ON o.productId = p.id
      WHERE o.isPrinted = FALSE
      LIMIT ${limit} OFFSET ${offset * limit}
      `, { type: 'SELECT' })

    return orders
  })

  ipcMain.handle('newOrder', async (_, data) => {
    const order = await OrderModel.create(data)
    return order
  })

  ipcMain.handle('editOrder', async (_, data) => {
    const { id, ...order } = data
    const edited = await OrderModel.update(order, { where: { id } })
    return edited
  })
}
