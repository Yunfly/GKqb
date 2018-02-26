import Mock from 'mockjs'

const { Random } = Mock

const tasklist = Mock.mock({
  'tasklist|5': [{
    name: '火山',
    'id|+1': 120,
    rest: () => Random.integer(1, 20),
    exclusive: () => Random.boolean(),
    account: () => Random.integer(1, 20),
    process: () => Random.boolean()
  }],
  'lettertasklist|5': [{
    name: '火山',
    'id|+1': 12310,
    rest: () => Random.integer(1, 20),
    exclusive: () => Random.boolean(),
    account: () => Random.integer(1, 20),
    process: () => Random.boolean()
  }]
})

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
