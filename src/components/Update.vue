<template>
  <div>
    <h1>信息修改</h1>
    <div class="error"> {{ error.errors }} </div>
    <!-- <div> {{ info }} </div> -->
    <div>
      <ul class="text">用户名 :</ul>
      <ul class="info"> {{ this.username }} </ul>
    </div>
    <div>
      <ul class="text">gihubId :</ul>
      <input type="text" v-model="githubid"/>
    </div>
    <div>
      <ul class="text">邮箱 :</ul>
      <input type="text" v-model="email"/>
    </div>
    <div>
      <ul class="text">新密码 :</ul>
      <input type="password" v-model="password"/>
    </div>
    <div>
      <ul class="text">确认密码 :</ul>
      <input type="password" v-model="password2"/>
    </div>
    <button class="but" @click="checkPwd">修改信息</button>
  </div>
</template>

<script>
import axios from 'axios'
import qs from 'qs'

export default {
  name: 'Update',
  data () {
    return {
      info: {},
      username: '',
      githubid: '',
      email: '',
      password: '',
      password2: '',
      error: {}
    }
  },
  mounted () {
    this.getUserInfo()
  },
  methods: {
    getUserInfo: function () {
      axios.get('/api/user')
        .then(Response => {
          window.console.log(Response)
          if (Response.status === 200) {
            this.info = JSON.parse(Response.data)
            this.username = this.info.username
            this.githubid = this.info.github_id
            this.email = this.info.email
            // 是否需要先核对原始密码再做修改
          } else {
            this.error = Response.error
          }
        })
        .catch(error => console.log(error))
    },
    // TODO 检测两次密码是否一样  要在输入框的旁边进行提示
    checkPwd: function () {
      if (this.password === this.password2) {
        this.update()
      } else {
        alert('两次密码输入不一致,请重新输入')
      }
    },
    update: function () {
      axios({
        method: 'PUT',
        // 修改信息的url有问题
        url: '/api/user',
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
          if (Response.data === 'update successfully') {
            alert('修改成功')
          } else if (Response.data === 'update failed') {
            alert('修改失败，请重试')
          } else {
            alert('信息修改出错，出错信息为' + Response.data)
          }
        })
        .catch(error => console.log(error))
    }
  }
}
</script>

<style scoped>
input[type="text"],[type="password"] {
  color:black;
  font-size: 25px;
}
.info {
  text-align: left;
  border:1px solid red;
}
.text {
  text-align: left;
}
</style>
