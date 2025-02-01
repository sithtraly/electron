app.controller('NewCustomerController', ['$scope', '$location', 'ShareData', function ($scope, $location, ShareData) {
  $scope.title = 'បង្កើតអតិថិជនថ្មី'
  $scope.name = ''
  // $scope.phone = ''
  $scope.address = ''
  $scope.code = ''

  $scope.back = () => { $location.path('/customers') }
  const data = ShareData.get('customer')
  ShareData.set('customer', undefined)
  if (data) {
    $scope.title = 'កែព័ត៌មានអតិថិជន'
    $scope.id = data.id
    $scope.name = data.name
    // $scope.phone = data.phone
    // $scope.address = data.address
    $scope.code = data.customerCode
  }

  $scope.save = (isAdd = false) => {
    const id = $scope.id
    const name = $scope.name
    // const phone = $scope.phone
    // const address = $scope.address
    const customerCode = $scope.code

    if (!id) {
      window.api.newCustomer({ name, customerCode }).then(() => {
        // success('បន្ថែមអតិថិជនថ្មីជោគជ័យ', () => {
        //   $scope.$apply(() => $location.path('/customers'))
        // })       
        window.dialog.success('បន្ថែមអតិថិជនថ្មីជោគជ័យ').then(() => {
          if (!isAdd) $scope.$apply(() => $location.path('/customers'))
        })
      })
    } else {
      window.api.updateCustomer({ id, name, customerCode }).then(() => {
        // success('កែព័ត៌មានអតិថិជនជោគជ័យ', () => {
        //   $scope.$apply(() => $location.path('/customers'))
        // })
        window.dialog.success('កែព័ត៌មានអតិថិជនជោគជ័យ').then(() => {
          if (!isAdd) $scope.$apply(() => $location.path('/customers'))
        })
      })
    }
  }
}])