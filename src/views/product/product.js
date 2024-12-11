const { ipcRenderer } = require("electron")
const pages = require("../../constants/page.constant")
const { ProductModel } = require("../../db.config")
const { DateUtil } = require("../libs/date.utils")

$('#bt-new').click(function () {
  ipcRenderer.send('goto', pages.productNew)
})

$(document).on('DOMContentLoaded', async () => {
  const products = await ProductModel.findAll({ raw: true })
  if (products) {
    $('#tbl-body').text('')
    products.forEach((customer) => {
      const createdAt = DateUtil.datetime2stdDatetime(customer.createdAt)
      const row = `<tr id="pro-${customer.id}">\
        <td>${customer.id}</td>\
        <td>${customer.name}</td>\
        <td>${createdAt}</td>\
      </tr>`
      $('#tbl-body').append(row)
      $('#pro-' + customer.id).dblclick(function () {
        editProduct(customer)
      })
    })
  }
})

function editProduct(product) {
  ipcRenderer.send('goto', { file: pages.productNew, ...product })
}