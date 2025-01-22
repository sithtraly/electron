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
  const { from, to } = ShareData.get('invoiceDate')
  $scope.from = from || new Date()
  $scope.to = to || new Date()

  $scope.content2pdf = function (location, openFolderAfterSave = false) {
    window.api.html2pdf({
      pdfName: location,
    }).then(function (file) {
      if (file) {
        if (openFolderAfterSave) window.api.openItemInFolder(file)
        $scope.$apply(function () {
          $scope.back()
        })
      }
    }).catch(function (err) {
      console.error(err)
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
    window.api.invoke('print', { copies: 1 }).then(function (success) {
      const savedPath = `${savePath}\\Report ${DateUtil.date2stdDate(new Date())}_${Date.now()}.pdf`
      $scope.content2pdf(savedPath, false)
      $scope.back()
    }).catch(function (err) {
      console.error(err)
    })
  }
})