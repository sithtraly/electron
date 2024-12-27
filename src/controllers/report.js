app.controller('ReportController', function ($scope, $location) {
  $scope.back = function () {
    $location.path('/')
  }
  $scope.reports = []
  $scope.getReports = function() {
    window.api.invoke('getReports').then(res => {
      $scope.$apply(function () {
        $scope.reports = res
      })
    })
  }
  $scope.getReports()
})