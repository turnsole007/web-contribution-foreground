<template>
  <div class="navigator">
    <ul class="nav-list">
      <li class="nav-item"><a href="/#/index" class="link"><span>网站首页</span></a></li>
      <li class="nav-item"><a href="/#/getranklist" class="link"><span>排行榜</span></a></li>
      <li class="nav-item"><a href="/#/personal" class="link"><span>个人主页</span></a></li>
      <li class="nav-item"><a href="#" class="link"><span>个人中心</span></a>
        <ul class="nav-two">
          <li class="nav-two-item"><a href="/#/update" class="link">信息修改</a></li>
          <li class="nav-two-item"><a href="#" class="link" @click="logout">登出</a></li>
        </ul>
      </li>
    </ul>
    <br>
    <p class="line"></p>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Navigator',
  methods: {
    logout () {
      if (localStorage.getItem('token')) {
        axios({
          method: 'POST',
          url: '/api/user/logout'
        })
          .then(Response => {
            window.console.log(Response)
            if (Response.data === 'logout success.') {
              alert('成功退出!')
              localStorage.removeItem('token')
              this.$router.push('/index')
            } else {
              alert('登出失败，请再次尝试！')
            }
          })
          .catch(error => console.log(error))
      } else {
        alert('尚未登录，请登录！')
        this.$router.push('/login')
      }
    }
  }
}
</script>

<style scoped>

.nav-list .nav-item{
  margin-left: 13%;
  position: relative;
  float: left;
  display: block;
  width: 150px;
  height: 53px;
  line-height: 53px;
  text-align: center;
  font-size: 24px;
}

.nav-list .nav-item>a{
  width: 100%;
  height: 100%;
  display: block;
}
.nav-list .nav-item:hover>a{
  background: #0098b0;
  color: #fff;
}

.nav-list .nav-item.active:hover>a{
  background: #FFF;
  color: #05adc8;
}

.nav-list .nav-item.active>a span{
  display: inline-block;
  height: 100%;
  background: #FFF;
  color: #05adc8;
  border-bottom: 2px solid #05adc8;
}

/* 二级 */
.nav-two{
  position: relative;
  background: #0098b0;
}
.nav-two,.nav-three{
  position: absolute;
  display: none;
  color: #fff;
  width: 175px;
}
.nav-item:hover .nav-two,
.nav-two-item:hover .nav-three{
  display: block;
}
.nav-two .nav-two-item,
.nav-three .nav-three-item{
  position: relative;
  height: 34px;
  line-height: 34px;
  text-align: left;
  padding-left: 12px;
}
.nav-two .nav-two-item>a,
.nav-three .nav-three-item>a{
  display: block;
  height: 100%;
  color: #fff;
  font-size: 17px
}
.nav-two .nav-two-item>a span.right{
  position: relative;
  left: 65px;
  font-size: 14px;
  top: 1px;
}

.nav-two .nav-two-item:hover{
  background: #05adc8;
}

/* 第三层级 */
.nav-three{
  width: 200px;
  position: absolute;
  left: 175px;
  top: 0;
  background: #05adc8;
}
a {
  text-decoration:none !important;
}
.line {
  width: 100%;
  height: 1px;
  background-color: #2980DB;
  margin-top: 33px;
}
</style>
