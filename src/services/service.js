const customerService = require("./customer.service");
const dialogService = require("./dialog.service");
const orderService = require("./order.service");
const productService = require("./product.service");

module.exports = function () {
  dialogService()
  customerService()
  productService()
  orderService()

}