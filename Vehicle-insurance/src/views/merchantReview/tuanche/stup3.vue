<template>
  <div id="stup3">
    <el-steps :active="tuancheStup" finish-status="success">
      <el-step title="步骤1" description="添加法人信息"></el-step>
      <el-step title="步骤2" description="添加车辆"></el-step>
      <el-step title="步骤3" description="完成订单"></el-step>
    </el-steps>
    <el-form ref="form" :model="form" :rules="rules"  label-width="100px">
      <div class="panel-info">
        <!-- <el-row>
          <el-col :span="24">
            <div class="grid-content bg-purple-light" style="font-family:'Arial Negreta','Arial';margin:5px 0;font-weight: 700;font-style: normal;font-size: 18px;">
                <span class="filed_key">法人信息</span>
            </div>
          </el-col>
        </el-row> -->
        <el-row>
          <el-col :span="24">
            <div class="grid-content bg-purple-light" style="font-family:'Arial Negreta','Arial';margin:5px 0;font-weight: 700;font-style: normal;font-size: 18px;">
                <span class="filed_key">分期信息</span>
            </div>
          </el-col>
        </el-row>
        
        <el-row>
            <el-col :span="8">
              <div class="grid-content bg-purple">
                  <el-form-item label="经纪人手机号">
                    <el-input v-model="orderForm.agentMobile" ></el-input>
                  </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple">
                  <el-form-item label="保险公司-开户行代码，联行号">
                    <el-input v-model="orderForm.bankCode" ></el-input>
                  </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple">
                  <el-form-item label="保险公司-户名">
                    <el-input v-model="orderForm.accountName" ></el-input>
                  </el-form-item>
              </div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="8">
              <div class="grid-content bg-purple">
                  <el-form-item label="保险公司-帐号">
                    <el-input v-model="orderForm.accountNo" ></el-input>
                  </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple">
                  <el-form-item label="保险公司-开户行全称">
                    <el-input v-model="orderForm.bankName" ></el-input>
                  </el-form-item>
              </div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="8">
              <div class="grid-content bg-purple">
                  <el-form-item label="还款期数">
                    <el-select v-model="orderForm.divideTerm" clearable placeholder="请选择" >
                      <el-option
                        v-for="item in qishu"
                        :key="item.key"
                        :label="item.value"
                        :value="item.key">
                      </el-option>
                    </el-select>
                  </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple">
                  <el-form-item label="商险总额">
                    <el-input v-model="orderDetail.businessInsuranceTotalAmount" :disabled="true"></el-input>
                  </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple">
                  <el-form-item label="商险首付比例">
                    <el-select v-model="orderForm.downpaymentRatio" clearable placeholder="请选择" @change="getStateValue">
                      <el-option
                        v-for="item in bili"
                        :key="item.key"
                        :label="item.value"
                        :value="item.key">
                      </el-option>
                    </el-select>
                  </el-form-item>
              </div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="8">
              <div class="grid-content bg-purple">
                  <el-form-item label="商险首付">
                    <el-input v-model="orderForm.downpaymentAmount" :disabled="true"></el-input>
                  </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple">
                  <el-form-item label="合计首付">
                    <el-input v-model="orderForm.downpaymentTotalAmount" :disabled="true"></el-input>
                  </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple">
                  <el-form-item label="分期金额">
                    <el-input v-model="orderForm.installmentTotalAmount" :disabled="true"></el-input>
                  </el-form-item>
              </div>
            </el-col>
        </el-row>
      </div>
    </el-form>
    <div slot="footer" class="dialog-footer" style="margin: 30px;margin-top: 100px;text-align: center;">
          <el-button @click="lastPanel"><上一步</el-button>
          <el-button type="primary" @click="onSubmit">下一步></el-button>
        </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import baseComponents from '@/common/base.js'
import { getUserId } from '@/utils/auth'
import { addCarRules } from '@/utils/validate'
import { strateStatus } from '@/utils/statusCode'
export default {
  props: {
    dialogFlag:Boolean,
    filingObject:Object,
    dialogFlagKeyfoo:Number
  },
  components: {
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
      divideTerm:3,
      downpaymentRatio:null,
      myCar:null,
      qishu:[
        {
          key:'3',
          value:'3期'
        },
        {
          key:'6',
          value:'6期'
        },
        {
          key:'9',
          value:'9期'
        },
        {
          key:'11',
          value:'11期'
        },
      ],
      bili:[
        {
          key:'10',
          value:'10%'
        },
        {
          key:'20',
          value:'20%'
        },
      ],
      contactRelation: [
        {
          key:'0',
          value:'父母'
        },
        {
          key:'1',
          value:'配偶'
        },
        {
          key:'2',
          value:'子女'
        },
        {
          key:'3',
          value:'亲属'
        },
        {
          key:'4',
          value:'朋友'
        },
        {
          key:'5',
          value:'同事'
        },
        {
          key:'6',
          value:'企业操作'
        },
        {
          key:'7',
          value:'业务联系人'
        },
        {
          key:'8',
          value:'企业员工'
        }
      ],
      activeName:'first',
      cars:[],
      orderForm:{
        downpaymentAmount:null,
        downpaymentTotalAmount:null,
        installmentTotalAmount:null
      },
      rules:addCarRules,
      innerVisible:false,
      innerVisibleMy:false,
      innerVisibleDe:false,
      gridData:[],
      img1:null,
      img2:null,
      anctionName:'SetEmployee',
      signsList:[{
        label:'加载中。。。。',
        value:0
      }],
      gridData: [],
      form:{},
    }
  },
  extends: baseComponents,
  mounted:function(){
  },
  computed: {
    ...mapGetters([
      'tuancheStup',
      'orderDetail'
    ]),
  },
  created() {
    // const curruid = getUserId()
    // const id = this.filingObject.id
    // this.$store.dispatch('StoreDetails', { curruid, id }).then((data) => 
    //   this.dieObj = data.data
    //   console.log(data)
    // }){
  },
  // watch:{
  //   downpaymentRatio:function(val){
  //     this.orderForm.downpaymentRatio = val
  //     const totalAmountB = this.orderDetail.businessInsuranceTotalAmount
  //     const ratio  = val
  //     const curruid = getUserId()
  //     this.$store.dispatch('CarStage', { curruid, ratio, totalAmountB }).then((data)=>{
  //       if(data.status){
  //         this.orderForm.downpaymentAmount = data.data.downpaymentAmount
  //         this.orderForm.downpaymentTotalAmount = data.data.downpaymentTotalAmount
  //         this.orderForm.installmentTotalAmount = data.data.installmentTotalAmount
  //       }
  //     })
  //   }
  // },
  methods: {
    getStateValue(){
      const totalAmountB = this.orderDetail.businessInsuranceTotalAmount
      const ratio  = this.orderForm.downpaymentRatio
      const curruid = getUserId()
      this.$store.dispatch('CarStage', { curruid, ratio, totalAmountB }).then((data)=>{
        if(data.status){
          this.orderForm.downpaymentAmount = data.data.downpaymentAmount
          this.orderForm.downpaymentTotalAmount = data.data.downpaymentTotalAmount
          this.orderForm.installmentTotalAmount = data.data.installmentTotalAmount
        }
      })
    },
    onSubmit(){
      const orderForm = this.orderForm
      const orderDetail = this.orderDetail
      const curruid = getUserId()
      const orderVO = Object.assign(orderForm, orderDetail);
      orderVO.clientType = 1
      orderVO.storeInfoId = curruid
      this.$store.dispatch('AddOrder', {curruid,orderVO}).then((data)=>{
        if(data.status){
          this.orderForm.downpaymentAmount = data.data.downpaymentAmount
          this.orderForm.downpaymentTotalAmount = data.data.downpaymentTotalAmount
          this.orderForm.installmentTotalAmount = data.data.installmentTotalAmount
        }
      })
    },
    lastPanel(){
      this.$store.dispatch('SetTuancheStup', 1);
    },
    closeXiang(){
      this.innerVisibleDe = false
      this.$store.dispatch('setDetail',null);
    },
    mody(car){
      this.innerVisibleMy = true
      this.$store.dispatch('setModyCar', car);
    },
    chakanxiangqing(car){
      this.innerVisibleDe = true
      this.$store.dispatch('setDetail', car);
    },
    deleteCar(val){
      console.log(val)
      let index = null
      for(let i in this.cars){
        if(this.cars[i].id === val){
          index = i
        }
      }
      this.cars.splice(index, 1);
      this.cars = this.cars.concat();
    },
    dialogMsgMy(value){
      if(value.status){
        const car = value.data
        for(let i in this.cars){
          if(this.cars[i].id === car.id){
            this.cars[i]=car
          }
        }
        this.cars = this.cars.concat();
        this.getTotal()
        this.innerVisibleMy = false
      }else{
        this.innerVisibleMy = false
      }
    },
    dialogMsg(value){
      if(value.status){
        this.cars.push(value.data)
        this.getTotal()
        this.innerVisible = false
      }else{
        this.innerVisible = false
      }
    },
  }
}
</script>
<style rel="stylesheet/scss" lang="scss">
.teddd{
  overflow-y: auto;
  height: 800px;
}
.panel-info{
  padding:10px 20px;border-bottom: 1px solid #ebeef5;

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
  .grid-content{
    margin:5px 0; 
  }
  #chef-ddf{
    span{
      margin-left:20px; 
    }
  }
  #dingdandf{
    .el-form-item{
      margin:0; 
    }
    .el-row{
      margin:0;
      .el-col{
        padding:0 10px;
      } 
    }
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 90px;
    height: 90px;
    line-height: 90px;
    text-align: center;
  }
  .avatar {
    width: 90px;
    height: 90px;
    display: block;
  }
  .paizi-title{
      width: 150px;
      height: 29px;
      font-size: 26px;
      -webkit-transform-origin:bottom left ;   
     -webkit-transform:perspective(0.8em)  rotateX(5deg);
     text-align: center;
     color: #fff;
     top: 0;
     left: 0;
     bottom: 0;
     right: 0;
     background: #cacfd3;
     position: relative;
     display: inline-block;
  }
  .paizi-edite{
    float: right;
    font-size: 20px;
    color: #117adc;
  }
#stup3{
  .el-form{
    min-height:400px;
  }
}
</style>