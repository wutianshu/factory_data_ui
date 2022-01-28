<template>
  <div>
    <el-row>
      <!--<el-col :span="16" :offset="4">-->
        <el-card class="box-card" v-loading="loading">
          <div slot="header" class="clearfix">
            <span>新增活动-POST-json(父组件传参子组件)</span>
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
          <el-row>
            <el-col :span="10">
              <el-form-item label="开始时间" prop="start_time">
              <el-date-picker
                v-model="form.start_time"
                type="datetime"
                placeholder="选择日期时间"
                default-time="12:00:00">
              </el-date-picker>
            </el-form-item >
            </el-col>
            <el-col :span="10">
              <el-form-item label="结束时间" prop="end_time">
              <el-date-picker
                v-model="form.end_time"
                type="datetime"
                placeholder="选择日期时间"
                default-time="12:00:00">
              </el-date-picker>
            </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="即时配送" prop="delivery">
            <el-switch v-model="form.delivery"></el-switch>
          </el-form-item>
          <el-form-item label="活动类型" prop="type">
            <el-checkbox-group v-model="form.type">
              <el-checkbox v-for="r in type" :label="r.value" name="type" :key="r.value">{{ r.label }}</el-checkbox>
            </el-checkbox-group>
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
export default {
  name: 'AddUserInfo',
  data () {
    return {
      form: {
        name: '',
        region: '',
        start_time: '',
        end_time: '',
        delivery: false,
        resource: '',
        desc: '',
        type: []
      },
      res: {returnCode: '', returnInfo: ''},
      // region: [],
      // resource: [],
      // type: [],
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
        start_time: [
          { type: 'date', required: true, message: '请选择日期时间', trigger: 'change' }
        ],
        end_time: [
          { type: 'date', required: true, message: '请选择日期时间', trigger: 'change' }
        ],
        type: [
          { required: true, message: '请选择活动类型', trigger: 'change' }
        ],
        resource: [
          { required: true, message: '请选择活动资源', trigger: 'change' }
        ],
        desc: [
          { required: false, message: '请填写活动形式', trigger: 'blur' }
        ]
      }
    }
  },
  props: ['region', 'type', 'resource'],
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // console.log(this.form)
          this.loading = true
          this.alertInfo = {isShow: false, type: 'fail', txt: ''}
          axios({
            method: 'post',
            url: '/tools/addPromotion/', // 访问vue的8080端口，在config/index.js中设置转发到8000端口，并设置不跨域
            data: this.form,
            headers: {'Content-Type': 'application/json'}
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
              this.loading = false
              this.alertInfo = {isShow: true, type: 'error', txt: '系统异常'}
              console.log(error)
            })
        } else {
          // console.log('error validate!!')
          return false
        }
      })
    },
    formInit (formName) {
      this.$refs[formName].resetFields()
    }
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
