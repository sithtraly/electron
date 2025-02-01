app.controller('stationPhoneController', function ($scope, $location, ShareData) {
  $scope.stationPhone = ShareData.get('stationPhone')

  window.api.invoke('setting', 'stationPhone').then(function (res) {
    $scope.stationPhone = res.value
  })

  $scope.back = function () {
    $location.path('/settings')
  }

  $scope.save = function () {
    window.api.invoke('setting', 'stationPhone', $scope.stationPhone).then(function () {
      $scope.$apply(function () {
        ShareData.set('stationPhone', $scope.stationPhone)
        $scope.back()
      })
    })
  }
})