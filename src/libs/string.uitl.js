const StringUtil = {
  arabNumber2KhmerNumber: (input) => {
    if (typeof input !== 'string') input = input + ''
    input = input.replace(/\d/g, (digit) => String.fromCharCode(digit.charCodeAt(0) + 6064));
    return input
  },

  number2ThousandSeparator: (input, separator = ',') => {
    const t = typeof input
    if (t != 'string' && t != 'number') {
      throw new Error('Input must be a number or a string')
    }
    if (typeof input === 'string' && input.indexOf(separator) > -1) input = input.replaceAll(separator, '')
    return input.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator)
  }
}