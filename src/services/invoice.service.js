const { ipcMain } = require("electron")
const { sequelize, OrderModel } = require("../db.config")
const { Op } = require("sequelize")

module.exports = function () {
  ipcMain.handle('getInvoice', async (_, obj = {}) => {
    const { search, from, to, limit = 50, offset = 0 } = obj
    const orders = await sequelize.query(`
      SELECT o.id, o.qty, o.price, p.dividend, o.isPrinted, c.id customerId, c.name customer, o.address,
      p.id productId, p.name product, o.carNo, o.code, o.phone, c.customerCode
      FROM tb_order o
      LEFT JOIN tb_customer c ON o.customerId = c.id
      LEFT JOIN tb_product p ON o.productId = p.id
      WHERE o.id IN (${obj.ids.join(',')})
      LIMIT ${limit} OFFSET ${offset * limit}
      `.replaceAll(/\s+/g, ' '), { type: 'SELECT' })
    orders.map(o => o.total = o.price * o.qty / o.dividend)
    return orders
  })

  ipcMain.handle('getCustomerInvoice', async (_, orderNos) => {
    const orders = await sequelize.query(`
      SELECT o.id, o.carNo, o.address, c.name customer, c.id customerId, o.createdAt orderDate, o.updatedAt deliveryDate,
      p.name product, p.id productId, o.qty, o.price, o.code, p.dividend, o.invNumber, o.phone, c.customerCode
      FROM tb_order o
      LEFT JOIN tb_customer c ON o.customerId = c.id
      LEFT JOIN tb_product p ON o.productId = p.id
      WHERE o.code IN ('${orderNos.join('\',\'')}');
    `.replaceAll(/\s+/g, ' '), { type: 'SELECT' })
    orders.map(o => o.total = o.price * o.qty / o.dividend)
    return orders
  })

  ipcMain.handle('printedInvoice', async (_, obj = {}) => {
    const { ids, invNumber } = obj
    const updated = await OrderModel.update({ isPrinted: true, invNumber }, { where: { id: { [Op.in]: ids } } })
    return updated
  })
}