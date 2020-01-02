<template>
  <div class="app-container">
    <div class="entity-container">
      <el-form ref="form" :model="form" label-width="100px">
        <div style="margin:30px;font-size:20px;">实名信息</div>
        <el-form-item label="真 实 姓 名">
          <div class="entity-item"> {{entity.username}} </div>
        </el-form-item>
        <el-form-item label="github ID" >
            <div class="entity-item"> {{user.github_id}}</div>
        </el-form-item>
        <!-- <el-form-item label="身 份 证 号 码" >
            <el-input v-model="form.Id_number" placeholder="请输入身份证号码"/>
        </el-form-item> -->
        <!-- <el-form-item label="学 校 所 在 地">
            <el-input v-model="form.school_address" placeholder="请选择学校所在地"/>
        </el-form-item> -->
        <el-form-item label="学 校 名 称" >
            <div class="entity-item"> {{user.school}}</div>
        </el-form-item>
        <el-form-item label="所 在 院 系">
          <div class="entity-item"> {{entity.college}}</div>
        </el-form-item>
        <el-form-item label="专 业 名 称">
          <div class="entity-item"> {{entity.major}}</div>
        </el-form-item>
        <el-form-item label="年 级">
          <div class="entity-item"> {{entity.grade}}</div>
        </el-form-item>
        <el-form-item label="入 学 时 间">
          <div class="entity-item"> {{entity.admission_date}}</div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Entity',
  data () {
    return {
      entity: {},
      user: {}
    }
  },
  mounted () {
    this.getUserInfo()
    this.getEntity()
  },
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
    getEntity: function () {
      let path = '/api/entity'
      if (JSON.stringify(this.$route.params).search('username') !== -1) {
        path = path + '?username=' + this.$route.params.username
      }
      axios.get(path)
        .then(Response => {
          window.console.log(Response)
          if (Response.status === 200) {
            this.entity = JSON.parse(Response.data)
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
.entity-container {
  margin-left: 10px;
  border: 1px dashed #545c64;
  width: 50%;
  padding-left: 5%;
}

.entity-item {
    border: 1px solid #d5d5d6;
    border-radius: 5px;
    width: 80%;
    font-size: 15px;
    padding-left: 10px;
  }
</style>
