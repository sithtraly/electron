app.controller('InvoiceController', function ($scope, $location, ShareData) {
  $scope.invoices = []
  $scope.back = function () {
    $location.path('/orders')
  }

  const ids = ShareData.get('invoiceIds')
  if (ids) {
    window.api.invoke('getInvoice', { ids }).then(res => {
      $scope.$apply(function () {
        $scope.invoices = res
      })
    })
  }

  $scope.savePdf = function () {
    window.dialog.saveFile({
      name: `Invoice ${DateUtil.date2stdDate(new Date())}_${Date.now()}.pdf`
    }).then(function (res) {
      if (!res.canceled) {
        window.api.html2pdf({
          pdfName: res.filePath,
        }).then(function (file) {
          if (file) {
            window.api.invoke('printedInvoice', { ids })
            window.dialog.success('រក្សាទុកជោគជ័យ ' + file).then(function () {
              $scope.$apply(function () {
                $scope.back()
              })
            })
          }
        }).catch(function (err) {
          console.error(err)
        })
      }
    })
  }
})