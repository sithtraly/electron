app.controller('NewProductController', ['$scope', '$location', 'ShareData', function ($scope, $location, ShareData) {
  $scope.title = 'បន្ថែមផលិតផលថ្មី'
  $scope.name = ''
  $scope.code = undefined
  $scope.dividend
  let id

  const product = ShareData.get('product')
  ShareData.set('product', undefined)
  if (product) {
    $scope.title = 'កែផលិតផល'
    $scope.name = product.name
    $scope.code = product.code
    $scope.dividend = product.dividend
  }

  $scope.back = function () { $location.path('/products') }

  $scope.save = function () {
    const name = $scope.name
    const dividend = $scope.dividend
    const code = $scope.code

    if (name) {
      if (!product) {
        window.api.newProduct({ name, dividend, code }).then(function () {
          window.dialog.success('បង្កើតផលិតផលថ្មីជោគជ័យ').then(function () {
            $scope.$apply(function () { $scope.back() })
          })
        })
      } else {
        window.api.editProduct({ id: product.id, name, dividend, code }).then(function () {
          window.dialog.success('កែផលិតផលជោគជ័យ').then(function () {
            $scope.$apply(function () { $scope.back() })
          })
        })
      }
    }
  }
}])