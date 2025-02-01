app.controller('SettingController', ['$scope', '$location', 'ShareData', function ($scope, $location, ShareData) {
  $scope.back = function () { $location.path('/') }
  $scope.dbPath
  $scope.savePath
  $scope.stationName
  $scope.stationPhone

  window.api.invoke('version').then((v) => {
    $scope.version = v
  })

  window.api.invoke('getDbPath').then(function (dbPath) {
    $scope.$apply(function () {
      $scope.dbPath = dbPath
    })
  })

  $scope.stationName = ShareData.get('stationName')
  $scope.stationPhone = ShareData.get('stationPhone')

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

  $scope.changeName = function () {
    $location.path('/stationName')
  }

  $scope.changePhone = function () {
    $location.path('/stationPhone')
  }
}])