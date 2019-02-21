<template>
  <div>
    <div style="padding:0 20px;height: 500px;">
        <el-row>
          <el-col :span="24">
            <div class="grid-content bg-purple" style="color:#999999">
                <span class="filed_key">商户名称：</span>
                <span class="filed_value"> {{filingObject.storeTitle||'加载中。。。'}} </span>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <div class="grid-content bg-purple-light" style="font-family:'Arial Negreta','Arial';margin:5px 0;font-weight: 700;font-style: normal;font-size: 14px;">
                <span class="filed_key">注册信息:</span>
            </div>
          </el-col>
        </el-row>
        <el-row>
            <el-col :span="12">
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
                  <span class="filed_key">注册资本：{{filingObject.regCapital||'加载中。。。。'}}元</span>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple">
                  <span class="filed_key">注册地址：{{filingObject.regAddress||'加载中。。。。'}}</span>
              </div>
            </el-col>
        </el-row>


        <el-row>
          <el-col :span="24">
            <div class="grid-content bg-purple-light" style="font-family:'Arial Negreta','Arial';margin:5px 0;font-weight: 700;font-style: normal;font-size: 14px;">
                <span class="filed_key">经营信息:</span>
            </div>
          </el-col>
        </el-row>
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
            <el-col :span="24">
              <div class="grid-content bg-purple">
                <div class="filed_value_img">
                  <span  alt="身份证反面">营业执照:</span> 
                <img :src="owner_card_back" width="150px;" align="top"> 
                </div>
              </div>
            </el-col>
        </el-row>
    </div>
    <div id="chef-ddf" style="box-sizing: border-box;border-width: 1px;border-style: solid;border-color: rgba(204, 204, 204, 1);">
        <el-row>
          <el-col :span="12">
            <div class="grid-content bg-purple-light" style="border-bottom: 1px solid #f2f2f2;padding-bottom: 15px;">
                <span class="filed_key">商户状态:</span>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple-light" style="border-bottom: 1px solid #f2f2f2;padding-bottom: 15px;padding-left:100px;">
                <span class="filed_key" v-if="filingObject.storeLevel">房源评级:{{filingObject.storeLevel}}</span>
                <span class="filed_key" style="margin-left:100px;">放款额度：{{filingObject.lendingQuotas}}万</span>
            </div>
          </el-col>
        </el-row>
        <!-- <el-row>
          <el-col :span="24">
            <div class="grid-content bg-purple-light" style="padding-bottom: 15px;text-align: right;padding-right: 50px;">
                <span class="filed_key">商户状态:</span>
                <el-select v-model="dieObj.storeState" filterable placeholder="请选择" size="mini">
                  <el-option
                    v-for="item in storeStatusList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                <span class="filed_key">切换签约人:</span>
                <el-select v-model="dieObj.signId" filterable placeholder="请选择" size="mini">
                  <el-option
                    v-for="item in signs"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
            </div>
          </el-col>
          <el-col :span="24">
            <div style="text-align: right;padding-right: 50px;">
              <el-button @click="cancel1">取消</el-button>
              <el-button type="primary" @click="modifyObj">提交</el-button>
            </div>   
          </el-col>
        </el-row> -->
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import baseComponents from '@/common/base.js'
import { getUserId } from '@/utils/auth'
import { storeStatus } from '@/utils/statusCode'
export default {
  props: {
    dialogFlag:Boolean,
    filingObject:Object,
    dialogFlagKeyfoo:Number
  },
  filters: {
    storeStatusFomat(val) {
      return storeStatus[val]
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
    ]),
    storeStatusList:function(){
      const list  = []
      Object.keys(storeStatus).forEach(function(key){
        list.push({label:storeStatus[key], value:key})
      });
      return list
    }
  },
  created() {
    
  },
  watch:{
    // filingObject(){
    //   console.log(33333333333)
    //   const curruid = getUserId()
    //   const id = this.filingObject.id
    //   this.$store.dispatch('StoreDetails', { curruid, id }).then((data) => {
    //   this.dieObj = data.data
    //   console.log(data)
    // }) 
    // }
  },
  methods: {
    modifyObj(){
      const curruid = getUserId()
      const id = this.filingObject.id
      const storeVO = this.dieObj
      this.$store.dispatch('ModifyStoreRatation', { curruid, id, storeVO }).then((data) => {
        this.dieObj = data.data
        console.log(data)
      })
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
    margin:10px 0; 
  }
  #chef-ddf{
    span{
      margin-left:20px; 
    }
  }

</style>