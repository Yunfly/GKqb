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
      <p class="title"  v-if="receivedTask">当前任务</p>
      <TaskCard v-if="receivedTask" :turn="true" @handleClick='handleTaskItem' :item='receivedTask' />
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
import { MessageBox } from "mint-ui";

import {
  fetchTaskList,
  fetchTask,
  fetchTaskDetail,
  fetchCancelTask
} from "@/api/user";
import { mapGetters } from "vuex";
export default {
  name: "play",
  data() {
    return {
      ifShowAppModal: false,
      tasklist: [],
      lettertasklist: [],
      receivedTask: undefined
    };
  },
  components: {
    AppModal,
    TaskCard
  },
  mounted() {
    this.fetchTaskList();
    this.fetchTaskDetail();
  },
  computed: {
    ...mapGetters(["userInfo"])
  },
  methods: {
    async fetchTaskDetail() {
      const response = await fetchTaskDetail();
      if (response.code === 0 && response.app_name)
        this.receivedTask = response;
      else this.receivedTask = undefined;
    },
    handleCloseModal() {
      this.ifShowAppModal = false;
    },
    handleTaskItem(item) {
      const self = this;
      console.log({ item });
      if (
        item.code !== 0 &&
        this.receivedTask &&
        item.bundle_id !== this.receivedTask.bundle_id
      ) {
        self.cancelThisTask();
      } else {
        self.$router.replace({ name: "TaskPage", params: { item } });
      }
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
        })
        .catch(err => {
          this.ifShowAppModal = true;
        });
    },
    cancelThisTask() {
      const self = this;
      MessageBox({
        title: "别贪心",
        message: "完成或放弃当前任务才能领新的哦",
        showCancelButton: true,
        confirmButtonText: "继续完成",
        cancelButtonText: "放弃任务"
      }).then(async action => {
        if (action === "cancel") {
          await fetchCancelTask({ userInfo: this.userInfo }).then(res => {
            const { code } = res;
            if (code === 0) {
              self.receivedTask = undefined;
              return;
            }
            alert(res.desc);
          });
        } else {
          return;
        }
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
