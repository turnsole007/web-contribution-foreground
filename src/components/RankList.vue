<template>
  <div class="ranklist_style">
      <h1>RankList</h1>
      <button class="but_refresh" @click="getRankList">刷新</button>
      <div class="error">
        {{ error.errors }}
      </div>
      <table class="table_style" align="center">
        <tr>
          <td class="tab3">序号</td>
          <td class="tab1">用户名</td>
          <td class="tab1">githubID</td>
          <td class="tab2">代码得分</td>
          <td class="tab2">讨论得分</td>
        </tr>
        <tr v-for="(score,index) in scorelist" :key="index">
          <th class="tab3"> {{index+1}} </th>
          <th class="tab1"> {{score.username}} </th>
          <th class="tab1"> {{score.githubid}} </th>
          <th class="tab2"> {{score.codescore}} </th>
          <th class="tab2"> {{score.issuescore}} </th>
        </tr>
      </table>
   </div>
</template>

<script type='text/javascript'>
import axios from 'axios'

export default {
  name: 'RankList',
  data () {
    return {
      scorelist: {},
      error: {},
      info: {}
    }
  },
  mounted () {
    this.getRankList()
  },
  methods: {
    getRankList: function () {
      axios.get('/api/contrbscore/getranklist')
        .then(Response => {
          window.console.log(Response)
          if (Response.data.indexOf('errors') === -1) {
            this.scorelist = JSON.parse(Response.data)
          } else {
            this.error = JSON.parse(Response.data)
          }
        })
        .catch(error => console.log(error))
    }
  }
}
</script>

<style scoped>
.table_style {
  width: 80%;
  border-collapse: collapse;
}
.table_style td, .table_style th {
  font-size: 25px;
  width: 30%;
  border: 1px solid #1ABC9C;
  padding: 3px 7px 2px 7px;
}
.table_style td {
  font-size: 28px;
  padding-top:5px;
  padding-bottom:4px;
  background-color:#16A085;
  color:#0c0c0c;
}
.table_style td.tab1, th.tab1 {
  width: 20%;
}
.table_style td.tab2, th.tab2 {
  width: 25%;
}
.table_style td.tab3, th.tab3 {
  width: 10%;
}
.but_refresh {
  width: 200px;
  min-height: 25px;
  background-color: #1ABC9C;
  border: 1px solid #1ABC9C;
  color: #fff;
  font-size: 22px;
  text-shadow:0 0 2px;
  letter-spacing: 5px;
  padding: 9px 14px;
  margin-bottom: 20px;
  line-height: normal;
  border-radius: 5px;
}
</style>
