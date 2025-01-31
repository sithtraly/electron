app.controller('ReportController', function ($scope, $location, ShareData) {
  $scope.from = new Date()
  $scope.to = new Date()
  $scope.search
  $scope.page = 1
  $scope.totalItems = 0
  $scope.pageSize = 50
  $scope.totalPages = 0

  $scope.back = function () {
    $location.path('/')
  }
  $scope.reports = []
  $scope.getReports = function () {
    window.api.invoke('getReports', {
      from: $scope.from ? DateUtil.date2stdDate($scope.from) : undefined,
      to: $scope.to ? DateUtil.date2stdDate($scope.to) : undefined,
      search: $scope.search,
      limit: $scope.pageSize,
      offset: $scope.page - 1
    }).then(res => {
      $scope.$apply(function () {
        $scope.reports = res.data
        $scope.totalItems = res.total
        $scope.totalPages = Math.ceil(res.total / $scope.pageSize)
      })
    })
  }
  $scope.getReports()

  $scope.onPageChange = function () {
    const data = ShareData.get('pagination')
    $scope.page = data.page
    $scope.pageSize = data.pageSize
    $scope.getReports()
  }

  $scope.downloadExcel = function () {
    let header = document.querySelector('table thead tr').textContent.split('\n')// get header from table
    header.forEach((v, i) => header[i] = v.trim())
    header = header.filter(h => h != '') // remove empty header
    header.pop()
    let body = JSON.parse(JSON.stringify($scope.reports))
    body.map(b => {
      delete b['$$hashKey']
      delete b.customerId
      delete b.isPrinted
      delete b.productId
    })

    const clone = []
    body.map(b => {
      const row = {}
      row.code = b.code
      row.id = b.customerCode
      row.customer = b.customer
      row.product = b.product
      row.qty = b.qty
      row.price = b.price //.toLocaleString()
      row.address = b.address
      row.phone = b.phone
      row.carNo = b.carNo
      row.createdAt = DateUtil.datetime2stdDatetime(b.createdAt)
      // row.currency = b.currency
      // row.stockNo = b.stockNo
      // row.transportNo = b.transportNo
      // row.isPaid = b.isPaid ? 'Yes' : 'No'
      // row.total = b.total //.toLocaleString()
      clone.push(row)
    })
    body = clone
    delete clone

    body = body.map(b => {
      return Object.keys(b).map(k => b[k])
    })

    const from = $scope.from ? DateUtil.date2stdDate($scope.from) : ''
    const to = $scope.to ? DateUtil.date2stdDate($scope.to) : ''
    const savePath = ShareData.get('savePath')
    window.dialog.saveFile({
      name: `report_${from ? from : ''}${to ? '_' + to : ''}_${Date.now()}.xlsx`,
      defaultPath: savePath,
    }).then(function (res) {
      if (!res.canceled) {
        window.api.invoke('saveReport2Excel', { headerRow: header, rows: body, name: res.filePath }).then(function (file) {
          window.api.openItemInFolder(file)
        })
      }
    })
  }

  $scope.downloadPdf = function () {
    ShareData.set('invoiceDate', { from: $scope.from, to: $scope.to })
    const ids = $scope.reports.map(r => r.id)
    ShareData.set('invoiceIds', ids)
    $location.path('/invoice')
  }

  $scope.createInvoice = function (orderNo) {
    event.preventDefault()
    if (!orderNo) {
      orderNo = $scope.orders.filter(o => o.selected)
      orderNo = orderNo.map(i => i.code)
      orderNo = Array.from(new Set(orderNo))
    } else orderNo = [orderNo]
    ShareData.set('invoiceIds', {
      orderNo,
      from: DateUtil.date2ddmmyyyy($scope.from || new Date()),
      to: DateUtil.date2ddmmyyyy($scope.to || new Date()),
    })
    $location.path('/customerInvoice2')
    ShareData.set('backPath', '/reports')
  }
})