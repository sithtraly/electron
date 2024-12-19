app.controller('OrderController', ['$scope', '$location', function ($scope, $location) {
  $scope.orders = []
  $scope.getOrder = function () {
    window.api.getOrder().then(function (orders) {
      if (orders) $scope.$apply(function () { $scope.orders = orders })
    })
  }
  $scope.getOrder()

  $scope.back = function () {
    $location.path('/')
  }
  $scope.newOrder = function() {
    $location.path('/newOrder')
  }
}])