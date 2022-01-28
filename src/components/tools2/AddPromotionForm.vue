<template>
  <div>
    <el-row>
      <!--<el-col :span="16" :offset="4">-->
        <el-card class="box-card" v-loading="loading">
          <div slot="header" class="clearfix">
            <span>新增活动-POST-webform</span>
          </div>
          <el-form ref="form" :model="form" :rules="rules" label-width="80px">
          <el-form-item label="活动名称" prop="name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="活动区域" prop="region">
            <el-select v-model="form.region" placeholder="请选择活动区域">
              <el-option v-for="r in region" :label="r.label" :value="r.value" :key="r.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="活动时间" required>
            <el-col :span="11">
              <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
              <el-time-picker placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
            </el-col>
          </el-form-item>
          <el-form-item label="即时配送" prop="delivery">
            <el-switch v-model="form.delivery"></el-switch>
          </el-form-item>
          <el-form-item label="特殊资源" prop="resource">
            <el-radio-group v-model="form.resource">
              <el-radio v-for="r in resource" :label="r.value" :key="r.value">{{ r.label }}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="活动形式" prop="desc">
            <el-input type="textarea" v-model="form.desc"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('form')">立即创建</el-button>
            <el-button  @click="formInit('form')">重置</el-button>
          </el-form-item>
        </el-form>
          <el-alert
            v-if="alertInfo.isShow"
            :title="alertInfo.txt"
            :type="alertInfo.type"
            center
            show-icon>
          </el-alert>
          <el-card class="box-card">
           <el-row :gutter="20" class="el-row">
             <el-col :span="12">
              <el-input v-model="res.returnCode" disabled>
                <template slot="prepend">code</template>
              </el-input>
             </el-col>
             <el-col :span="12">
              <el-input v-model="res.returnInfo" disabled>
                <template slot="prepend">info</template>
              </el-input>
             </el-col>
           </el-row>
         </el-card>
    </el-card>
      <!--</el-col>-->
    </el-row>
  </div>
</template>

<script>
import axios from 'axios'
import qs from 'qs'
export default {
  name: 'AddUserInfo',
  data () {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        resource: '',
        desc: ''
      },
      res: {returnCode: '', returnInfo: ''},
      region: [],
      resource: [],
      loading: false,
      alertInfo: {isShow: false, type: 'fail', txt: ''},
      interResult: 'success',
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        region: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ],
        date1: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ],
        date2: [
          { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
        ],
        resource: [
          { required: true, message: '请选择活动资源', trigger: 'change' }
        ]
        // desc: [
        //   { required: true, message: '请填写活动形式', trigger: 'blur' }
        // ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.form)
          this.loading = true
          this.alertInfo = {isShow: false, type: 'fail', txt: ''}
          axios({
            method: 'post',
            url: '/tools/addPromotion/', // 访问vue的8080端口，在config/index.js中设置转发到8000端口，并设置不跨域
            data: this.form,
            transformRequest: [function (data) {
              let ret = ''
              ret = qs.stringify(data)
              // 不引入qs post 表单
              // for (let it in data) {
              //   ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
              // }
              return ret
            }],
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
          })
            .then(response => {
              if (response.data.returnCode === 0) {
                this.formInit('form')
                this.loading = false
                this.res = response.data
                this.alertInfo = {isShow: true, type: 'success', txt: response.data.returnInfo}
              } else {
                console.log(response.data)
                this.loading = false
                this.res = response.data
                this.alertInfo = {isShow: true, type: 'error', txt: response.data.returnInfo}
              }
            })
            .catch((error) => {
              console.log(error)
              this.loading = false
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    formInit (formName) {
      this.$refs[formName].resetFields()
    }
  },
  mounted () {
    axios({
      method: 'get',
      url: '/tools/region' // 访问vue的8080端口，在config/index.js中设置转发到8000端口，并设置不跨域
    })
      .then(response => {
        // alert('axios1')
        if (response.data.returnCode === 0) {
          this.region = response.data.returnInfo
        } else {
          console.log(response.data)
        }
      })
      .catch((error) => {
        console.log(error)
      })
    axios({
      method: 'get',
      url: '/tools/resource/' // 访问vue的8080端口，在config/index.js中设置转发到8000端口，并设置不跨域
    })
      .then(response => {
        // alert('axios2')
        if (response.data.returnCode === 0) {
          this.resource = response.data.returnInfo
        } else {
          console.log(response.data)
        }
      })
      .catch((error) => {
        console.log(error)
      })
    // alert('mounted end')
  }
}
</script>

<style>
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  /*.box-card {*/
    /*width: 480px;*/
  /*}*/
</style>
