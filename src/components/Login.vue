<template>
  <div>
        <el-card class="box-card" v-loading="loading">
          <div slot="header" class="clearfix">
            <span>请登录</span>
          </div>
          <el-form ref="form" :model="form" :rules="rules" label-width="80px">
            <el-row>
              <el-col :span="24">
                <el-form-item label="用户名" prop="name">
                  <el-input v-model="form.name" placeholder="请输入用户名称"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="密码" prop="password">
                  <el-input v-model="form.password" placeholder="请输入密码" type="password"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-alert
            v-if="alertInfo.isShow"
            :title="alertInfo.txt"
            :type="alertInfo.type"
            center
            show-icon>
          </el-alert>
            <el-form-item>
              <el-button type="primary" @click="submitForm('form')">登录</el-button>
              <el-button  @click="formInit('form')">重置</el-button>
            </el-form-item>
          </el-form>
        </el-card>
  </div>
</template>

<script>
import axios from 'axios'
import qs from 'qs'
export default {
  data () {
    return {
      form: {
        name: '',
        password: ''
      },
      loading: false,
      alertInfo: {isShow: false, type: 'fail', txt: ''},
      interResult: 'success',
      rules: {
        name: [
          { required: true, message: '请输入用户名称', trigger: 'change' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.alertInfo = {isShow: false, type: 'fail', txt: ''}
          // console.log(this.form)
          this.loading = true
          axios({
            method: 'post',
            url: this.global.server + '/api/auth/login', // 访问vue的8080端口，在config/index.js中设置转发到8000端口，并设置不跨域
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
              if (response.data.factory_data.status === 0) {
                this.formInit('form')
                this.loading = false
                this.alertInfo = {isShow: true, type: 'success', txt: response.data.factory_data.message}
                window.location.href = this.global.server
              } else {
                console.log(response.data)
                this.loading = false
                this.alertInfo = {isShow: true, type: 'error', txt: response.data.factory_data.message}
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
      this.form.dynamicItem = []
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
   .params-select .el-input {
    width: 100px;
  }
  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }
</style>
