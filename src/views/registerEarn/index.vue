<!--suppress ALL -->
<template>
  <div>
      <div class="header">
          <router-link class="header-left" :to="{path:'/'}" tag='div'>
              <i class="el-icon-arrow-left"></i>
          </router-link>
        <div class="header-center">
          <p class="title">注册赚钱</p>
        </div>
        <router-link to="/taskProcess" tag="div" class="header-right">
          <p class="title">任务进度</p>
        </router-link>
      </div>

    <div class="task-list">
      任务已领完！
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
