app.controller('NewCustomerController', ['$scope', '$location', 'ShareData', function ($scope, $location, ShareData) {
  $scope.title = 'បង្កើតអតិថិជនថ្មី'
  $scope.name = ''
  $scope.phone = ''
  $scope.address = ''
  $scope.code = ''

  $scope.back = () => { $location.path('/customers') }
  const data = ShareData.get()
  ShareData.set(undefined)
  if (data) {
    $scope.title = 'កែព័ត៌មានអតិថិជន'
    $scope.id = data.id
    $scope.name = data.name
    $scope.phone = data.phone
    $scope.address = data.address
    $scope.code = data.code
  }

  $scope.save = () => {
    const id = $scope.id
    const name = $scope.name
    const phone = $scope.phone
    const address = $scope.address
    const code = $scope.code

    if (!id) {
      window.api.newCustomer({ name, phone, address, code }).then(() => {
        success('បន្ថែមអតិថិជនថ្មីជោគជ័យ', () => {
          $scope.$apply(() => $location.path('/customers'))
        })
      })
    } else {
      window.api.updateCustomer({ id, name, phone, address, code }).then(() => {
        success('កែព័ត៌មានអតិថិជនជោគជ័យ', () => {
          $scope.$apply(() => $location.path('/customers'))
        })
      })
    }
  }
}])