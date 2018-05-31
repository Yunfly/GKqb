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
export default {
  name: "play",
  data() {
    return {
      tasklogs: [
        {
          tasklog_id: "5b0e0b0714e9fa57b5a6861e",
          bonus: 320,
          exclusive_bonus: 310,
          task_name: "测试任务",
          app_id: "1359091826",
          bundle_id: "com.sg.tfsgzsy",
          app_name: "塔防三国志手游",
          app_ico:
            "https://is4-ssl.mzstatic.com/image/thumb/Purple125/v4/9b/6a/69/9b6a693f-68eb-4030-6a51-f24f6fdd4e4b/source/512x512bb.jpg",
          url_scheme: "123",
          time_begin: 1524631883,
          time_end: 1524718283
        },
        {
          tasklog_id: "5b0e0b0714e9fa57b5a6861e",
          bonus: 320,
          exclusive_bonus: 310,
          task_name: "测试任务",
          app_id: "1359091826",
          bundle_id: "com.sg.tfsgzsy",
          app_name: "塔防123三国志手游",
          app_ico:
            "https://is4-ssl.mzstatic.com/image/thumb/Purple125/v4/9b/6a/69/9b6a693f-68eb-4030-6a51-f24f6fdd4e4b/source/512x512bb.jpg",
          url_scheme: "123",
          time_begin: 1524631883,
          time_end: 1524718283
        }
      ]
    };
  },
  components: {
    TaskList
  },
  mounted() {},
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
