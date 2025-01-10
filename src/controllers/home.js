app.controller('HomeController', function ($scope, ShareData) {
  window.api.invoke('setting', 'maxInvNum').then(function (max) {
    ShareData.set('maxInvNum', parseInt(max.value))
  })
})
