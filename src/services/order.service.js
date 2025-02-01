const { ipcMain, BrowserWindow } = require("electron");
const { OrderModel, CustomerModel, ProductModel, sequelize } = require("../db.config");

module.exports = function () {
  ipcMain.handle('getOrder', async (_, obj = {}) => {
    const { search, from, to } = obj
    const condition = `
      FROM tb_order o
      LEFT JOIN tb_customer c ON o.customerId = c.id
      LEFT JOIN tb_product p ON o.productId = p.id
      WHERE o.isPrinted = FALSE
      ${from ? `AND DATE(o.createdAt) >= '${from}'` : ''} ${to ? `AND DATE(o.createdAt) <= '${to}'` : ''}
      ${search ? `AND (c.name LIKE '%${search}%' OR o.carNo LIKE '%${search}%' OR o.code LIKE '%${search}%' 
         OR o.address LIKE '%${search}%')` : ''}`
    const orders = await sequelize.query(`
      SELECT o.id, o.qty, o.price, o.isPrinted, c.id customerId, c.name customer, o.code, o.address,
      p.id productId, p.name product, o.carNo, o.createdAt, o.invNumber, o.phone
      ${condition}
      ORDER BY o.createdAt DESC 
      `.replaceAll(/\s+/g, ' '), { type: 'SELECT' })

    const count = await sequelize.query(`
      SELECT COUNT(o.id) count
      ${condition}
      `.replaceAll(/\s+/g, ' '), { type: 'SELECT' })

    return { data: orders, total: count[0].count }
  })

  ipcMain.handle('newOrder', async (_, data) => {
    if (!Array.isArray(data)) data = [data]
    const order = await OrderModel.bulkCreate(data)
    return order
  })

  ipcMain.handle('editOrder', async (_, data) => {
    data.forEach(async d => {
      const { id, ...order } = d
      await OrderModel.update(order, { where: { id } })
    })
    return true
  })

  ipcMain.handle('removeOrder', async (_, orderCode) => {
    await OrderModel.destroy({ where: { code: orderCode } })
    return true
  })
}
