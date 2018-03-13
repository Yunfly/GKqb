import axios from 'axios'

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

// respone interceptor
service.interceptors.response.use(
  response => response,
  error => {
    console.log('err' + error)// for debug
    console.log({error})
    if (error.message === 'Network Error') {
      alert(error.message)
      // location.href = 'chaff://'
    }
    return Promise.reject(error)
  })

export default service
