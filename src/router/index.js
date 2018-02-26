import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: resolve => {
        require(['../views/home'], resolve)
      }
    },
    {
      path: '/play',
      component: resolve => {
        require(['../views/play'], resolve)
      }
    },
    {
      path: '/task',
      component: resolve => {
        require(['../views/taskReward'], resolve)
      }
    }
  ]
})
