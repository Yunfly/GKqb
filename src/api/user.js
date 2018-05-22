import request from '@/utils/request'

export async function fetchCurrent() {
  const response = await request({
    url: '/user_message',
    method: 'post',
    data: {
      'msg_id': 21,
      token: 'dd1f8a4b-c6ff-41ce-c10d-0839fc4e3610',
      user_id: '5b02f52ff0988a9e7fd7cf34'
    }
  })
  if (response.code === 0) {
    return response
  } else {
    return request({
      url: '/chaff/v1/user/login_idfa',
      method: 'get'
    })
  }
}

export async function fetchTaskList({ userInfo }) {
  const { user_id, token } = userInfo
  const response = await request({
    url: '/user_message',
    method: 'post',
    data: {
      'msg_id': 31,
      user_id,
      token
    }
  })
  return response
}

export function fetchTaskListMock() {
  return request({
    url: '/tasklist',
    method: 'get'
  })
}

export async function fetchCancelTask({ userInfo }) {
  const { user_id, token } = userInfo
  const response = await request({
    url: '/user_message',
    method: 'post',
    data: {
      'msg_id': 51,
      user_id,
      token,
      desc: '用户取消任务',
      code: 10542
    }
  })
  return response
}

export function fetchTaskItem(id) {
  return request({
    url: '/taskitem',
    method: 'get',
    params: { id }
  })
}

export function startUseApp(params) {
  return request({
    url: '/chaff/v1/task/task_start',
    method: 'get',
    params
  })
}

export function fetchTaskStatus(params) {
  return request({
    url: '/chaff/v1/task/status',
    method: 'get',
    params
  })
}

export async function completeTask({ userInfo }) {
  const { user_id, token } = userInfo

  const response = await request({
    url: '/user_message',
    method: 'post',
    data: {
      'msg_id': 51,
      user_id,
      token,
      desc: '',
      code: 0
    }
  })
  if (response.code === 0) {
    return request({
      url: '/chaff/v1/task/task_end',
      method: 'get'
    })
  } else {
    alert(response.desc)
  }

}

export function fetchTask({ userInfo, apps }) {
  const { user_id, token } = userInfo
  return request({
    url: '/user_message',
    method: 'post',
    data: {
      'msg_id': 41,
      user_id,
      token,
      apps
    }
  })
}

export async function fetchSmsCode({ userInfo, mobile }) {
  const { user_id, token } = userInfo
  const response = await request({
    url: '/user_message',
    method: 'post',
    data: {
      msg_id: 11,
      user_id,
      token,
      idfa: 'idfa000001',
      mobile: mobile.toString()
    }
  })
  return response
}

export async function bindphone({ userInfo, mobile, sms }) {
  const { user_id, token } = userInfo
  const response = await request({
    url: '/user_message',
    method: 'post',
    data: {
      msg_id: 13,
      user_id,
      token,
      sms,
      mobile: mobile.toString()
    }
  })
  return response
}

export function fetchUserInfo(params) {
  return request({
    url: '/user_message',
    method: 'post',
    data: { 'msg_id': 1, 'idfa': 'idfa000001' }
  })
}

export async function fetchAppDetail({ userInfo }) {
  // const itunesResponse = await request({
  //   url: `https://itunes.apple.com/lookup?bid=${bid}`,
  //   method: 'get'
  // })
  const fetchAppList = await request({
    url: '/chaff/v1/task/get_app_bundleID',
    method: 'get'
  })
  if (fetchAppList.code !== 0) return alert('无法获取手机已安装的app')
  const installAppList = fetchAppList.appBundleID
  const { user_id, token } = userInfo
  const response = await request({
    url: '/user_message',
    method: 'post',
    data: {
      'msg_id': 23,
      user_id,
      token
    }
  })
  return Object.assign({ ...response, installAppList })
}

export function changeUserName({ userInfo, value }) {
  const { user_id, token } = userInfo
  return request({
    url: '/user_message',
    method: 'post',
    data: {
      'msg_id': 61,
      user_id,
      token,
      user_name: value
    }
  })
}
