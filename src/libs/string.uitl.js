const StringUtil = {
  arabNumber2KhmerNumber: (input) => {
    if (typeof input !== 'string') input = input + ''
    input = input.replace(/\d/g, (digit) => String.fromCharCode(digit.charCodeAt(0) + 6064));
    return input
  }
}