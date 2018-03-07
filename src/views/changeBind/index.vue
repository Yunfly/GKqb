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
              <el-input :maxlength="4"  v-model.trim="code" class="form-input" placeholder="请输入验证码"></el-input>
            </div>
          </div>
        </div>
        <el-button type="danger" @click="handleSubmit" :disabled="!(code.length===4&&phone.length===11)" class="w120">提交</el-button>
      </div>
  </div>
</template>
<script>
export default {
  name: 'play',
  data () {
    return {
      dateTime: 60,
      validate: true,
      code: '',
      phone: '',
      ifAbleSubmit: false
    }
  },
  filters:{
    hiddenPhone(item){
      return item.split('').splice(0,3).join('')+'****'+item.split('').splice(7).join('')

    }
  },
  watch: {
    code(val){
    }
  },
  mounted(){
  },
  methods: {
    fetchPhoneCode () {
      this.validate = false
      const self = this
      let t = setInterval(() => {
        this.dateTime--
        if (self.dateTime === 0) {
          this.validate = true
          clearInterval(t)
          self.dateTime = 60
        }
      }, 1000)
    },
    handleSubmit(){
      var reg = /^1[3|4|5|7|8][0-9]{9}$/; //验证规则

      var flag = reg.test(this.phone); //true
      if(!flag) {
        this.$message({
          message: '请输入正确的手机号',
          type: 'error'
        });
        return
      }
      this.$message({
        message: '手机绑定成功',
        type: 'success'
      });
     this.$router.push('/person-center')
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

<style>
  .el-input__inner {
    border: none;
    border-bottom: 1px solid;
    border-radius: 0;
  }
  .el-message {
    min-width: 200px;
    left: 45%;
    top: 20%;
    border: none;
  }
  .el-message--success, .el-message--error{
    margin: 0 20px;
    background: rgba(0,0,0,0.8);

  }
  .el-message__content {
    color: #fff!important;
  }
</style>
