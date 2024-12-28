app.controller('InvoiceController', function ($scope, $location, ShareData) {
  $scope.from
  $scope.to
  $scope.invoices = []
  $scope.back = function () {
    $location.path('/orders')
  }

  const data = ShareData.get('invoiceIds')
  if (data) {
    $scope.from = data.from
    $scope.to = data.to
    window.api.invoke('getInvoice', { ids: data.ids }).then(res => {
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
            window.api.invoke('printedInvoice', { ids: data })
            window.api.openItemInFolder(file)
            $scope.$apply(function () {
              $scope.back()
            })
          }
        }).catch(function (err) {
          console.error(err)
        })
      }
    })
  }
})