<!--suppress ALL -->
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
        <TaskCard v-if="!item.isInstalled" v-for="(item,key) in tasklist" @handleClick='handleTaskItem' :id='item.appName' :key="item.key" :exclusive='item.exclusive' :rest='item.remainCount'  :title='item.appName' :process='item.process' :account='item.bonus'/>
        <p class="title" v-if="lettertasklist">标准任务预告</p>
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
import { fetchTaskList, fetchTaskListMock } from '@/api/user'
export default {
  name: 'play',
  data () {
    return {
      ifShowAppModal: false,
      tasklist: [],
      lettertasklist: []
    }
  },
  components: {
    AppModal, TaskCard
  },
  mounted(){
    this.fetchTaskListMock()
  },
  methods: {
    handleCloseModal () {
      this.ifShowAppModal = false
    },
    handleTaskItem (id) {
      this.fetchTaskList(() => this.$router.push({path: '/task', query: { id: id }}));

    },
    fetchTaskList (successCb) {
      //   todo:判断是否开启助手
      fetchTaskList().then(res => {
        this.ifShowAppModal = false
        const {data: { data, lettertasklist }} = res
        this.tasklist = data.map(item => JSON.parse(item))
        console.log(this.tasklist)
        successCb ? successCb() : null
        this.lettertasklist = lettertasklist
      }).catch((err) => {
        alert(err)
        this.ifShowAppModal = true
      })
    },
    fetchTaskListMock () {
      fetchTaskListMock().then(res => {
        this.ifShowAppModal = false
        const {data: { data, lettertasklist }} = res
        this.tasklist = data.map(item => JSON.parse(item))
        this.lettertasklist = lettertasklist
      })
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
