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
    },
    {
      path: '/person-center',
      component: resolve => {
        require(['../views/personCenter'], resolve)
      }
    },
    {
      path: '/setting',
      component: resolve => {
        require(['../views/setting'], resolve)
      }
    },{
      path: '/changeBind',
      component: resolve => {
        require(['../views/changeBind'], resolve)
      }
    },{
      path: '/cardEarn',
      component: resolve => {
        require(['../views/cardEarn'], resolve)
      }
    }
  ]
})
