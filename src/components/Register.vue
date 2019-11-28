<template>
  <div class="register_style">
      <h1>Register</h1>
      <div class="error">
        {{ info.data }}
      </div>
      <input type="text" v-model="username" placeholder="用户名"/>
      <br>
      <input type="text" v-model="githubid" placeholder="githubID"/>
      <br>
      <input type="text" v-model="email" placeholder="邮箱"/>
      <br>
      <input type="password" v-model="password" placeholder="密码"/>
      <br>
      <button class="but" @click="register">注册</button>
   </div>
</template>

<script type='text/javascript'>
import axios from 'axios'
import qs from 'qs'

export default {
  name: 'Register',
  data () {
    return {
      username: '',
      githubid: '',
      email: '',
      password: '',
      info: {}
    }
  },
  methods: {
    register: function () {
      if (this.username === '' || this.password === '' || this.githubid === '' || this.email === '') {
        alert('用户名或密码或githubID或邮箱不能为空')
      } else {
        axios({
          method: 'POST',
          url: '/api/user/register',
          data: {
            username: this.username,
            password: this.password,
            githubid: this.githubid,
            email: this.email
          },
          transformRequest: [function (data) {
            let ret = ''
            ret = qs.stringify(data)
            return ret
          }]
        })
          .then(Response => {
            window.console.log(Response)
            if (Response.data === 'register successfully') {
              alert('注册成功')
              this.$router.push('/login')
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
