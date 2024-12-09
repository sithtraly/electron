const $ = require('jquery')
const CustomerModel = require('../../models/customer.model')
const { ipcRenderer } = require('electron')
const pages = require('../../constants/page.constant')

$(document).on('DOMContentLoaded', async () => {
  const customers = await CustomerModel.findAll()
  console.log(customers)
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
