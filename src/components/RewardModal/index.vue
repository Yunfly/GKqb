<template>
  <div class="normal">
      <div class="modal">
        <i class="el-icon-close" @click="handleCloseModal"></i>
        <img src="@/assets/icon_pop_play_bg.png" alt="">
        <p class="text">完成任务</p>
        <p class="text">+<span>{{parseInt(bonus||0)+parseInt(exclusiveBonus||0)|numeral}}</span>元</p>
        <div class="flex">
          <p>试玩赚钱</p>
          <p>{{appName}}</p>
        </div>
        <el-button type="warning" class="btn" @click="openAssistant">完成任务</el-button>
      </div>
  </div>
</template>

<script>
export default {
  name: 'appmodal',
  props: ['appName', 'bonus', 'exclusiveBonus'],
  methods: {
    openAssistant () {
      this.$emit('completeTask')
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
  letter-spacing: 1px;
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
      font-size: 1.6rem;
      color: #f9734d;
      span {
        font-size: 2rem;
        font-weight: 600;
      }
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
  .flex {
    display: flex;
    margin: 30px 25px 0;
    justify-content: space-between;
    p {
      color: #c4c4c4;
      font-size: 1.6rem;
    }
    p+p {
      color: #f9734d;
    }
  }
}
</style>
