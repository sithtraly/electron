app.controller('ReportController', function ($scope, $location, ShareData) {
  $scope.from
  $scope.to
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
})