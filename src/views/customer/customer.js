const $ = require('jquery')
const { CustomerModel } = require('../../db.config')
const { ipcRenderer } = require('electron')
const pages = require('../../constants/page.constant')
const { DateUtil } = require('../libs/date.utils')

$(document).on('DOMContentLoaded', async () => {
  const customers = await CustomerModel.findAll({ raw: true })
  $('#tbl-body').text = ''
  customers.forEach((customer) => {
    const createdAt = DateUtil.datetime2stdDatetime(customer.createdAt)
    const row = `<tr>\
      <td>${customer.name}</td>\
      <td>${customer.phone}</td>\
      <td>${customer.address}</td>\
      <td>${customer.phone}</td>\
      <td>${createdAt}</td>\
    </tr>`
    $('#tbl-body').append(row)
  })
})

$('#bt-back').click(function () {
  ipcRenderer.send('back-to-home')
})

$('#bt-new').click(function () {
  ipcRenderer.send('goto', pages.customerNew)
})

$('#bt-search').on('click', async () => {
  const customers = await CustomerModel.findAll()
  console.log(customers)
})
