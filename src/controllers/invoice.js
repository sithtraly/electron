app.controller('InvoiceController', function ($scope, $location, ShareData) {
  $scope.from
  $scope.to
  $scope.stationName = ShareData.get('stationName')
  $scope.invoices = []
  $scope.back = function () {
    $location.path('/reports')
  }

  const ids = ShareData.get('invoiceIds')
  if (ids) {
    $scope.from = ids.from
    $scope.to = ids.to
    window.api.invoke('getInvoice', { ids }).then(res => {
      $scope.$apply(function () {
        const merged = res.reduce((acc, item) => {
          const { code, product, price, qty, customer, address, carNo, phone, productId } = item
          if (!acc[code]) {
            acc[code] = { code }
          }
          const pro = product.split(' ')[0]
          // acc[code][pro + 'Price'] = acc[code][pro + 'Price'] ? acc[code][pro + 'Price'] + price : price
          // acc[code][pro + 'Qty'] = acc[code][pro + 'Qty'] ? acc[code][pro + 'Qty'] + qty : qty
          const proQty = 'pro' + productId + 'Qty'
          const proPrice = 'pro' + productId + 'Price'
          acc[code][proQty] = acc[code][proQty] ? acc[code][proQty] + qty : qty
          acc[code][proPrice] = acc[code][proPrice] ? acc[code][proPrice] + price : price
          acc[code].customer = customer
          acc[code].address = address
          acc[code].carNo = carNo
          acc[code].phone = phone
          return acc
        }, {})
        $scope.invoices = merged
      })
    })
  }
  const { from, to } = ShareData.get('invoiceDate')
  $scope.from = from || new Date()
  $scope.to = to || new Date()

  $scope.content2pdf = function (location, openFolderAfterSave = false) {
    window.api.html2pdf({
      pdfName: location,
      landscape: true
    }).then(function (file) {
      if (file) {
        if (openFolderAfterSave) window.api.openItemInFolder(file)
        $scope.$apply(function () {
          $scope.back()
        })
      }
    }).catch(function (err) {
      console.table(err)
    })
  }

  $scope.savePdf = function () {
    const savePath = ShareData.get('savePath')
    window.dialog.saveFile({
      name: `Report ${DateUtil.date2stdDate(new Date())}_${Date.now()}.pdf`,
      defaultPath: savePath,
    }).then(function (res) {
      if (!res.canceled) {
        $scope.content2pdf(res.filePath, true)
      }
    })
  }

  $scope.print = function () {
    const savePath = ShareData.get('savePath')
    window.api.invoke('print', { copies: 1, pageSize: 'A4', landscape: true }).then(function (success) {
      const savedPath = `${savePath}\\Report ${DateUtil.date2stdDate(new Date())}_${Date.now()}.pdf`
      $scope.content2pdf(savedPath, false)
      $scope.$apply(function () {
        $scope.back()
      })
    }).catch(function (err) {
      console.table(err)
    })
  }
})