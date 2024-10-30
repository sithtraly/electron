const os = require('os')

document.write(
  'Platform: ' + os.platform() + '<br>' +
  'OS Architecture: ' + os.release() + '<br>',
  'Relase: ' + os.arch() + '<br>',
  'CPU Model: ' + os.cpus()[0].model + '<br>',
  'chrome: ' + process.versions.chrome + '<br />' +
  'node: ' + process.versions.node + '<br />' +
  'electron: ' + process.versions.electron + '<br />'
)

