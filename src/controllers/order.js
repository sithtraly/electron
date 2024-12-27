app.controller('OrderController', function ($scope, $location, ShareData) {
  $scope.rowsSelected = false
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
      $scope.rowsSelected = status
    })
  }
  $scope.toggleSelect = function () {
    let total = $scope.orders.length
    let selected = $scope.orders.filter(function (o) {
      return o.selected
    })
    $scope.rowsSelected = true
    document.getElementById('selectAll').indeterminate = false
    if (selected.length === 0) {
      $scope.allSelected = false
      $scope.rowsSelected = false
    } else if (selected.length === total) {
      $scope.allSelected = true
    } else {
      $scope.allSelected = undefined
      document.getElementById('selectAll').indeterminate = true
    }
  }

  $scope.createInvoice = function () {
    let ids = $scope.orders.filter(o => o.selected)
    ids = ids.map(i => i.id)
    ShareData.set('invoiceIds', ids)
    $location.path('/invoice')
  }
})