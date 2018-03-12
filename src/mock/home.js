import Mock from 'mockjs'

const { Random } = Mock

const tasklist = {"errcode":0,"data":["{\"icon\":\"http:\\\/\\\/gkqb.runger.net\\\/icon\\\/weixin.jpg\",\"bonus\":3,\"totalCount\":100,\"id\":1,\"remainCount\":40,\"enableDate\":1520953361,\"exclusiveBonus\":0,\"status\":0,\"bid\":\"\",\"name\":\"测试\",\"urlScheme\":\"weixin:\\\/\\\/\"}","{\"icon\":\"http:\\\/\\\/gkqb.runger.net\\\/icon\\\/taobao.jpg\",\"bonus\":12,\"totalCount\":399,\"id\":2,\"remainCount\":23,\"enableDate\":1520953361,\"exclusiveBonus\":1,\"status\":0,\"bid\":\"com.alibaba.taobao\",\"name\":\"æ·˜å\",\"urlScheme\":\"taobao:\\\/\\\/\"}","{\"icon\":\"mqq:\\\/\\\/\",\"bonus\":5,\"totalCount\":100,\"id\":3,\"remainCount\":46,\"enableDate\":1520625967,\"exclusiveBonus\":0,\"status\":0,\"bid\":\"com.tencent.qq\",\"name\":\"QQ\",\"urlScheme\":\"\"}","{\"icon\":\"\",\"bonus\":17,\"totalCount\":2000,\"id\":4,\"remainCount\":199,\"enableDate\":1520953361,\"exclusiveBonus\":1.2,\"status\":0,\"bid\":\"com.alibaba.alipay\",\"name\":\"æ”¯ä»˜å\",\"urlScheme\":\"alipay:\\\/\\\/\"}","{\"icon\":\"http:\\\/\\\/gkqb.runger.net\\\/icon\\\/meituan.jpg\",\"bonus\":2,\"totalCount\":40,\"id\":0,\"remainCount\":32,\"enableDate\":1520525963,\"exclusiveBonus\":0.4,\"status\":0,\"bid\":\"com.meituan.meituan\",\"name\":\"ç¾Žå›¢\",\"urlScheme\":\"imeituan:\\\/\\\/\"}"]}

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
