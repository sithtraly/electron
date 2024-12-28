const { ipcMain, BrowserWindow } = require("electron");
const { OrderModel, CustomerModel, ProductModel, sequelize } = require("../db.config");

module.exports = function () {
  ipcMain.handle('getOrder', async (_, obj = {}) => {
    const { search, from, to, limit = 50, offset = 0 } = obj
    const condition = `
      FROM tb_order o
      LEFT JOIN tb_customer c ON o.customerId = c.id
      LEFT JOIN tb_product p ON o.productId = p.id
      WHERE o.isPrinted = FALSE
      ${from ? `AND DATE(o.createdAt) >= '${from}'` : ''} ${to ? `AND DATE(o.createdAt) <= '${to}'` : ''}
      ${search ? `AND (c.name LIKE '%${search}%' OR o.stockNo LIKE '%${search}%' OR o.carNo LIKE '%${search}%' OR o.transportNo LIKE '%${search}%' OR c.phone LIKE '%${search}%' OR c.code LIKE '%${search}%' OR o.currency = '%${search}%')` : ''}`
    const orders = await sequelize.query(`
      SELECT o.id, o.qty, o.price, o.isPaid, o.isPrinted, c.id customerId, c.name customer,
      p.id productId, p.name product, o.carNo, o.stockNo, o.transportNo, o.currency, o.createdAt
      ${condition}
      LIMIT ${limit} OFFSET ${offset * limit}
      `.replaceAll(/\s+/g, ' '), { type: 'SELECT' })

    const count = await sequelize.query(`
      SELECT COUNT(o.id) count
      ${condition}
      `.replaceAll(/\s+/g, ' '), { type: 'SELECT' })

    return { data: orders, total: count[0].count }
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
