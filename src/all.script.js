const $ = require('jquery')
const { default: Swal } = require("sweetalert2")

$('#bt-back').click(function () {
  ipcRenderer.send('back-to-home')
})

$('#bt-back-home').click(function () {
  ipcRenderer.send('back-to-home')
})

const dlg = {
  success: (text) => {
    return new Promise((res, rej) => {
      Swal.fire({ title: 'ជោគជ័យ', text, icon: 'success', confirmButtonText: "បិទ" }).then(() => res(true))
    })
  },
  fail: (text) => {
    return new Promise((res, rej) => {
      Swal.fire({ title: 'បរាជ័យ', text, icon: 'error', confirmButtonText: "បិទ" }).then(() => res(true))
    })
  },
  warning: (text) => {
    return new Promise((res, rej) => {
      Swal.fire({ title: 'បម្រាម', text, icon: 'warning', confirmButtonText: "បិទ" }).then(() => res(true))
    })
  },
  warning: (text) => {
    return new Promise((res, rej) => {
      Swal.fire({ title: 'សំណួរ', text, icon: 'question', confirmButtonText: "បិទ" }).then(() => res(true))
    })
  }
}