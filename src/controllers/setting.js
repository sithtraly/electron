app.controller('SettingController', ['$scope', '$location', function ($scope, $location) {
  $scope.back = function () { $location.path('/') }
  $scope.dbPath
  $scope.savePath

  window.api.invoke('version').then((v) => {
    $scope.version = v
  })

  window.api.invoke('getDbPath').then(function (dbPath) {
    $scope.$apply(function () {
      $scope.dbPath = dbPath
    })
  })

  window.api.invoke('setting', 'savePath').then(function (savePath) {
    $scope.$apply(function () {
      $scope.savePath = savePath.value + ''
    })
  })

  $scope.browDatabase = function () {
    window.dialog.browseFile({ defaultPath: $scope.dbPath }).then(function (result) {
      if (!result.canceled) {
        window.api.changeDbPath(result.filePaths[0]).then(function () {
          window.dialog.success('កម្មវិធីនឹងចាប់ផ្ដើមឡើងវិញម្ដងទៀតដើម្បីដំណើរការផ្លាស់ប្តូរនេះ').then(function () {
            window.application.restart()
          })
        })
      }
    })
  }

  $scope.browseFolder = function () {
    window.api.invoke('browseFolder', $scope.savePath).then(function (result) {
      if (!result.canceled) {
        const savePath = result.filePaths[0]
        $scope.$apply(function () {
          $scope.savePath = savePath
          window.api.invoke('setting', 'savePath', savePath)
        })
      }
    })
  }
}])