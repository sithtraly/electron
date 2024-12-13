const { CustomerModel, ProductModel, OrderModel } = require("../../db.config")
var id = 0

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

  const queryParams = new URLSearchParams(window.location.search)
  const params = Object.fromEntries(queryParams.entries())
  if (params) {
    id = parseInt(params.id)
    $('#txtCustomer').val(params.customerId)
    $('#txtProduct').val(params.productId)
    $('#txtQty').val(params.qty)
    $('#txtPrice').val(params.price)
  }
})

$('#bt-save').click(async function () {
  const customerId = $('#txtCustomer').val()
  const productId = $('#txtProduct').val()
  const qty = $('#txtQty').val()
  const price = $('#txtPrice').val()

  if (!id) {
    await OrderModel.create({ customerId, productId, qty, price })
    dlg.success('បញ្ជាទិញជោគជ័យ').then(() => ipcRenderer.send('back'))
  } else {
    await OrderModel.update({ customerId, productId, qty, price }, { where: { id } })
    dlg.success('កែព័ត៌មានបញ្ជាទិញជោគជ័យ').then(() => ipcRenderer.send('back'))
  }
})