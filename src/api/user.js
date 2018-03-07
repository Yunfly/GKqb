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
