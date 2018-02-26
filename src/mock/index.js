import Mock from 'mockjs'
import homeAPI from './home'

// 账单相关
Mock.mock(/\/user\/current/, 'get', homeAPI.usercurrent)
Mock.mock(/\/tasklist/, 'get', homeAPI.tasklist)
Mock.mock(/\/taskitem/, 'get', homeAPI.taskItem)

export default Mock
