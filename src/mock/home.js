import Mock from 'mockjs'

const { Random } = Mock

const tasklist = { 'errcode': 0, 'data': ['{"icon":"http:\\\/\\\/is4.mzstatic.com\\\/image\\\/thumb\\\/Purple128\\\/v4\\\/63\\\/cc\\\/fd\\\/63ccfd12-2618-d72a-669b-2f8152fa9b9d\\\/source\\\/512x512bb.jpg","bonus":0.5,"totalCount":10000,"id":"5aa3e53ee13823522165bc83","remainCount":9994,"enableDate":1513008000,"exclusiveBonus":0,"status":0,"bid":"com.tencent.mqq","name":"测试QQ","urlScheme":"mqq:\\\/\\\/"}', '{"icon":"http:\\\/\\\/is3.mzstatic.com\\\/image\\\/thumb\\\/Purple128\\\/v4\\\/30\\\/45\\\/e5\\\/3045e50a-fae6-d392-99a0-19dfbb92426b\\\/source\\\/512x512bb.jpg","bonus":1.2,"totalCount":1000,"id":"5aa3e4afe1382373081f1702","remainCount":997,"enableDate":1520611200,"exclusiveBonus":0.3,"status":0,"bid":"com.tencent.xin","name":"微信","urlScheme":"weixin:\\\/\\\/"}', '{"icon":"http:\\\/\\\/is4.mzstatic.com\\\/image\\\/thumb\\\/Purple118\\\/v4\\\/63\\\/cb\\\/ef\\\/63cbeff1-7aa7-0022-4f65-e8211acf50d9\\\/source\\\/512x512bb.jpg","bonus":0.5,"totalCount":3000,"id":"5aa00252e1382343c0244372","remainCount":2997,"enableDate":1517068800,"exclusiveBonus":0,"status":0,"bid":"com.bangluo.xjcs","name":"仙剑传说-精品仙侠手游","urlScheme":"unknow"}', '{"icon":"http:\\\/\\\/is3.mzstatic.com\\\/image\\\/thumb\\\/Purple128\\\/v4\\\/3c\\\/b8\\\/36\\\/3cb83644-ebf6-f428-3717-e15d9fc5f87b\\\/source\\\/512x512bb.jpg","bonus":1.01,"totalCount":1000,"id":"5aa0022ce1382352183a8bc3","remainCount":997,"enableDate":1520352000,"exclusiveBonus":0.19,"status":0,"bid":"com.baidu.map","name":"百度地图-出行导航必备的智能路线规划软件","urlScheme":"unknow"}'] }
const taskItem = Mock.mock({
  demo: () => Random.integer(1, 20),
  exclusive: () => Random.integer(1, 20),
  countdown: () => Random.integer(1, 300)
})

const task_startList = {
  'start_time': '1526957346',
  'code': 0,
  'bundle_id': 'com.apple.mobileSafari'
}

const endTaskResponse = {
  'msg': 'delete success!',
  'code': 0,
  'bundle_id': 'com.apple.mobileSafari'
}
const bundleList = {
  'code': 0,
  'apps': {
    ["com.dianping.dpscope"]: true,
    ["com.douban.frodo"]: false
  }
}
const allApplist = { "apps": [{ "task_name": "大众点评", "bundle_id": "com.dianping.dpscope", "exclusive_bonus": 0, "bonus": 200, "app_ico": "https:\/\/is5-ssl.mzstatic.com\/image\/thumb\/Purple125\/v4\/51\/c6\/dc\/51c6dcb7-5add-c1c7-71d6-51c67f4086fb\/source\/512x512bb.jpg" }, { "task_name": "豆瓣", "bundle_id": "com.douban.frodo", "exclusive_bonus": 0, "bonus": 130, "app_ico": "https:\/\/is4-ssl.mzstatic.com\/image\/thumb\/Purple125\/v4\/9b\/6a\/69\/9b6a693f-68eb-4030-6a51-f24f6fdd4e4b\/source\/512x512bb.jpg" }], "msg_id": 32, "code": 0 }
export default {
  usercurrent: () => ({
    account: 12,
    totalaccount: 22,
    todayaccount: 14
  }),
  tasklist,
  allApplist,
  taskItem,
  task_startList,
  endTaskResponse,
  bundleList
}
