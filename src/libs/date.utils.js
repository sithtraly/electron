const DateUtil = {
  date2stdDate: (date = new Date()) => {
    const d = new Date(date)
    const y = d.getFullYear()
    const m = d.getMonth().toString().padStart(2, '0')
    const dd = d.getDate().toString().padStart(2, '0')
    return `${y}-${m}-${dd}`
  },
  datetime2stdDatetime: (datetime = new Date()) => {
    const dt = new Date(datetime)
    const y = dt.getFullYear()
    const m = dt.getMonth().toString().padStart(2, '0')
    const dd = dt.getDate().toString().padStart(2, '0')
    const h = dt.getHours().toString().padStart(2, '0')
    const M = dt.getMinutes().toString().padStart(2, '0')
    const s = dt.getSeconds().toString().padStart(2, '0')
    return `${y}-${m}-${dd} ${h}:${M}:${s}`
  }
}