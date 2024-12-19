app.controller('NewOrderController', ['$scope', '$location', function ($scope, $location) {
  $scope.title = 'ការបញ្ជាទិញថ្មី'
  $scope.customers = []
  $scope.products = []
  $scope.isPaid = true

  window.api.getCustomer({}).then(function (customers) {
    $scope.$apply(function () {
      $scope.customers = customers
    })
  })
  window.api.getProducts().then(function(products) {
    $scope.$apply(function () {
      $scope.products = products
    })
  })

  $scope.back = function () {
    $location.path('/orders')
  }
}])