app.controller('NewOrderController', ['$scope', '$location', 'ShareData', function ($scope, $location, ShareData) {
  function generateOrder() {
    return 'SR' + Date.now()
  }
  $scope.title = 'ការបញ្ជាទិញថ្មី'
  $scope.orderCode = generateOrder()
  $scope.products = [{ productId: undefined, product: undefined, qty: undefined, price: undefined, productCode: undefined }]
  $scope.isPaid = true
  $scope.customerId
  $scope.customer
  $scope.carNo
  $scope.address
  $scope.phone
  $scope.orders = []

  const orders = ShareData.get('order')
  ShareData.set('order', undefined)
  if (orders) {
    $scope.orders = orders
    // console.log(orders)
    $scope.title = 'កែប្រែការបញ្ជាទិញ'
    $scope.customerId = orders[0].customerId
    $scope.customer = orders[0].customer
    $scope.carNo = orders[0].carNo
    $scope.orderCode = orders[0].code ?? $scope.orderCode
    $scope.address = orders[0].address
    $scope.products = []
    $scope.phone = orders[0].phone
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
    $location.path(ShareData.get('backPath'))
  }

  $scope.save = function (isAdd = false) {
    const customerId = $scope.customerId
    const carNo = $scope.carNo
    const address = $scope.address
    const code = $scope.orderCode
    const phone = $scope.phone
    const data = []
    $scope.products.forEach(function (product) {
      data.push({ ...product, customerId, carNo, address, code, phone })
    })
    data.map(d => {
      d.qty = d.qty ? d.qty.replace(/,/g, '') : ''
      d.price = d.price ? d.price.replace(/,/g, '') : ''
    })
    if (!orders) {
      window.api.invoke('newOrder', data).then(function () {
        window.dialog.success('ការបញ្ជាទិញជោគជ័យ').then(function () {
          if (!isAdd) $scope.$apply(function () { $scope.back() })
          else {
            $scope.$apply((function () {
              $scope.orderCode = generateOrder()
              $scope.customerId = undefined
              $scope.customer = undefined
              $scope.products = [{ productId: undefined, product: undefined, qty: undefined, price: undefined, productCode: undefined }]
              $scope.carNo = undefined
              $scope.address = undefined
              $scope.phone = undefined
            }))
          }
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

  // $scope.customerBlur = function () {
  //   $scope.customerId = $scope.customer
  //   window.api.invoke('getCustomerById', $scope.customerId).then(function (res) {
  //     $scope.$apply(function () {
  //       $scope.customer = res.name
  //     })
  //   })
  // }

  $scope.customerBlur = function () {
    if ($scope.customer) {
      $scope.customerId = $scope.customer
      window.api.invoke('getCustomerByCode', $scope.customerId).then(function (res) {
        $scope.$apply(function () {
          $scope.customer = res.name
          $scope.customerId = res.id
        })
      })
    }
  }

  // $scope.productBlur = function (i) {
  //   if ($scope.products[i].product) {
  //     const id = parseInt($scope.products[i].product)
  //     $scope.products[i].productId = id
  //     window.api.invoke('getProductById', id).then(function (res) {
  //       $scope.$apply(function () {
  //         $scope.products[i].product = res.name
  //       })
  //     })
  //   }
  // }

  $scope.productBlur = function (i) {
    if ($scope.products[i].product) {
      const productCode = parseInt($scope.products[i].product)
      $scope.products[i].productCode = productCode
      window.api.invoke('getProductByCode', productCode).then(function (res) {
        $scope.$apply(function () {
          $scope.products[i].product = res.name
          $scope.products[i].productId = res.id
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

  $scope.formatNumber = function (e) {
    const validInput = e.target.value.replace(/[^0-9,]/g, '')
    if (e.target.value !== validInput) {
      e.target.value = validInput
    }
    e.target.value = StringUtil.number2ThousandSeparator(e.target.value)
  }

  $scope.onKeydown = function (e) {
    if (!['ArrowLeft', 'ArrowUp', 'ArrowRight', 'ArrowDown'].includes(e.key)) return
    const inputs = Array.from(document.querySelectorAll('input[ng-model]'))
    const index = inputs.indexOf(e.target)
    if ((e.key === 'ArrowLeft' || e.key === 'ArrowUp') && index > 0) {
      inputs[index - 1].focus()
    } else if ((e.key === 'ArrowRight' || e.key === 'ArrowDown') && inputs.length - 1) {
      inputs[index + 1].focus()
    }
  }
}])