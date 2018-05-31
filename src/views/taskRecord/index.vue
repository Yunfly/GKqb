<!--suppress ALL -->
<template>
  <div>
      <div class="header">
          <router-link class="header-left" :to="{path:'/person-center'}" tag='div'>
              <i class="el-icon-arrow-left"></i>
          </router-link>
        <div class="header-center">
          <p class="title">账户明细</p>
        </div>
      </div>
      <div>
        <TaskList v-for="(item,index) in tasklogs" :key="index" :item={item} />
      </div>
    <div class="task-list" v-if="!tasklogs.length">
      <img src="@/assets/icon_renwu_nor.png" alt="" width="150"><br>
      暂无内容！
    </div>
  </div>
</template>
<script>
import TaskList from "./TaskList";
import { fetchTaskRecord } from "@/api/user";

export default {
  name: "play",
  data() {
    return {
      tasklogs: []
    };
  },
  components: {
    TaskList
  },
  mounted() {
    fetchTaskRecord().then(res => {
        if (res.code != 0) {
          return this.$toast(`${res.code}: ${res.desc}`);
        }
      this.tasklogs = res.tasklogs
    });
  },
  methods: {}
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
