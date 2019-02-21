<template>
  <div id="dingdandf">
    <el-form ref="form" :model="InsuranceOrderVO" label-width="100px">
      <div class="panel-info">
        <el-row>
          <el-col :span="24">
            <div class="grid-content bg-purple-light" style="font-family:'Arial Negreta','Arial';margin:5px 0;font-weight: 700;font-style: normal;font-size: 18px;">
                <span class="filed_key">借款人(车主/投保人)信息</span>
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
                        :key="item.key"
                        :label="item.value"
                        :value="item.key">
                      </el-option>
                    </el-select>
                  </el-form-item>
              </div>
            </el-col>
        </el-row>
        <!-- <el-row>
          <el-col :span="8" >
            <el-form-item label="证明照">
              <el-col :span="12" >
                <div class="grid-content bg-purple" style="text-align: center;margin:0 ">
                  <el-upload
                    class="avatar-uploader"
                    action="https://up-z1.qbox.me"
                    :show-file-list="false"
                    :data="imgForm"
                    :on-success="handleAvatarSuccess1"
                    :before-upload="beforeAvatarUpload">
                    <img v-for="item in InsuranceOrderVO.imageInfo" v-if="item.imageType===''" :src="item.imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                  <span>身份证正面</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="grid-content bg-purple" style="text-align: center;margin:0">
                  <el-upload
                    class="avatar-uploader"
                    action="https://up-z1.qbox.me"
                    :show-file-list="false"
                    :data="imgForm"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload">
                    <img v-if="bIcCard" :src="bIcCard" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                  <span>身份证反面</span>
                </div>
              </el-col>

               <el-upload
                    action="https://up-z1.qbox.me"
                    :on-change="handleChange"
                    :on-remove="handremove"
                    list-type="picture-card"
                    :data="imgForm"
                    >
                    <i class="el-icon-plus"></i>
              </el-upload> -->
            <!-- </el-form-item> -->
          <!-- </el-col> -->
        <!-- </el-row>    --> 
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
                    <el-input v-model="InsuranceOrderVO.divideTerm"></el-input>
                  </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple">
                  <el-form-item label="商险总额">
                    <el-input v-model="InsuranceOrderVO.businessInsuranceTotalAmount  "></el-input>
                  </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple">
                  <el-form-item label="商险首付比例">
                    <el-input v-model="InsuranceOrderVO.downpaymentRatio"></el-input>
                  </el-form-item>
              </div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="8">
              <div class="grid-content bg-purple">
                  <el-form-item label="商险首付">
                    <el-input v-model="InsuranceOrderVO.downpaymentAmount"></el-input>
                  </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple">
                  <el-form-item label="合计首付">
                    <el-input v-model="InsuranceOrderVO.downpaymentTotalAmount"></el-input>
                  </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple">
                  <el-form-item label="分期金额">
                    <el-input v-model="InsuranceOrderVO.installmentTotalAmount"></el-input>
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
                <span class="filed_key">车辆信息</span>
            </div>
          </el-col>
        </el-row>
        <el-row>
            <el-col :span="8">
              <div class="grid-content bg-purple">
                  <el-form-item label="车牌号码">
                    <el-input v-model="VehicleVO.plateNo"></el-input>
                  </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple">
                  <el-form-item label="车型">
                    <el-input v-model="VehicleVO.model"></el-input>
                  </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple">
                  <el-form-item label="车架号">
                    <el-input v-model="VehicleVO.vin"></el-input>
                  </el-form-item>
              </div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="8">
              <div class="grid-content bg-purple">
                  <el-form-item label="发动机号">
                    <el-input v-model="VehicleVO.engineNo"></el-input>
                  </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple">
                  <el-form-item label="注册日期">
                    <el-date-picker
                      v-model="VehicleVO.registerDate"
                      format="yyyy 年 MM 月 dd 日"
                      value-format="yyyy-MM-dd"
                      type="date"
                      placeholder="选择日期">
                    </el-date-picker>
                  </el-form-item>
              </div>
            </el-col>
            <el-col :span="24">
              <div class="grid-content bg-purple" style="text-align: center;margin:0;width:300px">
                  <el-upload
                    class="avatar-uploader"
                    action="https://up-z1.qbox.me"
                    :show-file-list="false"
                    :data="imgForm"
                    :on-success="handleAvatarSuccess4"
                    :before-upload="beforeAvatarUpload">
                    <img v-if="img4" :src="img4" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                  <span>行驶证正本照片</span>
                </div>
            </el-col>
        </el-row>
      </div>

      <div class="panel-info">
        <el-row>
          <el-col :span="24">
            <div class="grid-content bg-purple-light" style="font-family:'Arial Negreta','Arial';margin:5px 0;font-weight: 700;font-style: normal;font-size: 18px;">
                <span class="filed_key">保单信息</span>
            </div>
          </el-col>
        </el-row>
        <el-row>
            <el-col :span="10">
              <div class="grid-content bg-purple">
                  <el-form-item label="商险期限">
                    <el-date-picker
                      v-model="bone.time"
                      type="daterange"
                      format="yyyy 年 MM 月 dd 日"
                      value-format="yyyy-MM-dd"
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期">
                    </el-date-picker>
                  </el-form-item>
              </div>
            </el-col>
            <el-col :span="7">
              <div class="grid-content bg-purple">
                  <el-form-item label="商业险金额">
                    <el-input v-model="bone.premium"></el-input>
                  </el-form-item>
              </div>
            </el-col>
            <el-col :span="7">
              <div class="grid-content bg-purple">
                  <el-form-item label="影像资料类型">
                    <el-select v-model="bone.imageInfo.imageType" placeholder="请选择">
                      <el-option
                        v-for="item in imgsType"
                        :key="item.key"
                        :label="item.value"
                        :value="item.key">
                      </el-option>
                    </el-select>
                  </el-form-item>
              </div>
            </el-col>
            <el-col :span="24">
              <div class="grid-content bg-purple" style="text-align: center;margin:0;width:300px">
                  <el-upload
                    class="avatar-uploader"
                    action="https://up-z1.qbox.me"
                    :show-file-list="false"
                    :data="imgForm"
                    :on-success="handleAvatarSuccess1"
                    :before-upload="beforeAvatarUpload">
                    <img v-if="img1" :src="img1" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                  <span>行驶证正本照片</span>
                </div>
            </el-col>
        </el-row>

        <el-row>
            <el-col :span="10">
              <div class="grid-content bg-purple">
                  <el-form-item label="交强险期限">
                    <el-date-picker
                      v-model="btwo.time"
                      type="daterange"
                      range-separator="至"
                      format="yyyy 年 MM 月 dd 日"
                      value-format="yyyy-MM-dd"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期">
                    </el-date-picker>
                  </el-form-item>
              </div>
            </el-col>
            <el-col :span="7">
              <div class="grid-content bg-purple">
                  <el-form-item label="交强险金额">
                    <el-input v-model="btwo.premium"></el-input>
                  </el-form-item>
              </div>
            </el-col>
            <el-col :span="7">
              <div class="grid-content bg-purple">
                  <el-form-item label="影像资料类型">
                    <el-select v-model="btwo.imageInfo.imageType" placeholder="请选择">
                      <el-option
                        v-for="item in imgsType"
                        :key="item.key"
                        :label="item.value"
                        :value="item.key">
                      </el-option>
                    </el-select>
                  </el-form-item>
              </div>
            </el-col>
            <el-col :span="24">
              <div class="grid-content bg-purple" style="text-align: center;margin:0;width:300px">
                  <el-upload
                    class="avatar-uploader"
                    action="https://up-z1.qbox.me"
                    :show-file-list="false"
                    :data="imgForm"
                    :on-success="handleAvatarSuccess2"
                    :before-upload="beforeAvatarUpload">
                    <img v-if="img2" :src="img2" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                  <span>行驶证正本照片</span>
                </div>
            </el-col>
        </el-row>

        <el-row>
            <el-col :span="10">
              <div class="grid-content bg-purple">
                  <el-form-item label="车船费期限">
                    <el-date-picker
                      v-model="bthree.time"
                      type="daterange"
                      format="yyyy 年 MM 月 dd 日"
                      value-format="yyyy-MM-dd"
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期">
                    </el-date-picker>
                  </el-form-item>
              </div>
            </el-col>
            <el-col :span="7">
              <div class="grid-content bg-purple">
                  <el-form-item label="车船费金额">
                    <el-input v-model="bthree.premium"></el-input>
                  </el-form-item>
              </div>
            </el-col>
            <el-col :span="7">
              <div class="grid-content bg-purple">
                  <el-form-item label="影像资料类型">
                    <el-select v-model="bthree.imageInfo.imageType" placeholder="请选择">
                      <el-option
                        v-for="item in imgsType"
                        :key="item.key"
                        :label="item.value"
                        :value="item.key">
                      </el-option>
                    </el-select>
                  </el-form-item>
              </div>
            </el-col>
            <el-col :span="24">
              <div class="grid-content bg-purple" style="text-align: center;margin:0;width:300px">
                  <el-upload
                    class="avatar-uploader"
                    action="https://up-z1.qbox.me"
                    :show-file-list="false"
                    :data="imgForm"
                    :on-success="handleAvatarSuccess3"
                    :before-upload="beforeAvatarUpload">
                    <img v-if="img3" :src="img3" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                  <span>行驶证正本照片</span>
                </div>
            </el-col>
        </el-row>
      </div>
    </el-form>
        <div slot="footer" class="dialog-footer" style="margin-top: 30px;">
          <el-button @click="cancel1">取 消</el-button>
          <el-button type="primary" @click="qihuanfsd">确定</el-button>
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
      InsuranceOrderVO:{
        applicantVO:{
          imageInfo:[],
        }
      },
      activeName:'first',
      gridData:[],
      img1:null,
      img2:null,
      img3:null,
      img4:null,
      VehicleVO:{},
      anctionName:'SetEmployee',
      zIcCard:'',
      bIcCard:'',
      signsList:[{
        label:'加载中。。。。',
        value:0
      }],
      imgsType:[
        {
          key:'applicantForm',
          value:'投保单'
        },
        {
          key:'quotationForm',
          value:'报价单'
        },
        {
          key:'paymentNotice',
          value:'缴费通知书'
        },
        {
          key:'policyForm',
          value:'保单'
        }
      ],
      gridData: [],
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
      form:{},
      bone:{
        productCode:'B01',
        imageInfo:{}
      },
      btwo:{
        productCode:'C01',
        imageInfo:{}
      },
      bthree:{
        productCode:'T01',
        imageInfo:{}
      }
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
    // this.$store.dispatch('StoreDetails', { curruid, id }).then((data) => {
    //   this.dieObj = data.data
    //   console.log(data)
    // })
  },
  watch:{
  },
  methods: {
    changeImageInfo(imageType,url){
    },
    handleAvatarSuccess1(res, file) {
      this.bone.imageInfo.imageUrl = URL.createObjectURL(file.raw);
      this.img1 = URL.createObjectURL(file.raw);
    },
    handleAvatarSuccess2(res, file) {
      this.btwo.imageInfo.imageUrl = URL.createObjectURL(file.raw);
      this.img2 = URL.createObjectURL(file.raw);
    },
    handleAvatarSuccess3(res, file) {
      this.bthree.imageInfo.imageUrl = URL.createObjectURL(file.raw);
      this.img3 = URL.createObjectURL(file.raw);
    },
    handleAvatarSuccess4(res, file) {
      this.img4 = URL.createObjectURL(file.raw);
      const ingf = {
        imageType:'drivingLicense',
        imageUrl: URL.createObjectURL(file.raw)
      }
      this.VehicleVO.imageInfo = [ingf]
    },
    formatTime(){
      this.bone.startDate = this.bone.time[0]
      this.bone.endDate = this.bone.time[1]
      this.btwo.startDate = this.btwo.time[0]
      this.btwo.endDate = this.btwo.time[1]
      this.bthree.startDate = this.bthree.time[0]
      this.bthree.endDate = this.bthree.time[1]
    },
    qihuanfsd(){
      this.formatTime()
      const obj= this.InsuranceOrderVO
      const VehicleVO = this.VehicleVO
      VehicleVO.insuranceInfos = [this.bone, this.btwo ,this.bthree]
      obj.vehicles = [VehicleVO]
      console.log(obj)
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss">
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
</style>