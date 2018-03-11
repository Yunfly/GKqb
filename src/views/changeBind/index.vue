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
  import { fetchSmsCode, bindphone } from '@/api/user'
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
  mounted(){
  },
  methods: {
    fetchPhoneCode () {
      var reg = /^1[3|4|5|7|8][0-9]{9}$/; //验证规则

      var flag = reg.test(this.phone); //true
      if(!flag) {
        this.$message({
          message: '请输入正确的手机号',
          type: 'error'
        });
        return
      }
      fetchSmsCode({
        mobile:this.phone
      }).then(res=>{
        const {data: { data,errcode }} = res
        if(errcode === 0) {
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
        }

        if(errcode === 110000){
          alert('手机号码不能为空')
        }
        if(errcode === 110001){
          alert('操作过于频繁，相同手机号码 1 分钟内只能请求 1 次')
        }
      })

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
      bindphone({
        mobile:this.phone,
        code:this.code
      })
        .then(res=>{
          const {data: { data,errcode }} = res
          if(errcode === 0) {
            this.$message({
              message: '手机绑定成功',
              type: 'success'
            });
            this.$router.push('/person-center')
          }
          if(errcode === 110201) {
            alert('短信验证码不能为空')
          }
          if(errcode === 110202) {
            alert('用户手机号不能为空')
          }

          if(errcode === 110203) {
            alert('用户尚未发送过验证码')
          }
          if(errcode === 110204) {
            alert('验证码错误')
          }
          if(errcode === 110205) {
            alert('验证码已过期')
          }
          if(errcode === 110206) {
            alert('token与获取验证码时不一致')
          }
        })

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
    border: none!important;
    border-bottom: 1px solid!important;
    border-radius: 0!important;
  }
  .el-message {
    min-width: 200px!important;
    left: 45%!important;
    top: 20%!important;
    border: none!important;
  }
  .el-message--success, .el-message--error{
    margin: 0 20px;
    background: rgba(0,0,0,0.8);

  }
  .el-message__content {
    color: #fff!important;
  }
</style>
