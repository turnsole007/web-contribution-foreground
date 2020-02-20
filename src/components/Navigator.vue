<template>
  <div>
    <el-menu
      :default-active="activeIndex2"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      router>
      <el-menu-item index="/index">首页</el-menu-item>
      <el-menu-item index="/getranklist">排行榜</el-menu-item>
      <el-menu-item index="/personal">个人主页</el-menu-item>
      <!-- <el-submenu v-if="islogin" index="2" class="right-item">
        <template slot="title">
          <img src="../assets/picture/img.gif" class="user-avatar">
        </template>
        <el-menu-item index="update">信息修改</el-menu-item>
        <el-menu-item @click="logout">登出</el-menu-item>
      </el-submenu> -->
      <div class="right-menu" v-if="islogin">
        <el-dropdown class="avatar-container" trigger="click">
          <div class="avatar-wrapper">
            <img src="../assets/picture/img.gif" class="user-avatar">
            <i class="el-icon-caret-bottom" />
          </div>
          <el-dropdown-menu slot="dropdown" class="user-dropdown">
            <router-link to="update">
              <el-dropdown-item>
                信息修改
              </el-dropdown-item>
            </router-link>
            <el-dropdown-item divided>
              <span style="display:block;" @click="logout">Log Out</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div v-else>
        <el-button type="text" class="right-nav-button" @click="showLoginDialog">登录</el-button>
        <el-button type="text" class="right-nav-button" @click="showRegiterDialog">注册</el-button>
      </div>
    </el-menu>

    <!-- Login -->
    <Login :showLogin='loginDialogVisible' @getIsLogin="getValueFromLogin" @closeLoginDialog="getIsCloseFromLogin"></Login>

    <!-- register -->
    <Register :showRegister='registerDialogVisible' @getIsRegister="getValueFromRegister" @closeRegisterDialog="getIsCloseFromRegister"></Register>
  </div>
</template>

<script>
import axios from 'axios'
import Login from './Login'
import Register from './Register'

export default {
  name: 'Navigator',
  components: {
    Login,
    Register
  },
  data () {
    return {
      // navgator
      activeIndex: '/index',
      activeIndex2: '/index',
      islogin: false,

      loginDialogVisible: false,
      registerDialogVisible: false
    }
  },
  mounted () {
    if (localStorage.getItem('token')) {
      this.islogin = true
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    },
    showLoginDialog () {
      this.loginDialogVisible = !this.loginDialogVisible
    },
    showRegiterDialog () {
      this.registerDialogVisible = !this.registerDialogVisible
    },
    logout () {
      if (localStorage.getItem('token')) {
        axios({
          method: 'POST',
          url: '/api/user/logout'
        })
          .then(Response => {
            window.console.log(Response)
            if (Response.data === 'logout success.') {
              // alert('成功退出!')
              localStorage.removeItem('token')
              this.$router.push('/index')
              this.islogin = false
            } else {
              alert('登出失败，请再次尝试！')
            }
          })
          .catch(error => console.log(error))
      } else {
        alert('尚未登录，请登录！')
        this.$router.push('/login')
      }
    },
    getValueFromLogin (input) {
      this.islogin = input
      this.loginDialogVisible = false
    },
    getValueFromRegister (input) {
      this.loginDialogVisible = input
      this.registerDialogVisible = false
    },
    getIsCloseFromLogin (input) {
      this.loginDialogVisible = input
    },
    getIsCloseFromRegister (input) {
      this.registerDialogVisible = input
    }
  }
}
</script>

<style lang="scss" scoped>
// .right-item {
//   float: right;
//   height: 100%;
// }
// .user-avatar {
//   cursor: pointer;
//   width: 40px;
//   height: 40px;
//   border-radius: 10px;
// }
.right-nav-button {
  float: right;
  height: 100%;
  margin-top: 15px;
  margin-right: 15px;
  padding: 8px 12px;
}
.right-menu {
  float: right;
  height: 100%;

  &:focus {
    outline: none;
  }

  .right-menu-item {
    display: inline-block;
    padding: 0 8px;
    height: 100%;
    font-size: 18px;
    color: #5a5e66;
    vertical-align: text-bottom;

    &.hover-effect {
      cursor: pointer;
      transition: background .3s;

      &:hover {
        background: rgba(0, 0, 0, .025)
      }
    }
  }

  .avatar-container {
    margin-right: 30px;

    .avatar-wrapper {
      margin-top: 10px;
      position: relative;

      .user-avatar {
        cursor: pointer;
        width: 40px;
        height: 40px;
        border-radius: 10px;
      }

      .el-icon-caret-bottom {
        cursor: pointer;
        color: #fff;
        position: absolute;
        right: -20px;
        top: 15px;
        font-size: 12px;
      }
    }
  }
}
</style>
