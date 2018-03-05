<!--suppress ALL -->
<template>
  <div>
      <div class="header">
          <router-link class="header-left" :to="{path:'/'}" tag='div'>
              <i class="el-icon-arrow-left"></i>
          </router-link>
          <div class="header-right">
              <p class="title">个人中心</p>
          </div>
      </div>
  </div>
</template>
<script>
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
