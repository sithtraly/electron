app.controller('NewOrderController', ['$scope', '$location', 'ShareData', function ($scope, $location, ShareData) {
  $scope.title = 'ការបញ្ជាទិញថ្មី'
  $scope.orderCode = 'SR' + Date.now()
  $scope.products = [{ productId: undefined, product: undefined, qty: undefined, price: undefined }]
  $scope.isPaid = true
  $scope.customerId
  $scope.customer
  $scope.carNo
  $scope.address

  const orders = ShareData.get('order')
  ShareData.set('order', undefined)
  if (orders) {
    console.log(orders)
    $scope.title = 'កែប្រែការបញ្ជាទិញ'
    $scope.customerId = orders[0].customerId
    $scope.customer = orders[0].customer
    $scope.carNo = orders[0].carNo
    $scope.orderCode = orders[0].code
    $scope.address = orders[0].address
    $scope.products = []
    orders.forEach(o => {
      $scope.products.push({
        productId: o.productId,
        product: o.product,
        qty: o.qty,
        price: o.price,
        id: o.id
      })
    })
  }

  $scope.back = function () {
    $location.path('/orders')
  }

  $scope.save = function () {
    const customerId = $scope.customerId
    const carNo = $scope.carNo
    const address = $scope.address
    const code = $scope.orderCode
    const data = []
    $scope.products.forEach(function (product) {
      data.push({ ...product, customerId, carNo, address, code })
    })
    if (!orders) {
      window.api.invoke('newOrder', data).then(function () {
        window.dialog.success('ការបញ្ជាទិញជោគជ័យ').then(function () {
          $scope.$apply(function () { $scope.back() })
        })
      })
    } else {
      window.api.invoke('editOrder', data).then(function () {
        window.dialog.success('កែប្រែការបញ្ជាទិញជោគជ័យ').then(function () {
          $scope.$apply(function () { $scope.back() })
        })
      })
    }
  }

  $scope.customerBlur = function () {
    $scope.customerId = $scope.customer
    window.api.invoke('getCustomerById', $scope.customerId).then(function (res) {
      $scope.$apply(function () {
        $scope.customer = res.name
      })
    })
  }
  $scope.productBlur = function (i) {
    if ($scope.products[i].product) {
      const id = $scope.products[i].product
      $scope.products[i].productId = id
      window.api.invoke('getProductById', id).then(function (res) {
        $scope.$apply(function () {
          $scope.products[i].product = res.name
        })
      })
    }
  }

  $scope.addProduct = function () {
    $scope.products.push({ id: undefined, name: undefined, qty: undefined, price: undefined })
  }

  $scope.removeProduct = function (i) {
    if ($scope.products.length > 1) $scope.products.splice(i, 1)
  }
}])