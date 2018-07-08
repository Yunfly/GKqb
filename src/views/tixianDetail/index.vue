<!--suppress ALL -->
<template>
  <div>
      <div class="header">
          <router-link class="header-left" :to="{path:'/person-center'}" tag='div'>
              <i class="el-icon-arrow-left"></i>
          </router-link>
        <div class="header-center">
          <p class="title">{{name}}</p>
        </div>
      </div>
      <div class="content">
        <div class="item-box w200">
              <p class="title">账号</p>
              <el-input v-model.trim="account" class="form-input" placeholder="提现账号或手机号"></el-input>
            </div>

            <div>
              <el-row type="flex" justify="center">
                <el-col :span="12">
                    <el-radio class="button" v-model="money" :label="10">充10元</el-radio>
                </el-col>
                <el-col :span="12">
                  <el-radio class="button" v-model="money" :label="30">充30元</el-radio>
                </el-col>
              </el-row>
              <br>
               <el-row type="flex" justify="center">
               <el-col :span="12">
                  <el-radio  class="button" v-model="money" :label="50">充50元</el-radio>
                </el-col>
                <el-col :span="12">
                  <el-radio class="button" :style="{width:'54px'}" v-model="money" :label="100">充100元</el-radio>
                </el-col>
              </el-row>
              <br>
              <p class="detail" :style="{fontSize:'14px',color:'#999'}">
                消耗 <span>{{money}}</span>  当前 <span> {{userInfo.fee}}</span>
              </p>
              <br>
                <el-button type="danger" @click="tixian" size="small" :style="{width:'200px'}">充值</el-button>

            </div>
      </div>
  </div>
</template>
<script>
import { tixian } from "@/api/user";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "play",
  data() {
    return {
      type: this.$route.query.type,
      name: "",
      account: "",
      money: 10
    };
  },
  computed: {
    ...mapGetters(["userInfo"])
  },
  components: {},
  mounted() {
    const type = this.$route.query.type;
    if (type == 1) {
      this.name = "手机充值";
    }
    if (type == 2) {
      this.name = "支付宝";
    }
    if (type == 3) {
      this.name = "微信";
    }
  },
  methods: {
    tixian() {
      const { account, money } = this;
      if (!account) {
        return this.$toast("请输入正确的提现账号");
      }
      tixian({ receipt_type: this.type, account, money }).then(res => {
        if (res.code == 0) {
          return this.$toast("成功");
        }
        return this.$toast(`${res.code}: ${res.desc}`);
      });
    }
  }
};
</script>

<style lang="less" scoped>
@import "./index.less";
.button {
  border: 1px solid #000;
  padding: 10px 30px;
}
.detail {
  span {
    color: red;
  }
}
.item-box {
  .el-icon-edit {
    color: #c9c9c9;
  }
  margin-bottom: 20px;
  .title {
    font-size: 1.6rem;
    line-height: 2;
    color: #999;
  }
  .item {
    color: #b9b9b9;
    font-size: 2.2rem;
  }
}
.w200 {
  width: 200px;
}
.content {
  margin: 15px;
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

<style lang="less">
.is-checked {
  background: #f9744d !important;
  border: none !important;
  color: #fff !important;
  .el-radio__label {
    color: #fff !important;
    position: relative;
    left: -5px;
  }
}
.el-radio__label {
  position: relative;
  left: -5px;
}
.el-radio__inner {
  display: none !important;
}
</style>
