app.controller('ProductController', ['$scope', '$location', function ($scope, $location) {
  $scope.products = []
  const getProducts = function () {
    window.api.getProducts().then((res) => {
      if (res) {
        res.map(r => r.createdAt = DateUtil.datetime2stdDatetime(r.createdAt))
        $scope.$apply(() => $scope.products = res)
      }
    })
  }()

  $scope.back = () => $location.path('/')
  $scope.newProduct = () => { }
  $scope.dblClick = (order) => { }
}])
