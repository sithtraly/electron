const { CustomerModel, ProductModel } = require("../../db.config")

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