const { ipcMain } = require("electron");
const { sequelize } = require("../db.config");
const exceljs = require('exceljs')

module.exports = function () {
  ipcMain.handle('getReports', async (_, obj = {}) => {
    const { search, from, to, limit = 50, offset = 0 } = obj
    const condition = `FROM tb_order o
      LEFT JOIN tb_customer c ON o.customerId = c.id
      LEFT JOIN tb_product p ON o.productId = p.id
      WHERE o.isPrinted = TRUE
      ${from ? `AND DATE(o.createdAt) >= '${from}'` : ''}
      ${to ? `AND DATE(o.createdAt) <= '${to}'` : ''}
      ${search ? `AND (c.id = '${search}' OR c.name LIKE '%${search}%' OR c.phone LIKE '%${search}%' OR c.code LIKE '%${search}%'
        OR o.transportNo LIKE '%${search}%' OR o.stockNo LIKE '%${search}%' OR o.carNo LIKE '%${search}%' OR c.address LIKE '%${search}%')` : ''}`
    const reports = await sequelize.query(`
      SELECT o.id, c.name customer, o.qty, o.price, o.isPrinted, c.id customerId, c.address, c.phone,
      p.id productId, p.name product, o.carNo, c.code, o.createdAt
      ${condition}
      LIMIT ${limit} OFFSET ${offset * limit}
    `.replaceAll(/\s+/g, ' '), { type: 'SELECT' })
    const count = await sequelize.query(`SELECT COUNT(o.id) count ${condition}`.replaceAll(/\s+/g, ' '), { type: 'SELECT' })
    return { data: reports, total: count[0].count }
  })

  ipcMain.handle('saveReport2Excel', async (_, data) => {
    const { headerRow, rows, name } = data
    const wb = new exceljs.Workbook()
    const ws = wb.addWorksheet('Sheet1')
    ws.addRow(headerRow)
    rows.map(row => {
      ws.addRow(row)
    })
    await wb.xlsx.writeFile(name)
    return name
  })
}