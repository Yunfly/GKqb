import axios from 'axios'
import store from '../store/store'

// create an axios instance
console.log(process.env)
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 15000 // request timeout
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
    console.log({ response });
    if (response.data.code !== 0) {
      alert(response.data.desc)
      if (response.data.code === 100032) {
        location.reload()
      }
    }
    return response.data
  },
  error => {
    console.log('err' + error)// for debug
    console.log({ error }) // for debug
    const { response } = error
    if (response && !(response.status >= 200 && response.status < 300)) {
      alert('网络连接异常', response.status)
      store.commit('CONNECT_STATUS', { connectStatus: false })
    }
    if (error.message === 'Network Error') {
      // location.href = 'chaff://'
      alert('网络连接失败')
      store.commit('CONNECT_STATUS', { connectStatus: false })
    }

    if (error.message === 'timeout of 15000ms exceeded') {
      // location.href = 'chaff://'
      alert('网络请求超时15s')
      store.commit('CONNECT_STATUS', { connectStatus: false })
    }
    return Promise.reject(error)
  })

export default service
