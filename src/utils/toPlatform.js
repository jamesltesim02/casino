const getUserinfo = () => {
  return JSON.parse(localStorage.getItem('nb-casino-userinfo') || 'null') || null
}

export default () => {
  const userinfo = getUserinfo()
  let purl = window.NBConfig.PLATFORM_URL
  let host = `${location.protocol}//${location.host}/`
  const backUrl = encodeURIComponent(`${host}#/member`)
  const loginUrl = encodeURIComponent(`${host}#/login`)
  const depositUrl = encodeURIComponent(`${host}#/member`)

  purl += `?backUrl=${backUrl}&loginUrl=${loginUrl}&depositUrl=${depositUrl}`

  if (userinfo) {
    const token = userinfo.token
    purl += `&token=${token}`
  }

  window.location = purl
}
