<template>
  <div class="normal">
            <el-row :gutter="20" align="middle">
            <el-col :span="6" class="time">
                 {{item.item.time_end|moment}}    
            </el-col>
            <el-col :span="5">
                 <img :src="item.item.app_ico" alt="">
            </el-col>
            <el-col :span="13">
                   <div class="task-reward">
          +<span>{{item.item.exclusive_bonus+(item.item.bonus||0)|numeral}}</span>元
          <p class="title">完成了专属任务《{{ item.item.app_name}}》</p>
      </div>
            </el-col>
            </el-row>
  </div>
</template>
<script>
import moment from "moment";
export default {
  name: "taskcard",
  props: ["item"],
  filters: {
    words(value) {
      if (!!value) {
        return value;
      } else {
        return "无法获取app信息";
      }
    },
    moment(value) {
      console.log({ value });
      return moment(value * 1000).format("YYYY/MM/DD HH:mm");
    }
  },
  computed: {}
};
</script>

<style lang="less" scoped>
.normal {
  margin: 15px;
  align-items: center;
  .time {
    font-size: 14px;
    position: relative;
    top: 10px;
    color: #999;
  }
  .app-logo {
    width: 60px;
    border: 1px solid #eee;
    padding: 1px;
    img {
      width: 60px;
      height: auto;
      position: relative;
      top: 1px;
    }
  }
  img {
    width: 100%;
    height: auto;
    position: relative;
    top: 1px;
  }
  .app-content {
    flex: 1;
    padding-left: 10px;
    .title {
      font-size: 1.8rem;
      line-height: 1.5;
    }
    .suv-title {
      color: #c4c4c4;
      font-size: 1.4rem;
    }
  }
  .task-reward {
    span {
      font-size: 1.8rem;
      font-weight: 600;
    }
    .title {
      color: #999;
    }
  }
  .process {
    color: #a7c1eb;
    font-size: 1.4rem;
  }
}
</style>
