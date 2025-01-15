const fs = require('fs')
const path = require('path')

const filePath = path.join(__dirname, '..', '..', 'user.txt')

document.addEventListener('DOMContentLoaded', () => {
  const data = fs.readFileSync(filePath)
  const user = data.toString().split('\n')
  for (let i = 0; i < user.length; i++) {
    if (user[i]) {
      const u = user[i].split(',')
      let row = '<tr>'
        + '<td>' + u[0] + '</td>'
        + '<td>' + u[1] + '</td>'
        + '<td>' + u[2] + '</td>'
      '</tr>'
      document.getElementById('tbl-body').innerHTML += row
    }
  }
})