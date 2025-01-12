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
  $scope.customerId = 1
  $scope.app1 = 'លោក ឈឿង សុផារ៉ា'
  $scope.address = 'ក្រវ៉ាត់ក្រុង ខេត្តសៀមរាបក្រុងសៀមរាប'
  $scope.app2 = 'លោក តុង ហ៊ាន់'
  $scope.tel = '0123456897'
  $scope.sellType = 'លក់ជឿ'
  $scope.delBy = 'ឡានស៊ីទែន'
  $scope.payTerm = 'ចុងគ្រា'
  $scope.carNo = '123'
  $scope.invoiceNumber = 0
  $scope.orders = []
  $scope.totalQty = 0
  $scope.totalPrice = 0

  const data = ShareData.get('invoiceIds') || {}
  // data.orderNo = 'SR1735562556926'
  if (data) {
    $scope.from = data.from
    $scope.to = data.to
    window.api.invoke('getCustomerInvoice', data.orderNo).then(res => {
      $scope.$apply(function () {
        res.forEach(r => {
          $scope.totalQty += r.qty
          $scope.totalPrice += r.total
        })
        const r0 = res[0]
        $scope.orders = res
        $scope.carNo = r0.carNo
        $scope.dnNo = r0.code // order number
        $scope.customer = `${r0.customer} (${StringUtil.arabNumber2KhmerNumber(r0.customerId)})`
        $scope.tel = r0.phone
        $scope.orderDate = r0.orderDate
        $scope.address = r0.address
      })
    })
    window.api.invoke('setting', 'invNum').then(function (res) {
      res.value = res.value == 0 ? 1 : parseInt(res.value)
      $scope.$apply(function () {
        $scope.invoiceNumber = parseInt(res.value)
      })
    })
  }

  $scope.back = function () {
    $location.path('/orders')
  }

  $scope.savePdf = function () {
    const savePath = ShareData.get('savePath')
    window.dialog.saveFile({
      name: `Invoice ${DateUtil.date2stdDate(new Date())}_${Date.now()}.pdf`,
      defaultPath: savePath,
    }).then(function (res) {
      if (!res.canceled) {
        window.api.html2pdf({
          pdfName: res.filePath,
        }).then(function (file) {
          if (file) {
            const max = ShareData.get('ShareData')
            const newInvNum = res.value > max ? 1 : $scope.invoiceNumber + 1
            window.api.invoke('setting', 'invNum', newInvNum)
            const ids = $scope.orders.map(o => o.id)
            window.api.invoke('printedInvoice', { ids }) // update order to isPrinted = true
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