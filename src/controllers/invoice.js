app.controller('InvoiceController', function ($scope, $location) {
  $scope.savePdf = function () {
    window.dialog.saveFile({
      name: `Invoice ${DateUtil.date2stdDate(new Date())}_${Date.now()}.pdf`
    }).then(function (res) {
      if (!res.canceled) {
        window.api.html2pdf({
          pdfName: res.filePath,
        }).then(function (file) {
          window.dialog.success('រក្សាទុកជោគជ័យ ' + file).then(function () {
            $scope.$apply(function () {
              $location.path('/orders')
            })
          })
        }).catch(function (err) {
          console.error(err)
        })
      }
    })
  }
})