app.filter('stdDatetime', function () {
  return function (input) {
    if (!input) return input
    return DateUtil.datetime2stdDatetime(input)
  }
})