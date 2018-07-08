<!--suppress ALL -->
<template>
  <div>
      <div class="header">
          <router-link class="header-left" :to="{path:'/person-center'}" tag='div'>
              <i class="el-icon-arrow-left"></i>
          </router-link>
        <div class="header-center">
          <p class="title">关于谷壳</p>
        </div>
      </div>

    <div class="task-list">
      <img src="@/assets/about.png" alt="" width="150"><br>
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
.task-list {
    img {
        width: 100%;
        position: absolute;
        top: -10px;
        left: 0;
        z-index: -1;
    }
}
</style>
