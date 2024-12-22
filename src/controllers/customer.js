app.controller('CustomerController', ['$scope', '$location', 'ShareData', function ($scope, $location, ShareData) {
  $scope.from = ''
  $scope.to = ''
  $scope.search = ''
  $scope.customers = []

  $scope.getCustomer = function () {
    const obj = {}
    if ($scope.from && $scope.to) {
      obj.from = $scope.from
      obj.to = $scope.to
    }
    if ($scope.search) obj.search = $scope.search
    window.api.getCustomer(obj).then(res => {
      if (res) {
        res.map(r => r.createdAt = DateUtil.datetime2stdDatetime(r.createdAt))
        $scope.$apply(() => $scope.customers = res)
      }
    })
  }

  $scope.getCustomer()
  $scope.dblClick = (data) => {
    ShareData.set('customer', data)
    $location.path('/newCustomer')
  }

  $scope.back = function () { $location.path('/') }
  $scope.newCustomer = function () { $location.path('/newCustomer') }
}])
