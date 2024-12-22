app.controller('NewOrderController', ['$scope', '$location', 'ShareData', function ($scope, $location, ShareData) {
  $scope.title = 'ការបញ្ជាទិញថ្មី'
  $scope.customers = []
  $scope.products = []
  $scope.isPaid = true
  $scope.customerId
  $scope.productId
  $scope.price
  $scope.qty
  $scope.carNo
  $scope.stockNo
  $scope.transportNo
  let id

  window.api.getCustomer({}).then(function (customers) {
    $scope.$apply(function () {
      $scope.customers = customers
    })
  })
  window.api.getProducts().then(function (products) {
    $scope.$apply(function () {
      $scope.products = products
    })
  })

  const order = ShareData.get('order')
  ShareData.set('order', undefined)
  if (order) {
    $scope.title = 'កែប្រែការបញ្ជាទិញ'
    id = order.id
    $scope.customerId = order.customerId + '. ' + order.customer
    $scope.productId = order.productId + '. ' + order.product
    $scope.qty = order.qty
    $scope.price = order.price
    $scope.isPaid = order.isPaid === 1 ? true : false
    $scope.carNo = order.carNo
    $scope.stockNo = order.stockNo
    $scope.transportNo = order.transportNo
  }

  $scope.back = function () {
    $location.path('/orders')
  }

  $scope.save = function () {
    const customerId = $scope.customerId
    const productId = $scope.productId
    const isPaid = $scope.isPaid
    const qty = $scope.qty
    const price = $scope.price
    const carNo = $scope.carNo
    const stockNo = $scope.stockNo
    const transportNo = $scope.transportNo
    if (!customerId) return window.dialog.warning('សូមបញ្ចូលអតិថិជន')
    if (!productId) return window.dialog.warning('សូមបញ្ចូលផលិតផល')
    if (!qty) return window.dialog.warning('សូមបញ្ចូលចំនួន')
    if (!price) return window.dialog.warning('សូមបញ្ចូលតម្លៃ')
    const data = {
      productId: productId.split('.')[0],
      customerId: customerId.split('.')[0],
      isPaid,
      qty,
      price,
      carNo,
      stockNo,
      transportNo,
    }
    if (!id) {
      window.api.newOrder(data).then(function () {
        window.dialog.success('ការបញ្ជាទិញជោគជ័យ').then(function () {
          $scope.$apply(function () { $scope.back() })
        })
      })
    } else {
      window.api.editOrder({ ...data, id }).then(function () {
        window.dialog.success('កែប្រែការបញ្ជាទិញជោគជ័យ').then(function () {
          $scope.$apply(function () { $scope.back() })
        })
      })
    }
  }
}])