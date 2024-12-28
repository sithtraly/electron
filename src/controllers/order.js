app.controller('OrderController', function ($scope, $location, ShareData) {
  $scope.from
  $scope.to
  $scope.search
  $scope.rowsSelected = false
  $scope.orders = []
  $scope.allSelected = false;
  $scope.page = 1
  $scope.totalItems = 0
  $scope.pageSize = 50
  $scope.totalPages = 0

  $scope.getOrder = function () {
    window.api.getOrder({
      from: $scope.from,
      to: $scope.to,
      search: $scope.search,
      limit: $scope.pageSize,
      offset: $scope.page - 1
    }).then(function (res) {
      if (res) $scope.$apply(function () {
        res.data.map(function (o) { o.createdAt = DateUtil.datetime2stdDatetime(o.createdAt) })
        $scope.orders = res.data
        $scope.totalItems = res.total
        $scope.totalPages = Math.ceil(res.total / $scope.pageSize)
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
    ShareData.set('invoiceIds', {
      ids,
      from: DateUtil.date2ddmmyyyy($scope.from || new Date()),
      to: DateUtil.date2ddmmyyyy($scope.to || new Date()),
    })
    $location.path('/invoice')
  }

  $scope.onPageChange = function () {
    const data = ShareData.get('pagination')
    $scope.page = data.page
    $scope.pageSize = data.pageSize
    $scope.getOrder()
  }
})