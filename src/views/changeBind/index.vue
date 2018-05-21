<!--suppress ALL -->
<template>
  <div class="normal">
      <div class="header">
          <router-link class="header-left" :to="{path:'/'}" tag='div'>
              <i class="el-icon-arrow-left"></i>
          </router-link>
          <div class="header-right">
              <p class="title">修改绑定</p>
          </div>
        </div>

      <div class="content">
        <div class="flex">
          <div>
            <div class="item-box">
              <div class="flex align-center">
                <div>
                  <p class="title">手机号</p>
                  <el-input v-model="phone" :maxlength="11" class="form-input" placeholder="请输入手机号"></el-input>
                </div>
                <div class="code">
                  <span v-if="validate||dateTime<=0" @click="fetchPhoneCode">获取验证码</span>
                  <span v-else>{{dateTime}}s</span>
                </div>
              </div>
            </div>

            <div class="item-box w200">
              <p class="title">验证码</p>
              <el-input :maxlength="6"  v-model.trim="code" class="form-input" placeholder="请输入验证码"></el-input>
            </div>
          </div>
        </div>
        <el-button type="danger" @click="handleSubmit" :disabled="!(code.length===6&&phone.length===11)" class="w120">提交</el-button>
      </div>
  </div>
</template>
<script>
import { fetchSmsCode, bindphone } from "@/api/user";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "play",
  data() {
    return {
      dateTime: 60,
      validate: true,
      code: "",
      phone: "",
      ifAbleSubmit: false
    };
  },
  filters: {
    hiddenPhone(item) {
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

    fetchPhoneCode() {
      var reg = /^1[3|4|5|7|8][0-9]{9}$/; // 验证规则

      var flag = reg.test(this.phone); // true
      if (!flag) {
        this.$message({
          message: "请输入正确的手机号",
          type: "error"
        });
        return;
      }
      fetchSmsCode({
        mobile: this.phone,
        userInfo: this.userInfo
      }).then(res => {
        const { code } = res;
        if (code === 0) {
          this.validate = false;
          const self = this;
          let t = setInterval(() => {
            this.dateTime--;
            if (self.dateTime === 0) {
              this.validate = true;
              clearInterval(t);
              self.dateTime = 60;
            }
          }, 1000);
        } else {
          alert(res.desc);
        }
      });
    },
    handleSubmit() {
      var reg = /^1[3|4|5|7|8][0-9]{9}$/; // 验证规则

      var flag = reg.test(this.phone); // true
      if (!flag) {
        this.$message({
          message: "请输入正确的手机号",
          type: "error"
        });
        return;
      }
      bindphone({
        mobile: this.phone,
        sms: this.code,
        userInfo: this.userInfo
      }).then(res => {
        const { code } = res;
        if (code === 0) {
          this.$message({
            message: "手机绑定成功",
            type: "success"
          });
          this.saveUserInfo(res);

          this.$router.push("/person-center");
        } else {
          alert(res.desc);
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

<style>
.el-input__inner {
  border: none !important;
  border-bottom: 1px solid !important;
  border-radius: 0 !important;
}
.el-message {
  min-width: 200px !important;
  left: 45% !important;
  top: 20% !important;
  border: none !important;
}
.el-message--success,
.el-message--error {
  margin: 0 20px;
  background: rgba(0, 0, 0, 0.8);
}
.el-message__content {
  color: #fff !important;
}
</style>
