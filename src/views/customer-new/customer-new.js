const { ipcRenderer } = require("electron")
const $ = require('jquery')
const { default: Swal } = require("sweetalert2")
const { CustomerModel } = require("../../db.confog")

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
  const customer = await CustomerModel.create({ name, phone, address, code })
  if (customer) {
    Swal.fire({ title: 'Success', text: "Create customer successfully", icon: 'success' }).then((function () {
      ipcRenderer.send('back')
    }))
  }
})