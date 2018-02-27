import Mock from 'mockjs'

const { Random } = Mock

const tasklist = {"success":true,"data":["{\"bonus\":0,\"isInstalled\":false,\"totalCount\":100,\"appName\":\"测试App\",\"itunesUrl\":\"\",\"exclusive\":true,\"imageUrl\":\"\",\"urlScheme\":\"weixin:\\\/\\\/\",\"remainCount\":40}","{\"bonus\":0,\"isInstalled\":false,\"totalCount\":100,\"appName\":\"微信\",\"itunesUrl\":\"\",\"exclusive\":true,\"imageUrl\":\"\",\"urlScheme\":\"weixin:\\\/\\\/\",\"remainCount\":40}","{\"bonus\":0,\"isInstalled\":false,\"totalCount\":399,\"appName\":\"淘宝\",\"itunesUrl\":\"\",\"exclusive\":true,\"imageUrl\":\"\",\"urlScheme\":\"taobao:\\\/\\\/\",\"remainCount\":23}","{\"bonus\":0,\"isInstalled\":false,\"totalCount\":100,\"appName\":\"QQ\",\"itunesUrl\":\"\",\"exclusive\":false,\"imageUrl\":\"\",\"urlScheme\":\"mqq:\\\/\\\/\",\"remainCount\":46}","{\"bonus\":0,\"isInstalled\":false,\"totalCount\":2000,\"appName\":\"支付宝\",\"itunesUrl\":\"\",\"exclusive\":true,\"imageUrl\":\"\",\"urlScheme\":\"alipay:\\\/\\\/\",\"remainCount\":199}","{\"bonus\":0,\"isInstalled\":false,\"totalCount\":40,\"appName\":\"美团\",\"itunesUrl\":\"\",\"exclusive\":true,\"imageUrl\":\"\",\"urlScheme\":\"imeituan:\\\/\\\/\",\"remainCount\":32}"]}

const taskItem = Mock.mock({
  demo: () => Random.integer(1, 20),
  exclusive: () => Random.integer(1, 20),
  countdown: () => Random.integer(1, 300)
})
export default {
  usercurrent: () => ({
    account: 12,
    totalaccount: 22,
    todayaccount: 14
  }),
  tasklist,
  taskItem
}
