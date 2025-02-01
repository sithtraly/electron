app.controller('HomeController', function ($scope, ShareData) {
  window.api.invoke('setting', 'maxInvNum').then(function (max) {
    ShareData.set('maxInvNum', parseInt(max.value))
  })
  window.api.invoke('setting', 'savePath').then(function (res) {
    ShareData.set('savePath', res.value)
  })

  window.api.invoke('setting', 'stationName').then(function (stationName) {
    $scope.$apply(function () {
      ShareData.set('stationName', stationName.value)
    })
  })

  window.api.invoke('setting', 'stationPhone').then(function (stationPhone) {
    $scope.$apply(function () {
      ShareData.set('stationPhone', stationPhone.value)
    })
  })

  window.api.invoke('setting', 'tranNo').then(function (tranNo) {
    $scope.$apply(function () {
      ShareData.set('tranNo', tranNo.value)
    })
  })

  ShareData.set('backPath', '/')
})
