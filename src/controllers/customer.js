app.controller('CustomerController', ['$scope', '$location', 'ShareData', function ($scope, $location, ShareData) {
  $scope.from
  $scope.to
  $scope.search = ''
  $scope.customers = []
  $scope.page = 1
  $scope.totalItems = 0
  $scope.pageSize = 50
  $scope.totalPages = 0

  $scope.getCustomer = function () {
    const obj = {
      limit: $scope.pageSize,
      offset: $scope.page - 1,
      from: $scope.from,
      to: $scope.to
    }
    if ($scope.search) obj.search = $scope.search
    window.api.invoke('getCustomer', obj).then(res => {
      if (res) {
        res.data.map(r => r.createdAt = DateUtil.datetime2stdDatetime(r.createdAt))
        $scope.$apply(function () {
          $scope.customers = res.data
          $scope.totalItems = res.total
          $scope.totalPages = Math.ceil(res.total / $scope.pageSize)
        })
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
  $scope.onPageChange = function () {
    const data = ShareData.get('pagination')
    $scope.page = data.page
    $scope.pageSize = data.pageSize
    $scope.getCustomer()
  }
}])
