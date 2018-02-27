import request from '@/utils/request'

export function fetchCurrent () {
  return request({
    url: '/user/current',
    method: 'get'
  })
}

export function fetchTaskList () {
  return request({
    url: '/chaff/v1/gettasklist',
    method: 'get'
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
