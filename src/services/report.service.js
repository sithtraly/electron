const { ipcMain } = require("electron");
const { sequelize } = require("../db.config");
const exceljs = require('exceljs')

module.exports = function () {
  ipcMain.handle('getReports', async (_, obj = {}) => {
    const { search, from, to } = obj
    const condition = `FROM tb_order o
      LEFT JOIN tb_customer c ON o.customerId = c.id
      LEFT JOIN tb_product p ON o.productId = p.id
      WHERE o.isPrinted = TRUE
      ${from ? `AND DATE(o.createdAt) >= '${from}'` : ''}
      ${to ? `AND DATE(o.createdAt) <= '${to}'` : ''}
      ${search ? `AND (c.id = '${search}' OR c.name LIKE '%${search}%' OR o.code LIKE '%${search}%'
        OR o.transportNo LIKE '%${search}%' OR o.stockNo LIKE '%${search}%' OR o.carNo LIKE '%${search}%' OR o.address LIKE '%${search}%')` : ''}`
    const reports = await sequelize.query(`
      SELECT o.id, c.name customer, c.customercode,  o.qty, o.price, o.qty, o.price, p.dividend, o.isPrinted, c.id customerId, o.address,
      p.id productId, p.name product, o.carNo, o.code, o.createdAt, o.invNumber, o.phone
      ${condition}
      ORDER BY o.createdAt DESC
    `.replaceAll(/\s+/g, ' '), { type: 'SELECT' })
    const count = await sequelize.query(`SELECT COUNT(o.id) count ${condition}`.replaceAll(/\s+/g, ' '), { type: 'SELECT' })
    reports.map(r => r.total = r.price * r.qty / r.dividend)
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