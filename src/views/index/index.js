const pages = require('../../constants/page.constant')

const ids = ['#bt-cutomter', '#bt-product', '#bt-order']
const targetPages = [pages.customer, pages.product, pages.order]

for (const [index, selector] of ids.entries()) {
  $(selector).on('click', function () {
    ipcRenderer.send('goto', targetPages[index])
  })
}