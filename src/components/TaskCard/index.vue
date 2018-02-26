<template>
  <div class="normal" @click="$emit('handleClick',id)">
      <div class="app-logo">
          <img src="@/assets/img_1.png" alt="">
      </div>
      <div class="app-content">
          <p class="title">{{ title }}</p>
          <p v-if="process" class="process">进行中...</p>
          <p v-else class="suv-title"><span v-if="exclusive">有专属，</span> 剩余{{rest}}份</p>
      </div>
      <div class="task-reward">
          +<span>{{account|numeral}}</span>元
      </div>
  </div>
</template>
<script>
export default {
  name: 'taskcard',
  props: ['title', 'rest', 'exclusive', 'process', 'account', 'id']
}
</script>

<style lang="less" scoped>
.normal {
    display: flex;
    margin: 15px;
    align-items: center;
    .app-logo {
        width: 60px;
        img {
            width: 100%;
            height: auto;
        }
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
        color: #fb724c;
        span {
            font-size: 1.8rem;
            font-weight: 600;
        }
    }
    .process {
        color: #a7c1eb;
        font-size: 1.4rem;
    }
}
</style>
