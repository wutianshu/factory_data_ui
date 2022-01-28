<template>
  <div>
    <el-row>
      <!--<el-col :span="16" :offset="4">-->
        <el-card class="box-card" v-loading="loading">
          <div slot="header" class="clearfix">
            <span>身份证生成器-GET-params</span>
          </div>
          <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="数量">
              <el-input v-model="formInline.num" placeholder="生成个数"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="formReset">重置</el-button>
            </el-form-item>
          </el-form>
         <el-card class="box-card">
           <el-row :gutter="20" class="el-row">
             <el-col :span="12">
              <el-input v-model="res.id" disabled>
                <template slot="prepend">身份证</template>
              </el-input>
             </el-col>
             <el-col :span="12">
              <el-input v-model="res.name" disabled>
                <template slot="prepend">姓名</template>
              </el-input>
             </el-col>
           </el-row>
           <el-row :gutter="20" class="el-row">
             <el-col :span="12">
              <el-input v-model="res.address" disabled>
                <template slot="prepend">地址</template>
              </el-input>
             </el-col>
             <el-col :span="12">
              <el-input v-model="res.phone" disabled>
                <template slot="prepend">手机</template>
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
  data () {
    return {
      formInline: {num: '1'},
      res: {id: '', name: '', address: '', phone: ''},
      loading: false
    }
  },
  methods: {
    formReset () {
      this.formInline = {num: '1'}
    },
    resultReset () {
      this.res = {id: '', name: '', address: '', phone: ''}
    },
    onSubmit () {
      this.loading = true
      this.resultReset()
      axios({
        method: 'get',
        url: '/tools/idcards', // 访问vue的8080端口，在config/index.js中设置转发到8000端口，并设置不跨域
        params: this.formInline,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      })
        .then(response => {
          this.loading = false
          if (response.data.returnCode === 0) {
            this.res = response.data.returnInfo
          } else {
            console.log(response.data)
          }
        })
        .catch((error) => {
          console.log(error)
          this.loading = false
        })
    }
  },
  mounted: function () {
    console.log('mounted')
  }
}
</script>

<style>
  .el-row {
    margin-bottom: 10px;
    &:last-child {
      margin-bottom: 0;
    }
  }
</style>
