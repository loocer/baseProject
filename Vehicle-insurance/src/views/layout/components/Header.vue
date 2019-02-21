<template>
  <div class="header-body">
    <el-row type="flex" class="row-bg">
      <el-col :span="12">
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <!-- <div style="width: 200px;height: 50px;"> -->
              <img src="@/assets/logo.png" style="height:4rem"  alt="上海鲜花港 - 郁金香" />
            <!-- </div> -->
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple-light menuee">
            <span v-on:click="changeState" v-bind:class="{activeClass:isActive }"><router-link to="/account/user">员工管理</router-link></span>
            <span v-on:click="changeState" v-bind:class="{activeClass:!isActive}"><router-link to="/comperation/merchant-review">订单管理</router-link> </span>
          </div>
        </el-col>
      </el-col>
      <el-col :span="12">
        <el-col :span="24">
          <div class="grid-content bg-purple-light " style="text-align: right">
            <el-dropdown>
              <span class="el-dropdown-link">
                代用名车险公司<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>黄金糕</el-dropdown-item>
                <el-dropdown-item>狮子头</el-dropdown-item>
                <el-dropdown-item>螺蛳粉</el-dropdown-item>
                <el-dropdown-item disabled>双皮奶</el-dropdown-item>
                <el-dropdown-item divided>蚵仔煎</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </el-col>
      </el-col>
    </el-row>
  </div> 
  <!-- <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
    <el-menu-item index="4">
      
    </el-menu-item>
    <el-menu-item index="1">处理中心</el-menu-item>
    <el-submenu index="2">
      <template slot="title">我的工作台</template>
      <el-menu-item index="2-1">选项1</el-menu-item>
      <el-menu-item index="2-2">选项2</el-menu-item>
      <el-menu-item index="2-3">选项3</el-menu-item>
      <el-submenu index="2-4">
        <template slot="title">选项4</template>
        <el-menu-item index="2-4-1">选项1</el-menu-item>
        <el-menu-item index="2-4-2">选项2</el-menu-item>
        <el-menu-item index="2-4-3">选项3</el-menu-item>
      </el-submenu>
    </el-submenu>
    <el-menu-item index="3" disabled>消息中心</el-menu-item>
    <el-menu-item index="4"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>
  </el-menu> -->
</template>

<script>
  import baseComponents from '@/common/base.js'
  export default {
    data() {
      return {
        activeIndex: '1',
        activeIndex2: '1',
      };
    },
    extends: baseComponents,
    created() {
      if('/account/user' === this.$route.path){
        this.isActive = true
      }else{
        this.isActive = false
      }
    },
    methods: {
      handleSelect(key, keyPath) {
      },
      changeState(){
        this.isActive = !this.isActive
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.header-body{
  background-color:#4c87ce;
  .menuee{
    span{
      margin-right: 50px;
      color:#fff;
    }
    line-height: 4rem;
  }
}
.el-menu-demo{
  background-color: #4c87ce;
}
.el-dropdown{
  line-height: 4rem;
  color:#fff;
  margin-right:20px;
}
.activeClass{
  border-bottom:1px solid #fff;
  padding-bottom:5px;
}
.errorClass{
  text-decoration: none;
}
</style>

