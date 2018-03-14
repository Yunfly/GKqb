<template>
    <div>
       <p class="header">谷壳钱包 <span>Gkqb.com</span></p>
       <router-link tag="div" :to="{path:'/person-center'}" class="dashboard">
           <div class="flex">
                <div >
                    <p class="title">我的资产</p>
                    <p class="amount">{{account||1|numeral}}</p>
                </div>
                <div class="home-head">
                    <img src="../../assets/home_head.png">
                    <p>我的</p>
                </div>
           </div>
        <p class="title">累计收入：<span>{{todayaccount||1|numeral}}元</span></p>
        <p class="title">今日收入：<span>{{totalaccount|numeral}}元</span></p>
       </router-link>
       <div class="flex img-menu">
           <router-link :to="{path:'/play'}" tag='div'>
               <img src="../../assets/home_play_by.png" alt="">
           </router-link>
          <div class="active-content">
            <img src="../../assets/home_shoutu_by.png" alt="">
            <div class="active">

              <p class="title">已下发任务：</p>
              <p class="sub_title mb5">{{2213213|thousand}}</p>
              <p class="title">已创造收益：</p>
              <p class="sub_title">{{100354132|thousand}}</p>
            </div>
          </div>

       </div>
       <br>
       <div class="menu-group">
          <ButtonCard to="/cardEarn" title='办卡赚钱' bgcolor='#5fb985' sub-title='下载应用领取奖励' />
          <ButtonCard to="/registerEarn" title='注册赚钱' bgcolor='#ffbf67' sub-title='月入2000不是梦' />
          <ButtonCard title='每日开奖' bgcolor='#f9734d' tips="即将开放，敬请等待" sub-title='每日免费抽奖' />
       </div>
    </div>
</template>
<script>
import ButtonCard from '@/components/ButtonCard'
import { fetchUserInfo } from '@/api/user'
export default {
  name: 'home',
  data () {
    return {
      account: '',
      todayaccount: '',
      totalaccount: ''
    }
  },
  components: {
    ButtonCard
  },
  mounted () {
    fetchUserInfo().then(res => {
      const {data: { data,errcode }} = res
      if(errcode === 0) {
        const { fee } = data
        this.account = fee
      }
      // const {data: { account, todayaccount, totalaccount }} = res
      // this.account = account
      // this.todayaccount = todayaccount
      // this.totalaccount = totalaccount
    })
  }
}
</script>
<style lang="less" scoped>
@import "./index.less";
</style>
