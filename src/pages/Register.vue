<template>
<div class="register">
<div class="cloe" >
<i class="iconfont iconicon-test"></i>
</div>
<div class="logo">
    <i class="iconfont iconnew"></i>
</div>
<div class="username">
   <hminput type="text" placeholder="用户名/手机号码" v-model="form.username" :rumes="/^1\d{4,10}$/" tang="用户名格式错误"></hminput>
</div>
<div class="nickname">
<hminput placeholder="昵称" v-model="form.nickname" :rumes="/^[\u4e00-\u9fa5]{3,8}$/" tang="昵称只能是3-8位的中文"></hminput>
</div>
<div class="password">
<hminput type="password" placeholder="请输入密码" v-model="form.password" :rumes="/^1\d{4,10}$/" tang="密码格式错误"></hminput>
</div>
<div class="logins">
<van-button class="btns" @click="register" type="danger" size="large">注册</van-button>
</div>
<div class="go-register">
  已有账号？立即<router-link to="/login">登录</router-link>
</div>
</div>
</template>

<script>
export default {
  data () {
    return {
      form: {
        username: '',
        nickname: '',
        password: ''
      }
    }
  },
  methods: {
    async register () {
      const res = await this.axios.post('http://localhost:3000/register', this.form)
      console.log(res)
      if (res.data.statusCode === 400) {
        this.$toast.fail('用户名已经存在')
      } else {
        this.$toast.success('注册成功')
        this.$router.push({
          name: 'login',
          params: {
            username: this.form.username,
            password: this.form.password
          }
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.register {
 padding: 20px;
.cloe {
   i {
    font-size: 27px;
   }
  }
.logo {
    text-align: center;
    i {
   font-size: 126px;
   color: #f10215;
  }
 }
.logins {
    margin-top: 20px;
    .btns {
      border-radius: 20px
    }
}
.go-register {
  text-align: center;
  font-size: 16px;
  margin-top: 10px;
  cursor: pointer;
}
}
</style>
