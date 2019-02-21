<template>
  <div>
    <el-row>
      <el-col :span="12">
        <div class="grid-content bg-purple">
            <span class="filed_keyd">商户名称：{{filingObject.storeTitle}}</span>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content bg-purple">
            <span class="filed_keyd" style="margin-left: 100px;">商户评级：{{filingObject.storeLevel}}</span><span class="filed_keyd" style="float: right">放款额度：{{filingObject.regCapital}}</span>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="11" style="float:left;">
        <div class="grid-content bg-purple">
            <el-row>
              <el-col :span="24">
                  <div class="grid-content bg-purple">
                      <span class="filed_key">注册信息</span>
                  </div>
                </el-col>
                <el-col :span="24" style="border-width: 1px;border-style: solid;border-color: rgba(204, 204, 204, 1);padding: 0 10px;">
                  <div class="grid-content bg-purple">
                      <el-row>
                        <el-col :span="24">
                          <div class="grid-content bg-purple">
                              <span class="filed_key">法人姓名：{{filingObject.legalPerson||'加载中。。。。'}}</span>
                          </div>
                        </el-col>
                        <el-col :span="12">
                          <div class="grid-content bg-purple">
                              <span class="filed_key">注册日期：{{filingObject.regDate||'加载中。。。。'}}</span>
                          </div>
                        </el-col>
                        <el-col :span="12">
                          <div class="grid-content bg-purple">
                              <span class="filed_key">经营年限：{{filingObject.manageHistory||'加载中。。。。'}}</span>
                          </div>
                        </el-col>
                        <el-col :span="12">
                          <div class="grid-content bg-purple">
                              <span class="filed_key">信用代码：{{filingObject.organCode||'加载中。。。。'}}</span>
                          </div>
                        </el-col>
                        <el-col :span="12">
                          <div class="grid-content bg-purple">
                              <span class="filed_key">注册资本：{{filingObject.regCapital||'加载中。。。。'}}</span>
                          </div>
                        </el-col>
                        <el-col :span="24">
                          <div class="grid-content bg-purple">
                              <span class="filed_key">注册地址：{{filingObject.regAddress||'加载中。。。。'}}</span>
                          </div>
                        </el-col>
                      </el-row>
                  </div>
              </el-col>
            </el-row>
        </div>
      </el-col>
      <el-col :span="11" style="float:right;">
        <div class="grid-content bg-purple">
            <el-row>
              <el-col :span="24">
                  <div class="grid-content bg-purple">
                      <span class="filed_key">经营信息：</span>
                  </div>
                </el-col>
                <el-col :span="24" style="border-width: 1px;border-style: solid;border-color: rgba(204, 204, 204, 1);padding: 0 10px;">
                  <div class="grid-content bg-purple">
                      <el-row>
                        <el-col :span="12">
                          <div class="grid-content bg-purple">
                              <span class="filed_key">从业人数：{{filingObject.employeNum||'加载中。。。。'}}</span>
                          </div>
                        </el-col>
                        <el-col :span="12">
                          <div class="grid-content bg-purple">
                              <span class="filed_key">经营面积：{{filingObject.manageArea||'加载中。。。。'}}</span>
                          </div>
                        </el-col>
                        <el-col :span="12">
                          <div class="grid-content bg-purple">
                              <span class="filed_key">房源类型：{{filingObject.houseType||'加载中。。。。'}}</span>
                          </div>
                        </el-col>
                        <el-col :span="12">
                          <div class="grid-content bg-purple">
                              <span class="filed_key">房源数量：{{filingObject.houseNum||'加载中。。。。'}}</span>
                          </div>
                        </el-col>
                        <el-col :span="12">
                          <div class="grid-content bg-purple">
                              <span class="filed_key">连锁经营：{{filingObject.chainType||'加载中。。。。'}}</span>
                          </div>
                        </el-col>
                        <el-col :span="12">
                          <div class="grid-content bg-purple">
                              <span class="filed_key">门店数量：{{filingObject.storeNum||'加载中。。。。'}}</span>
                          </div>
                        </el-col>
                        <el-col :span="24">
                          <div class="grid-content bg-purple">
                              <span class="filed_key">固定电话：{{filingObject.fixPhone||'加载中。。。。'}}</span>
                          </div>
                        </el-col>
                        <el-col :span="24">
                          <div class="grid-content bg-purple">
                              <span class="filed_key">经营地址：{{filingObject.manageAddress||'加载中。。。。'}}</span>
                          </div>
                        </el-col>
                        <el-col :span="24">
                          <div class="grid-content bg-purple">
                              <span class="filed_key">经营范围：{{filingObject.manageScope||'加载中。。。。'}}</span>
                          </div>
                        </el-col>
                      </el-row>
                  </div>
              </el-col>
            </el-row>
        </div>
      </el-col>
    </el-row>
    <el-row v-if="filingObject.attachments">
      <el-col :span="24">
          <div class="grid-content bg-purple" v-for="">
              <span  alt="身份证反面" class="filed_keyd">营业执照:</span>
          </div>
      </el-col>1
      <el-col :span="24">
        <div class="grid-content bg-purple" v-for="b in filingObject.attachments">
                  <img :src="b" width="150px;" align="top"> 
        </div>
      </el-col>
    </el-row>
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
      owner_card_back:'https://gss0.bdstatic.com/94o3dSag_xI4khGkpoWK1HF6hhy/baike/crop%3D0%2C0%2C550%2C363%3Bc0%3Dbaike80%2C5%2C5%2C80%2C26/sign=c0a36d315ee736d14c5cd648a66063f2/f11f3a292df5e0fee188aaec566034a85fdf724e.jpg'
    }
  },
  extends: baseComponents,
  mounted:function(){
  },
  watch:{
  },
  computed: {
  },
  created() {
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
  .filed_keyd{
    font-weight: 650;
    font-style: normal;
    font-size: 16px;
  }
</style>