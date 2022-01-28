<template>
  <div class="cs-model">
    <el-card class="box-card el-menu-demo"
             shadow="hover">
      <div slot="header">
        <span>用户信息</span>
      </div>

      <el-form v-loading="loading"
               ref="form"
               :model="form"
               size="small"
               :label-width="this.global.labelWidth">
        <el-form-item label="用户数量">
          <el-input v-model="form.num"
                    placeholder="随机生成用户数量，默认为1"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="info"
                     plain
                     @click="submit('form')">提交</el-button>
          <el-button type="info"
                     plain
                     @click="reset()">重置</el-button>
        </el-form-item>
      </el-form>

      <el-alert title="随机生成用户信息失败！"
                type="error"
                v-show="errorflag"
                :description="errorinfo"
                @close="errorflag=false"
                show-icon>
      </el-alert>

      <el-card>
        <el-row :gutter=20
                v-for="item in result"
                :key="item.idcards">
          <el-col :span="8">
            <el-input size="small"
                      :value="item.name"
                      :readonly="true">
              <template slot="prepend">用户姓名</template>
            </el-input>
          </el-col>
          <el-col :span="8">
            <el-input size="small"
                      :value="item.phone"
                      :readonly="true">
              <template slot="prepend">手机号码</template>
            </el-input>
          </el-col>
          <el-col :span="8">
            <el-input size="small"
                      :value="item.idcards"
                      :readonly="true">
              <template slot="prepend">身份证号码</template>
            </el-input>
          </el-col>
        </el-row>
      </el-card>
    </el-card>
  </div>
</template>

<script>
import axios from 'axios'
import qs from 'qs'
export default {
  components: {},
  name: 'App',

  data () {
    return {
      form: this.formInit(),
      result: [{ 'name': '', 'phone': '', 'idcards': '' }],
      loading: false,
      errorflag: false,
      errorinfo: ''
    }
  },

  methods: {
    formInit () {
      var formInit = {
        num: ''
      }
      return formInit
    },
    reset () {
      this.form = this.formInit()
      this.resetResult()
    },
    resetResult () {
      this.errorflag = false
      this.result = [{ 'name': '', 'phone': '', 'idcards': '' }]
    },
    submit (formName) {
      let self = this
      this.resetResult()
      self.loading = true
      self.errorflag = false
      this.$refs[formName].validate(valid => {
        var params = this.commonJS.cleanObjNullProperty(self.form)
        axios({
          method: 'post',
          url: '/api/tools1/test', // 访问vue的8080端口，在config/index.js中设置转发到5000端口，并设置不跨域
          data: params,
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
            if (response.factory_status === true) {
              self.result = response['factory_data']
              this.$message({
                showClose: true,
                message: '随机生成用户信息成功！',
                type: 'success'
              })
            } else {
              self.errorflag = true
              self.errorinfo = response['factory_message']
            }
          })
          .catch((error) => {
            console.log(error)
            this.loading = false
          })
      })
    }
  }
}
</script>
