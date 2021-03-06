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
      name: 'TaskPage',
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
    }, {
      path: '/changeBind',
      component: resolve => {
        require(['../views/changeBind'], resolve)
      }
    }, {
      path: '/cardEarn',
      component: resolve => {
        require(['../views/cardEarn'], resolve)
      }
    }, {
      path: '/registerEarn',
      component: resolve => {
        require(['../views/registerEarn'], resolve)
      }
    }, {
      path: '/taskProcess',
      component: resolve => {
        require(['../views/taskProcess'], resolve)
      }
    }, {
      path: '/taskRecord',
      component: resolve => {
        require(['../views/taskRecord'], resolve)
      }
    }, {
      path: '/cashCenter',
      component: resolve => {
        require(['../views/cashCenter'], resolve)
      }
    }, {
      path: '/tixianDetail',
      component: resolve => {
        require(['../views/tixianDetail'], resolve)
      }
    }, {
      path: '/inroom',
      component: resolve => {
        require(['../views/inroom'], resolve)
      }
    }, {
      path: '/about',
      component: resolve => {
        require(['../views/about'], resolve)
      }
    }
  ]
})

// about