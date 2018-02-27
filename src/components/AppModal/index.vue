<template>
  <div class="normal">
      <div class="modal">
        <i class="el-icon-close" @click="handleCloseModal"></i>
        <img src="@/assets/icon_pop_play_bg.png" alt="">
        <p class="text">任务助手未开启</p>
        <el-button type="warning" class="btn" @click="openAssistant">打开助手</el-button>
        <p class="tips">如遇问题请<span>重新下载助手</span></p>
      </div>
  </div>
</template>

<script>
export default {
  name: 'appmodal',
  methods: {
    openAssistant () {
      location.href = 'chaff://'
      this.$emit('closeModal')
    },
    handleCloseModal () {
      this.$emit('closeModal')
    }
  }
}
</script>
<style lang="less" scoped>
.normal{
  background: rgba(0, 0, 0, 0.6);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  text-align: center;
  .el-icon-close {
    position: absolute;
    right: 0;
    margin: 10px;
    font-weight: 600;
    font-size: 1.8rem;
    color: #c4c4c4;
  }
  .modal {
    position: absolute;
    background: #fff;
    width: 80vw;
    left: 10vw;
    margin: 100px 0;
    border-radius: 4px;
    display: inline-block;
    text-align: center;
    .text {
      font-size: 1.8rem;
    }
    .btn {
      width: 220px;
      margin: 35px 0;
    }
    img {
      width: 160px;
      margin-top: 20px;
      height: 160px;
    }
    .tips {
      color: #c4c4c4;
      font-size: 1.6rem;
      margin-bottom: 25px;
      span {
        color: #eaad98;
      }
    }
  }
}
</style>
