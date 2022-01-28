<template>
  <div class="cs-model">
    <el-card class="box-card el-menu-demo"
             shadow="hover">
      <div slot="header">
        <span>数据成果记录</span>
      </div>
        <el-table
          :data="tableData"
          height="250"
          border
          style="width: 100%">
          <el-table-column
            prop="endpoint"
            label="埋点标志"
            width="180">
          </el-table-column>
          <el-table-column
            prop="path"
            label="业务描述"
            width="180">
          </el-table-column>
          <el-table-column
            prop="count"
            label="操作次数">
          </el-table-column>
        </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  components: {},
  name: 'App',

  data () {
    return {
      tableData: []
      // tableData: this.getStatic()
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      this.getData()
    },
    getData () {
      let self = this
      this.$jsonp(this.global.server + '/api/tools1/getapi-table')
        .then(json => {
          // 请求成功时
          if (json['factory_status'] === true) {
            self.tableData = json['factory_data']['data']
          }
        })
        .catch(err => {
          console.log(err)
          return []
        })
    }
  }
}
</script>
