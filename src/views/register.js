const fs = require('fs')
const path = require('path')

const filePath = path.join(__dirname, '..', '..', 'user.txt')

document.getElementById('bt-register').addEventListener('click', () => {
  const username = document.getElementById('username').value
  const password = document.getElementById('password').value
  const email = document.getElementById('email').value

  const user = username + ',' + password + ',' + email + '\n'
  if (!fs.existsSync) {
    fs.writeFileSync(filePath, user)
  } else {
    fs.appendFileSync(filePath, user)
  }
  alert('Create user successfully')
})


// // fs = File System
// fs.readFileSync // read file
// fs.writeFileSync // write file
// fs.readdirSync // view file in folder
// fs.existsSync // find exist file/folder 
// fs.mkdirSync // create folder
// fs.unlinkSync // delete file
// fs.rmdirSync // delete folder
