<template>
  <div class="info-container">
    <div class="title-container">
      <h3 class="title">个人主页</h3>
    </div>
    <div class="error"> {{ error.errors }} </div>
    <div>
      <ul class="text">用户名 :</ul>
      <ul class="info"> {{ info.username }} </ul>
    </div>
    <div>
      <ul class="text">代码得分 :</ul>
      <ul class="info"> {{ info.codescore }} </ul>
    </div>
    <div>
      <ul class="text">讨论得分 :</ul>
      <ul class="info"> {{ info.issuescore }} </ul>
    </div>
    <br>
    <el-button class="refresh" type="primary" @click.native="getUserContrbScore">refresh</el-button>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'PersonalInfo',
  data () {
    return {
      info: {},
      error: {}
    }
  },
  mounted () {
    this.getUserContrbScore()
  },
  methods: {
    getUserContrbScore: function () {
      axios.get('/api/contrbscore')
        .then(Response => {
          window.console.log(Response)
          if (Response.status === 200) {
            this.info = JSON.parse(Response.data)
            this.username = this.info.username
            this.githubid = this.info.githubid
            this.codescore = this.info.codescore
            this.issuescore = this.info.issuescore
          } else {
            this.error = Response.error
          }
        })
        .catch(error => console.log(error))
    }
  }
}
</script>

<style lang="scss" scoped>
.info-container {
  text-align: center;
}
.info {
  position: relative;
  display: inline-block;
  width: 300px;
  height: 40px;
  padding: 10px;
  margin-bottom: 10px;
  font-size: 18px;
  color:black;
  text-shadow:1px 1px 1px;
  border-radius: 4px;
  background-color: rgb(163, 163, 163);
}
.text {
  position: relative;
  display: inline-block;
  width: 130px;
  height: 20px;
  font-size: 18px;
  text-shadow:0px 0px 1px;
}

.title-container {
  position: relative;

  .title {
    font-size: 26px;
    color: black;
    text-align: center;
    font-weight: bold;
  }
}
.refresh{
  width:100px;
}
</style>
