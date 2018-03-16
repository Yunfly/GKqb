<template>
  <div>
      <div class="header">
          <div class="header-left" @click="leaveThisRoute">
              <i class="el-icon-arrow-left"></i>
          </div>
          <div class="header-right">
              <p class="title">任务奖励 = {{bonus|numeral}}元试玩 <span v-if="exclusive">+{{exclusiveBonus|numeral}}元专属</span></p>
              <p v-show="showCountDown">{{countdown|countdownFormat}}</p>
          </div>
      </div>
      <div>
        <div class="app-logo">
          <img :src="imageUrl" alt="">
        </div>

        <div class="app-content">
<pre>
一、前往App Store搜索： <span>{{name||''}}</span>  约第<span>1</span>位
    找到该图标应用下载安装

二、回本页面，点击<span>开始试玩</span>体验3分钟
    未联网试玩，无法领取奖励

三、满足条件后，回本页面<span>领取奖励</span>
</pre>
          <div class="btn-group">
            <el-button @click="handleGoAppStore" type="primary">前往App Store</el-button>
            <el-button :disabled="!isInstalled" @click="handleTrying" type="primary">开始试玩</el-button>
            <el-button :disabled="!isInstalled||!completeTask" type="warning" @click="startPlay">领取奖励</el-button>
          </div>
        </div>
      </div>
       <transition name="fade">
        <RewardModal @completeTask="handleCompleteTask"  v-show="ifShowRewardModal" :appName="name" :bonus="bonus" :exclusiveBonus="exclusiveBonus" @closeModal="handleCloseModal"/>
      </transition>
  </div>
</template>
<script>
import { MessageBox } from 'mint-ui';
import RewardModal from '@/components/RewardModal'
import moment from 'moment'
import { startUseApp, fetchTaskStatus, fetchCancelTask, completeTask, fetchAppDetail } from '@/api/user'
export default {
  name: 'task',
  data () {
    return {
      ifShowRewardModal: false,
      name: this.$route.query.name,
      bonus: this.$route.query.bonus,
      urlScheme: this.$route.query.urlScheme,
      exclusive: this.$route.query.exclusiveBonus > 0,
      exclusiveBonus: this.$route.query.exclusiveBonus,
      imageUrl: this.$route.query.icon,
      bid: this.$route.query.bid,
      id: this.$route.query.id,
      enableDate: parseInt(this.$route.query.enableDate, 10),
      appDetail: {},
      startUseDate: '',
      itunesUrl: '',
      timer: '',
      isInstalled: false,
      completeTask: false
    }
  },
  components: {
    RewardModal
  },
  filters: {
    countdownFormat (value) {
      if (value < 0) return 0
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
  computed: {
    showCountDown () {
      return moment(1521030675 * 1000).isAfter()
    },
    countdown: {
      get: function () {
        let now = moment()
        let enableDate = moment(this.enableDate * 1000)
        return enableDate.diff(now, 'seconds')
      },
      set: function () {
      }
    }
  },
  mounted () {
    const self = this
    fetchAppDetail(this.bid)
      .then(res => {
        console.log(res)
        if (res.data.results.length) {
          this.itunesUrl = res.data.results[0].trackViewUrl
        }
      })
    fetchTaskStatus({
      taskId: this.id
    }).then(res => {
      const {data: { data, errcode }} = res
      if (errcode === 0) {
        const {startUseDate} = JSON.parse(data)
        this.startUseDate = startUseDate
      }
    })
    this.timer = setInterval(() => {
      fetchTaskStatus({
        taskId: this.id
      }).then(res => {
        const {data: { data, errcode }} = res
        if (errcode === 0) {
          const {isInstall, startUseDate} = JSON.parse(data)
          this.isInstalled = isInstall
          let now = moment()
          this.startUseDate = startUseDate
          if(this.startUseDate){
            this.completeTask = now.diff(moment(this.startUseDate * 1000), 'minutes') >= 3
          } else {
            this.completeTask = false
          }
        }
      })
    }, 3000)
    const t = setInterval(() => {
      self.countdown--
      if (!self.countdown) {
        clearInterval(t)
      }
    }, 1000)
  },
  methods: {
    startPlay () {
      this.ifShowRewardModal = true
    },
    handleCloseModal () {
      this.ifShowRewardModal = false
    },
    handleTrying () {
      startUseApp({
        taskId: this.id
      })
        .then(() => {
          if (this.urlScheme === 'unknow') {
            alert('请前往app store 进行下载')
            return
          }
          location.href = this.urlScheme
          window.setTimeout(() => {
            window.location.href = this.itunesUrl
          }, 2000)
        })
    },
    handleGoAppStore () {
      location.href = 'itms-apps://'
    },
    handleCompleteTask () {
      completeTask({taskId: this.id})
        .then(res => {
          const {data: { errcode }} = res
          if (errcode === 0) {
            this.$message({
              message: '领取成功',
              type: 'success',
              onClose:()=> this.$router.push('/play')
            })
          }
        })
    },
    leaveThisRoute () {
      const self = this;
      MessageBox({
        title: '别贪心',
        message: '完成或放弃当前任务才能领新的哦?',
        showCancelButton: true,
        confirmButtonText:'继续完成',
        cancelButtonText: '放弃任务'
      })
      .then(action => {
        if(action==='cancel'){
          fetchCancelTask({taskId: this.id})
          .then(res=>{
            const {errcode} = res.data
            if(errcode === 0){
              clearInterval(self.timer)
              self.$router.push('/play')
              return
            }
            if(errcode === 100301){
              alert('尚未接受该任务')
              return
            }
            if(errcode === 100302){
              alert('尚未接受该任务')
              return
            }
            alert(`未知报错：errorcode ${errcode}`)           
          })
        } else {
          return
        }
        });
    
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
