<template>
  <div id="dingdandf">
    <el-form ref="form" :model="form" :rules="rules"  label-width="100px">
      <div class="panel-info">
        <el-row>
          <el-col :span="24">
            <div class="grid-content bg-purple-light" style="font-family:'Arial Negreta','Arial';margin:5px 0;font-weight: 700;font-style: normal;font-size: 18px;">
                <span class="filed_key">法人信息</span>
            </div>
          </el-col>
        </el-row>
        <el-row>
            <el-col :span="8">
              <div class="grid-content bg-purple">
                  <el-form-item label="姓名">
                    <el-input v-model="InsuranceOrderVO.applicantVO.name"></el-input>
                  </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple">
                  <el-form-item label="电话">
                    <el-input v-model="InsuranceOrderVO.applicantVO.mobileNo"></el-input>
                  </el-form-item>
              </div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="8">
              <div class="grid-content bg-purple">
                  <el-form-item label="证件号">
                    <el-input v-model="InsuranceOrderVO.applicantVO.certId"></el-input>
                  </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple">
                  <el-form-item label="证件地址">
                    <el-input v-model="InsuranceOrderVO.applicantVO.address"></el-input>
                  </el-form-item>
              </div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="8">
              <div class="grid-content bg-purple">
                  <el-form-item label="联系人">
                    <el-input v-model="InsuranceOrderVO.applicantVO.contactName"></el-input>
                  </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple">
                  <el-form-item label="联系电话">
                    <el-input v-model="InsuranceOrderVO.applicantVO.contactMobile"></el-input>
                  </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple">
                  <el-form-item label="与借款人关系">
                    <el-select v-model="InsuranceOrderVO.applicantVO.contactRelation" placeholder="请选择">
                      <el-option
                        v-for="item in contactRelation"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple">
                  <el-form-item label="公司名称">
                    <el-input v-model="InsuranceOrderVO.applicantVO.contactName"></el-input>
                  </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple">
                  <el-form-item label="信用代码">
                    <el-input v-model="InsuranceOrderVO.applicantVO.companyCode"></el-input>
                  </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple">
                  <el-form-item label="注册地址">
                    <el-input v-model="InsuranceOrderVO.applicantVO.registAddress"></el-input>
                  </el-form-item>
              </div>
            </el-col>
        </el-row>
      </div>

      

      <div class="panel-info">
        <el-row>
          <el-col :span="24">
            <div class="grid-content bg-purple-light" style="font-family:'Arial Negreta','Arial';margin:5px 0;font-weight: 700;font-style: normal;font-size: 18px;">
                <span class="filed_key">保险公司信息</span>
            </div>
          </el-col>
        </el-row>
        <el-row>
            <el-col :span="8">
              <div class="grid-content bg-purple">
                  <el-form-item label="开户名">
                    <el-input v-model="InsuranceOrderVO.accountName"></el-input>
                  </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple">
                  <el-form-item label="公司账号">
                    <el-input v-model="InsuranceOrderVO.accountNo"></el-input>
                  </el-form-item>
              </div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="8">
              <div class="grid-content bg-purple">
                  <el-form-item label="开户行全称">
                    <el-input v-model="InsuranceOrderVO.bankName"></el-input>
                  </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple">
                  <el-form-item label="开户行代码">
                    <el-input v-model="InsuranceOrderVO.bankCode"></el-input>
                  </el-form-item>
              </div>
            </el-col>
        </el-row>
      </div>

      <div class="panel-info">
        <el-row>
          <el-col :span="24">
            <div class="grid-content bg-purple-light" style="font-family:'Arial Negreta','Arial';margin:5px 0;font-weight: 700;font-style: normal;font-size: 18px;">
                <span class="filed_key" style="margin-right: 30px;">车辆信息</span><el-button type="primary" @click="innerVisible=true" size="mini" icon="el-icon-plus" circle></el-button>
            </div>
          </el-col>
        </el-row>
        <el-row>
            <el-col :span="9" v-for="item in cars">
              <el-col :span="24">
                <div class="grid-content bg-purple">
                    <div style="position: relative;width: 150px;height: 30px;border: 1px dashed darkcyan;position: relative;top: 31px;"></div>
                    <div class="paizi-title">
                      <i class="el-icon-close" style="float: left" @click="deleteCar(item.id)"></i>
                      <a> <span @click="chakanxiangqing(item)">{{item.plateNo}}</span></a>
                    </div>
                    <div class="paizi-edite" @click="mody(item)">
                      <i class="el-icon-edit"></i>
                      <span class="filed_key" style="margin-right: 10px;">编辑</span>
                      <!-- <el-button type="primary" size="mini" icon="el-icon-edit" circle></el-button> -->
                    </div>
                </div>
              </el-col>
              <el-col :span="24">
                <div class="grid-content bg-purple" style="border: 1px solid #ebeef5;padding:30px ">
                  <el-row>
                    <el-col :span="24">
                      <el-form-item label="车主姓名" prop="pass" label-width="80px">
                        <el-input v-model="InsuranceOrderVO.applicantVO.name" :disabled="true" autocomplete="off"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <br>
                  <el-row>
                    <el-col :span="24">
                      <el-form-item label="起保日期" prop="pass" label-width="80px">
                        <el-input v-model="item.insuranceInfos[0].startDate" :disabled="true"  autocomplete="off"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </div>
              </el-col>
            </el-col>
            <!-- <el-col :span="9">
              <el-col :span="24">
                <div class="grid-content bg-purple">
                    <div style="position: relative;width: 150px;height: 30px;border: 1px dashed darkcyan;position: absolute;top: 11px;"></div>
                    <div class="paizi-title">
                      <a>京A 88888</a>
                    </div>
                    <div class="paizi-edite">
                      <i class="el-icon-edit"></i>
                      <span class="filed_key" style="margin-right: 10px;">编辑</span>
                    </div>
                </div>
              </el-col>
              <el-col :span="24">
                <div class="grid-content bg-purple" style="border: 1px solid #ebeef5;padding:30px ">
                  <el-row>
                    <el-col :span="24">
                      <el-form-item label="车主姓名" prop="pass" label-width="80px">
                        <el-input  autocomplete="off"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <br>
                  <el-row>
                    <el-col :span="24">
                      <el-form-item label="起保日期" prop="pass" label-width="80px">
                        <el-input  autocomplete="off"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </div>
              </el-col>
            </el-col> -->
        </el-row>
      </div>
      <div class="panel-info">
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
                  <el-form-item label="还款期数">
                    <el-select v-model="InsuranceOrderVO.divideTerm" clearable placeholder="请选择">
                      <el-option
                        v-for="item in qishu"
                        :key="item.key"
                        :label="item.value"
                        @change="getStateValue"
                        :value="item.key">
                      </el-option>
                    </el-select>
                  </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple">
                  <el-form-item label="商险总额">
                    <el-input v-model="InsuranceOrderVO.businessInsuranceTotalAmount" :disabled="true"></el-input>
                  </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple">
                  <el-form-item label="商险首付比例">
                    <el-select v-model="downpaymentRatio" clearable placeholder="请选择">
                      <el-option
                        v-for="item in bili"
                        :key="item.key"
                        :label="item.value"
                        @change="getStateValue"
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
                    <el-input v-model="InsuranceOrderVO.downpaymentAmount" :disabled="true"></el-input>
                  </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple">
                  <el-form-item label="合计首付">
                    <el-input v-model="InsuranceOrderVO.downpaymentTotalAmount" :disabled="true"></el-input>
                  </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple">
                  <el-form-item label="分期金额">
                    <el-input v-model="InsuranceOrderVO.installmentTotalAmount" :disabled="true"></el-input>
                  </el-form-item>
              </div>
            </el-col>
        </el-row>
        <div slot="footer" class="dialog-footer" style="margin: 30px;margin-top: 100px;">
        <el-button @click="cancel1">取 消</el-button>
        <el-button type="primary" @click="onSubmit">确定</el-button>
      </div>
      </div>
    </el-form>
    <el-dialog
      width="60%"
      title="车辆添加"
      :visible.sync="innerVisible"
      :close-on-click-modal="false"
      append-to-body>
      <div>
        <addCar v-on:dialogMsg='dialogMsg'/>
      </div>
    </el-dialog>
    <el-dialog
      width="60%"
      title="车辆修改"
      :close-on-click-modal="false"
      :visible.sync="innerVisibleMy"
      append-to-body>
      <div>
        <modifyCar v-on:dialogMsg='dialogMsgMy'/>
      </div>
    </el-dialog>
    <el-dialog
      width="60%"
      title="车辆详情"
      @close="closeXiang"
      :visible.sync="innerVisibleDe"
      append-to-body>
      <div>
        <carDetails/>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import baseComponents from '@/common/base.js'
import { getUserId } from '@/utils/auth'
import addCar from './addCar'
import modifyCar from './modifyCar'
import carDetails from './carDetails'
import { addCarRules } from '@/utils/validate'

import { strateStatus } from '@/utils/statusCode'
export default {
  props: {
    dialogFlag:Boolean,
    filingObject:Object,
    dialogFlagKeyfoo:Number
  },
  components: {
    addCar,
    modifyCar,
    carDetails
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
      InsuranceOrderVO:{
        applicantVO:{
          imageInfo:[null,null],
        }
      },
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
      'reports',
    ])
  },
  created() {
    // const curruid = getUserId()
    // const id = this.filingObject.id
    // this.$store.dispatch('StoreDetails', { curruid, id }).then((data) => 
    //   this.dieObj = data.data
    //   console.log(data)
    // }){
  },
  watch:{
    downpaymentRatio:function(val){
      console.log(val)
      this.InsuranceOrderVO.downpaymentRatio = val
      this.getStateValue(val)
    }
  },
  methods: {
    onSubmit(){
      this.InsuranceOrderVO.vehicles = this.cars
      console.log(this.InsuranceOrderVO)
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
    getStateValue(value){
      console.log(444444444444)
      const ratio  = value
      const curruid = getUserId()
      const totalAmountB = this.getTotal()
      this.$store.dispatch('CarStage', { curruid, ratio, totalAmountB }).then((data)=>{
        if(data.status){
          this.InsuranceOrderVO.downpaymentAmount = data.data.downpaymentAmount
          this.InsuranceOrderVO.downpaymentTotalAmount = data.data.downpaymentTotalAmount
          this.InsuranceOrderVO.installmentTotalAmount = data.data.installmentTotalAmount
          let temp = this.InsuranceOrderVO
          this.InsuranceOrderVO = {}
          this.InsuranceOrderVO = temp
        }
        
        console.log(data)
      })
    },
    getTotal(){
      const total = this.cars
      let totalAmountB = 0
      let totalAmountC = 0
      let totalAmountT = 0
      let money = 0
      for(let i in total){
        for(let o in total[i].insuranceInfos){
          if(total[i].insuranceInfos[o].productCode === 'B01'){
            money+=total[i].insuranceInfos[o].premium
          }
        }
      }
      this.InsuranceOrderVO.businessInsuranceTotalAmount = money
      return money
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

</style>