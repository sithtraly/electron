const { ipcMain } = require("electron")
const { sequelize, OrderModel } = require("../db.config")
const { Op } = require("sequelize")

module.exports = function () {
  ipcMain.handle('getInvoice', async (_, obj = {}) => {
    const { search, from, to, limit = 50, offset = 0 } = obj
    const orders = await sequelize.query(`
      SELECT o.id, o.qty, o.price, o.isPaid, o.isPrinted, c.id customerId, c.name customer, c.address, c.phone,
      p.id productId, p.name product, o.carNo, o.stockNo, o.transportNo, c.code
      FROM tb_order o
      LEFT JOIN tb_customer c ON o.customerId = c.id
      LEFT JOIN tb_product p ON o.productId = p.id
      WHERE o.id IN (${obj.ids.join(',')})
      LIMIT ${limit} OFFSET ${offset * limit}
      `, { type: 'SELECT' })

    return orders
  })

  ipcMain.handle('printedInvoice', async (_, obj = {}) => {
    const { ids } = obj
    const updated = await OrderModel.update({ isPrinted: true }, { where: { id: { [Op.in]: ids } } })
    return updated
  })
}