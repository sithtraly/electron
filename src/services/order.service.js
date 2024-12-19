const { ipcMain } = require("electron");
const { OrderModel, CustomerModel, ProductModel } = require("../db.config");

module.exports = function () {
  ipcMain.handle('getOrder', async (_, obj = {}) => {
    const { search, from, to, limit = 50, offset = 0 } = obj
    const orders = await OrderModel.findAll({
      where: { isPrinted: false },
      include: [
        { model: CustomerModel, attributes: ['id', 'name'] },
        { model: ProductModel, attributes: ['id', 'name'] },
      ],
      raw: true,
    })
    orders.map(o => {
      o.customerId = o['tb_customer.id']
      o.customer = o['tb_customer.name']
      o.productId = o['tb_product.id']
      o.product = o['tb_product.name']

      delete o['tb_customer.id']
      delete o['tb_customer.name']
      delete o['tb_product.id']
      delete o['tb_product.name']
    })

    return orders
  })

  ipcMain.handle('newOrder', async (_, data) => {
    const order = await OrderModel.create(data)
    return order
  })

  ipcMain.handle('editOrder', async (_, data) => {
    const { id, ...order } = data
    const edited = await OrderModel.update(order, { where: { id } })
    return edited
  })
}
