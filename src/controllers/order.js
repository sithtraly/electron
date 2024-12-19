app.controller('OrderController', ['$scope', '$location', 'ShareData', function ($scope, $location, ShareData) {
  $scope.orders = []
  $scope.getOrder = function () {
    window.api.getOrder().then(function (orders) {
      if (orders) $scope.$apply(function () {
        orders.map(function(o) {o.createdAt = DateUtil.datetime2stdDatetime(o.createdAt)})
        $scope.orders = orders
      })
    })
  }
  $scope.getOrder()

  $scope.back = function () {
    $location.path('/')
  }
  $scope.newOrder = function () {
    $location.path('/newOrder')
  }
  $scope.dblClick = function(order) {
    ShareData.set(order)
    $location.path('/newOrder')
  }
}])