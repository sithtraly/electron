app.controller('tranNoController', function ($scope, $location, ShareData) {
  $scope.tranNo = ShareData.get('tranNo')

  window.api.invoke('setting', 'tranNo').then(function (res) {
    $scope.tranNo = res.value
  })

  $scope.back = function () {
    $location.path('/settings')
  }

  $scope.save = function () {
    window.api.invoke('setting', 'tranNo', $scope.tranNo).then(function () {
      $scope.$apply(function () {
        ShareData.set('tranNo', $scope.tranNo)
        $scope.back()
      })
    })
  }
})