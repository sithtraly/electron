app.controller('CustomerInvoiceController', function ($scope, $location, ShareData) {
  $scope.datetime = new Date()
  $scope.stationPhone = '015505009'
  $scope.station = 'សៀមរាប'
  $scope.transferNo = 'TRFW-Station-SR2'
  $scope.dnNo = 'SR()'
  $scope.orderNo = 'D.O.1234123'
  $scope.dnDate = new Date()
  $scope.orderDate = new Date()
  $scope.customer = 'ឈួន វន្ថា ()'
  $scope.app1 = 'លោក ឈឿង សុផារ៉ា'
  $scope.address = 'ក្រវ៉ាត់ក្រុង ខេត្តសៀមរាបក្រុងសៀមរាប'
  $scope.app2 = 'លោក តុង ហ៊ាន់'
  $scope.tel = '0123456897'
  $scope.sellType = 'លក់ជឿ'
  $scope.delBy = 'ឡានស៊ីតែន'
  $scope.payTerm = 'ចុងគ្រា'
  $scope.carNo = '123'

  const data = ShareData.get('invoiceIds')
  if (data) {
    $scope.from = data.from
    $scope.to = data.to
    window.api.invoke('getCustomerInvoice', data.orderNo).then(res => {
      console.log(res)
      $scope.$apply(function () {
        $scope.carNo = res[0].carNo
        $scope.dnNo = res[0].code // order number
        $scope.customer = `${res[0].customer} (${res[0].customerId})`
        $scope.tel = res[0].phone
        $scope.orderDate = res[0].orderDate
      })
    })
  }

  $scope.back = function () {
    $location.path('/orders')
  }

  $scope.savePdf = function () {
    let savePath = window.api.invoke('setting', 'savePath')
    window.dialog.saveFile({
      name: `Invoice ${DateUtil.date2stdDate(new Date())}_${Date.now()}.pdf`,
      defaultPath: savePath,
    }).then(function (res) {
      if (!res.canceled) {
        window.api.html2pdf({
          pdfName: res.filePath,
        }).then(function (file) {
          if (file) {
            // window.api.invoke('printedInvoice', { ids: data.ids }) // update order to isPrinted = true
            window.api.openItemInFolder(file)
            $scope.$apply(function () {
              $scope.back()
            })
          }
        })
      }
    })
  }
})