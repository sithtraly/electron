const { ipcRenderer } = require('electron')
const $ = require('jquery')
const pages = require('../../constants/page.constant')

$('#bt-cutomter').on('click', function () {
  ipcRenderer.send('goto', pages.customer)
})