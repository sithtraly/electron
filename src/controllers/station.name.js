app.controller('stationNameController', function ($scope, $location, ShareData) {
  $scope.stationName = ShareData.get('stationName')

  window.api.invoke('setting', 'stationName').then(function (res) {
    $scope.stationName = res.value
  })

  $scope.back = function () {
    $location.path('/settings')
  }

  $scope.save = function () {
    window.api.invoke('setting', 'stationName', $scope.stationName).then(function () {
      $scope.$apply(function () {
        ShareData.set('stationName', $scope.stationName)
        $scope.back()
      })
    })
  }
})