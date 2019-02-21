<template>
  <div id="dingdandf">
    <el-form ref="form" :model="form" label-width="100px" v-if="orderDetail.clientType == 1">
      <div class="panel-info" v-if="orderDetail.applicantVO">
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
                    <el-input v-model="orderDetail.applicantVO.name" :disabled="true"></el-input>
                  </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple">
                  <el-form-item label="电话">
                    <el-input v-model="orderDetail.applicantVO.mobileNo" :disabled="true"></el-input>
                  </el-form-item>
              </div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="8">
              <div class="grid-content bg-purple">
                  <el-form-item label="证件号">
                    <el-input v-model="orderDetail.applicantVO.certId":disabled="true" ></el-input>
                  </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple">
                  <el-form-item label="证件地址">
                    <el-input v-model="orderDetail.applicantVO.address":disabled="true" ></el-input>
                  </el-form-item>
              </div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="8">
              <div class="grid-content bg-purple">
                  <el-form-item label="联系人">
                    <el-input v-model="orderDetail.applicantVO.contactName":disabled="true" ></el-input>
                  </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple">
                  <el-form-item label="联系电话">
                    <el-input v-model="orderDetail.applicantVO.contactMobile":disabled="true" ></el-input>
                  </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple">
                  <el-form-item label="与借款人关系">
                    <el-select v-model="orderDetail.applicantVO.contactRelation" placeholder="请选择" :disabled="true">
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
        </el-row>
        <el-row>
          <el-col :span="8" >
            <el-form-item label="证件照">
              <el-col :span="12" >
                <div class="grid-content bg-purple" style="text-align: center;margin:0 ">
                  <vue-preview :slides="img1"></vue-preview>
                  <span>身份证正面</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="grid-content bg-purple" style="text-align: center;margin:0">
                  <vue-preview :slides="img2"></vue-preview>
                  <span>身份证反面</span>
                </div>
              </el-col>
            </el-form-item>
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
                    <el-input v-model="orderDetail.accountName" :disabled="true"></el-input>
                  </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple">
                  <el-form-item label="公司账号">
                    <el-input v-model="orderDetail.accountNo" :disabled="true"></el-input>
                  </el-form-item>
              </div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="8">
              <div class="grid-content bg-purple">
                  <el-form-item label="开户行全称">
                    <el-input v-model="orderDetail.bankName" :disabled="true"></el-input>
                  </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple">
                  <el-form-item label="开户行代码">
                    <el-input  v-model="orderDetail.bankCode" :disabled="true"></el-input>
                  </el-form-item>
              </div>
            </el-col>
        </el-row>
      </div>

      <div class="panel-info">
        <el-row>
          <el-col :span="24">
            <div class="grid-content bg-purple-light" style="font-family:'Arial Negreta','Arial';margin:5px 0;font-weight: 700;font-style: normal;font-size: 18px;">
                <span class="filed_key" style="margin-right: 30px;">车辆信息</span>
            </div>
          </el-col>
        </el-row>
        <el-row>
            <el-col :span="9" v-for="item in orderDetail.vehicles">
              <el-col :span="24">
                <div class="grid-content bg-purple">
                    <div style="position: relative;width: 150px;height: 30px;border: 1px dashed darkcyan;position: relative;top: 31px;"></div>
                    <div class="paizi-title">
                      <!-- <i class="el-icon-close" style="float: left" ></i> -->
                      <a> <span @click="chakanxiangqing(item)">{{item.plateNo}}</span></a>
                    </div>
                    <div class="paizi-edite">
                      <!-- <i class="el-icon-edit"></i> -->
                      <!-- <span class="filed_key" style="margin-right: 10px;">编辑</span> -->
                      <!-- <el-button type="primary" size="mini" icon="el-icon-edit" circle></el-button> -->
                    </div>
                </div>
              </el-col>
              <el-col :span="24">
                <div class="grid-content bg-purple" style="border: 1px solid #ebeef5;padding:30px ">
                  <el-row>
                    <el-col :span="24">
                      <el-form-item label="车主姓名" prop="pass" label-width="80px">
                        <el-input v-model="orderDetail.applicantVO.name" :disabled="true" autocomplete="off" ></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <br>
                  <el-row>
                    <el-col :span="24">
                      <el-form-item label="起保日期" prop="pass" label-width="80px">
                        <el-input v-model="item.insuranceInfos[0].startDate" :disabled="true"  autocomplete="off" ></el-input>
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
                        <el-input  autocomplete="off" ></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <br>
                  <el-row>
                    <el-col :span="24">
                      <el-form-item label="起保日期" prop="pass" label-width="80px">
                        <el-input  autocomplete="off" ></el-input>
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
                    <el-input v-model="orderDetail.divideTerm" :disabled="true"></el-input>
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
                    <el-select v-model="orderDetail.downpaymentRatio" clearable placeholder="请选择" :disabled="true">
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
                    <el-input v-model="orderDetail.downpaymentAmount" :disabled="true"></el-input>
                  </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple">
                  <el-form-item label="合计首付">
                    <el-input v-model="orderDetail.downpaymentTotalAmount" :disabled="true"></el-input>
                  </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple">
                  <el-form-item label="分期金额">
                    <el-input v-model="orderDetail.installmentTotalAmount" :disabled="true"></el-input>
                  </el-form-item>
              </div>
            </el-col>
        </el-row>
      </div>
    </el-form>



    <el-form ref="form" :model="form" label-width="100px">
      <div class="panel-info" v-if="orderDetail.applicantVO">
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
                    <el-input v-model="orderDetail.applicantVO.name" :disabled="true"></el-input>
                  </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple">
                  <el-form-item label="电话">
                    <el-input v-model="orderDetail.applicantVO.mobileNo" :disabled="true"></el-input>
                  </el-form-item>
              </div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="8">
              <div class="grid-content bg-purple">
                  <el-form-item label="证件号">
                    <el-input v-model="orderDetail.applicantVO.certId":disabled="true" ></el-input>
                  </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple">
                  <el-form-item label="证件地址">
                    <el-input v-model="orderDetail.applicantVO.address":disabled="true" ></el-input>
                  </el-form-item>
              </div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="8">
              <div class="grid-content bg-purple">
                  <el-form-item label="联系人">
                    <el-input v-model="orderDetail.applicantVO.contactName":disabled="true" ></el-input>
                  </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple">
                  <el-form-item label="联系电话">
                    <el-input v-model="orderDetail.applicantVO.contactMobile":disabled="true" ></el-input>
                  </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple">
                  <el-form-item label="与借款人关系">
                    <el-select v-model="orderDetail.applicantVO.contactRelation" placeholder="请选择" :disabled="true">
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
        </el-row>
        <el-row>
          <el-col :span="8" >
            <el-form-item label="证件照">
              <el-col :span="12" >
                <div class="grid-content bg-purple" style="text-align: center;margin:0 ">
                  <vue-preview :slides="img1"></vue-preview>
                  <span>身份证正面</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="grid-content bg-purple" style="text-align: center;margin:0">
                  <vue-preview :slides="img2"></vue-preview>
                  <span>身份证反面</span>
                </div>
              </el-col>
            </el-form-item>
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
                    <el-input v-model="orderDetail.accountName" :disabled="true"></el-input>
                  </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple">
                  <el-form-item label="公司账号">
                    <el-input v-model="orderDetail.accountNo" :disabled="true"></el-input>
                  </el-form-item>
              </div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="8">
              <div class="grid-content bg-purple">
                  <el-form-item label="开户行全称">
                    <el-input v-model="orderDetail.bankName" :disabled="true"></el-input>
                  </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple">
                  <el-form-item label="开户行代码">
                    <el-input  v-model="orderDetail.bankCode" :disabled="true"></el-input>
                  </el-form-item>
              </div>
            </el-col>
        </el-row>
      </div>

      <div class="panel-info">
        <el-row>
          <el-col :span="24">
            <div class="grid-content bg-purple-light" style="font-family:'Arial Negreta','Arial';margin:5px 0;font-weight: 700;font-style: normal;font-size: 18px;">
                <span class="filed_key" style="margin-right: 30px;">车辆信息</span>
            </div>
          </el-col>
        </el-row>
        <el-row>
            <el-col :span="9" v-for="item in orderDetail.vehicles">
              <el-col :span="24">
                <div class="grid-content bg-purple">
                    <div style="position: relative;width: 150px;height: 30px;border: 1px dashed darkcyan;position: relative;top: 31px;"></div>
                    <div class="paizi-title">
                      <!-- <i class="el-icon-close" style="float: left" ></i> -->
                      <a> <span @click="chakanxiangqing(item)">{{item.plateNo}}</span></a>
                    </div>
                    <div class="paizi-edite">
                      <!-- <i class="el-icon-edit"></i> -->
                      <!-- <span class="filed_key" style="margin-right: 10px;">编辑</span> -->
                      <!-- <el-button type="primary" size="mini" icon="el-icon-edit" circle></el-button> -->
                    </div>
                </div>
              </el-col>
              <el-col :span="24">
                <div class="grid-content bg-purple" style="border: 1px solid #ebeef5;padding:30px ">
                  <el-row>
                    <el-col :span="24">
                      <el-form-item label="车主姓名" prop="pass" label-width="80px">
                        <el-input v-model="orderDetail.applicantVO.name" :disabled="true" autocomplete="off" ></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <br>
                  <el-row>
                    <el-col :span="24">
                      <el-form-item label="起保日期" prop="pass" label-width="80px">
                        <el-input v-model="item.insuranceInfos[0].startDate" :disabled="true"  autocomplete="off" ></el-input>
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
                        <el-input  autocomplete="off" ></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <br>
                  <el-row>
                    <el-col :span="24">
                      <el-form-item label="起保日期" prop="pass" label-width="80px">
                        <el-input  autocomplete="off" ></el-input>
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
                    <el-input v-model="orderDetail.divideTerm" :disabled="true"></el-input>
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
                    <el-select v-model="orderDetail.downpaymentRatio" clearable placeholder="请选择" :disabled="true">
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
                    <el-input v-model="orderDetail.downpaymentAmount" :disabled="true"></el-input>
                  </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple">
                  <el-form-item label="合计首付">
                    <el-input v-model="orderDetail.downpaymentTotalAmount" :disabled="true"></el-input>
                  </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple">
                  <el-form-item label="分期金额">
                    <el-input v-model="orderDetail.installmentTotalAmount" :disabled="true"></el-input>
                  </el-form-item>
              </div>
            </el-col>
        </el-row>
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
import { getUserId, getCommercialId } from '@/utils/auth'
import addCar from './addCar'
import modifyCar from './modifyCar'
import carDetails from './tuanche/car/carDetails'
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
      downpaymentRatio:null,
      myCar:null,
      bili:[
        {
          key:'0',
          value:'1成'
        },
        {
          key:'1',
          value:'2成'
        },
        {
          key:'2',
          value:'4成'
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
  watch:{
  },
  computed: {
    ...mapGetters([
      'orderDetail',
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
    }
  },
  methods: {
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
      const ratio  = value
      const curruid = getUserId()
      const totalAmountB = getTotal()
      this.$store.dispatch('CarStage', { curruid, commercialId, VehicleVO }).then((data)=>{
        console.log(data)
      })
    },
    getTotal(){
      const total = this.cars
      let money = 0
      for(let i in total){
        for(let o in total[i].insuranceInfos){
            money+=total[i].insuranceInfos[o].premium
        }
      }
      return money
    },
    dialogMsgMy(value){
      console.log(value)
      if(value.status){
        const car = value.data
        for(let i in this.cars){
          if(this.cars[i].id === car.id){
            this.cars[i]=car
          }
        }
        this.cars = this.cars.concat();
        this.innerVisibleMy = false
      }else{
        this.innerVisibleMy = false
      }
    },
    dialogMsg(value){
      console.log(value)
      if(value.status){
        this.cars.push(value.data)
        this.innerVisible = false
      }else{
        this.innerVisible = false
      }
    },
    handleAvatarSuccess1(res, file) {
      // this.bone.imageInfo.imageUrl = URL.createObjectURL(file.raw);
      this.img1 = URL.createObjectURL(file.raw);
      const ingf = {
        imageType:'bizLicence',
        imageUrl: URL.createObjectURL(file.raw)
      }
      this.VehicleVO.imageInfo[0] = ingf
    },
    handleAvatarSuccess2(res, file) {
      this.img2 = URL.createObjectURL(file.raw);
      // this.btwo.imageInfo.imageUrl = URL.createObjectURL(file.raw);
      const ingf = {
        imageType:'bizLicence',
        imageUrl: URL.createObjectURL(file.raw)
      }
      this.VehicleVO.imageInfo[1] = ingf
      
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