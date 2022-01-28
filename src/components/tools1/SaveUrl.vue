<template>
  <div>
        <el-card class="box-card" v-loading="loading">
          <div slot="header" class="clearfix">
            <span>保存页面地址</span>
          </div>
          <el-form ref="form" :model="form" :rules="rules" label-width="80px">
            <el-row>
              <el-col :span="12">
                <el-form-item label="名称" prop="name">
                  <el-input v-model="form.name" placeholder="请输入名称，名称存在则修改数据"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="客户端" prop="app">
                      <el-select v-model="form.app" placeholder="请选择客户端">
                        <el-option v-for="a in apps" :label="a" :value="a" :key="a"></el-option>
                      </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="stable" prop="stable">
                  <el-input v-model="form.stable"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="betaa" prop="betaa">
                  <el-input v-model="form.betaa"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="betab" prop="betab">
                  <el-input v-model="form.betab"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="betac" prop="betac">
                  <el-input v-model="form.betac"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="betad" prop="betad">
                  <el-input v-model="form.betad"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="沙箱" prop="box">
                  <el-input v-model="form.box"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="18">
                <el-form-item label="线上" prop="online">
                  <el-input v-model="form.online"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4" offset="2">
                <el-button type="info" icon="el-icon-circle-plus" @click="addItem">增加参数</el-button>
              </el-col>
            </el-row>
            <el-row v-for="(item, index) in form.dynamicItem" :key="index">
              <el-col :span="7">
                  <el-form-item label="参数">
                    <el-input placeholder="参数名称" v-model="item.name" class="input-with-select">
                            <el-select class="params-select" v-model="item.type" slot="prepend" placeholder="参数类型">
                              <el-option label="params" value="params"></el-option>
                              <el-option label="cookie" value="cookie"></el-option>
                            </el-select>
                          </el-input>
                  </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item>
                  <el-input v-model="item.desc" placeholder="参数描述"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item>
                  <el-input v-model="item.value" placeholder="默认值"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item>
                      <el-switch
                        v-model="item.required"
                        active-text="必填"
                        inactive-text="选填">
                      </el-switch>
                </el-form-item>
              </el-col>
              <el-col :span="3">
                <el-form-item>
                  <el-button circle icon="el-icon-delete" @click="deleteItem(item, index)"></el-button>
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
              <el-button type="primary" @click="submitForm('form')">保存</el-button>
              <el-button  @click="formInit('form')">重置</el-button>
            </el-form-item>
          </el-form>
        </el-card>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      form: {
        name: '',
        app: '',
        stable: '',
        betaa: '',
        betab: '',
        betac: '',
        betad: '',
        box: '',
        online: '',
        dynamicItem: []
      },
      apps: ['天鹅到家', '阿姨一点通', '员工端', '家政云'],
      loading: false,
      alertInfo: {isShow: false, type: 'fail', txt: ''},
      interResult: 'success',
      rules: {
        name: [
          { required: true, message: '请输入链接名称', trigger: 'change' }
        ],
        stable: [
          { type: 'url', required: true, message: '请输入链接地址', trigger: 'change' }
        ],
        betaa: [
          { type: 'url', message: '请输入链接地址', trigger: 'change' }
        ],
        betab: [
          { type: 'url', message: '请输入链接地址', trigger: 'change' }
        ],
        betac: [
          { type: 'url', message: '请输入链接地址', trigger: 'change' }
        ],
        betad: [
          { type: 'url', message: '请输入链接地址', trigger: 'change' }
        ],
        box: [
          { type: 'url', required: true, message: '请输入链接地址', trigger: 'change' }
        ],
        online: [
          { type: 'url', message: '请输入链接地址', trigger: 'change' }
        ],
        app: [
          { required: true, message: '请选择客户端', trigger: 'change' }
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
            url: this.global.server + '/api/tools/saveurl', // 访问vue的8080端口，在config/index.js中设置转发到8000端口，并设置不跨域
            data: this.form,
            headers: {'Content-Type': 'application/json'}
          })
            .then(response => {
              if (response.data.cstest_data.status === 0) {
                this.formInit('form')
                this.loading = false
                this.alertInfo = {isShow: true, type: 'success', txt: response.data.cstest_data.message}
              } else {
                console.log(response.data)
                this.loading = false
                this.alertInfo = {isShow: true, type: 'error', txt: response.data.cstest_data.message}
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
    },
    addItem () {
      this.form.dynamicItem.push({
        'name': '', 'type': 'params', 'desc': '', 'required': false, 'value': ''
      })
    },
    deleteItem (item, index) {
      this.form.dynamicItem.splice(index, 1)
    }
  },
  computed: {
    name: function () {
      return this.form.name
    }
  },
  watch: {
    name: function () {
      axios({
        method: 'get',
        url: this.global.server + '/api/tools/getUrlByName?name=' + this.name // 访问vue的8080端口，在config/index.js中设置转发到8000端口，并设置不跨域
      })
        .then(response => {
          // console.log(response)
          if (response.data.cstest_data.status === 0) {
            this.form = response.data.cstest_data.data
          } else {
            // console.log(response.data)
            var tmp = this.form.name
            this.formInit('form')
            this.form.name = tmp
          }
        })
        .catch((error) => {
          console.log(error)
        })
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
