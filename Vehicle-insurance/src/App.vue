<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  created() {
    this.$store.dispatch('SetImgToken')
  },
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
body .el-table th.gutter{
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
  .el-form-item.is-error .el-input__inner, .el-form-item.is-error .el-input__inner:focus, .el-form-item.is-error .el-textarea__inner, .el-form-item.is-error .el-textarea__inner:focus, .el-message-box__input input.invalid, .el-message-box__input input.invalid:focus{
    border-color: #dcdfe6!important;
  }
</style>