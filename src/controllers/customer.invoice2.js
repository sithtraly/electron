app.controller('CustomerInvoiceController2', function ($scope, $location, ShareData) {
  $scope.datetime = new Date()
  $scope.station = ShareData.get('stationName')
  $scope.stationPhone = ShareData.get('stationPhone')
  $scope.transferNo = 'TRFW-Station'
  $scope.dnNo = 'SR()'
  $scope.customerCode = ''
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
        $scope.readPrice = Math.round($scope.totalPrice)
        const r0 = res[0]
        $scope.orders = res
        $scope.carNo = r0.carNo
        $scope.dnNo = r0.code // order number
        $scope.customerCode = StringUtil.arabNumber2KhmerNumber(r0.customerCode) + ''
        $scope.customer = r0.customer
        $scope.tel = r0.phone
        $scope.orderDate = r0.orderDate
        $scope.address = r0.address
        $scope.oldInvNum = r0.invNumber
        if (r0.invNumber) $scope.datetime = new Date(r0.updatedAt)
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
    // $location.path('/orders')
    $location.path(ShareData.get('backPath'))
  }

  function savePdf(name, showFolder = false) {
    window.api.html2pdf({
      pdfName: name,
    }).then(function (file) {
      if (file) {
        if (!$scope.oldInvNum) {
          const max = ShareData.get('maxInvNum')
          window.api.invoke('setting', 'invNum').then(function (res) {
            if (typeof res.value != 'number') res.value = parseInt(res.value)
            const newInvNum = res.value > max ? 1 : $scope.invoiceNumber + 1
            window.api.invoke('setting', 'invNum', newInvNum)
            window.api.invoke('printedInvoice', { code: $scope.dnNo, invNumber: $scope.invoiceNumber }).then(function () {
              $scope.$apply(function () { $scope.back() })
            }) // update order to isPrinted = true
          })
        }
        if (showFolder) window.api.openItemInFolder(file)
        $scope.$apply(function () {
          $scope.back()
        })
      }
    })
  }

  $scope.savePdf = function () {
    const savePath = ShareData.get('savePath')
    window.dialog.saveFile({
      name: `Invoice ${$scope.orders[0].customer} ${Date.now()}.pdf`,
      defaultPath: savePath,
    }).then(function (res) {
      if (!res.canceled) savePdf(res.filePath, true)
    })
  }

  $scope.print = function () {
    window.api.invoke('print', { copies: 3, pageSize: 'A4' }).then(function (success) {
      const savePath = `${ShareData.get('savePath')}\\Invoice ${$scope.orders[0].customer} ${Date.now()}.pdf`
      savePdf(savePath)
    }).catch(function (err) {
      console.table(err)
    })
  }
})