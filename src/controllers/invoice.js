app.controller('InvoiceController', function ($scope, $location, ShareData) {
  $scope.from
  $scope.to
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
        $scope.invoices = res
      })
    })
  }

  $scope.savePdf = function () {
    const savePath = ShareData.get('savePath')
    window.dialog.saveFile({
      name: `Report ${DateUtil.date2stdDate(new Date())}_${Date.now()}.pdf`,
      defaultPath: savePath,
    }).then(function (res) {
      if (!res.canceled) {
        window.api.html2pdf({
          pdfName: res.filePath,
        }).then(function (file) {
          if (file) {
            // window.api.invoke('printedInvoice', { ids: ids.ids }) // update order to isPrinted = true
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