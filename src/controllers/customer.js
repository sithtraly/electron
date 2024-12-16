app.controller('CustomerController', ['$scope', '$location', 'ShareData', function ($scope, $location, ShareData) {
  $scope.customers = []

  const getCustomer = function () {
    window.api.getCustomer().then(res => {
      if (res) {
        res.map(r => r.createdAt = DateUtil.datetime2stdDatetime(r.createdAt))
        $scope.$apply(() => $scope.customers = res)
      }
    })
  }()

  $scope.dblClick = (data) => {
    ShareData.set(data)
    $location.path('/newCustomer')
  }

  $scope.back = function () { $location.path('/') }
  $scope.newCustomer = function () { $location.path('/newCustomer') }
}])
