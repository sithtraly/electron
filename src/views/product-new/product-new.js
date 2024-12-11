const { ipcRenderer } = require("electron")
const { ProductModel } = require("../../db.config")

var id

$('#bt-cancel').click(function () {
  ipcRenderer.send('back')
})

$('#bt-save').click(async function () {
  const name = $('#tbName').val()

  if (!id) {
    const product = await ProductModel.create({ name })
    if (product) {
      dlg.success('បន្ថែមផលិតផលថ្មីជោគជ័យ').then(() => ipcRenderer.send('back'))
    }
  } else {
    const product = await ProductModel.update({ name }, { where: { id } })
    if (product) {
      dlg.success('កែព័ត៌មានផលិតផលជោគជ័យ').then(() => ipcRenderer.send('back'))
    }
  }
})

$(document).ready(function () {
  const queryParams = new URLSearchParams(window.location.search)
  const params = Object.fromEntries(queryParams.entries())
  id = parseInt(params.id)
  $('#tbName').val(params.name)
  if (id) $('#page-title').text('កែព័ត៌មានផលិតផល')
})
