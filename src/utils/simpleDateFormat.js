export default (source, pattern = 'yyyy-MM-dd HH:mm:ss') => {
  if (!source) {
    return ''
  }

  if (typeof source === 'number') {
    source = new Date(source)
  }

  const dateFields = {
    yy: source.getFullYear() % 100,
    yyyy: source.getFullYear(),
    M: source.getMonth() + 1,
    MM: source.getMonth() + 1,
    d: source.getDate(),
    dd: source.getDate(),
    h: source.getHours() % 12,
    hh: source.getHours() % 12,
    H: source.getHours(),
    HH: source.getHours(),
    m: source.getMinutes(),
    mm: source.getMinutes(),
    s: source.getSeconds(),
    ss: source.getSeconds()
  }

  return pattern.replace(/yyyy|yy|MM|M|dd|d|HH|H|hh|h|mm|m|ss|s/g, (fm) => {
    const value = dateFields[fm]
    if (fm.length === 1) {
      return value
    }
    return `0000${value}`.substr(-fm.length)
  })
}
