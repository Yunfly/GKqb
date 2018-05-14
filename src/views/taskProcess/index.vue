<!--suppress ALL -->
<template>
  <div>
      <div class="header">
          <router-link class="header-left" :to="{path:'/registerEarn'}" tag='div'>
              <i class="el-icon-arrow-left"></i>
          </router-link>
        <div class="header-center">
          <p class="title">任务进度</p>
        </div>
      </div>

    <div class="task-list">
      <img src="@/assets/icon_renwu_nor.png" alt="" width="150"><br>
      暂无任务进度！
    </div>
  </div>
</template>
<script>
export default {
  name: 'play',
  data () {
    return {
    }
  },
  components: {
  },
  mounted(){
  },
  methods: {

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
