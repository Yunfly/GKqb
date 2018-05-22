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
<p>
一、前往App Store搜索： <span>{{item.keyword||''}}</span>  约第<span>{{item.sort||1}}</span>位,
    找到该图标应用下载安装
<br>
二、回本页面，点击<span>开始试玩</span>体验3分钟,
    未联网试玩，无法领取奖励
<br>
三、满足条件后，回本页面<span>领取奖励</span>
</p>
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
import { MessageBox } from "mint-ui";
import RewardModal from "@/components/RewardModal";
import moment from "moment";
import {
  startUseApp,
  fetchTaskStatus,
  fetchCancelTask,
  completeTask,
  fetchAppDetail
} from "@/api/user";
import { mapGetters } from "vuex";
import { setInterval } from "timers";

export default {
  name: "task",
  data() {
    return {
      ifShowRewardModal: false,
      name: "",
      bonus: this.$route.query.bonus,
      urlScheme: this.$route.query.urlScheme,
      exclusive: this.$route.query.exclusiveBonus > 0,
      exclusiveBonus: this.$route.query.exclusiveBonus,
      imageUrl: this.$route.query.icon,
      bid: this.$route.query.bid,
      id: this.$route.query.id,
      enableDate: 1526958540,
      appDetail: {},
      startUseDate: "",
      itunesUrl: "",
      timer: "",
      startUseTimer: "",
      isInstalled: false,
      completeTask: false,
      item: this.$route.params.item || {},
      countdown: 0
    };
  },
  components: {
    RewardModal
  },
  filters: {
    countdownFormat(value) {
      if (value < 0) return 0;
      let h = 0;
      let i = 0;
      let s = parseInt(value);
      if (s > 60) {
        i = parseInt(s / 60);
        s = parseInt(s % 60);
        if (i > 60) {
          h = parseInt(i / 60);
          i = parseInt(i % 60);
        }
      }
      // 补零
      let zero = v => (v >> 0 < 10 ? "0" + v : v);
      return [zero(h), zero(i), zero(s)].join(":");
    }
  },
  computed: {
    ...mapGetters(["userInfo"]),
    showCountDown() {
      return moment(this.enableDate * 1000).isAfter();
    }
    // countdown: {
    //   get: function() {
    //     let now = moment();
    //     let enableDate = moment(this.enableDate * 1000);
    //     console.log({ enableDate });
    //     console.log({ asd: enableDate.diff(now, "seconds") });
    //     return enableDate.diff(now, "seconds");
    //   },
    //   set: function() {}
    // }
  },
  watch: {
    enableDate(val) {
      let now = moment();
      let enableDate = moment(this.enableDate * 1000);
      this.countdown = enableDate.diff(now, "seconds");
    }
  },
  mounted() {
    const self = this;
    fetchAppDetail({ userInfo: this.userInfo, bid: this.item.bundle_id }).then(
      res => {
        if (res.code === 0) {
          this.itunesUrl = res.url_scheme;
          this.name = res.app_name;
          this.imageUrl = res.app_ico;
          this.enableDate = res.time_end;
          this.startUseDate = res.time_start;
        } else {
          alert(res.desc);
        }
      }
    );
    // fetchTaskStatus({
    //   taskId: this.id
    // }).then(res => {
    //   const { data: { data, errcode } } = res;
    //   if (errcode === 0) {
    //     const { startUseDate } = JSON.parse(data);
    //     this.startUseDate = startUseDate;
    //   }
    // });
    this.timer = setInterval(() => {
      fetchAppDetail({ userInfo: this.userInfo }).then(res => {
        const { code } = res;
        if (code === 0) {
          // const { time_start } = res;
          this.item = res;
          this.isInstalled = res.installAppList.includes(this.item.bundle_id);
          // let now = moment();
          // this.startUseDate = time_start;
          // if (this.startUseDate) {
          //   this.completeTask =
          //     now.diff(moment(this.startUseDate * 1000), "minutes") >= 3;
          //   console.log({ completeTask: this.completeTask });
          // } else {
          //   this.completeTask = false;
          // }
        } else {
          clearInterval(this.timer);
        }
      });
    }, 3000);
    const t = setInterval(() => {
      self.countdown--;
      if (!self.countdown) {
        clearInterval(t);
      }
    }, 1000);
  },
  methods: {
    startPlay() {
      this.ifShowRewardModal = true;
    },
    handleCloseModal() {
      this.ifShowRewardModal = false;
    },
    handleTrying() {
      let self = this;
      startUseApp({
        bundle_id: this.item.bundle_id
      }).then(res => {
        if (res.code !== 0) {
          alert("请前往app store 进行下载");
          return;
        } else {
          const { start_time } = res;
          let now = moment();
          self.startUseDate = start_time;
          if (self.startUseDate) {
            self.completeTask =
              now.diff(moment(this.startUseDate * 1000), "minutes") >= 3;
          } else {
            self.completeTask = false;
          }
          self.startUseTimer = setInterval(() => {
            const { start_time } = res;
            let now = moment();
            self.startUseDate = start_time;
            if (self.startUseDate) {
              self.completeTask =
                now.diff(moment(this.startUseDate * 1000), "minutes") >= 3;
            } else {
              self.completeTask = false;
            }
          }, 3000);
        }
        // location.href = this.item.url_scheme;
        // window.setTimeout(() => {
        //   window.location.href = this.itunesUrl;
        // }, 2000);
      });
    },
    handleGoAppStore() {
      location.href = "itms-apps://";
    },
    handleCompleteTask() {
      completeTask({ bundle_id: this.bundle_id, userInfo: this.userInfo }).then(
        res => {
          const { code } = res;
          if (code === 0) {
            this.$message({
              message: "领取成功",
              type: "success",
              onClose: () => this.$router.push("/play")
            });
          } else {
            alert(res.msg);
          }
        }
      );
    },
    leaveThisRoute() {
      const self = this;
      MessageBox({
        title: "别贪心",
        message: "完成或放弃当前任务才能领新的哦?",
        showCancelButton: true,
        confirmButtonText: "继续完成",
        cancelButtonText: "放弃任务"
      }).then(action => {
        if (action === "cancel") {
          fetchCancelTask({ userInfo: this.userInfo }).then(res => {
            const { code } = res;
            if (code === 0) {
              clearInterval(self.timer);
              self.$router.push("/play");
              return;
            }

            alert(res.desc);
          });
        } else {
          return;
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
@import "./index.less";
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
