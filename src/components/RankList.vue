<template>
  <div class="ranklist_style">
      <h1>RankList</h1>
      <button class="but_refresh" @click="getRankList">刷新</button>
      <!-- <input type="text" v-model="searchVal"><button>搜索</button> -->
      <div class="error">
        {{ error.errors }}
      </div>
      <table class="table_style" align="center">
        <tr>
          <td class="tab3">序号</td>
          <td class="tab1">用户名</td>
          <td class="tab1">所在院校
            <span class="span_click" @click="orderFn('school',false)">↑</span>
            <span class="span_click" @click="orderFn('school', true)">↓</span>
          </td>
          <td class="tab1">githubID</td>
          <td class="tab2">代码得分
            <span class="span_click" @click="orderFn('codescore',false)">↑</span>
            <span class="span_click" @click="orderFn('codescore', true)">↓</span>
          </td>
          <td class="tab2">讨论得分
            <span class="span_click" @click="orderFn('issuescore',false)">↑</span>
            <span class="span_click" @click="orderFn('issuescore', true)">↓</span>
          </td>
        </tr>
        <tr v-for="(score,index) in list" :key="index">
          <th class="tab3"> {{index+1}} </th>
          <th class="tab1"> {{score.username}} </th>
          <th class="tab1"> {{score.school}} </th>
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
      scorelist: [],
      error: {},
      /* searchVal: '', // 默认输入为空 */
      letter: '', // 排序字段,默认不排序
      original: false // 默认从小到大排序
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
    },
    orderFn: function (letter, original) {
      this.letter = letter
      this.original = original
    }
  },
  computed: {
    list: function () {
      var _this = this
      var arrScores = []
      /* for (var i = 0; i < this.scorelist.length; i++) {
        // 如果匹配成功, 向空数组添加数据
        if (this.scorelist[i].name.search(this.searchVal) !== -1) {
          arrScores.push(this.scorelist[i])
        }
      } */
      for (var i = 0; i < this.scorelist.length; i++) {
        arrScores.push(this.scorelist[i])
      }
      // 升序降序排列
      // false:升序  true:降序
      if (this.letter !== '') {
        arrScores.sort(function (a, b) {
          if (_this.original) {
            return b[_this.letter] - a[_this.letter]
          } else {
            return a[_this.letter] - b[_this.letter]
          }
        })
      }
      return arrScores
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
  width: 15%;
}
.table_style td.tab2, th.tab2 {
  width: 20%;
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
.but_refresh:hover {background-color: rgb(6, 136, 110)}
.but_refresh:active {
    background-color: rgb(6, 136, 110);
    transform: translateY(4px);
  }

.but_sort {
  font-size: 28px;
  background-color:#16A085;
  color:#0c0c0c;
  border: none;
}
.but_sort:hover {background-color: rgb(6, 136, 110)}

.span_click:hover {
  color: #fff;
}
.span_click:active {
  color: #fff;
}
</style>
