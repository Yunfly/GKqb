<!--suppress ALL -->
<template>
  <div class="normal">
      <div class="header">
          <router-link class="header-left" :to="{path:'/'}" tag='div'>
              <i class="el-icon-arrow-left"></i>
          </router-link>
          <div class="header-right">
              <p class="title">账户设置</p>
          </div>
        </div>

      <div class="content">
        <div class="flex">
          <div>
            <div class="item-box">
              <p class="title">谷壳ID</p>
              <p class="item">53163140</p>
            </div>

            <div class="item-box">
              <p class="title">昵称</p>
              <p class="item">暂无昵称</p>
            </div>

            <div class="item-box">
              <p class="title">手机绑定</p>
              <p class="item" v-bind:style="{color:'#000'}">{{phone|hiddenPhone}}  <router-link to="/changeBind" tag="i" class="el-icon-edit"></router-link></p>
            </div>

            <div class="item-box">
              <p class="title">微信绑定</p>
              <p class="item">暂未绑定</p>
            </div>
          </div>
          <div>
            <img src="../../assets/home_head.png" width="60">
          </div>
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
      phone:'',
    }
  },
  filters:{
    hiddenPhone(item){
      if(!item) return '暂无绑定号码'
      return item.split('').splice(0,3).join('')+'****'+item.split('').splice(7).join('')

    }
  },
  components: {
  },
  mounted(){
    fetchUserInfo().then(res => {
      const {data: { data,errcode }} = res
      if(errcode === 0) {
        const {mobile} = data
        this.phone = mobile
      }
      // const {data: { account, todayaccount, totalaccount }} = res
      // this.account = account
      // this.todayaccount = todayaccount
      // this.totalaccount = totalaccount
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
