import request from '@/utils/request'

export function fetchCurrent () {
  return request({
    url: '/user/current',
    method: 'get'
  })
}

export function fetchTaskList (params) {
  return request({
    url: '/chaff/v1/task/list',
    method: 'get',
    params
  })
}

export function fetchTaskListMock () {
  return request({
    url: '/tasklist',
    method: 'get'
  })
}

export function fetchTaskItem (id) {
  return request({
    url: '/taskitem',
    method: 'get',
    params: { id }
  })
}

export function startUseApp (params) {
  return request({
    url: '/chaff/v1/task/openapp',
    method: 'get',
    params
  })
}

export function fetchTaskStatus (params) {
  return request({
    url: '/chaff/v1/task/status',
    method: 'get',
    params
  })
}

export function completeTask (params) {
  return request({
    url: '/chaff/v1/task/complete',
    method: 'get',
    params
  })
}

export function fetchTask (params) {
  return request({
    url: '/chaff/v1/task/claim',
    method: 'get',
    params
  })
}

export function fetchSmsCode (params) {
  return request({
    url: '/chaff/v1/user/smscode',
    method: 'get',
    params
  })
}

export function bindphone (params) {
  return request({
    url: '/chaff/v1/user/bindphone',
    method: 'get',
    params
  })
}

export function fetchUserInfo (params) {
  return request({
    url: '/chaff/v1/user/info',
    method: 'get',
    params
  })
}

export function fetchAppDetail (bid) {
  return request({
    url: `https://itunes.apple.com/lookup?bid=${bid}`,
    method: 'get',
  })
}
