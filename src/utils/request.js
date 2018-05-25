import axios from 'axios'
import store from '../store/store'

// create an axios instance
console.log(process.env)
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(config => {
  // Do something before request is sent
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// 回调检测
service.interceptors.response.use(
  response => {
    if (response.data.errcode === 200001) {
      alert('你的助手未能访问互联网')
    }
    if (response.data.errcode === 200000) {
      alert('无效的路径 errorcode:200000')
    }
    return response.data
  },
  error => {
    console.log('err' + error)// for debug
    console.log({ error }) // for debug
    const { response } = error
    if (response && !(response.status >= 200 && response.status < 300)) {
      store.commit('CONNECT_STATUS', { connectStatus: false })
    }
    if (error.message === 'Network Error') {
      // location.href = 'chaff://'
      store.commit('CONNECT_STATUS', { connectStatus: false })
    }
    return Promise.reject(error)
  })

export default service
