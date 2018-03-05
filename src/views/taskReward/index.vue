<template>
  <div>
      <div class="header">
          <router-link class="header-left" :to="{path:'/play'}" tag='div'>
              <i class="el-icon-arrow-left"></i>
          </router-link>
          <div class="header-right">
              <p class="title">任务奖励 = {{bonus|numeral}}元试玩 <span v-if="exclusive">+{{appDetail.exclusive|numeral}}元专属</span></p>
              <!--<p>{{countdown|countdownFormat}}</p>-->
          </div>
      </div>
      <div>
        <div class="app-logo">
          <img :src="imageUrl" alt="">
        </div>

        <div class="app-content">
<pre>
一、前往App Store搜索： <span>{{appName}}</span>  约第<span>1</span>位
    找到该图标应用下载安装

二、回本页面，点击<span>开始试玩</span>体验3分钟
    未联网试玩，无法领取奖励

三、满足条件后，回本页面<span>领取奖励</span>
</pre>

          <div class="btn-group">
            <el-button :disabled="!countdown" @click="handleGoAppStore" type="primary">前往App Store</el-button>
            <el-button :disabled="!countdown" @click="handleTrying" type="primary">开始试玩</el-button>
            <el-button type="warning" @click="startPlay">领取奖励</el-button>
          </div>
        </div>
      </div>

       <transition name="fade">
        <RewardModal  v-show="ifShowRewardModal" :appName="appName" :bonus="bonus" :exclusiveBonus="exclusiveBonus" @closeModal="handleCloseModal"/>
      </transition>
  </div>
</template>
<script>
import RewardModal from '@/components/RewardModal'
import { fetchTaskItem } from '@/api/user'
export default {
  name: 'task',
  data () {
    return {
      ifShowRewardModal: false,
      appName: this.$route.query.appName,
      bonus: this.$route.query.bonus,
      urlScheme: this.$route.query.urlScheme,
      exclusive: this.$route.query.exclusive,
      exclusiveBonus: this.$route.query.exclusiveBonus,
      imageUrl: this.$route.query.imageUrl,
      itunesUrl: this.$route.query.itunesUrl,
      appDetail: {},
      countdown: 0
    }
  },
  components: {
    RewardModal
  },
  filters: {
    countdownFormat (value) {
      let h = 0
      let i = 0
      let s = parseInt(value)
      if (s > 60) {
        i = parseInt(s / 60)
        s = parseInt(s % 60)
        if (i > 60) {
          h = parseInt(i / 60)
          i = parseInt(i % 60)
        }
      }
      // 补零
      let zero = (v) => (v >> 0) < 10 ? '0' + v : v
      return [zero(h), zero(i), zero(s)].join(':')
    }
  },
  mounted () {
    const self = this
    fetchTaskItem(this.appName).then(res => {
      const { data } = res
      this.appDetail = data
      this.countdown = data.countdown
    })
      .then(res => {
        const t = setInterval(() => {
          self.countdown--
          if (!self.countdown) {
            clearInterval(t)
          }
        }, 1000)
      })
  },
  methods: {
    startPlay () {
      this.ifShowRewardModal = true
    },
    handleCloseModal () {
      this.ifShowRewardModal = false
    },
    handleTrying () {
      location.href = this.urlScheme
      window.setTimeout(() => {
        window.location.href = this.itunesUrl
      }, 2000)
    },
    handleGoAppStore () {
      location.href = 'itms-apps://'
    }
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
