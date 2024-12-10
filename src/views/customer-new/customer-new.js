const { ipcRenderer } = require("electron")
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
      dlg.success('បន្ថែមអតិថិជនថ្មីជោគជ័យ').then(() => ipcRenderer.send('back'))
    }
  } else {
    const customer = await CustomerModel.update({ name, phone, address, code }, { where: { id } })
    if (customer) {
      dlg.success('កែព័ត៌មានអតិថិជនជោគជ័យ').then(() => ipcRenderer.send('back'))
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
  if (id) $('#page-title').text('កែព័ត៌មានអតិថិជន')
})