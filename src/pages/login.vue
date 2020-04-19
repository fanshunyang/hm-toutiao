<template>
<div class="login">
<div class="cloe" @click="$router.go(-1)">
<i class="iconfont iconicon-test"></i>
</div>
<div class="logo">
    <i class="iconfont iconnew"></i>
</div>
<div class="username">
    <hminput type="text" placeholder="请输入用户名" v-model="username" :rumes="/^1\d{4,10}$/" tang="您输入用户名格式有误"></hminput>
</div>
<div class="password">
  <hminput type="password" placeholder="请输入密码" v-model="password" :rumes="/^\d{3,12}$/" tang="您输入密码格式有误"></hminput>
</div>
<div class="logins">
<btn @click="login">登录</btn>
</div>
<div class="go-register">
  没有账号？立即<router-link to="/register">注册</router-link>
</div>
</div>
</template>
<script>
export default {
  data () {
    return {
      username: '',
      password: ''
    }
  },
  created () {
    console.log(this.$route)
    const { username, password } = this.$route.params
    this.username = username
    this.password = password
  },
  methods: {
    async login () {
      const res = await this.axios.post('/login', {
        username: this.username,
        password: this.password
      })
      console.log(res)
      if (res.data.statusCode === 401) {
        this.$toast.fail('用户名或者密码错误')
      } else {
        console.log(res)
        this.$toast.success('登录成功')
        this.$router.push('/profile')
        const { token, user } = res.data.data
        localStorage.setItem('token', token)
        localStorage.setItem('user_id', user.id)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
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
.btn {
    margin-top: 40px;
}
.go-register {
  text-align: center;
  font-size: 16px;
  margin-top: 10px;
}
}
</style>
