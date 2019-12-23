<template>
  <div class="app-container">
    <div class="error"> {{ error.errors }} </div>
    <!-- <div>{{ user }}</div>
    <div> {{ info }} </div>
    <div style="color:red;"> {{ info.contrbdetail }} </div>
    <div style="color:blue;"> {{ info.contrbdetail[0] }} </div>
    <div style="color:green;"> {{ info.contrbdetail[0].GithubId }} </div> -->
    <el-row  type="flex" justify="space-around">
      <el-col :span="5" class="info_top_1">
        <div class="info_top_content">
          <div class="title">name：{{user.username}}</div>
          <div class="title">githubId：{{user.github_id}}</div>
          <div class="title">school：{{user.school}}</div>
          <div class="title">email：{{user.email}}</div>
        </div>
      </el-col>
      <el-col :span="5" class="info_top_2">
        <div class="info_top_text">
          <p class="title">codescore</p>
          <p class="score" type="text">{{ info.score.codescore }}</p>
        </div>
        <div>
          <img src="../assets/picture/web_developer.png" class="info_img">
        </div>
      </el-col>
      <el-col :span="5" class="info_top_2">
        <div class="info_top_text">
          <p class="title">issuescore</p>
          <p class="score">{{info.score.issuescore}}</p>
        </div>
        <img src="../assets/picture/presentation_and_discussion.png" class="info_img">
      </el-col>
    </el-row>
    <div class="repo_container">
      <div class="repo_title">Repository</div>
      <el-collapse v-for="(contrb,index) in info.contrbdetail" :key="index" accordion>
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
    <div class="chart-container">
        <chart height="100%" width="100%"/>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import chart from '@/components/MIxChart'

export default {
  name: 'PersonalInfo',
  components: { chart },
  data () {
    return {
      info: {},
      user: {},
      error: {}
    }
  },
  mounted () {
    this.getUserContrbScore()
    this.getUserInfo()
  },
  methods: {
    getUserInfo: function () {
      let path = '/api/user'
      if (JSON.stringify(this.$route.params).search('username') !== -1) {
        path = path + '?username=' + this.$route.params.username
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
    }
  }
}
</script>

<style lang="scss" scoped>

.info_top_1 {
  background: #B68814;
  height: 140px;
  border-radius: 10px;
  margin:20px 30px;
  padding: 10px;
  color: #fff;
}
.info_top_2 {
  background :#4d704d;
  height: 140px;
  border-radius: 10px;
  margin:20px 30px;
  padding: 10px;
  color: #fff;
}
.info_top_text {
  float: left;
  margin-left: 20px;
  margin-bottom: 10px;

  .title {
    font-size: 15px;
  }

  .score {
    font-size: 20px;
  }
}
.info_img {
  // float: right;
  position: absolute;
  margin-left: 75px;
  display: block;
  height: 120px;
}

.repo_container {
  display: inline-block;
  background: #545c64;
  border-radius: 10px;
  width: 34%;
  /* 上  右  下  左 */
  margin: 20px 0 0 6%;
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

.chart-container {
  margin: 20px 0 0 6%;
  width: 88%;
  height:calc(100vh - 84px);
}
</style>
