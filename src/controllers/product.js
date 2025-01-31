app.controller('ProductController', ['$scope', '$location', 'ShareData', function ($scope, $location, ShareData) {
  $scope.products = []
  $scope.search
  $scope.from
  $scope.to

  $scope.getProducts = function () {
    window.api.getProducts({search: $scope.search}).then((res) => {
      if (res) {
        res.map(r => r.createdAt = DateUtil.datetime2stdDatetime(r.createdAt))
        $scope.$apply(() => $scope.products = res)
      }
    })
  }
  $scope.getProducts()

  $scope.back = () => $location.path('/')
  $scope.newProduct = () => $location.path('/newProduct')
  $scope.dblClick = (product) => {
    ShareData.set('product', product)
    $location.path('/newProduct')
  }
}])
