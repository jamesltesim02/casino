import createAxios from './createAxios'

const axios = createAxios({
  baseURL: window.NBConfig.API_URL
})

export const login = (params) => axios.post('member/login', params)

export const getBalance = params => axios.post('seamless/QueryAccount', params)
