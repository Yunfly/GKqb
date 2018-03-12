import axios from 'axios'

// create an axios instance
console.log(process.env)
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 5000, // request timeout
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
      alert('钥匙app访问服务器网络错误 error:200001')
    }
    if (response.data.errcode === 200000) {
      alert('无效的路径 errorcode:200000')
    }
    return response
  },
  error => {
    console.log('err' + error)// for debug
    return Promise.reject(error)
  })

export default service
