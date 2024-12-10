const { Menu, app } = require("electron")

const menuTemplate = [
  {
    label: 'File',
    submenu: [
      {
        label: 'Restart', click: () => {
          app.relaunch()
          app.exit()
        }
      },
      { role: 'quit' },
    ]
  }, {
    label: 'Views',
    submenu: [
      { role: 'toggleDevTools' }
    ]
  }
]

const customMenu = Menu.buildFromTemplate(menuTemplate)
module.exports = { customMenu }