import request from '@/utils/request'

export async function fetchCurrent() {
  const response = await request({
    url: '/chaff/v1/universal/all_api_part',
    method: 'get',
    params: {
      'msg_id': 21
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

// 获取服务器任务列表
export async function fetchTaskList() {
  const response = await request({
    url: '/chaff/v1/universal/all_api_part',
    method: 'get',
    params: {
      'msg_id': 31
    }
  })

  let appBundleIDList = []
  if (response.code === 0) {
    appBundleIDList = response.apps.map(x => x.bundle_id)
  }
  const fetchapp = await fetchAppList({ appBundleIDList })
  let applist = []
  if (fetchapp.code === 0) {
    applist = fetchapp.apps || []
  }

  let apps = []
  apps = response.apps.filter(x => {
    return !applist[x.bundle_id] || false
  })

  console.log({ apps });
  return {
    ...response,
    apps
  }
}

export async function fetchCancelTask() {
  const response = await request({
    url: '/chaff/v1/universal/all_api_part',
    method: 'get',
    params: {
      'msg_id': 51,
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

export async function completeTask({ bundle_id }) {

  const response = await request({
    url: '/chaff/v1/universal/all_api_part',
    method: 'get',
    params: {
      'msg_id': 51,
      desc: '',
      code: 0
    }
  })
  if (response.code === 0) {
    return request({
      url: '/chaff/v1/task/task_end',
      method: 'get',
      params: {
        bundle_id
      }
    })
  } else {
    alert(response.desc)
  }

}

export async function fetchTask({ apps }) {
  const response = await request({
    url: '/chaff/v1/universal/get_device_info',
    method: 'get'
  })
  if (response.code === 0 && response.deviceIofo) {
    const { deviceIofo } = response
    return request({
      url: '/chaff/v1/universal/all_api_part',
      method: 'post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      params: {
        'msg_id': 41,
        'apps': apps[0].bundle_id,
        ...deviceIofo
      }
    })
  } else {
    alert(`设备信息异常,code:${response.code}`)
  }

}

export async function fetchSmsCode({ mobile }) {
  const response = await request({
    url: '/chaff/v1/universal/all_api_part',
    method: 'get',
    params: {
      msg_id: 11,
      mobile: mobile.toString()
    }
  })
  return response
}

export async function bindphone({ mobile, sms }) {
  const response = await request({
    url: '/chaff/v1/user/verify_sms',
    method: 'get',
    params: {
      msg_id: 13,
      sms,
      mobile: mobile.toString()
    }
  })
  return response
}

export async function fetchUserInfo(params) {
  const response = await request({
    url: '/chaff/v1/universal/all_api_part',
    method: 'get',
    params: { 'msg_id': 21 }
  })

  if (response.code === 0 && response.user_id !== undefined) return response
  else {
    return request({
      url: '/chaff/v1/universal/all_api_part',
      method: 'get',
      params: { 'msg_id': 1 }
    })
  }
}

// 获取手机已安装的app
export async function fetchAppList({ appBundleIDList }) {
  const response = await request({
    url: '/chaff/v1/task/get_app_bundleID',
    method: 'get',
    params: {
      apps: appBundleIDList.join(",")
    }
  })
  return response
}

export async function fetchAppDetail({ bid }) {
  // const itunesResponse = await request({
  //   url: `https://itunes.apple.com/lookup?bid=${bid}`,
  //   method: 'get'
  // })
  const applist = await fetchAppList({ appBundleIDList: [bid] })
  if (applist.code !== 0) return alert('无法获取手机已安装的app')
  const installAppList = applist.apps
  const response = await request({
    url: '/chaff/v1/universal/all_api_part',
    method: 'get',
    params: {
      'msg_id': 23
    }
  })
  return Object.assign({ ...response, installAppList })
}

export async function fetchTaskDetail() {
  return request({
    url: '/chaff/v1/universal/all_api_part',
    method: 'get',
    params: {
      'msg_id': 23
    }
  })
}

export function changeUserName({ value }) {
  return request({
    url: '/chaff/v1/universal/all_api_part',
    method: 'get',
    params: {
      'msg_id': 61,
      user_name: value
    }
  })
}

export function fetchTaskRecord(id) {
  return request({
    url: '/chaff/v1/universal/all_api_part',
    method: 'get',
    params: {
      'msg_id': 81,
      page_id: id
    }
  })
}

export function tixian({ receipt_type, account, money }) {
  console.log({ receipt_type, account, money })
  return request({
    url: '/chaff/v1/universal/all_api_part',
    method: 'get',
    params: {
      'msg_id': 71,
      receipt_type,
      account,
      money
    }
  })
}

export function ableToOpen({ app_bundleID }) {
  return request({
    url: '/chaff/v1/task/task_open',
    method: 'get',
    params: {
      app_bundleID
    }
  })
}
