app.filter('stdDatetime', function () {
  return function (input) {
    if (!input) return input
    return DateUtil.datetime2stdDatetime(input)
  }
})

app.filter('normalDatetime', function() {
  return function (input, splitter = " ") {
    if (!input) return input
    const date = new Date(input)
    const d = date.getDate().toString().padStart(2, '0')
    const m = (date.getMonth() + 1).toString().padStart(2, '0')
    const y = date.getFullYear().toString().padStart(2, '0')
    const ampm = date.getHours() < 12 ? 'AM' : 'PM'
    const h = date.getHours() % 12 || 12
    const min = date.getMinutes().toString().padStart(2, '0')
    return `${d}/${m}/${y}${splitter}${h}:${min}${ampm}`
  }
})