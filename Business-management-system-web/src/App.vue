<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  created() {
    this.$store.dispatch('SetCityList')
    this.$store.dispatch('SetContractor')
    this.$store.dispatch('SetBanks')
  },
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
body .el-table th.gutter{
    display: table-cell!important;
}
 
body .el-table colgroup.gutter{
    display: table-cell!important;
}
  .app-container{
    margin:10px 5px;
    .container-header{
      margin:40px 0;
      button{
        float:right;
      }
    }
  }
  .step-panel{
    padding-top:5px;
    .step-info{
      margin-left:90px;
    }
    div{
      float:left;
    }
    >div:nth-child(1){
      width:100px;
      color:#409eff;
    }
    >div:nth-child(2){
      font-size:20px;
      font-weight:800;
      position:relative;
      top:-16px;
      width:500px;
      button{
        margin:10px;
      }
    }
    position: relative;
    left: 40px;
    height: 150px;
  }
  .step-main{
    position:absolute;
    margin-left:190px;
  }
</style>