<template>
  <div class="app-container">
    <el-form ref="form" :model="form" :rules="rules" label-width="120px">
      <div class="title">填写学生信息</div>
      <div class="alarm">注意：一经填写，不得修改，请如实填写！</div>
      <el-form-item prop="realname" label="真 实 姓 名">
        <el-input v-model="form.realname" placeholder="请输入真实姓名"/>
      </el-form-item>
      <!-- <el-form-item prop="Id_number" label="身 份 证 号 码" >
        <el-input v-model="form.Id_number" placeholder="请输入身份证号码"/>
      </el-form-item> -->
      <!-- <el-form-item label="学 校 所 在 地">
        <el-input v-model="form.school_address" placeholder="请选择学校所在地"/>
      </el-form-item> -->
      <el-form-item prop="school" label="学 校 名 称" >
        <el-select v-model="form.school" clearable filterable placeholder="请选择学校名称">
          <el-option v-for="item in option_schools" :key="item" :label="item" :value="item"/>
        </el-select>
      </el-form-item>
      <el-form-item prop="college" label="所 在 院 系">
        <el-input v-model="form.college"  placeholder="请输入所在院系"/>
      </el-form-item>
      <el-form-item prop="major" label="专 业 名 称">
        <el-input v-model="form.major"  placeholder="请输入专业名称"/>
      </el-form-item>
      <el-form-item prop="grade" label="年 级">
        <el-select v-model="form.grade" placeholder="选择就读年级">
          <el-option v-for="item in option_grades" :key="item.value" :label="item.label" :value="item.value"/>
        </el-select>
      </el-form-item>
      <el-form-item prop="admission_date" label="入 学 时 间">
        <el-col :span="11">
          <el-date-picker v-model="form.admission_date" type="date" placeholder="选择入学时间" style="width: 100%;" />
        </el-col>
      </el-form-item>
      <!-- <el-form-item label="上 传 学 生 证">
        <span>(上传学生证信息页，建议图片格式为：JPEG/BMP/PNG，大小不超过5M)</span>
        <el-upload
          class="avatar-uploader"
          ref="upload"
          action="/api/user/certification"
          :show-file-list="false"
          accept="image/png,image/jpeg,image/gif,image/jpg"
          :before-upload="beforeUpload"
          :auto-upload="false">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item> -->
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from 'axios'
import { Message } from 'element-ui'
import { optionSchools } from '../assets/js/schools'

export default {
  name: 'Certification',
  data () {
    // const validateIdNumber = (rule, value, callback) => {
    //   var regIdNumber = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
    //   if (!value) {
    //     callback(new Error('请输入身份证号码'))
    //   }
    //   if (!regIdNumber.test(value)) {
    //     callback(new Error('请输入正确的身份证号码'))
    //   } else {
    //     callback()
    //   }
    // }
    return {
      form: {
        username: '',
        realname: '',
        Id_number: '',
        // school_address: '',
        school: '',
        college: '',
        major: '',
        grade: '',
        admission_date: '',
        filepath: ''
      },
      rules: {
        realname: [{ required: true, trigger: 'blur', message: '请输入真实姓名' }],
        // Id_number: [{ required: true, trigger: 'blur', validator: validateIdNumber }],
        school: [{ required: true, trigger: 'blur', message: '请输入学校名称' }],
        college: [{ required: true, trigger: 'blur', message: '请输入所在院系' }],
        major: [{ required: true, trigger: 'blur', message: '请输入专业名称' }],
        grade: [{ required: true, trigger: 'blur', message: '请选择年级' }],
        admission_date: [{ required: true, trigger: 'blur', message: '请选择入学时间' }]
      },
      //   imageUrl: '',
      //  file: {},
      //   param: ''
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
      ],
      option_schools: optionSchools
    }
  },
  methods: {
    onSubmit () {
      this.form.username = localStorage.getItem('token')
      axios.post('/api/entity', this.form)
        .then((response) => {
          window.console.log(response)
          if (response.data === 'Real-name authentication completed！') {
            alert('学生信息填写成功')
            this.$router.push('/personal')
          } else {
            Message({
              message: response.data,
              type: 'error',
              duration: 5 * 1000
            })
          }
        }).catch(error => console.log(error))
    },
    onCancel () {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    }
    /* handleAvatarSuccess (res, file) {
      this.from.imageUrl = URL.createObjectURL(file.raw)
      window.console.log(this.form.imageUrl)
    }, */
    // beforeRemove (file, fileList) {
    //   return this.$confirm(`确定移除 ${file.name}？`)
    // },
    // beforeUpload (file) {
    //   const isLt5M = file.size / 1024 / 1024 < 5
    //   if (!isLt5M) {
    //     this.$message.error('上传头像图片大小不能超过 5MB!')
    //   }
    //   this.param = new FormData()
    //   // this.file = file
    //   this.param.append('img', file)
    //   this.imageUrl = file.url
    //   return false
    // }
  }
}
</script>

<style scoped>
.el-form {
  margin-left: 23%;
}
.el-input >>> .el-input__inner{
  width: 50%;
}
.el-textarea >>> .el-textarea__inner {
  width: 60%;
}

.title {
  margin:30px 30px 0px 30px;
  font-size:20px;
}

.alarm {
  font-size: 15px;
  color: rgb(214, 13, 13);
  margin: 5px 0px 30px 30px;
}
/* .avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
} */
</style>
