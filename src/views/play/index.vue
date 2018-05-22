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
      <TaskCard :turn="true" @errNetWord="ifShowAppModal=true" v-for="(item,key) in tasklist" @handleClick='handleTaskItem' :item='item' :key="key" />
    </div>
    <!-- <div class="task-list">
      <p class="title">标准任务预告</p>
      <TaskCard :turn="false" v-if="item.status!==2" v-for="(item,key) in lettertasklist" @handleClick='handleTaskItem' :item='item' :key="item.id" />
    </div> -->

      <transition name="fade">
        <AppModal  v-show="ifShowAppModal" @closeModal="handleCloseModal"/>
      </transition>
  </div>
</template>
<script>
import AppModal from "@/components/AppModal";
import TaskCard from "@/components/TaskCard";
import { fetchTaskList, fetchTaskListMock, fetchTask } from "@/api/user";
import { mapGetters } from "vuex";
export default {
  name: "play",
  data() {
    return {
      ifShowAppModal: false,
      tasklist: [],
      lettertasklist: []
    };
  },
  components: {
    AppModal,
    TaskCard
  },
  mounted() {
    this.fetchTaskList(null, this.fetchTaskListMock);
  },
  computed: {
    ...mapGetters(["userInfo"])
  },
  methods: {
    handleCloseModal() {
      this.ifShowAppModal = false;
    },
    handleTaskItem(item) {
      this.$router.push({ name: "TaskPage", params: { item } });
      // const{name, bonus, urlScheme, icon,id, bid,enableDate,exclusiveBonus} = item
      // this.fetchTaskList(() => this.$router.push({path: '/task', query: { exclusiveBonus, bid, icon, name, bonus,urlScheme,enableDate,id }}));
    },
    fetchTaskList(successCb, errorCb) {
      //   todo:判断是否开启助手
      fetchTaskList({ userInfo: this.userInfo })
        .then(res => {
          this.ifShowAppModal = false;
          const { apps: data } = res;
          this.tasklist = data;
          successCb ? successCb() : null;
        })
        .catch(err => {
          errorCb ? errorCb() : (this.ifShowAppModal = true);
        });
    },
    fetchTaskListMock() {
      fetchTaskListMock().then(res => {
        this.ifShowAppModal = true;
        const { data: { data, lettertasklist } } = res;
        this.tasklist = data.map(item => JSON.parse(item));
        this.lettertasklist = lettertasklist;
      });
    }
  }
};
</script>

<style lang="less" scoped>
@import "./index.less";
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
