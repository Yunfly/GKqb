<template>
  <div>
      <div class="header">
          <router-link class="header-left" :to="{path:'/'}" tag='div'>
              <i class="el-icon-arrow-left"></i>
          </router-link>
          <div class="header-right">
              <p class="title">试玩赚钱</p>
              <p><span>①下载应用</span> <span>②打开试玩</span>  <span>③领取现金</span></p>
          </div>
      </div>

    <div class="task-list">
        <p class="title">标准任务</p>
        <TaskCard v-for="item in tasklist" @handleClick='handleTaskItem' :id='item.id' :key="item.id" :exclusive='item.exclusive' :rest='item.rest'  :title='item.name' :process='item.process' :account='item.account'/>
        <p class="title">标准任务预告</p>
        <TaskCard v-for="item in lettertasklist" :key="item.id"  :title='item.name' :process='item.process' :account='item.account' :exclusive='item.exclusive' :rest='item.rest'/>
    </div>

      <transition name="fade">
        <AppModal  v-show="ifShowAppModal" @closeModal="handleCloseModal"/>
      </transition>
  </div>
</template>
<script>
import AppModal from '@/components/AppModal'
import TaskCard from '@/components/TaskCard'
import { fetchTaskList } from '@/api/user'
export default {
  name: 'play',
  data () {
    return {
      ifShowAppModal: true,
      tasklist: [],
      lettertasklist: []
    }
  },
  components: {
    AppModal, TaskCard
  },
  methods: {
    handleCloseModal () {
      this.ifShowAppModal = false
      //   todo:判断是否开启助手
      fetchTaskList().then(res => {
        const {data: { tasklist, lettertasklist }} = res
        this.tasklist = tasklist
        this.lettertasklist = lettertasklist
      })
    },
    handleTaskItem (id) {
      this.$router.push({path: '/task', query: { id: id }})
    }
  }
}
</script>

<style lang="less" scoped>
@import "./index.less";
.fade-enter-active, .fade-leave-active {
  transition: opacity .3s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
