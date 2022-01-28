<template>
  <div class="nav-div">
    <el-menu mode="horizontal"
             :router="true"
             :defaultActive="initPath"
             class="el-menu-demo"
             background-color="#545c64"
             text-color="#fff"
             active-text-color="#ffd04b">
      <el-menu-item index="/order">订单</el-menu-item>
      <!--      <el-menu-item index="">-->
      <!--        <a href="http://10.40.30.23:8988/APP_Order/create_order/" target="_blank">家政销售订单</a>-->
      <!--      </el-menu-item>-->
      <el-menu-item index="/worker">商家</el-menu-item>
      <el-menu-item index="/tools1">工具1</el-menu-item>
      <el-menu-item index="/tools2">工具2</el-menu-item>
      <el-menu-item index="/enumerate">枚举</el-menu-item>
      <el-menu-item index="/jzcloud">云</el-menu-item>
      <el-menu-item index="/longtask" :disabled="false">脚本任务</el-menu-item>
      <el-menu-item index="/about"
                    :disabled="true">关于我们
      </el-menu-item>
      <el-menu-item index=""><a style="text-decoration:none"
                                href="https://abc.cn/api/docs"
                                target="_blank">apidoc</a></el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  // components: {},
  // name: 'App',
  // data () {
  //   return {
  //     initPath: this.setInitPath()
  //   }
  // },
  // methods: {
  //   setInitPath () {
  //     var initPath = this.$route.path
  //     if (initPath === '/') {
  //       initPath = '/jzso_new'
  //     }
  //     return initPath
  //   }
  // }
}
</script>
