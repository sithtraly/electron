const { ipcRenderer } = require("electron")
const $ = require('jquery')

$('#bt-cancel').click(function () {
  ipcRenderer.send('back')
})

$('#bt-back').click(function () {
  ipcRenderer.send('back')
})