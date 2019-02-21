<template>
  <div>
      <el-row>
        <el-col :span="24">
          <div class="grid-content bg-purple" style="color:#999999">
              <span class="filed_key">商户名称：</span>
              <span class="filed_value"> {{filingObject.storeTitle}} </span>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <div class="grid-content bg-purple-light" style="font-family:'Arial Negreta','Arial';margin:5px 0;font-weight: 700;font-style: normal;font-size: 14px;">
              <span class="filed_key">合同信息:</span>
          </div>
        </el-col>
      </el-row>
      <el-row>
          <el-col :span="6">
            <div class="grid-content bg-purple">
                <span class="filed_key">合同编号：{{filingObject.contractNo}}</span>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple">
                <span class="filed_key">合同起始日：{{filingObject.startDate}}</span>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple">
                <span class="filed_key">合同截止日：{{filingObject.endDate}}</span>
            </div>
          </el-col>
      </el-row>
      <el-row>    
          <el-col :span="6">
            <div class="grid-content bg-purple">
                <span class="filed_key">法人姓名：{{filingObject.storeVO.legalPerson}}</span>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple">
                <span class="filed_key">联系电话：{{filingObject.storeVO.mobile}}</span>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple">
                <span class="filed_key">身份证号：{{filingObject.storeVO.legalPersonIdno}}</span>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple">
                <span class="filed_key">身份证有效期：{{filingObject.storeVO.legalPersonIdexpiry}}</span>
            </div>
          </el-col>
      </el-row>
      <el-row>    
          <el-col :span="6">
            <div class="grid-content bg-purple">
                <span class="filed_key">负责人姓名：{{filingObject.linkman}}</span>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple">
                <span class="filed_key">负责人电话：{{filingObject.linkmanTel}}</span>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple">
                <span class="filed_key">身份证号：{{filingObject.linkmanIdno}}</span>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple">
                <span class="filed_key">身份证有效期：{{filingObject.linkmanIdexpiry}}</span>
            </div>
          </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <div class="grid-content bg-purple-light" style="font-family:'Arial Negreta','Arial';margin:5px 0;font-weight: 700;font-style: normal;font-size: 14px;">
              <span class="filed_key">对账信息:</span>
          </div>
        </el-col>
      </el-row>
      <el-row>    
          <el-col :span="6">
            <div class="grid-content bg-purple">
                <span class="filed_key">元宝对账人：{{filingObject.escort}}</span>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple">
                <span class="filed_key">联系电话：{{filingObject.escortTel}}</span>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple">
                <span class="filed_key">对账邮箱：{{filingObject.escortMail}}</span>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple">
                <span class="filed_key">通讯地址：{{filingObject.escortAddr}}</span>
            </div>
          </el-col>
      </el-row>
      <el-row>    
        <el-col :span="6">
          <div class="grid-content bg-purple">
              <span class="filed_key">商户对账人：{{filingObject.verifier}}</span>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
              <span class="filed_key">联系电话：{{filingObject.verifierTel}}</span>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
              <span class="filed_key">对账邮箱：{{filingObject.verifierMail}}</span>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
              <span class="filed_key">通讯地址：{{filingObject.verifierAddr}}</span>
          </div>
        </el-col>
      </el-row>
      <el-row>    
        <el-col :span="6">
          <div class="grid-content bg-purple">
              <span class="filed_key">对账周期：{{filingObject.verifierPeriod}}</span>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <div class="grid-content bg-purple-light" style="font-family:'Arial Negreta','Arial';margin:5px 0;font-weight: 700;font-style: normal;font-size: 14px;">
              <span class="filed_key">账户信息:</span>
          </div>
        </el-col>
      </el-row>
      <el-row>    
          <el-col :span="6">
            <div class="grid-content bg-purple">
                <span class="filed_key">账户类型：{{filingObject.signatureId}}</span>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple">
                <span class="filed_key">开户行：{{filingObject.verifierPeriod}}</span>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple">
                <span class="filed_key">开户账号：{{filingObject.verifierPeriod}}</span>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple">
                <span class="filed_key">开户行归属地：{{filingObject.verifierPeriod}}</span>
            </div>
          </el-col>
      </el-row>
      <el-row>    
          <el-col :span="6" v-for="item in filingObject.attachments">
            <div class="grid-content bg-purple">
                <div class="filed_value_img" >
                <span style="margin-left: 30px" alt="经营场地租赁合同">{{item.attachmentType | attachmentsFilter}}:</span> 
                <img :src="item.attachmentPath" align="top"> 
              </div>
            </div>
          </el-col>
      </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import baseComponents from '@/common/base.js'
import { getUserId } from '@/utils/auth'
import { strateStatus, attachments } from '@/utils/statusCode'
import { parseTime } from '@/utils/index'
export default {
  props: {
    dialogFlag:Boolean,
    filingObject:Object,
  },
  filters: {
    statusFilter(val) {
      return strateStatus[val]
    },
    timeFilter(val) {
      return parseTime[val]
    },
    attachmentsFilter(val){
      return attachments[val]
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
  created() {
    
  },
  methods: {
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
</style>