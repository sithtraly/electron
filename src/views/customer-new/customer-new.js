const { ipcRenderer } = require("electron")
const $ = require('jquery')
const { default: Swal } = require("sweetalert2")
const { CustomerModel } = require("../../db.config")
var id

$('#bt-cancel').click(function () {
  ipcRenderer.send('back')
})

$('#bt-back').click(function () {
  ipcRenderer.send('back')
})

$('#bt-save').click(async function () {
  const name = $('#tbName').val()
  const phone = $('#tbPhone').val()
  const address = $('#tbAddress').val()
  const code = $('#tbCode').val()
  if (!id) {
    const customer = await CustomerModel.create({ name, phone, address, code })
    if (customer) {
      Swal.fire({ title: 'Success', text: "Create customer successfully", icon: 'success' }).then((function () {
        ipcRenderer.send('back')
      }))
    }
  } else {
    const customer = await CustomerModel.update({ name, phone, address, code }, { where: { id } })
    if (customer) {
      Swal.fire({ title: 'Success', text: "Update customer successfully", icon: 'success' }).then((function () {
        ipcRenderer.send('back')
      }))
    }
  }
})

$(document).ready(function () {
  const queryParams = new URLSearchParams(window.location.search)
  const params = Object.fromEntries(queryParams.entries())
  id = parseInt(params.id)
  $('#tbName').val(params.name)
  $('#tbAddress').val(params.address)
  $('#tbCode').val(params.code)
  $('#tbPhone').val(params.phone)
  $('#page-title').text('Update customer')
})