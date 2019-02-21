<template>
  <div v-loading.fullscreen.lock="filingObject.length ===0" style="min-height:400px">
    <div class="step-main">
      <div class="step-panel" v-for="item in filingObject">
        <div></div>
        <div>
          <div>
            <el-button type="danger" size="mini" round v-if="item.historyState ==='REJECT'">拒绝</el-button>
            <el-button type="success" size="mini" round v-if="item.historyState === 'PASS'">通过</el-button>
            审核人：{{item.auditor}}
          </div>
          <div class="step-info">审核信息：{{item.remark||'无'}}</div>
        </div>
      </div>
    </div>
    
    <el-steps direction="vertical" :active="filingObject.length" :space="150">
      <template v-for="item in filingObject">
        <el-step :title="item.createDate"></el-step>
      </template> 
    </el-steps>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import baseComponents from '@/common/base.js'
import { getUserId } from '@/utils/auth'
import { strateStatus } from '@/utils/statusCode'
import { parseTime } from '@/utils/index'
export default {
  props: {
    dialogFlag:Boolean,
    filingObject:Array,
  },
  filters: {
    statusFilter(val) {
      return strateStatus[val]
    },
    timeFilter(val) {
      return parseTime[val]
    }
  },
  data() {
    return {
      list: [],
      listLoading: false,
      dcLoading:true,
      infos:[],
      owner_card_back:"https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=3387993828,517840638&fm=58&s=8D43F51498A42092025785C70300E0A3&bpow=121&bpoh=75",
      anctionName:'SetEmployee',
      banks:[{
        label:'加载中。。。。',
        value:0
      }],
      textarea:'',
      gridData: [],
    }
  },
  extends: baseComponents,
  computed: {
  },
  mounted:function(){
  },
  beforeDestroy(){
    this.filingObject = []
  },
  created() {
    
  },
  methods: {
    resetForm(){
      console.log('5555555555555555555')
      this.filingObject = []
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss">
  .app-container{
    margin:10px 5px;
    .container-header{
      margin:40px 0;
      button{
        float:right;
      }
    }
  }
  .el-row{
    margin:10px 0; 
  }
.filed_value_img{
  padding-top: 40px;
  height:150px;
}
.img-panel{
  div{
    float:left;
    margin-right:30px;
    margin-top:30px;
    img{
      width:150px;
      background-size:100% 100%;
      background-repead:no-repead;
    }
  }
}
.step-panel{
    padding-top:5px;
    .step-info{
      margin-left:85px;
    }
    div{
      float:left;
    }
    >div:nth-child(1){
      width:100px;
      color:#409eff;
    }
    >div:nth-child(2){
      font-size:16px;
      font-weight:800;
      position:relative;
      top:-16px;
      width:300px;
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