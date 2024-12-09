var txtUsername = document.getElementById('username')
var txtPassword = document.getElementById('password')

document.getElementById('bt-login').addEventListener('click', () => {
  alert(txtUsername.value)
})

document.getElementById('showPassword').addEventListener('change', (event) => {
  const checked = event.target.checked
  if(checked) {
    txtPassword.setAttribute('type', 'text')
  } else {
    txtPassword.setAttribute('type', 'password')
  }
})