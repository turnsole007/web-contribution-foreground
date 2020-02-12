<template>
  <div class="app-container">
    <div class="title-container">
      <h3 class="title">RankList</h3>
    </div>
    <!-- <el-button class="rank_refresh" :loading="listLoading" type="primary" @click.native="getRankList">refresh</el-button> -->
    <!-- <div> {{ list }} </div> -->

    <div class="filter-container">
      <el-input v-model="listQuery.school" placeholder="School" style="width: 200px;" class="filter-item"/>
      <el-select v-model="listQuery.grade" placeholder="Grade" clearable class="filter-item" style="width: 130px">
        <el-option v-for="item in option_grades" :key="item.value" :label="item.label" :value="item.value"/>
      </el-select>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        Search
      </el-button>
    </div>

    <el-table
      v-loading="listLoading"
      :data="tablelist"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
      :default-sort = "{prop: 'codescore', order: 'descending'}"
    >
      <el-table-column align="center" label="ID" width="120">
        <template slot-scope="scope">
          {{ scope.$index+1  }}
        </template>
      </el-table-column>
      <el-table-column label="username" align="center">
        <template slot-scope="scope">
          <!-- <a :href="'/#/personal/'+scope.row.username" target="_blank" rel="noopener noreferrer">{{ scope.row.username }}</a> -->
          <router-link :to="{ name:'Homepage', params: { username: scope.row.username }}"> {{ scope.row.username }} </router-link>
        </template>
      </el-table-column>
      <el-table-column label="school" prop="school" sortable width="120" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.school }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column label="GithubID" width="120" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.githubid }}</span>
        </template>
      </el-table-column> -->
      <el-table-column label="grade" prop="grade" sortable width="120" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.grade }}</span>
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
      list: [],
      tablelist: [],
      listQuery: {
        school: '',
        grade: ''
      },
      option_grades: [
        {
          value: '大一',
          label: '大一'
        }, {
          value: '大二',
          label: '大二'
        }, {
          value: '大三',
          label: '大三'
        }, {
          value: '大四',
          label: '大四'
        }, {
          value: '研一',
          label: '研一'
        }, {
          value: '研二',
          label: '研二'
        }, {
          value: '研三',
          label: '研三'
        }
      ]
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
            this.list = JSON.parse(Response.data)
            this.tablelist = this.list
            this.listLoading = false
          } else {
            this.error = JSON.parse(Response.data)
            this.listLoading = false
          }
        })
        .catch(error => console.log(error))
    },
    handleFilter: function () {
      var listQuery = this.listQuery
      if (listQuery.school || listQuery.grade) {
        this.tablelist = this.multiFilter(this.list, listQuery)
      } else {
        this.tablelist = this.list
      }
    },
    // array:过滤的数据数组，filters：过滤条件数组
    multiFilter: function (array, filters) {
      const filterKeys = Object.keys(filters)
      // 过滤所有数组元素
      return array.filter((item) => {
        // 遍历锅炉条件
        return filterKeys.every(key => {
          if (!filters[key]) return true
          return item[key] && !!~filters[key].indexOf(item[key])
        })
      })
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
  margin-left: 10%;
  width: 80%;
  color: black;
}
.rank_refresh{
  float: right;
  width:15%;
  margin-right: 10%;
  margin-bottom:20px;
}
a {
  color: rgb(27, 135, 230);
}
a:hover {
  color: rgb(180, 45, 52);
}
.filter-container {
  padding-bottom: 10px;
  margin-left: 10%;

  .filter-item {
    display: inline-block;
    vertical-align: middle;
    margin-bottom: 10px;
  }
}
</style>
