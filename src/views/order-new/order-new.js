const { CustomerModel, ProductModel, OrderModel } = require("../../db.config")

$('#bt-cancel').click(function () {
  ipcRenderer.send('back')
})

$(document).ready(async function () {
  const customers = await CustomerModel.findAll({ raw: true })
  for (const cus of customers) {
    $('#cbCustomer').append(`<option value="${cus.id}">${cus.name}</option>`)
  }

  const products = await ProductModel.findAll({ raw: true })
  for (const pro of products) {
    $('#cbProduct').append(`<option value="${pro.id}">${pro.name}</option>`)
  }
})

$('#bt-save').click(async function () {
  const customerId = $('#txtCustomer').val()
  const productId = $('#txtProduct').val()
  const qty = $('#txtQty').val()
  const price = $('#txtPrice').val()

  const order = await OrderModel.create({ customerId, productId, qty, price })
  if (order) {
    dlg.success('បញ្ជាទិញជោគជ័យ').then(() => ipcRenderer.send('back'))
  }
})