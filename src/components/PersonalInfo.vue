<template>
  <div class="app-container">
    <div class="error"> {{ error.errors }} </div>
    <!-- <div>{{ user }}</div>
    <div> {{ info }} </div>
    <div style="color:red;"> {{ info.contrbdetail }} </div>
    <div style="color:blue;"> {{ info.contrbdetail[0] }} </div>
    <div style="color:green;"> {{ info.contrbdetail[0].GithubId }}</div>
    <div>{{lastWeek }}</div> -->
    <el-row  type="flex" justify="space-around">
      <!-- 基本信息 -->
      <el-col :span="8">
        <div class="info_top_1">
          <div class="info_top_text">
            <div class="text">name：{{user.username}}</div>
            <div class="text">githubId：{{user.github_id}}</div>
            <!-- <div class="text">school：{{user.school}}</div> -->
            <div class="text">email：{{user.email}}</div>
            <div v-if="user.valid">
              <span class="entity_tip">已实名</span>
              <router-link :to=" { name: 'Entity', params: { username: user.username }}">查看实名信息</router-link>
            </div>
            <div v-else>
              <span class="entity_tip">未实名</span>
              <router-link  v-if="!isHomePage" to="/certification">立即实名</router-link>
            </div>
          </div>
        </div>
      </el-col>
      <!-- 代码贡献 -->
      <el-col :span="8">
        <div class="info_top_2">
          <div class="info_top_text">
            <p class="title">codescore</p>
            <p class="score" type="text">{{ Math.round(info.score.codescore) }}</p>
            <el-button type="text" class="info_button" @click="codeRepoDetail=!codeRepoDetail">相关仓库细节</el-button>
          </div>
          <img src="../assets/picture/web_developer.png" class="info_img">
        </div>
        <!-- 代码贡献仓库 -->
        <div class="repo_container_code" v-if="codeRepoDetail">
          <div class="repo_title">代码贡献仓库</div>
          <el-collapse v-for="(contrb,index) in codeRepo(info.contrbdetail)" :key="index" accordion>
            <el-collapse-item>
              <template slot="title">
                <a :href="'https://github.com/'+contrb.RepoName" target="_blank"> {{ contrb.RepoName }} </a>
              </template>
              <div class="repo_detail">
                <div>
                  <img src="../assets/picture/star.png" class="img-container">Star: {{ contrb.StarNum }}
                  <img src="../assets/picture/fork.png" class="img-container">Fork: {{ contrb.ForkNum }}
                </div>
                <li> IssueContrb:{{ contrb.IssueContrb }} </li>
                <li> AddCodeLine:{{ contrb.AddCodeLine }} </li>
                <li> DelCodeLine:{{ contrb.DelCodeLine }} </li>
              </div>
            </el-collapse-item>
          </el-collapse>
        </div>
      </el-col>
      <!-- issue贡献 -->
      <el-col :span="8">
        <div class="info_top_2">
          <div class="info_top_text">
            <p class="title">issuescore</p>
            <p class="score"> {{ Math.round(info.score.issuescore) }}</p>
            <el-button type="text" class="info_button" @click="issueRepoDetail=!issueRepoDetail">相关仓库细节</el-button>
          </div>
          <img src="../assets/picture/presentation_and_discussion.png" class="info_img">
        </div>
        <!-- issue仓库详情 -->
        <div class="repo_container_issue" v-if="issueRepoDetail">
        <div class="repo_title">issue贡献仓库</div>
          <el-collapse v-for="(contrb,index) in issueRepo(info.contrbdetail)" :key="index" accordion>
            <el-collapse-item>
              <template slot="title">
                <a :href="'https://github.com/'+contrb.RepoName" target="_blank"> {{ contrb.RepoName }} </a>
              </template>
              <div class="repo_detail">
                <div>
                  <img src="../assets/picture/star.png" class="img-container">Star: {{ contrb.StarNum }}
                  <img src="../assets/picture/fork.png" class="img-container">Fork: {{ contrb.ForkNum }}
                </div>
                <li> IssueContrb:{{ contrb.IssueContrb }} </li>
                <li> AddCodeLine:{{ contrb.AddCodeLine }} </li>
                <li> DelCodeLine:{{ contrb.DelCodeLine }} </li>
              </div>
            </el-collapse-item>
          </el-collapse>
        </div>
      </el-col>
    </el-row>

    <div class="week-summary-container">
      <div class="title">本 周 得 分</div>
      <div class="tip"> {{ getFormatDate(lastWeek.commit_timestap) }} (Mon.) - {{ getFormatSundayDate(lastWeek.commit_timestap) }} (Sun.) 的得分情况</div>
      <div class="score-container">
        <div class="score"> codescore : {{ Math.round(lastWeek.codescore) }}</div>
        <div class="score"> issuescore : {{ Math.round(lastWeek.issuescore) }}</div>
      </div>
      <div class="detials-container">
        <div class="detials"> commit_num : {{ lastWeek.commit_num }} 次</div>
        <div class="detials"> issue_num : {{ lastWeek.issue_num }} 次</div>
        <div class="detials"> changed_files : {{ lastWeek.changed_files }} 个</div>
        <div class="detials"> add_code_lines : {{ lastWeek.add_code_line }} 行</div>
        <div class="detials"> del_code_lines : {{ lastWeek.del_code_line }} 行</div>
      </div>
    </div>
    <!-- 饼图 -->
    <!-- <div class="piechart-container">
      <pieChart height="100%" width="100%"/>
    </div> -->
    <!-- 每周得分图 -->
    <div class="mixchart-container">
      <weekScoreChart height="100%" width="100%"/>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import weekScoreChart from '@/components/WeekScoreChart'
import { formatDate } from '@/utils/date.js'

export default {
  name: 'PersonalInfo',
  components: { weekScoreChart },
  data () {
    return {
      info: {
        score: {},
        contrbDetail: {}
      },
      user: {},
      error: {},
      lastWeek: {},
      // pieChart: null
      codeRepoDetail: false,
      issueRepoDetail: false,

      isHomePage: false
    }
  },
  mounted () {
    this.getUserContrbScore()
    this.getUserInfo()
    this.getLastWeek()
  },
  // beforeDestroy () {
  //   if (!this.pieChart) {
  //     return
  //   }
  //   this.pieChart.dispose()
  //   this.pieChart = null
  // },
  methods: {
    getUserInfo: function () {
      let path = '/api/user'
      if (JSON.stringify(this.$route.params).search('username') !== -1) {
        path = path + '?username=' + this.$route.params.username
        this.isHomePage = true
      }
      axios.get(path)
        .then(Response => {
          window.console.log(Response)
          if (Response.status === 200) {
            this.user = JSON.parse(Response.data)
          } else {
            this.error = Response.error
          }
        })
        .catch(error => console.log(error))
    },
    getUserContrbScore: function () {
      let path = '/api/contrbscore'
      if (JSON.stringify(this.$route.params).search('username') !== -1) {
        path = path + '?username=' + this.$route.params.username
      }
      axios.get(path)
        .then(Response => {
          window.console.log(Response)
          if (Response.status === 200) {
            this.info = JSON.parse(Response.data)
          } else {
            this.error = Response.error
          }
        })
        .catch(error => console.log(error))
    },
    codeRepo: function (contrbDetail) {
      var codeRepo = []
      for (var i in contrbDetail) {
        if (contrbDetail[i].AddCodeLine + contrbDetail[i].DelCodeLine !== 0) {
          codeRepo.push(contrbDetail[i])
        }
      }
      return codeRepo
    },
    issueRepo: function (contrbDetail) {
      var issueRepo = []
      for (var i in contrbDetail) {
        if (contrbDetail[i].IssueContrb !== 0) {
          issueRepo.push(contrbDetail[i])
        }
      }
      return issueRepo
    },
    getLastWeek: function () {
      let path = '/api/contrbscore/getlastweek'
      if (JSON.stringify(this.$route.params).search('username') !== -1) {
        path = path + '?username=' + this.$route.params.username
      }
      axios.get(path)
        .then(Response => {
          window.console.log(Response)
          if (Response.status === 200) {
            this.lastWeek = JSON.parse(Response.data)
          } else {
            this.error = Response.error
          }
        })
        .catch(error => console.log(error))
    },
    getFormatDate (timeStamp) {
      var date = new Date(timeStamp * 1000)
      // window.console.log(date)
      return formatDate(date, 'yyyy.MM.dd')
    },
    getFormatSundayDate (timeStamp) {
      var date = new Date((timeStamp + 6 * 24 * 3600) * 1000)
      // window.console.log(date)
      return formatDate(date, 'yyyy.MM.dd')
    }
  }
}
</script>

<style lang="scss" scoped>

.el-row {
  margin-bottom: 0px;
  &:last-child {
    margin-bottom: 0;
  }
}

.info_top_1,
.info_top_2 {
  background: #B68814;
  height: 140px;
  border-radius: 10px;
  width: 60%;
  margin:20px 20% 0px 20%;
  padding: 10px;
  color: #fff;
}
.info_top_2 {
  background :#4d704d;
}
.info_top_text {
  float: left;
  margin-left: 5px;
  margin-bottom: 10px;

  p {
    margin: 15px 0px;
  }

  .title {
    font-size: 15px;
  }

  .score {
    font-size: 20px;
  }

  .text {
    font-size: 16px;
    margin-bottom: 5px;
  }

  .entity_tip {
    color: #fff;
    font-size: 12px;
    padding: 4px 6px;
    width: 50px;
    border-radius: 5px;
    // margin-top: 10px;
    // border: 1px solid #395339;
    background: rgb(148, 109, 12);
  }

  a {
    color: rgb(117, 86, 6);
    font-size: 12px;
  }

  a:hover {
    color: #fff;
  }

  .info_button{
    color: #fff;
    font-size: 12px;
    padding: 4px 2px;
    // border: 1px solid #395339;
    background: #395339;
  }
}
.info_img {
  // float: right;
  position: absolute;
  margin-left: 75px;
  display: block;
  height: 120px;
}

.repo_container_code,
.repo_container_issue {
  display: inline-block;
  // background: #545c64;
  background: #556e55;
  border-radius: 10px;
  width: 90%;
  /* 上  右  下  左 */
  margin: 1px 5%;
  padding: 20px;

  .repo_title {
    color: #fff;
    font-size: 18px;
    border-radius: 10px;
    padding: 10px;
  }

  .repo_detail {
    font-size: 14px;

    .img-container {
      width: 30px;
      height: 30px;
      display: inline-block;
      vertical-align: middle;
      margin-top: 5px;
      margin-left: 10px;
    }
  }

  // a {
  //   white-space:nowrap; // 内容不换行
  // }
}

.el-collapse {
  // border: 1px dashed #111111;
  border-radius: 10px;
  margin-bottom: 10px;

}

.el-collapse >>> .el-collapse-item__header {
  border: 1px solid #67717a;
  border-radius: 10px;
  font-size: 16px;
  padding-left: 10px;
}

.el-collapse >>> .el-collapse-item__wrap {
  border: 2px solid #545c64;
  border-radius: 8px;
  font-size: 15px;
  padding-left: 10px;
}

a:hover {
  color: rgb(27, 135, 230);
}

// .piechart-container {
//   display: inline-block;
//   margin: 20px 0 0 8%;
//   width: 46%;
//   height:calc(100vh - 50px);
// }

.mixchart-container {
  display: inline-block;
  margin: 20px 0 0 6%;
  width: 88%;
  height:calc(120vh - 84px);
}

.week-summary-container {
  width: 88%;
  margin: 50px 0 0 6%;
  background: #466475;
  border-radius: 8px;
  color: white;
  padding: 10px;

  .tip {
    margin: 5px;
    margin-left: 2%;
    color: #cfcdcd;
  }

  .title {
    font-size: 22px;
    font-weight: bold;
    text-shadow: 5px 5px 5px black, 0px 0px 2px black;
    margin-left: 2%;
    margin-top: 5px;
  }

  .score-container {
    display: inline-block;
    vertical-align: middle;
    width: 45%;
    margin-left: 5%;

    .score {
      font-size: 20px;
      padding: 3px 0px;
    }

  }

  .detials-container {
    display: inline-block;
    vertical-align: middle;
    width: 45%;

    .detials {
      font-size: 17px;
      padding: 1px 0px;
    }
  }

  // .calendar-chart {
  //   display: inline-block;
  //   width: 69%;
  //   background: #B68814;
  // }
}
</style>
