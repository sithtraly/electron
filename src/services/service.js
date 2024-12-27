const customerService = require("./customer.service");
const dialogService = require("./dialog.service");
const orderService = require("./order.service");
const pdfService = require("./pdf.service");
const productService = require("./product.service");

module.exports = function () {
  dialogService()
  customerService()
  productService()
  orderService()
  pdfService()
}