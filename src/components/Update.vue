<template>
<div class="app-container">
  <div class="update-container">
    <el-form ref="form" :model="info" label-width="120px">
      <el-form-item label="username">
        <el-input :disabled="true" v-model="info.username"/>
      </el-form-item>
      <el-form-item label="school">
        <el-input v-model="info.school" />
      </el-form-item>
      <el-form-item label="githubid">
        <el-input v-model="info.github_id" />
      </el-form-item>
      <el-form-item label="Email">
        <el-input v-model="info.email" />
      </el-form-item>
      <el-form-item label="新密码">
        <el-input type="password" v-model="password" />
      </el-form-item>
      <el-form-item label="确认密码">
        <el-input type="password" v-model="password2" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="checkPwd">Update</el-button>
        <!-- <el-button @click="onCancel">Cancel</el-button> -->
      </el-form-item>
    </el-form>
  </div>
</div>
  <!-- <div>
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
  </div> -->
</template>

<script>
import axios from 'axios'
import { Message } from 'element-ui'

export default {
  name: 'Update',
  data () {
    return {
      // ischangeInfo: false,
      // ischangePwd: false,
      info: {},
      updatepwd: '',
      password: '',
      password2: ''
    }
  },
  mounted () {
    this.getUserInfo()
    this.ischangeInfo = false
    this.ischangePwd = false
  },
  methods: {
    // f_changePwd: function () {
    //   this.ischangePwd = !this.ischangePwd
    //   if (this.ischangeInfo === true) {
    //     this.ischangeInfo = false
    //   }
    // },
    // f_changeInfo () {
    //   this.ischangeInfo = !this.ischangeInfo
    //   if (this.ischangePwd === true) {
    //     this.ischangePwd = false
    //   }
    // },
    getUserInfo: function () {
      axios.get('/api/user')
        .then(response => {
          window.console.log(response)
          if (response.status === 200) {
            this.info = JSON.parse(response.data)
          } else {
            Message({
              message: response.error,
              type: 'error',
              duration: 5 * 1000
            })
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

<style lang="scss">
.update-container {
  .el-input {
  color: black;
  background-color: rgb(163, 163, 163);
  font-size: 16px;
  width: 40%;
}
}
/* .el-form-item {
  background: rgba(0, 0, 0, 0.1);
} */

</style>
