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
       <br>
      <el-row v-if="tasklogs.length" type="flex" class="row-bg" justify="center">
        <el-pagination
          background
          small
          :page-size="this.page_size"
          layout="prev, pager, next"
          :total="this.total_count"
          @current-change="handleCurrentChange"
          >
        </el-pagination>
      </el-row>

     
    <div class="task-list" v-if="!tasklogs.length">
      <img src="@/assets/icon_renwu_nor.png" alt="" width="150"><br>
      暂无内容！
    </div>
  </div>
</template>
<script>
import TaskList from "./TaskList";
import { fetchTaskRecord } from "@/api/user";
import { Indicator } from "mint-ui";

export default {
  name: "play",
  data() {
    return {
      tasklogs: [],
      page_id: 0,
      page_size: 20,
      total_count: 100
    };
  },
  components: {
    TaskList
  },
  mounted() {
    fetchTaskRecord(this.page_id).then(res => {
      if (res.code != 0) {
        return this.$toast(`${res.code}: ${res.desc}`);
      }
      this.tasklogs = res.tasklogs||[];
      this.page_size = res.page_size;
      this.total_count = res.total_count;
    });
  },
  methods: {
    handleCurrentChange(value) {
      Indicator.open({
        spinnerType: "fading-circle"
      });
      fetchTaskRecord(value - 1)
        .then(res => {
          if (res.code != 0) {
            return this.$toast(`${res.code}: ${res.desc}`);
          }
          this.tasklogs = res.tasklogs;
          this.page_size = res.page_size;
          this.total_count = res.total_count;
          Indicator.close();
        })
        .catch(() => {
          Indicator.close();
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
