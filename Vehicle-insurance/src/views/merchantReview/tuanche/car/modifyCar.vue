<template>
  <div id="dingdandf">
    <el-form  :model="modyCar" ref="modyCar"  :rules="rules" label-width="100px">
      <div class="panel-info">
        <el-row>
          <el-col :span="24">
            <div class="grid-content bg-purple-light" style="font-family:'Arial Negreta','Arial';margin:5px 0;font-weight: 700;font-style: normal;font-size: 18px;">
                <span class="filed_key">车辆信息</span>
                <el-switch
                  v-model="modyCar.license"
                  active-text="尚未取得车牌"
                  inactive-text="">
                </el-switch>
            </div>
          </el-col>
        </el-row>
        <el-row>
            <el-col :span="8" v-if="!modyCar.license">
              <div class="grid-content bg-purple">
                  <el-form-item label="车牌号码" prop="bitian">
                    <el-input v-model="modyCar.plateNo"></el-input>
                  </el-form-item>
              </div>
            </el-col>
            <!-- <el-col :span="8">
              <div class="grid-content bg-purple">
                  <el-form-item label="车型">
                    <el-select v-model="modyCar.autoType" placeholder="请选择">
                      <el-option
                        v-for="item in carType"
                        :key="item.key"
                        :label="item.value"
                        :value="item.key">
                      </el-option>
                    </el-select>
                  </el-form-item>
              </div>
            </el-col> -->
            <el-col :span="8">
              <div class="grid-content bg-purple">
                  <el-form-item label="车型" prop="bitian">
                    <el-input v-model="modyCar.model"></el-input>
                  </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple">
                  <el-form-item label="车架号" prop="bitian">
                    <el-input v-model="modyCar.vin"></el-input>
                  </el-form-item>
              </div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="8">
              <div class="grid-content bg-purple">
                  <el-form-item label="发动机号" prop="bitian">
                    <el-input v-model="modyCar.engineNo"></el-input>
                  </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
<!--                   <el-form-item label="注册日期">
                    <el-input v-model="modyCar.contactMobile"></el-input>
                  </el-form-item> -->
              <div class="grid-content bg-purple">
                <el-form-item label="注册日期" prop="bitian">
                  <el-date-picker
                    v-model="modyCar.registerDate"
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
                <el-form-item label="行驶证正本照片" prop="bitian">
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
                  <!-- <span>行驶证正本照片</span> -->
                </el-form-item>  
              </div>
            </el-col>
        </el-row>
      </div>

      <div class="panel-info" v-if="bone">
        <el-row>
          <el-col :span="24">
            <div class="grid-content bg-purple-light" style="font-family:'Arial Negreta','Arial';margin:5px 0;font-weight: 700;font-style: normal;font-size: 18px;">
                <span class="filed_key">保单信息</span>
                <el-switch
                  v-model="modyCar.insteadPay"
                  active-text="代缴交强险(含车船费)"
                  inactive-text="">
                </el-switch>
            </div>
          </el-col>
        </el-row>
        <el-row>
            <el-col :span="10">
              <div class="grid-content bg-purple">
                  <el-form-item label="商险期限" prop="bitian">
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
                  <el-form-item label="商业险金额" prop="bitian">
                    <el-input v-model="bone.premium"></el-input>
                  </el-form-item>
              </div>
            </el-col>
            <el-col :span="7" v-if="bone.imgsdd">
              <div class="grid-content bg-purple">
                  <el-form-item label="影像资料类型" prop="bitian">
                    <el-select v-model="bone.imgsdd.imageType" placeholder="请选择">
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
                <el-form-item label="行驶证正本照片" prop="bitian">
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
                  <!-- <span>行驶证正本照片</span> -->
                  </el-form-item>  
                </div>
            </el-col>
        </el-row>

        <el-row v-if="modyCar.insteadPay">
            <el-col :span="10">
              <div class="grid-content bg-purple">
                  <el-form-item label="交强险期限" prop="bitian">
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
                  <el-form-item label="交强险金额" prop="bitian">
                    <el-input v-model="btwo.premium"></el-input>
                  </el-form-item>
              </div>
            </el-col>
            <el-col :span="7">
              <div class="grid-content bg-purple">
                  <el-form-item label="影像资料类型" prop="bitian">
                    <el-select v-model="btwo.imgsdd.imageType" placeholder="请选择">
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
                <el-form-item label="行驶证正本照片" prop="bitian">
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
                  <!-- <span>行驶证正本照片</span> -->
                  </el-form-item>  
                </div>
            </el-col>
        </el-row>

        <el-row v-if="modyCar.insteadPay">
            <el-col :span="10">
              <div class="grid-content bg-purple">
                  <el-form-item label="车船费期限" prop="bitian">
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
                  <el-form-item label="影像资料类型" prop="bitian">
                    <el-select v-model="bthree.imgsdd.imageType" placeholder="请选择">
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
                <el-form-item label="行驶证正本照片" prop="bitian">
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
                  <!-- <span>行驶证正本照片</span> -->
                  </el-form-item>  
                </div>
            </el-col>
        </el-row>
      </div>
      
    </el-form>
    <div slot="footer" class="dialog-footer" style="margin: 30px;margin-top: 100px;">
        <el-button @click="cancel1">取 消</el-button>
        <el-button type="primary" @click="onSubmit">确定</el-button>
      </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import baseComponents from '@/common/base.js'
import { getUserId, getCommercialId } from '@/utils/auth'
import { strateStatus } from '@/utils/statusCode'
import { addCarRules } from '@/utils/validate'
export default {
  filters: {
    statusFilter(val) {
      return strateStatus[val]
    },
    timeFilter(val) {
      return parseTime[val]
    }
  },
  props: {
    dialogFlag:Boolean,
    filingObject:Object,
  },
  data() {
    return {
      list: [],
      dieObj:{},
      carType:[
        {
          key:'0',
          value:'非运营'
        },
        {
          key:'1',
          value:'运营'
        },
      ],
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
      img1:null,
      img2:null,
      img3:null,
      img4:null,
      rules:addCarRules,
      activeName:'first',
      gridData:[],
      anctionName:'SetEmployee',
      rules:addCarRules,
      signsList:[{
        label:'加载中。。。。',
        value:0
      }],
      gridData: [],
      form:{},
      bone:null,
      btwo:null,
      bthree:null,
    }
  },
  extends: baseComponents,
  mounted:function(){
  },
  watch:{
    modyCar:function(){
      this.setInit()
    },
  },
  computed: {
    ...mapGetters([
      'modyCar',
    ])
  },
  created() {
    this.setInit()
    // const curruid = getUserId()
    // const id = this.filingObject.id
    // this.$store.dispatch('StoreDetails', { curruid, id }).then((data) => {
    //   this.dieObj = data.data
    //   console.log(data)
    // })
  },
  methods: {
    setInit(){
      console.log(44444)
      this.img2 = null
      this.img3 = null
      this.img4 = this.modyCar.imageInfo[0].imageUrl
      this.bone = this.modyCar.insuranceInfos[0]
      this.bone.imgsdd = {
        imageType:this.modyCar.insuranceInfos[0].imageInfo[0].imageType
      }
      this.img1 = this.modyCar.insuranceInfos[0].imageInfo[0].imageUrl
      this.bone.time = [this.bone.startDate, this.bone.endDate]
      if(this.modyCar.insteadPay){
        this.btwo = this.modyCar.insuranceInfos[1]
        this.btwo.imgsdd = {
          imageType:this.modyCar.insuranceInfos[1].imageInfo[0].imageType
        }
        this.img2 = this.modyCar.insuranceInfos[0].imageInfo[0].imageUrl
        this.btwo.time = [this.btwo.startDate, this.btwo.endDate]
        this.bthree = this.modyCar.insuranceInfos[2]
        this.bthree.imgsdd = {
          imageType:this.modyCar.insuranceInfos[2].imageInfo[0].imageType
        }
        this.img3 = this.modyCar.insuranceInfos[0].imageInfo[0].imageUrl
        this.bthree.time = [this.bthree.startDate, this.bthree.endDate]
      }else{
        this.btwo = {
          productCode:'C01',
          imgsdd:{},
          time:null
        }
        this.bthree = {
          productCode:'T01',
          imgsdd:{},
          time:null
        }
      }
    },
    handleAvatarSuccess1(res, file) {
      const imgObj = {
        imageType :this.bone.imgsdd.imageType,
        imageUrl:URL.createObjectURL(file.raw)
      } 
      this.bone.imageInfo = [imgObj]
      this.img1 = URL.createObjectURL(file.raw);
    },
    handleAvatarSuccess2(res, file) {
      // this.btwo.imageInfo.imageUrl = URL.createObjectURL(file.raw);
      const imgObj = {
        imageType :this.btwo.imgsdd.imageType,
        imageUrl:URL.createObjectURL(file.raw)
      } 
      this.btwo.imageInfo = [imgObj]
      this.img2 = URL.createObjectURL(file.raw);
    },
    handleAvatarSuccess3(res, file) {
      // this.bthree.imageInfo.imageUrl = URL.createObjectURL(file.raw);
      const imgObj = {
        imageType :this.bthree.imgsdd.imageType,
        imageUrl:URL.createObjectURL(file.raw)
      } 
      this.bthree.imageInfo = [imgObj]
      this.img3 = URL.createObjectURL(file.raw);
    },
    handleAvatarSuccess4(res, file) {
      this.img4 = URL.createObjectURL(file.raw);
      const ingf = {
        imageType:'drivingLicense',
        imageUrl: URL.createObjectURL(file.raw)
      }
      this.modyCar.imageInfo = [ingf]
    },
    formatTime(){
      this.bone.startDate = this.bone.time[0]
      this.bone.endDate = this.bone.time[1]
      delete this.bone.time
      if(this.modyCar.insteadPay){
        this.btwo.startDate = this.btwo.time[0]
        this.btwo.endDate = this.btwo.time[1]
        delete this.btwo.time
        this.bthree.startDate = this.bthree.time[0]
        this.bthree.endDate = this.bthree.time[1]
        delete this.bthree.time
      }
    },
    cancel1(){
      this.$store.dispatch('setModyCar', null);
      this.filingObject =null
      this.$emit('dialogMsg', {status:false})
    },
    onSubmit(){
      this.formatTime()
      const modyCar = this.modyCar
      if(!this.modyCar.insteadPay){
        this.modyCar.insuranceInfos = [this.bone]
      }else{
        this.modyCar.insuranceInfos = [this.bone, this.btwo ,this.bthree]
      }
      console.log(modyCar)
      const curruid = getUserId()
      const commercialId = getCommercialId()
      const id = modyCar.id
      this.$store.dispatch('Modifyvehicles', { curruid, commercialId, modyCar, id }).then((data) => {
        if(data.status){
          this.$message({
            message: '修改成功！',
            type: 'success'
          });
          this.$store.dispatch('setModyCar', null);
          this.$emit('dialogMsg', {status:true,data:data.data})
        } else {
          this.$message({
            message: data.err?data.err.msg:'发生不可抗力原因引起失败！',
            type: 'error'
          });
        }
      })
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss">
.panel-info{
  padding:10px 20px;border-bottom: 1px solid #ebeef5;
}
  .app-container{
    height: 900px;
    overflow: hidden;
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
    height: 700px;
    overflow-y: auto;
    // height: 80%;
  
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