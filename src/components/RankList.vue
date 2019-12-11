<template>
  <div class="app-container">
    <div class="title-container">
      <h3 class="title">RankList</h3>
    </div>
    <el-button class="rank_refresh" :loading="listLoading" type="primary" @click.native="getRankList">refresh</el-button>
    <el-table
      v-loading="listLoading"
      :data="scorelist"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
      :default-sort = "{prop: 'codescore', order: 'descending'}"
    >
      <el-table-column align="center" label="ID" width="80">
        <template slot-scope="scope">
          {{ scope.$index+1  }}
        </template>
      </el-table-column>
      <el-table-column label="username" width="120" align="center">
        <template slot-scope="scope">
          {{ scope.row.username }}
        </template>
      </el-table-column>
      <el-table-column label="school" prop="school" sortable width="120" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.school }}</span>
        </template>
      </el-table-column>
      <el-table-column label="GithubID" width="120" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.githubid }}</span>
        </template>
      </el-table-column>
      <el-table-column label="codescore" prop="codescore" sortable align="center">
        <template slot-scope="scope">
          {{ scope.row.codescore }}
        </template>
      </el-table-column>
      <el-table-column label="issuescore" prop="issuescore" sortable align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.issuescore }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script type='text/javascript'>
import axios from 'axios'

export default {
  name: 'RankList',
  data () {
    return {
      listLoading: true,
      scorelist: []
    }
  },
  mounted () {
    this.getRankList()
  },
  methods: {
    getRankList: function () {
      this.listLoading = true
      axios.get('/api/contrbscore/getranklist')
        .then(Response => {
          window.console.log(Response)
          if (Response.data.indexOf('errors') === -1) {
            this.scorelist = JSON.parse(Response.data)
            this.listLoading = false
          } else {
            this.error = JSON.parse(Response.data)
            this.listLoading = false
          }
        })
        .catch(error => console.log(error))
    }
  }
}
</script>

<style lang="scss" scoped>
.title-container {
  position: relative;

  .title {
    font-size: 26px;
    color: black;
    text-align: center;
    font-weight: bold;
  }
}
.el-table{
  border-color: #7e7e80;
  font-size: 15px;
  color: black;
}
.rank_refresh{
  float: right;
  width:20%;
  margin-right: 20px;
  margin-bottom:20px;
}
</style>
