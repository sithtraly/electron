const customerService = require("./customer.service");
const dialogService = require("./dialog.service");
const productService = require("./product.service");

module.exports = function () {
  dialogService()
  customerService()
  productService()
}