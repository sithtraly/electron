const { ipcRenderer } = require('electron')
const pages = require('../../constants/page.constant')

const ids = ['#bt-cutomter', '#bt-product']
const targetPages = [pages.customer, pages.product]

for (const [index, selector] of ids.entries()) {
  $(selector).on('click', function () {
    ipcRenderer.send('goto', targetPages[index])
  })
}