const customerService = require("./customer.service");
const dialogService = require("./dialog.service");
const invoiceService = require("./invoice.service");
const orderService = require("./order.service");
const pdfService = require("./pdf.service");
const printService = require("./print.service");
const productService = require("./product.service");
const reportService = require("./report.service");
const settingService = require("./setting.service");

module.exports = function () {
  dialogService()
  customerService()
  productService()
  orderService()
  pdfService()
  printService()
  invoiceService()
  reportService()
  settingService()
}