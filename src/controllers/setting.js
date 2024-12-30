app.controller('SettingController', ['$scope', '$location', function ($scope, $location) {
  $scope.back = function () { $location.path('/') }
  $scope.dbPath = ''

  window.api.invoke('getDbPath').then(function (dbPath) {
    $scope.$apply(function () {
      $scope.dbPath = dbPath
    })
  })

  $scope.browseFile = function () {
    window.dialog.browseFile().then(function (result) {
      if (!result.canceled) {
        window.api.changeDbPath(result.filePaths[0]).then(function () {
          window.dialog.success('កម្មវិធីនឹងចាប់ផ្ដើមឡើងវិញម្ដងទៀតដើម្បីដំណើរការផ្លាស់ប្តូរនេះ').then(function () {
            window.application.restart()
          })
        })
      }
    })
  }
}])