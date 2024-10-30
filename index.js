const $ = require('jquery')
const fs = require('fs')
const path = require('path')

const contactFile = path.join(__dirname, 'data', 'contacts')
let sno = 0

$('#changePage').on('click', function () {
  ipcRenderer.send('changeTo', 'home/home')
})

$('#add-to-list').on('click', () => {
  const name = $('#Name').val()
  const email = $('#Email').val()
  try {
    fs.appendFileSync(contactFile, `${name},${email}\n`)
    addToList(name, email)
    $('#Name').val('')
    $('#Email').val('')
  } catch (err) {
    console.log(err)
  }
})

function addToList(name, email) {
  if (name && email) {
    sno++
    const updateString = `<tr>
      <td>${sno}</td>
      <td>${name}</td>
      <td>${email}</td>
    </tr>`
    $('#contact-table').append(updateString)
  }
}

function loadContact() {
  if (fs.existsSync(contactFile)) {
    const data = fs.readFileSync(contactFile, 'utf-8').split('\n')
    data.forEach((contact, i) => {
      sno = i
      const [name, email] = contact.split(',')
      addToList(name, email)
    })
  }
}

loadContact()
