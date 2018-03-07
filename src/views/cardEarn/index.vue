<!--suppress ALL -->
<template>
  <div>
      <div class="header">
          <router-link class="header-left" :to="{path:'/'}" tag='div'>
              <i class="el-icon-arrow-left"></i>
          </router-link>
          <div class="header-right">
              <p class="title">办卡赚钱</p>
              <p><span>①预留信息</span> <span>②申请办卡</span>  <span>③银行审批</span></p>
          </div>
      </div>

    <div class="task-list">
      <img src="@/assets/icon_card_nor.png" alt="" width="150"><br>
      即将开放，敬请期待！
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
