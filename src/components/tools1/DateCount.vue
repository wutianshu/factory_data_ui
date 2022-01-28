<template>
  <div class="cs-model">
    <el-card class="box-card el-menu-demo"
             shadow="hover">
      <div slot="header">
        <span>日期计算</span>
      </div>
      <el-form size="small"
               :label-width="this.global.labelWidth">
        <el-form-item label="共计天数">
          <el-input :value="datecount"></el-input>
        </el-form-item>
        <el-form-item label="日期区间">
          <div class="block">
            <el-date-picker v-model="selectDateRange"
                            type="daterange"
                            format="yyyy-MM-dd"
                            :clearable="false"
                            value-format="yyyy-MM-dd"
                            :unlink-panels="true"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
            </el-date-picker>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="info"
                     plain>提交</el-button>
          <el-button type="info"
                     plain
                     @click="reset()">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  components: {},
  name: 'App',

  data () {
    return {
      selectDateRange: ''
    }
  },
  methods: {
    reset: function () {
      this.selectDateRange = ''
    }
  },
  computed: {
    datecount: function () {
      let fs = new Date(this.selectDateRange[0])
      let fe = new Date(this.selectDateRange[1])
      let res = (fe - fs) / (24 * 60 * 60 * 1000) + 1
      console.log(res)
      if (isNaN(res)) {
        return ''
      } else {
        return res
      }
    }
  }
}
</script>
