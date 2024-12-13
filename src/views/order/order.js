const pages = require("../../constants/page.constant")
const { OrderModel, CustomerModel, ProductModel } = require('../../db.config')
const { DateUtil } = require("../libs/date.utils")

$(document).ready(async function () {
  const orders = await OrderModel.findAll({
    attributes: ['id', 'qty', 'price', 'createdAt'],
    include: [
      { model: CustomerModel, attributes: ['id', 'name'] },
      { model: ProductModel, attributes: ['id', 'name'] },
    ],
    where: { isPrinted: false },
    raw: true
  })
  if (orders.length > 0) {
    orders.map((order) => {
      order.customerId = order['tb_customer.id']
      order.customer = order['tb_customer.name']
      order.productId = order['tb_product.id']
      order.product = order['tb_product.name']

      delete order['tb_customer.id']
      delete order['tb_customer.name']
      delete order['tb_product.id']
      delete order['tb_product.name']
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
        <td class="text-center">
          <button>ព្រីន ⎙</button>
        </td>
      </tr>`
      $('#tbl-body').append(row)
      $('#order-' + order.id).dblclick(function () {
        editOrder(order)
      })
    }
  }
})

$('#bt-new').click(function () {
  ipcRenderer.send('goto', pages.orderNew)
})

function editOrder(order) {
  ipcRenderer.send('goto', { file: pages.orderNew, ...order })
}
