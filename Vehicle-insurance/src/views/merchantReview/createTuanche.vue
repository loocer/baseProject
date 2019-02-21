<template>
  <div>
    <div style="padding:0 20px;">
        <el-row>
          <el-col :span="24">
            <div class="grid-content bg-purple" style="text-align: right;border-bottom: 1px solid rgb(242, 242, 242)">
                <span class="filed_key">填表日期：12：32：43</span>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <div class="grid-content bg-purple-light" style="font-family:'Arial Negreta','Arial';margin:5px 0;font-weight: 700;font-style: normal;font-size: 14px;">
                <span class="filed_key">商户与个人基本情况:</span>
            </div>
          </el-col>
        </el-row>
        <el-row>
            <el-col :span="5">
              <div class="grid-content bg-purple">
                  <span class="filed_key">商户名称（必填）：</span>
              </div>
            </el-col>
            <el-col :span="19">
              <div class="grid-content bg-purple">
                  <span class="filed_key">分为非法</span>
              </div>
            </el-col>
            <el-col :span="19">
              <div class="grid-content bg-purple">
                  <span class="filed_key">经营地址（必填）：{{dieObj.outboundAddr}}</span>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple">
                  <span class="filed_key">总部近期变更地址：{{dieObj.regDate}}</span>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple">
                  <span class="filed_key">近期变更日期：{{dieObj.manageHistory}}</span>
              </div>
            </el-col>  
            <el-col :span="12">
              <div class="grid-content bg-purple">
                  <span class="filed_key">外访地址：{{dieObj.organCode}}</span>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple">
                  <span class="filed_key">法人近期变更地址：{{dieObj.regCapital}}元</span>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple">
                  <span class="filed_key">法人户籍地址：{{dieObj.regAddress}}</span>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple">
                  <span class="filed_key">办公地面积：{{dieObj.regAddress}}</span>
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
                  <span class="filed_key">从业人数：{{dieObj.employeNum}}</span>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple">
                  <span class="filed_key">经营面积：{{dieObj.manageArea}}</span>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple">
                  <span class="filed_key">房源类型：{{dieObj.houseType}}</span>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple">
                  <span class="filed_key">房源数量：{{dieObj.houseNum}}</span>
              </div>
            </el-col>

            <el-col :span="12">
              <div class="grid-content bg-purple">
                  <span class="filed_key">连锁经营：{{dieObj.chainType}}</span>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple">
                  <span class="filed_key">门店数量：{{dieObj.storeNum}}</span>
              </div>
            </el-col>
            <el-col :span="24">
              <div class="grid-content bg-purple">
                  <span class="filed_key">固定电话：{{dieObj.fixPhone}}</span>
              </div>
            </el-col>
            <el-col :span="24">
              <div class="grid-content bg-purple">
                  <span class="filed_key">经营地址：{{dieObj.manageAddress}}</span>
              </div>
            </el-col>
            <el-col :span="24">
              <div class="grid-content bg-purple">
                  <span class="filed_key">经营范围：{{dieObj.manageScope}}</span>
              </div>
            </el-col>
            <el-col :span="24">
              <div class="grid-content bg-purple">
                <div class="filed_value_img">
                  <span  alt="身份证反面">营业执照:</span> 
                <img :src="owner_card_back" width="150px;" align="top"> 
                </div>
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
                  <span class="filed_key">从业人数：{{dieObj.employeNum}}</span>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple">
                  <span class="filed_key">经营面积：{{dieObj.manageArea}}</span>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple">
                  <span class="filed_key">房源类型：{{dieObj.houseType}}</span>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple">
                  <span class="filed_key">房源数量：{{dieObj.houseNum}}</span>
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
            <el-col :span="12">
              <div class="grid-content bg-purple">
                  <span class="filed_key">从业人数：{{dieObj.employeNum}}</span>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple">
                  <span class="filed_key">经营面积：{{dieObj.manageArea}}</span>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple">
                  <span class="filed_key">房源类型：{{dieObj.houseType}}</span>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple">
                  <span class="filed_key">房源数量：{{dieObj.houseNum}}</span>
              </div>
            </el-col>
          </el-row>
    </div>
    <div id="chef-ddf" style="margin-top: 60px;margin-right: 200px;">
          <el-col :span="24">
            <div style="text-align: right;padding-right: 50px;">
              <span>外访人签字：</span>
            </div>   
          </el-col>
        </el-row>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import baseComponents from '@/common/base.js'
import { getUserId } from '@/utils/auth'
import { strateStatus } from '@/utils/statusCode'
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
      'reports',
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
</style>