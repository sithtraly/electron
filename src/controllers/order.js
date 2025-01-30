app.controller('OrderController', function ($scope, $location, ShareData) {
  $scope.from //= new Date()
  $scope.to = new Date()
  $scope.search
  $scope.rowsSelected = false
  $scope.orders = []
  $scope.allSelected = false;
  $scope.page = 1
  $scope.totalItems = 0
  $scope.pageSize = 50
  $scope.totalPages = 0

  ShareData.set('backPath', '/orders')

  $scope.getOrder = function () {
    window.api.getOrder({
      from: $scope.from ? DateUtil.date2stdDate($scope.from) : undefined,
      to: $scope.to ? DateUtil.date2stdDate($scope.to) : undefined,
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
  setTimeout(() => {
    $scope.$apply(function () {
      $scope.getOrder()
    })
  }, 200)

  $scope.back = function () {
    $location.path('/')
  }
  $scope.newOrder = function () {
    $location.path('/newOrder')
  }
  $scope.dblClick = function (order) {
    const orders = $scope.orders.filter(o => o.code === order.code)
    ShareData.set('order', orders)
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

  $scope.createInvoice = function (orderNo) {
    event.preventDefault()
    if (!orderNo) {
      orderNo = $scope.orders.filter(o => o.selected)
      orderNo = orderNo.map(i => i.code)
      orderNo = Array.from(new Set(orderNo))
    } else orderNo = [orderNo]
    ShareData.set('invoiceIds', {
      orderNo,
      from: DateUtil.date2ddmmyyyy($scope.from || new Date()),
      to: DateUtil.date2ddmmyyyy($scope.to || new Date()),
    })
    $location.path('/customerInvoice2')
  }

  $scope.onPageChange = function () {
    const data = ShareData.get('pagination')
    $scope.page = data.page
    $scope.pageSize = data.pageSize
    $scope.getOrder()
  }

  $scope.deleteOrder = function (code) {
    event.preventDefault()
    window.api.invoke('confirm').then(res => {
      if (res) {
        window.api.invoke('removeOrder', code).then(res => {
          $scope.getOrder()
        })
      }
    })
  }
})