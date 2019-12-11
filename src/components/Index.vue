<template>
  <div class="index-container">
    <li v-if="!isLogin"> <h1><router-link to="/personal">{{ username }} !</router-link></h1> </li>
    <li> <h1>{{ msg }}</h1> </li>
    <div>
    <li v-if="isLogin"> <router-link to="/login">登录</router-link> </li>
    <li v-if="isLogin"> <router-link to="/register">注册</router-link> </li>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Index',
  data () {
    return {
      msg: 'Welcome to web-contribution',
      username: '',
      isLogin: true
    }
  },
  mounted () {
    if (localStorage.token) {
      this.isLogin = false
      this.username = localStorage.token
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.index-container {
  text-align: center;
}
a:hover{
  color: #ffd04b;
}
li {
  display: inline-block;
  margin: 20px 20px;
}
a {
  font-size: 40px;
}
</style>
