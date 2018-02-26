<template>
    <div>
       <p class="header">谷壳钱包 <span>Gkqb.com</span></p>
       <div class="dashboard">
           <div class="flex">
                <div >
                    <p class="title">我的资产</p>
                    <p class="amount">{{account|numeral}}</p>
                </div>
                <div class="home-head">
                    <img src="../../assets/home_head.png">
                    <p>我的</p>
                </div>
           </div>
        <p class="title">累计收入：<span>{{todayaccount|numeral}}元</span></p>
        <p class="title">今日收入：<span>{{totalaccount|numeral}}元</span></p>
       </div>
       <div class="flex img-menu">
           <router-link :to="{path:'/play'}" tag='div'>
               <img src="../../assets/home_play_by.png" alt="">
           </router-link>
           <div>
               <img src="../../assets/home_shoutu_by.png" alt="">
           </div>
       </div>
       <br>
       <div class="menu-group">
          <ButtonCard title='办卡赚钱' bgcolor='#5fb985' sub-title='下载应用领取奖励' />
          <ButtonCard title='开店赚钱' bgcolor='#ffbf67' sub-title='月入2000不是梦' />
          <ButtonCard title='每日开奖' bgcolor='#f9734d' sub-title='每日免费抽奖' />
       </div>
    </div>
</template>
<script>
import ButtonCard from '@/components/ButtonCard'
import { fetchCurrent } from '@/api/user'
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
    fetchCurrent().then(res => {
      const {data: { account, todayaccount, totalaccount }} = res
      this.account = account
      this.todayaccount = todayaccount
      this.totalaccount = totalaccount
    })
  }
}
</script>
<style lang="less" scoped>
@import "./index.less";
</style>
