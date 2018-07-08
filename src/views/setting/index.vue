<!--suppress ALL -->
<template>
  <div class="normal">
      <div class="header">
          <router-link class="header-left" :to="{path:'/person-center'}" tag='div'>
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
              <p class="item">{{userInfo.user_id}}</p>
            </div>

            <div class="item-box">
              <p class="title">昵称</p>
              <p class="item" v-bind:style="{color:'#000'}">{{userInfo.user_name||'暂无昵称'}}  <span tag="i" @click="changeUserName" class="el-icon-edit"></span></p>

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
import { fetchUserInfo,changeUserName } from "@/api/user";
import { mapGetters, mapActions } from "vuex";
import { MessageBox } from "mint-ui";

export default {
  name: "play",
  data() {
    return {
      ifShowAppModal: false,
      tasklist: [],
      lettertasklist: [],
      phone: ""
    };
  },
  filters: {
    hiddenPhone(item) {
      if (!item) return "暂无绑定号码";
      return (
        item
          .split("")
          .splice(0, 3)
          .join("") +
        "****" +
        item
          .split("")
          .splice(7)
          .join("")
      );
    }
  },
  computed: {
    ...mapGetters(["userInfo"])
  },
  methods: {
    ...mapActions(["saveUserInfo"]),
    changeUserName() {
      MessageBox.prompt('请输入昵称').then(({ value, action }) => {
        changeUserName({
          userInfo:this.userInfo,
          value
        }).then(res=>{
          if(res.code===0){

          } else {
            alert(res.desc)
          }
        })
      });
    }
  },
  mounted() {
    if(this.userInfo.user_id) return
    fetchUserInfo().then(res => {
      const { code } = res;
      if (code === 0) {
        const { fee, token, user_id } = res;
        this.saveUserInfo(res);
      }
    });
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
