<template>
  <div>
    <h1>个人主页</h1>
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
    <button class="but" @click="getUserContrbScore">刷新</button>
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

<style scoped>

</style>
