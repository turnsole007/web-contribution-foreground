<template>
  <div class="login_style">
      <h1>Login</h1>
      <div class="error">
        {{ info.data }}
      </div>
      <input type="text" v-model="username" placeholder="用户名"/>
      <br>
      <input type="password" v-model="password" placeholder="密码"/>
      <br>
      <button class="but" @click="login">登录</button>
      <div class="login_href">没有账号？<router-link to="/Register">立即注册</router-link> </div>
   </div>
</template>

<script type='text/javascript'>
import axios from 'axios'
import qs from 'qs'

export default {
  name: 'Login',
  data () {
    return {
      username: '',
      password: '',
      info: {}
    }
  },
  methods: {
    login: function () {
      if (this.username === '' || this.password === '') {
        alert('用户名或密码不能为空')
      } else {
        axios({
          method: 'POST',
          url: '/api/user/login',
          data: {
            username: this.username,
            password: this.password
          },
          transformRequest: [function (data) {
            let ret = ''
            ret = qs.stringify(data)
            return ret
          }]
        })
          .then(Response => {
            window.console.log(Response)
            if (Response.data === 'login success') {
              // TODO  跳转到首页
              localStorage.token = this.username
              alert('登录成功')
              this.$router.push('/index')
            } else {
              this.info = Response
            }
          })
          .catch(error => console.log(error))
      }
    }
  }
}
</script>

<style scoped>
.login_href{
  font-size: 20px;
  margin-top: 20px;
  color: #d4dfeb;
}
</style>
