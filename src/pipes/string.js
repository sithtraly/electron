app.filter('padStart', function () {
  return function (input, length = 2, fill = '0') {
    if (!input) return input
    return (input + "").padStart(length, fill)
  }
})

app.filter('number2word', function () {
  return function (input) {
    if (input === 0) return 'សូន្យ'
    if (!input) return input
    input = Math.floor(input)
    const ones = ['', 'មួយ', 'ពីរ', 'បី', 'បួន', 'ប្រាំ', 'ប្រាំមួយ', 'ប្រាំពីរ', 'ប្រាំបី', 'ប្រាំបួន',]
    const tens = ['', 'ដប់', 'ម្ភៃ', 'សាមសិប', 'សែសិប', 'ហាសិប', 'ហុកសិប', 'ចិតសិប', 'ប៉ែតសិប', 'កៅសិប',]
    const thousands = ['', 'រយ', 'ពាន់', 'លាន',]

    const cvtChunk = (n) => {
      let chunk = ''

      if (n >= 100) {
        chunk += ones[Math.floor(n / 100)] + thousands[1]
        n %= 100
      }
      if (n >= 10) {
        chunk += tens[Math.floor(n / 10)]
        n %= 10
      }
      if (0 < n && n < 10) {
        chunk += ones[Math.floor(n)]
      }

      return chunk.trim()
    }

    let words = ''
    let cid = 0
    while (Math.floor(input) > 0) {
      let chunk = input % 1000
      if (chunk > 0) {
        words = cvtChunk(chunk) + (thousands[cid] ? thousands[cid + 1] : '') + words
      }
      input = Math.floor(input / 1000)
      cid++
    }
    return words.trim()
  }
})
