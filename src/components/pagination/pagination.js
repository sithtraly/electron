app.directive('pagination', function (ShareData) {
  return {
    restrict: 'E',
    templateUrl: 'components/pagination/pagination.html',
    scope: {
      page: '@',
      totalPages: '@',
      pageSize: '@',
      onChange: '&',
    },
    link: function (scope) {
      scope.size = [10, 25, 50, 75, 100, 150, 200, 500]
      scope.pageSize = !scope.pageSize ? 50 : scope.pageSize
      scope.sharedata = function () {
        ShareData.set('pagination', { pageSize: scope.pageSize, page: scope.page, totalPages: parseInt(scope.totalPages) })
      }
      scope.next = function () {
        if (scope.page < parseInt(scope.totalPages)) {
          scope.page++
          scope.sharedata()
          scope.onChange()
        }
      }
      scope.prev = function () {
        if (scope.page > 1) {
          scope.page--
          scope.sharedata()
          scope.onChange()
        }
      }
      scope.changePageSize = function () {
        scope.page = 1
        scope.sharedata()
        scope.onChange()
      }
    }
  }
})