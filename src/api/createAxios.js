import axios from 'axios'

export default (conf) => {
  const instance = axios.create(conf)

  instance.defaults.timeout = 15000
  instance.defaults.headers.post['Content-Type'] = 'application/jsoncharse=UTF-8'
  // instance.defaults.withCredentials = true

  // 请求拦截器,设置baseurl以及默认的语言参数
  // instance.interceptors.request.use(
  //   (reqConf) => {

  //     if (!reqConf) {
  //       return reqConf
  //     }

  //     const config = { ...reqConf }
  //     const dataKey = {
  //       post: 'data',
  //       get: 'params'
  //     }[config.method]

  //     if (dataKey) {
  //       config[dataKey] = {
  //         lang: getLang(),
  //         frontId: appConfig.frontId,
  //         token: getCasinoUser().token,
  //         ...config[dataKey]
  //       }
  //     }

  //     return config
  //   },
  //   (e) => {
  //     console.log('request error')
  //     return Promise.reject(e)
  //   }
  // )

  // 添加响应拦截器
  instance.interceptors.response.use(
    ({ data }) => {
      if (data.code === 200 || data.code === 201) {
        return data.data
      }
      return Promise.reject(data)
    },
    () => Promise.reject({
      code: 9999,
      msg: '网络连接失败,请稍后再试'
    })
  )

  return instance
}
