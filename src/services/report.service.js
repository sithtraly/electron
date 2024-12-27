const { ipcMain } = require("electron");
const { sequelize } = require("../db.config");

module.exports = function () {
  ipcMain.handle('getReports', async (_, obj = {}) => {
    const { search, from, to, limit = 50, offset = 0 } = obj
    const reports = await sequelize.query(`
SELECT o.id, o.qty, o.price, o.isPaid, o.isPrinted, c.id customerId, c.name customer, c.address, c.phone, \
p.id productId, p.name product, o.carNo, o.stockNo, o.transportNo, c.code \
FROM tb_order o \
LEFT JOIN tb_customer c ON o.customerId = c.id \
LEFT JOIN tb_product p ON o.productId = p.id \
WHERE o.isPrinted = TRUE \
LIMIT ${limit} OFFSET ${offset * limit}
    `, { type: 'SELECT' })
    return reports
  })
}