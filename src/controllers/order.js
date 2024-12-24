app.controller('OrderController', ['$scope', '$location', 'ShareData', function ($scope, $location, ShareData) {
  $scope.orders = []
  $scope.allSelected = false;
  $scope.getOrder = function () {
    window.api.getOrder().then(function (orders) {
      if (orders) $scope.$apply(function () {
        orders.map(function (o) { o.createdAt = DateUtil.datetime2stdDatetime(o.createdAt) })
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
  $scope.dblClick = function (order) {
    ShareData.set('order', order)
    $location.path('/newOrder')
  }

  $scope.toggleAll = function () {
    let status = $scope.allSelected
    angular.forEach($scope.orders, function (o) {
      o.selected = status
    })
  }
  $scope.toggleSelect = function () {
    let total = $scope.orders.length
    let selected = $scope.orders.filter(function (o) {
      return o.selected
    })
    document.getElementById('selectAll').indeterminate = false
    if (selected.length === 0) {
      $scope.allSelected = false
    } else if (selected.length === total) {
      $scope.allSelected = true
    } else {
      $scope.allSelected = undefined
      document.getElementById('selectAll').indeterminate = true
    }
  }
}])