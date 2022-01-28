<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
            <span>打开客户端页面</span>
            <el-tooltip class="item" effect="dark" content="说明文档：http://abc.com?pageId=125768170" placement="top-start">
              <i class="el-icon-question"></i>
            </el-tooltip>
          </div>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="客户端" prop="app">
                        <el-select v-model="form.app" placeholder="请选择客户端">
                          <el-option v-for="a in apps" :label="a" :value="a" :key="a"></el-option>
                        </el-select>
                  </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="名称" prop="name">
                <el-select v-model="form.name" placeholder="请选择名称">
                      <el-option v-for="a in names" :label="a" :value="a" :key="a"></el-option>
                </el-select>
              </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="选择环境" prop="env">
                <el-select v-model="form.env" placeholder="请选择名称">
                      <el-option v-for="e in envs" :label="e.env" :value="e.env" :key="e.env"></el-option>
                </el-select>
              </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="地址" prop="address">
                  <el-input v-model="form.address" disabled></el-input>
            </el-form-item>
        <el-row v-for="(item, index) in form.dynamicItem" :key="index">
              <el-col :span="16" v-if="item.name">
                <el-form-item :label="item.name" :prop="rules.p" :rules="[{required: item.required}]">
                  <el-input v-model="item.value" :placeholder="item.desc">
                    <template slot="prepend">{{ item.type }}</template>
                  </el-input>
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
          <el-tooltip class="item" effect="dark" content="跳转登录页面，然后重定向对应页面" placement="top">
              <el-button
                type="primary"
                @click="open('form')"
                v-trackevent="{event:'click', data: form}"
                v-track="{caption:'dldk', paras: '登录打开' + form.app + form.name, user: this.$cookies.get('cstestusername')}"
              >登录打开</el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="若已经登录，点击该按钮会直接跳转对应页面；若没有登录访问页面可能会出现异常" placement="top">
              <el-button
                type="primary"
                @click="opend('form')"
                v-trackevent="{event:'click', data: form}"
                v-track="{caption:'dldk', paras: '直接打开' + form.app + form.name, user: this.$cookies.get('cstestusername')}"
              >直接打开</el-button>
          </el-tooltip>
          <el-button  @click="formInit()">重置</el-button>
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
        app: '',
        name: '',
        env: '',
        address: '',
        dynamicItem: []
      },
      apps: ['天鹅到家', '阿姨一点通', '员工端', '家政云'],
      names: [],
      envs: [],
      alertInfo: {isShow: false, type: 'fail', txt: ''},
      rules: {
        name: [
          { required: true, message: '请输入链接名称', trigger: 'change' }
        ],
        app: [
          { required: true, message: '请选择客户端', trigger: 'change' }
        ],
        env: [
          { required: true, message: '请选择环境', trigger: 'change' }
        ],
        address: [
          { required: true, message: '地址', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    open (formName) {
      console.log(this.form)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.alertInfo = {isShow: false, type: 'fail', txt: ''}
          // console.log(this.form)
          // console.log(this.form.dynamicItem)
          var f = {}
          var cookieDomain = ''
          if (this.form.env === 'online') {
            if (this.form.app === '员工端') {
              cookieDomain = '.abc.com'
            } else {
              cookieDomain = '.def.com'
            }
          } else {
            cookieDomain = '.ghi.cn'
          }
          // alert(cookieDomain)
          for (let index in this.form.dynamicItem) {
            // console.log(this.form.dynamicItem[index])
            if (this.form.dynamicItem[index].type === 'params') {
              f[this.form.dynamicItem[index].name] = this.form.dynamicItem[index].value
            } else {
              this.$cookies.set(this.form.dynamicItem[index].name, this.form.dynamicItem[index].value, '1d', '/', cookieDomain)
            }
          }
          // console.log(f)
          var ret = qs.stringify(f)
          var domain = {
            'ayydt': {
              'online': 'https:/online/login/h5/index',
              'box': 'https://box/login/h5/index',
              'test': 'https://test/h5/index'
            },
            'tedj': {
              'online': 'https://online/prelogin',
              'box': 'https://box/prelogin',
              'test': 'https://test/prelogin'
            },
            'ygd': {
              'online': 'https://online/user/login',
              'box': 'https://box/user/login',
              'test': 'https://test/user/login'
            }
          }
          var loginDomain = ''
          var url = ''
          if (this.form.app === '阿姨一点通') { // 阿姨一点通
            if (this.form.env === 'online') {
              loginDomain = domain.ayydt.online
            } else if (this.form.env === 'box') {
              loginDomain = domain.ayydt.box
            } else {
              loginDomain = domain.ayydt.test
            }
            url = loginDomain + '?returnUrl=' + encodeURIComponent(this.form.address + '?' + ret)
          } else if (this.form.app === '天鹅到家' || this.form.app === '家政云') { // 天鹅到家app
            if (this.form.env === 'online') {
              loginDomain = domain.tedj.online
            } else if (this.form.env === 'box') {
              loginDomain = domain.tedj.box
            } else {
              loginDomain = domain.tedj.test
            }
            url = loginDomain + '?returnUrl=' + encodeURIComponent(this.form.address + '?' + ret)
          } else if (this.form.app === '员工端') {
            if (this.form.env === 'online') {
              loginDomain = domain.ygd.online
            } else if (this.form.env === 'box') {
              loginDomain = domain.ygd.box
            } else {
              loginDomain = domain.ygd.test
            }
            url = loginDomain + '?serviceId=' + encodeURIComponent(this.form.address + '?' + ret)
          } else {
            console.log('app的值错误')
          }
          window.open(url, '_blank')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    opend (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.alertInfo = {isShow: false, type: 'fail', txt: ''}
          var f = {}
          var cookieDomain = ''
          if (this.form.env === 'online') {
            if (this.form.app === '员工端') {
              cookieDomain = '.abc.com'
            } else {
              cookieDomain = '.def.com'
            }
          } else {
            cookieDomain = '.hij.cn'
          }
          // alert(cookieDomain)
          for (let index in this.form.dynamicItem) {
            // console.log(this.form.dynamicItem[index])
            if (this.form.dynamicItem[index].type === 'params') {
              f[this.form.dynamicItem[index].name] = this.form.dynamicItem[index].value
            } else {
              // alert(this.form.dynamicItem[index].name)
              // alert(this.form.dynamicItem[index].value)
              this.$cookies.set(this.form.dynamicItem[index].name, this.form.dynamicItem[index].value, '1d', '/', cookieDomain)
              console.log(this.$cookie)
              // alert(this.$cookie)
            }
          }
          // console.log(f)
          var ret = qs.stringify(f)
          var url = this.form.address + '?' + ret
          window.open(url, '_blank')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    formInit () {
      // this.$refs[formName].resetFields()
      this.form = {
        name: '',
        app: '',
        env: '',
        address: '',
        dynamicItem: []
      }
    }
  },
  computed: {
    uname: function () {
      return this.form.name
    },
    uenv: function () {
      return this.form.env
    },
    client: function () {
      return this.form.app
    }
  },
  watch: {
    client: function () {
      this.form = {
        app: this.client,
        name: '',
        env: '',
        address: '',
        dynamicItem: []
      }
      axios({
        method: 'get',
        url: this.global.server + '/api/tools/getNameByApp?app=' + this.client // 访问vue的8080端口，在config/index.js中设置转发到8000端口，并设置不跨域
      })
        .then(response => {
          if (response.data.cstest_data.status === 0) {
            this.names = response.data.cstest_data.data
            console.log(this.form)
          } else {
            this.alertInfo = {isShow: true, type: 'error', txt: response.data.cstest_data.message}
            // console.log(response.data)
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
    uname: function () {
      this.form.env = ''
      this.form.address = ''
      if (this.uname) {
        axios({
          method: 'get',
          url: this.global.server + '/api/tools/getUrlByName?name=' + this.uname // 访问vue的8080端口，在config/index.js中设置转发到8000端口，并设置不跨域
        })
          .then(response => {
            if (response.data.cstest_data.status === 0) {
              this.form = response.data.cstest_data.data
              console.log(this.form)
            } else {
              this.alertInfo = {isShow: true, type: 'error', txt: response.data.cstest_data.message}
              // console.log(response.data)
            }
          })
          .catch((error) => {
            console.log(error)
          })
        axios({
          method: 'get',
          url: this.global.server + '/api/tools/getEnvByName?name=' + this.uname // 访问vue的8080端口，在config/index.js中设置转发到8000端口，并设置不跨域
        })
          .then(response => {
            if (response.data.cstest_data.status === 0) {
              this.envs = response.data.cstest_data.data
            } else {
              this.alertInfo = {isShow: true, type: 'error', txt: response.data.cstest_data.message}
              // console.log(response.data)
            }
          })
          .catch((error) => {
            console.log(error)
          })
      }
    },
    uenv: function () {
      for (let i in this.envs) {
        if (this.envs[i].env === this.form.env) {
          this.form.address = this.envs[i].value
        }
      }
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
  .el-input-group__prepend {
    width: 70px;
  }
  /*.box-card {*/
    /*width: 480px;*/
  /*}*/
</style>
