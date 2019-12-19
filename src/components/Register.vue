<template>
  <el-dialog :visible.sync="showRegister" title="Register Form" @close="closeRegisterDialog" center>
    <div class="register-container">
      <el-form ref="registerForm" :model="registerForm" :rules="registerRules" class="register-form" auto-complete="on" label-position="left">

        <el-form-item prop="username">
          <span class="svg-container">
            <svg-icon icon-class="user" />
          </span>
          <el-input
            ref="username"
            v-model="registerForm.username"
            placeholder="Username"
            name="username"
            type="text"
            tabindex="1"
            auto-complete="on"
          />
        </el-form-item>

        <el-form-item prop="github_id">
          <span class="svg-container">
            <svg-icon icon-class="github" />
          </span>
          <el-input
            ref="github_id"
            v-model="registerForm.github_id"
            placeholder="GithubID"
            name="github_id"
            type="text"
            tabindex="1"
            auto-complete="on"
          />
        </el-form-item>

        <el-form-item prop="email">
          <span class="svg-container">
            <svg-icon icon-class="email" />
          </span>
          <el-input
            ref="email"
            v-model="registerForm.email"
            placeholder="Email"
            name="email"
            type="text"
            tabindex="1"
            auto-complete="on"
          />
        </el-form-item>

        <el-form-item prop="school">
          <span class="svg-container">
            <svg-icon icon-class="school" />
          </span>
          <el-input
            ref="school"
            v-model="registerForm.school"
            placeholder="School"
            name="school"
            type="text"
            tabindex="1"
            auto-complete="on"
          />
        </el-form-item>

        <el-form-item prop="password">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input
            :key="passwordType"
            ref="password"
            v-model="registerForm.password"
            :type="passwordType"
            placeholder="Password"
            name="password"
            tabindex="2"
            auto-complete="on"
            @keyup.enter.native="handleRegister"
          />
          <span class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-form-item>

        <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleRegister">Register</el-button>

      </el-form>
    </div>
  </el-dialog>
</template>

<script>
import axios from 'axios'
import JSEncrypt from 'jsencrypt'
import { Message } from 'element-ui'

export default {
  name: 'Register',
  props: {
    showRegister: {
      type: Boolean,
      default: () => { return false }
    }
  },
  data () {
    const validateUsername = (rule, value, callback) => {
      if (value.length < 1) {
        callback(new Error('Please enter the correct user name'))
      } else {
        callback()
      }
    }
    const validateGithubid = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please enter the githubID'))
      } else {
        callback()
      }
    }
    const validateEmail = (rule, value, callback) => {
      var regEmail = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
      if (!regEmail.test(value)) {
        callback(new Error('Please enter the correct email'))
      } else {
        callback()
      }
    }
    const validateSchool = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please enter your school'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('The password can not be less than 6 characters'))
      } else {
        callback()
      }
    }
    return {
      registerForm: {
        username: '',
        github_id: '',
        email: '',
        school: '',
        password: '',
        valid: '',
        github_loginid: ''
      },
      registerRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        github_id: [{ required: true, trigger: 'blur', validator: validateGithubid }],
        email: [{ required: true, trigger: 'blur', validator: validateEmail }],
        school: [{ required: true, trigger: 'blur', validator: validateSchool }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }],
        valid: [{ required: true, trigger: 'blur' }],
        github_loginid: [{ required: true, trigger: 'blur' }]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    showPwd () {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    encryptedData (publicKey, data) {
      var encryptor = new JSEncrypt()
      encryptor.setPublicKey(publicKey)
      return encryptor.encrypt(data)
    },
    handleRegister () {
      var publicKey = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCkXeTacyYGFCGBhdgL6oQdK58Aask4i7TugkBYMFH8mv1/2NxBb8ncDb5YKeBk00kd0BUNc48Gi6WW5u52hQ+V3/5FsYB6lIw91P5D7epXT/SXX9ePH4HAQ8btMk6T/ogsn02ZYh+d3bVTQpyp3RQJQ8fM5mhCrz9JpxbpLbaHzQIDAQAB'
      this.registerForm.password = this.encryptedData(publicKey, this.registerForm.password)
      this.$refs.registerForm.validate(valid => {
        if (valid) {
          this.loading = true
          axios.post('/api/user/register', this.registerForm)
            .then((response) => {
              window.console.log(response)
              if (response.data === 'register successfully ！') {
                // TODO  跳转到首页
                alert('注册成功')
                this.loading = false
                // this.$router.push('/login')
                // alert('getIsRegister')
                this.$emit('getIsRegister', true)
              } else {
                Message({
                  message: response.data,
                  type: 'error',
                  duration: 5 * 1000
                })
                this.loading = false
              }
            }).catch(() => {
              this.loading = false
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    closeRegisterDialog () {
      this.$emit('closeRegisterDialog', false)
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#283443;
$light_gray:#fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.register-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    // background: rgba(0, 0, 0, 0.1);
    background: $bg;
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.register-container {
  min-height: 100%;
  width: 100%;
  // background-color: $bg;
  overflow: hidden;

  .register-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    // padding: 160px 35px 0;
    padding: 10px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
