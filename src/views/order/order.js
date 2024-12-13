const pages = require("../../constants/page.constant")
const { OrderModel, CustomerModel, ProductModel } = require('../../db.config')
const { DateUtil } = require("../libs/date.utils")

$(document).ready(async function () {
  const orders = await OrderModel.findAll({
    attributes: ['id', 'qty', 'price', 'createdAt'],
    include: [
      { model: CustomerModel, attributes: ['name'] },
      { model: ProductModel, attributes: ['name'] },
    ],
    where: { isPrinted: false },
    raw: true
  })
  if (orders.length > 0) {
    orders.map((order) => {
      order.customer = order['tb_customer.name']
      order.product = order['tb_product.name']
    })
    $('#tbl-body').text('')
    for (const [i, order] of orders.entries()) {
      const createdAt = DateUtil.datetime2stdDatetime(order.createdAt)
      const row = `<tr id="order-${order.id}" >
        <td>${order.id}</td>
        <td>${order.customer}</td>
        <td>${order.product}</td>
        <td>${order.qty.toLocaleString()}</td>
        <td>${order.price.toLocaleString()}</td>
        <td>${createdAt}</td>
      </tr>`
      $('#tbl-body').append(row)
    }
  }
})

$('#bt-new').click(function () {
  ipcRenderer.send('goto', pages.orderNew)
})
