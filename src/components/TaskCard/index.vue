<template>
  <div class="normal" @click="$emit('handleClick',item)">
      <div class="app-logo">
          <img :src="item.icon" alt="">
      </div>
      <div class="app-content">
          <p class="title">{{ item.name |words}}</p>
          <p v-if="item.status===1" class="process">进行中...</p>
          <p v-else class="suv-title"><span v-if="item.exclusiveBonus>0">有专属，</span> 剩余{{item.remainCount}}份</p>
      </div>
      <div class="task-reward">
          +<span>{{item.bonus|numeral}}</span>元
      </div>
  </div>
</template>
<script>
export default {
  name: 'taskcard',
  props: ['title', 'rest', 'exclusive', 'account', 'item'],
  filters: {
    words (value) {
      return `${value[0]}***`
    }
  },
  mounted(){
    console.log(this)
  }
}
</script>

<style lang="less" scoped>
.normal {
    display: flex;
    margin: 15px;
    align-items: center;
    .app-logo {
        width: 60px;
        border: 1px solid #eee;
        padding: 1px;
        img {
            width: 100%;
            height: auto;
            position: relative;
            top: 1px;
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
