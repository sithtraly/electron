const pages = require("../../constants/page.constant")
const { OrderModel, CustomerModel, ProductModel } = require('../../db.config')

$(document).ready(async function () {
  const orders = await OrderModel.findAll({
    attributes: ['id', 'qty', 'price', 'createdAt'],
    include: [
      { model: CustomerModel, attributes: ['name'] },
      { model: ProductModel, attributes: ['name'] },
    ],
    raw: true
  })
  console.log(orders)
  // if (orders != []) {
  //   $('#tbl-body').text('')
  //   for (const [i, order] of orders.entries()) {
  //     const row = `<tr id="order-${order.id}" >
  //       <td>${order.id}</td>
  //       <td>${order.id}</td>
  //       <td>${order.id}</td>
  //       <td>${order.id}</td>
  //       <td>${order.id}</td>
  //     </tr>`
  //   }
  // }
})

$('#bt-new').click(function () {
  ipcRenderer.send('goto', pages.orderNew)
})
