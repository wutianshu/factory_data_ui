<template>
  <div>
    <el-row>
      <!--<el-col :span="16" :offset="4">-->
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>打开对话框，提交表单(父组件传参子组件)</span>
          </div>
          <el-button type="text" @click="dialogVisible = true">打开对话框</el-button>
          <el-dialog
            title="提交表单"
            :visible.sync="dialogVisible"
            width="80%"
            :before-close="handleClose">
            <el-form ref="form" :model="form" :rules="rules" label-width="80px" v-loading="loading">
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
                <el-button @click="dialogVisible = false">取 消</el-button>
              </el-form-item>
            </el-form>
          </el-dialog>
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
      dialogVisible: false,
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
      // region: [],
      // resource: [],
      // type: [],
      loading: false,
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
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // console.log(this.form)
          this.loading = true
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
                this.dialogVisible = false
                this.successMsg(response.data.returnInfo)
              } else {
                console.log(response.data)
                this.loading = false
                this.errorMsg(response.data.returnInfo)
              }
            })
            .catch((error) => {
              this.loading = false
              this.errorMsg('系统异常')
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
    },
    successMsg (s) {
      this.$message({
        message: s,
        type: 'success'
      })
    },
    errorMsg (s) {
      this.$message({
        message: s,
        type: 'error'
      })
    }
  }
  // mounted () {
  //   axios({
  //     method: 'get',
  //     url: '/tools/region/' // 访问vue的8080端口，在config/index.js中设置转发到8000端口，并设置不跨域
  //   })
  //     .then(response => {
  //       if (response.data.returnCode === 0) {
  //         this.region = response.data.returnInfo
  //       } else {
  //         console.log(response.data)
  //       }
  //     })
  //     .catch((error) => {
  //       console.log(error)
  //     })
  //   axios({
  //     method: 'get',
  //     url: '/tools/resource/' // 访问vue的8080端口，在config/index.js中设置转发到8000端口，并设置不跨域
  //   })
  //     .then(response => {
  //       if (response.data.returnCode === 0) {
  //         this.resource = response.data.returnInfo
  //       } else {
  //         console.log(response.data)
  //       }
  //     })
  //     .catch((error) => {
  //       console.log(error)
  //     })
  //   axios({
  //     method: 'get',
  //     url: '/tools/type/' // 访问vue的8080端口，在config/index.js中设置转发到8000端口，并设置不跨域
  //   })
  //     .then(response => {
  //       if (response.data.returnCode === 0) {
  //         this.type = response.data.returnInfo
  //       } else {
  //         console.log(response.data)
  //       }
  //     })
  //     .catch((error) => {
  //       console.log(error)
  //     })
  // }
}
</script>

<style>

</style>
