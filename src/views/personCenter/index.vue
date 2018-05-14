<!--suppress ALL -->
<template>
  <div class="normal">
      <div class="header">
          <router-link class="header-left" :to="{path:'/'}" tag='div'>
              <i class="el-icon-arrow-left"></i>
          </router-link>
          <div class="header-right">
              <p class="title">个人中心</p>
          </div>
          <div class="info-card">
            <div>
              <p class="title">我的资产</p>
              <span class="money">{{todayaccount|numeral}}</span> <span class="yuan">元</span>
              <p class="rest"> 有0 笔提现</p>
            </div>
            <div>
              <img src="../../assets/home_head.png" width="60">
            </div>
          </div>
        </div>

      <div class="content">
        <div class="flex">
          <div>
            <p>谷壳币：<span class="color-danger">{{todayaccount|numeral}}</span></p>
            <p class="sub-title">1谷壳币 = 1元</p>
          </div>

          <div>
            <el-button type="danger" round size="mini">立即提现</el-button>
          </div>
        </div>

        <div class="options">
          <p>账户相关</p>

          <el-row :gutter="20">
            <el-col :span="6">
              <div class="option-item">
                <i class="el-icon-tickets"></i>
                <p>账户明细</p>
              </div>
            </el-col>
            <el-col :span="6">
              <router-link to="/setting" tag="div" class="option-item">
                <i class="el-icon-setting"></i>
                <p>账户设置</p>
              </router-link>
            </el-col>
            <el-col :span="6">
              <div class="option-item">
                <i class="el-icon-mobile-phone"></i>
                <p>帮助中心</p>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="option-item">
                <i class="el-icon-service"></i>
                <p>关于谷壳</p>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="option-item">
                <i class="el-icon-location-outline"></i>
                <p>谷壳入口</p>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="option-item">
                <i class="el-icon-refresh"></i>
                <p>切换账号</p>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
  </div>
</template>
<script>
import { fetchUserInfo } from '@/api/user'
export default {
  name: 'play',
  data () {
    return {
      ifShowAppModal: false,
      tasklist: [],
      lettertasklist: [],
      todayaccount:1
    }
  },
  components: {
  },
  mounted(){
    fetchUserInfo().then(res => {
      const {data: {data, errcode}} = res
      if (errcode === 0) {
        const {fee} = data
        this.todayaccount = fee
      }
    })
  },
  methods: {
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
