<template>
  <div>
    <h1>信息修改</h1>
    <div class="error"> {{ error.errors }} </div>
    <div>
      <ul class="text">用户名 :</ul>
      <ul class="info"> {{ info.username }} </ul>
    </div>
    <button class="but" @click="f_changePwd" style="margin-right:30px;">修改密码</button>
    <button class="but" @click="f_changeInfo">修改详细信息</button>
    <div v-show="ischangePwd">
      <div>
        <ul class="text">新密码 :</ul>
        <input type="password" v-model="password"/>
      </div>
      <div>
        <ul class="text">确认密码 :</ul>
        <input type="password" v-model="password2"/>
      </div>
      <button class="but" @click="checkPwd">修改</button>
    </div>
    <div v-show="ischangeInfo">
      <div>
        <ul class="text">所在院校 :</ul>
        <input type="text" v-model="info.school"/>
      </div>
      <div>
        <ul class="text">gihubId :</ul>
        <input type="text" v-model="info.github_id"/>
      </div>
      <div>
        <ul class="text">邮箱 :</ul>
        <input type="text" v-model="info.email"/>
      </div>
      <button class="but" @click="checkPwd">修改</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Update',
  data () {
    return {
      ischangeInfo: false,
      ischangePwd: false,
      info: {},
      updatepwd: '',
      password: '',
      password2: '',
      error: {}
    }
  },
  mounted () {
    this.getUserInfo()
    this.ischangeInfo = false
    this.ischangePwd = false
  },
  methods: {
    f_changePwd: function () {
      this.ischangePwd = !this.ischangePwd
      if (this.ischangeInfo === true) {
        this.ischangeInfo = false
      }
    },
    f_changeInfo () {
      this.ischangeInfo = !this.ischangeInfo
      if (this.ischangePwd === true) {
        this.ischangePwd = false
      }
    },
    getUserInfo: function () {
      axios.get('/api/user')
        .then(Response => {
          window.console.log(Response)
          if (Response.status === 200) {
            this.info = JSON.parse(Response.data)
          } else {
            this.error = Response.error
          }
        })
        .catch(error => console.log(error))
    },
    // TODO 检测两次密码是否一样  要在输入框的旁边进行提示
    checkPwd: function () {
      if (this.password !== '') {
        if (this.password === this.password2) {
          this.info.password = this.password
          this.updatepwd = 'y'
          this.update()
        } else {
          alert('两次密码输入不一致,请重新输入')
        }
      } else {
        this.update()
      }
    },
    update: function () {
      axios({
        method: 'PUT',
        // 修改信息的url有问题
        url: '/api/user',
        data: {
          user: this.info,
          updatepwd: this.updatepwd
        }
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
.but {
  margin: 15px;
}
</style>
