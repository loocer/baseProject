<template>
  <div id="dayin"> 
    <!--startprint-->
    <div style="padding:0 20px;" v-if="filingObject.store" >
        <el-row>
          <div style="float: left; width:100%;text-align: left;border-bottom: 1px solid rgb(242, 242, 242)">
            <el-col :span="24">
              <div id="fdsfsd" class="grid-content bg-purple" style="float: left; width:50%;text-align: left;">
                  <el-button type="primary"  size="mini" @click="dayin()">打印</el-button>
              </div>
              <div class="grid-content bg-purple" style="float: right;width:50%;text-align: right;">
                  <span class="filed_key">填表日期：12：32：43</span>
              </div>
            </el-col>
          </div>
        </el-row>
        <el-row>
          <el-col :span="24">
            <div class="grid-content bg-purple-light" style="font-family:'Arial Negreta','Arial';margin:5px 0;font-weight: 700;font-style: normal;font-size: 14px;">
                <span class="filed_key">商户与个人基本情况:</span>
            </div>
          </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
              <div class="grid-content bg-purple">
                  <span class="filed_key">商户名称（必填）：{{filingObject.store.storeTitle}}</span>
              </div>
            </el-col>
            <el-col :span="24">
              <div class="grid-content bg-purple">
                  <span class="filed_key">经营地址（必填）：{{filingObject.store.manageAddress}}</span>
              </div>
            </el-col>
            <el-col :span="12" v-if="filingObject.inspectReport.compChangeAddr&&filingObject.inspectReport.compChangeAddr!=''">
              <div class="grid-content bg-purple">
                  <span class="filed_key">总部近期变更地址：{{filingObject.inspectReport.compChangeAddr}}</span>
              </div>
            </el-col>
            <el-col :span="12" v-if="filingObject.inspectReport.compChangeAddr&&filingObject.inspectReport.compChangeAddr!=''">
              <div class="grid-content bg-purple">
                  <span class="filed_key">变更日期：{{filingObject.inspectReport.compChangeDate}}</span>
              </div>
            </el-col>  
            <el-col :span="24">
              <div class="grid-content bg-purple">
                  <span class="filed_key">外访地址：{{filingObject.inspectReport.outboundAddr}}</span>
              </div>
            </el-col>
            <el-col :span="12" v-if="filingObject.inspectReport.legalChangeAddr&&filingObject.inspectReport.legalChangeAddr!=''">
              <div class="grid-content bg-purple">
                  <span class="filed_key">法人近期变更地址：{{filingObject.inspectReport.legalChangeAddr}}元</span>
              </div>
            </el-col>
            <el-col :span="12" v-if="filingObject.inspectReport.legalChangeAddr&&filingObject.inspectReport.legalChangeAddr!=''">
              <div class="grid-content bg-purple">
                  <span class="filed_key">变更日期：{{filingObject.inspectReport.legalChangeDate}}</span>
              </div>
            </el-col>  
            <el-col :span="24">
              <div class="grid-content bg-purple">
                  <span class="filed_key">法人户籍地址：{{filingObject.inspectReport.legalFrom}}</span>
              </div>
            </el-col>
            <el-col :span="24">
              <div class="grid-content bg-purple">
                  <span class="filed_key">办公地面积：{{filingObject.inspectReport.officeArea}}平方米</span>
              </div>
            </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <div class="grid-content bg-purple-light" style="font-family:'Arial Negreta','Arial';margin:5px 0;font-weight: 700;font-style: normal;font-size: 14px;">
                <span class="filed_key">外访分店房源:</span>
            </div>
          </el-col>
        </el-row>
        <el-row>    
            <el-col :span="12">
              <div class="grid-content bg-purple">
                  <span class="filed_key">分店场地形式：{{filingObject.inspectReport.branchStoreForm}}</span>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple">
                  <span class="filed_key">分店数量：{{filingObject.inspectReport.branchNumber}}</span>
              </div>
            </el-col>
            <el-col :span="24">
              <div class="grid-content bg-purple">
                  <span class="filed_key">经营地址（必填）：{{filingObject.inspectReport.managerAddr}}</span>
              </div>
            </el-col>
            <el-col :span="24">
              <div class="grid-content bg-purple">
                  <span class="filed_key">房源类型（必填）：{{filingObject.inspectReport.housingType}}</span>
              </div>
            </el-col>
          </el-row>
          <el-row>
          <el-col :span="24">
            <div class="grid-content bg-purple-light" style="font-family:'Arial Negreta','Arial';margin:5px 0;font-weight: 700;font-style: normal;font-size: 14px;">
                <span class="filed_key">风险评定:</span>
            </div>
          </el-col>
        </el-row>
        <el-row>    
            <el-col :span="24">
              <div class="grid-content bg-purple">
                  <span class="filed_key">商户单位人员数是否属实在职人员是否正规？：{{filingObject.inspectReport.personIsMatch?'正规':'不正规'}}</span>
              </div>
            </el-col>
            <el-col :span="24">
              <div class="grid-content bg-purple">
                  <span class="filed_key">办公场地是否正规？：{{filingObject.inspectReport.officeIsStandard?'正规':'不正规'}}</span>
              </div>
            </el-col>
            <el-col :span="24">
              <div class="grid-content bg-purple">
                  <span class="filed_key">周边情况，如：是否拆迁等。：{{filingObject.inspectReport.description}}</span>
              </div>
            </el-col>
            <el-col :span="24">
              <div class="grid-content bg-purple">
                  <span class="filed_key">与商户进行沟通的状态与感觉是否顺畅？：{{filingObject.inspectReport.personIsStandard?'很顺畅':'不顺畅'}}</span>
              </div>
            </el-col>
          </el-row>
    </div>
    <div id="chef-ddf" style="margin-top: 60px;margin-right: 200px;margin-bottom: 0px;">
          <el-col :span="24">
            <div style="text-align: right;padding-right: 50px;">
              <span>外访人签字：</span>
            </div>   
          </el-col>
        </el-row>
    </div>
    <!--endprint-->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import baseComponents from '@/common/base.js'
import { getUserId } from '@/utils/auth'
import { strateStatus } from '@/utils/statusCode'
import $ from 'jquery'
export default {
  props: {
    dialogFlag:Boolean,
    filingObject:Object,
    dialogFlagKeyfoo:Number
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
      dieObj:{},
      activeName:'first',
      gridData:[],
      anctionName:'SetEmployee',
      signsList:[{
        label:'加载中。。。。',
        value:0
      }],
      gridData: [],
      form:{},
      owner_card_back:'https://gss0.bdstatic.com/94o3dSag_xI4khGkpoWK1HF6hhy/baike/crop%3D0%2C0%2C550%2C363%3Bc0%3Dbaike80%2C5%2C5%2C80%2C26/sign=c0a36d315ee736d14c5cd648a66063f2/f11f3a292df5e0fee188aaec566034a85fdf724e.jpg'
    }
  },
  extends: baseComponents,
  mounted:function(){
  },
  watch:{
  },
  computed: {
    ...mapGetters([
      'signs',
    ])
  },
  created() {
    // const curruid = getUserId()
    // const id = this.filingObject.id
    // this.$store.dispatch('StoreDetails', { curruid, id }).then((data) => {
    //   this.dieObj = data.data
    //   console.log(data)
    // })
  },
  watch:{
  },
  methods: {
    dayin(){
      $("#fdsfsd").find("button").hide();
      // const bdhtml=window.document.body.innerHTML;
      // const sprnstr="<!--startprint-->",eprnstr="<!--endprint-->";      
      // let prnhtml=bdhtml.substr(bdhtml.indexOf(sprnstr)+17);      
      // prnhtml=prnhtml.substring(0,prnhtml.indexOf(eprnstr));      
      // window.document.body.innerHTML=prnhtml;   
       document.title = '元宝亿家租赁外访调研表（商户）'
      const newstr = document.getElementById("dayin").innerHTML;
      
      window.document.body.innerHTML=newstr;
      window.print();    
      window.location.reload();
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
  .grid-content{
    margin:5px 0; 
  }
  #chef-ddf{
    span{
      margin-left:20px; 
    }
  }
  .el-dialog__wrapper{
    .el-dialog{
      margin-top: 0;
    }
  }
  #dayin {page-break-before:avoid;}
  #dayin:last-child {
     page-break-after: auto;
  }
</style>