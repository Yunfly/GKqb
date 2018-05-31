<!--suppress ALL -->
<template>
  <div>
      <div class="header">
          <router-link class="header-left" :to="{path:'/person-center'}" tag='div'>
              <i class="el-icon-arrow-left"></i>
          </router-link>
        <div class="header-center">
          <p class="title">选择提现方式</p>
        </div>
      </div>
      <div>
      </div>
      <div>
        <h2>推荐方式</h2>
        <div class="box" @click="$router.push({path:'/tixianDetail',query:{type:1}})">
          <el-row :gutter="20" align="middle" justify="center">
            <el-col :offset="3" :span="3">
                    <img src="@/assets/icon_pay_mobile.png" alt="" width="40"><br>
            </el-col>
             <el-col :span="16">
                 <p>手机充值</p>    
                 <p>支持全号码段，到账最快</p>    
            </el-col>
            </el-row>
        </div>
                <h2>其他方式</h2>
        <div class="box"  @click="$router.push({path:'/tixianDetail',query:{type:3}})">
          <el-row :gutter="20" align="middle" justify="center">
            <el-col :offset="3" :span="3">
                    <img src="@/assets/icon_pay_wechat.png" alt="" width="40"><br>
            </el-col>
             <el-col :span="16" class="time">
                 <p>微信提现</p>    
            </el-col>
            </el-row>
        </div>
        <div class="box" @click="$router.push({path:'/tixianDetail',query:{type:2}})">
          <el-row :gutter="20" align="middle" justify="center">
            <el-col :offset="3" :span="3">
                    <img src="@/assets/icon_pay_alipay.png" alt="" width="40"><br>
            </el-col>
             <el-col :span="16" class="time">
                 <p>支付宝提现</p>    
            </el-col>
            </el-row>
        </div>
      </div>
  </div>
</template>
<script>
export default {
  name: "play",
  data() {
    return {};
  },
  components: {},
  mounted() {},
  methods: {}
};
</script>

<style lang="less" scoped>
@import "./index.less";
.box {
  margin-top: 20px;
}
h2 {
  color: #999;
  font-size: 16px;
  margin-left: 22px;
  margin-top: 10px;
}
.time {
  p {
    position: relative;
    top: 10px;
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
