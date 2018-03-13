<template>
  <div class="normal" @click="clickMethod">
      <div class="app-logo">
          <img :src="item.icon" alt="">
      </div>
      <div class="app-content">
          <p class="title">{{ item.name |words}}</p>
          <p v-if="item.status===1" class="process">进行中...</p>
          <p v-else class="suv-title"><span v-if="item.exclusiveBonus>0">有专属，</span> 剩余{{item.remainCount}}份</p>
      </div>
      <div class="task-reward">
          +<span>{{item.bonus+(item.exclusiveBonus||0)|numeral}}</span>元
      </div>
  </div>
</template>
<script>
import { fetchTask } from '@/api/user'
export default {
  name: 'taskcard',
  props: ['title', 'rest', 'exclusive', 'account', 'item', 'turn'],
  filters: {
    words (value) {
      return `${value[0]}***`
    }
  },
  methods: {
    clickMethod () {
      const self = this
      fetchTask({taskId: this.item.id})
        .then((res) => {
          const {data: { errcode }} = res
          if (errcode === 0 || errcode === 100102) {
            if (self.turn) {
              self.$emit('handleClick', self.item)
            }
            return
          }
          if (errcode === 100101) {
            alert('无领取名额')
            return
          }
          alert('errcode:'+ errcode)
        })
        .catch(() => self.$emit('errNetWord'))
          if (self.turn) {
            self.$emit('handleClick', self.item)
          }
        })
    }
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
