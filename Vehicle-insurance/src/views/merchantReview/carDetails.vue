<template>
  <div id="dingdandf">
    <el-form ref="form" :model="form" label-width="100px">
      <!-- <div class="panel-info">
        <el-row>
          <el-col :span="24">
            <div class="grid-content bg-purple-light" style="font-family:'Arial Negreta','Arial';margin:5px 0;font-weight: 700;font-style: normal;font-size: 18px;">
                <span class="filed_key">车主(被保人)信息</span>
            </div>
          </el-col>
        </el-row>
        <el-row>
            <el-col :span="8">
              <div class="grid-content bg-purple">
                  <el-form-item label="姓名">
                    <el-input v-model="modyCar.contactMobile"></el-input>
                  </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple">
                  <el-form-item label="电话">
                    <el-input ></el-input>
                  </el-form-item>
              </div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="8">
              <div class="grid-content bg-purple">
                  <el-form-item label="证件号">
                    <el-input ></el-input>
                  </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple">
                  <el-form-item label="证件地址">
                    <el-input ></el-input>
                  </el-form-item>
              </div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="8">
              <div class="grid-content bg-purple">
                  <el-form-item label="联系人">
                    <el-input ></el-input>
                  </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple">
                  <el-form-item label="联系人电话">
                    <el-input ></el-input>
                  </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple">
                  <el-form-item label="与借款人关系">
                    <el-select v-model="value" placeholder="请选择">
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
              </div>
            </el-col>
        </el-row>
      </div> -->
      <div class="panel-info">
        <el-row>
          <el-col :span="24">
            <div class="grid-content bg-purple-light" style="font-family:'Arial Negreta','Arial';margin:5px 0;font-weight: 700;font-style: normal;font-size: 18px;">
                <span class="filed_key">车辆信息</span>
                <el-switch
                  v-model="detailCar.license"
                  :disabled="true"
                  active-text="尚未取得车牌"
                  inactive-text="">
                </el-switch>
            </div>
          </el-col>
        </el-row>
        <el-row>
            <el-col :span="8" v-if="!detailCar.license">
              <div class="grid-content bg-purple">
                  <el-form-item label="车牌号码">
                    <el-input v-model="detailCar.plateNo" :disabled="true"></el-input>
                  </el-form-item>
              </div>
            </el-col>
            <!-- <el-col :span="8">
              <div class="grid-content bg-purple">
                  <el-form-item label="车型">
                    <el-select v-model="detailCar.autoType" placeholder="请选择">
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
                  <el-form-item label="车型">
                    <el-input v-model="detailCar.model" :disabled="true"></el-input>
                  </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple">
                  <el-form-item label="车架号">
                    <el-input v-model="detailCar.vin" :disabled="true"></el-input>
                  </el-form-item>
              </div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="8">
              <div class="grid-content bg-purple">
                  <el-form-item label="发动机号">
                    <el-input v-model="detailCar.engineNo" :disabled="true"></el-input>
                  </el-form-item>
              </div>
            </el-col>
            <el-col :span="8">
<!--                   <el-form-item label="注册日期">
                    <el-input v-model="detailCar.contactMobile"></el-input>
                  </el-form-item> -->
              <div class="grid-content bg-purple">
                <el-form-item label="注册日期">
                  <el-date-picker
                    v-model="detailCar.registerDate"
                    format="yyyy 年 MM 月 dd 日"
                    value-format="yyyy-MM-dd"
                    type="date"
                    :disabled="true"
                    placeholder="选择日期">
                  </el-date-picker>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="24">
              <div class="grid-content bg-purple" style="text-align: center;margin:0;width:300px">
                <vue-preview :slides="img4"></vue-preview>
                  <!-- <el-upload
                    class="avatar-uploader"
                    action="https://up-z1.qbox.me"
                    :show-file-list="false"
                    :data="imgForm"
                    :disabled="true">
                    <img v-if="img4" :src="img4" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload> -->
                  <span>行驶证正本照片</span>
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
                  v-model="detailCar.insteadPay"
                  :disabled="true"
                  active-text="代缴交强险(含车船费)"
                  inactive-text="">
                </el-switch>
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
                      :disabled="true"
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
                    <el-input v-model="bone.premium" :disabled="true"></el-input>
                  </el-form-item>
              </div>
            </el-col>
            <el-col :span="7" v-if="bone.imgsdd">
              <div class="grid-content bg-purple">
                  <el-form-item label="影像资料类型">
                    <el-select v-model="bone.imgsdd.imageType" placeholder="请选择" :disabled="true">
                      <el-option
                        v-for="item in imgsType"
                        :key="item.key"
                        :disabled="true"
                        :label="item.value"
                        :value="item.key">
                      </el-option>
                    </el-select>
                  </el-form-item>
              </div>
            </el-col>
            <el-col :span="24">
              <div class="grid-content bg-purple" style="text-align: center;margin:0;width:300px">
                <vue-preview :slides="img1"></vue-preview>
                  <!-- <el-upload
                    class="avatar-uploader"
                    action="https://up-z1.qbox.me"
                    :show-file-list="false"
                    :data="imgForm"
                    :disabled="true"
                    >
                    <img v-if="img1" :src="img1" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload> -->
                  <span>行驶证正本照片</span>
                </div>
            </el-col>
        </el-row>

        <el-row v-if="detailCar.insteadPay">
            <el-col :span="10">
              <div class="grid-content bg-purple">
                  <el-form-item label="交强险期限">
                    <el-date-picker
                      v-model="btwo.time"
                      type="daterange"
                      :disabled="true"
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
                    <el-input v-model="btwo.premium" :disabled="true"></el-input>
                  </el-form-item>
              </div>
            </el-col>
            <el-col :span="7">
              <div class="grid-content bg-purple">
                  <el-form-item label="影像资料类型">
                    <el-select v-model="btwo.imgsdd.imageType" placeholder="请选择" :disabled="true">
                      <el-option
                        v-for="item in imgsType"
                        :key="item.key"
                        :disabled="true"
                        :label="item.value"
                        :value="item.key">
                      </el-option>
                    </el-select>
                  </el-form-item>
              </div>
            </el-col>
            <el-col :span="24">
              <div class="grid-content bg-purple" style="text-align: center;margin:0;width:300px">
                <vue-preview :slides="img2"></vue-preview>
                  <!-- <el-upload
                    class="avatar-uploader"
                    action="https://up-z1.qbox.me"
                    :show-file-list="false"
                    :data="imgForm"
                    :disabled="true"
                    >
                    <img v-if="img2" :src="img2" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload> -->
                  <span>行驶证正本照片</span>
                </div>
            </el-col>
        </el-row>

        <el-row v-if="detailCar.insteadPay">
            <el-col :span="10">
              <div class="grid-content bg-purple">
                  <el-form-item label="车船费期限">
                    <el-date-picker
                      v-model="bthree.time"
                      type="daterange"
                      :disabled="true"
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
                    <el-input v-model="bthree.premium" :disabled="true"> </el-input>
                  </el-form-item>
              </div>
            </el-col>
            <el-col :span="7">
              <div class="grid-content bg-purple">
                  <el-form-item label="影像资料类型">
                    <el-select v-model="bthree.imgsdd.imageType" placeholder="请选择" :disabled="true">
                      <el-option
                        v-for="item in imgsType"
                        :key="item.key"
                        :disabled="true"
                        :label="item.value"
                        :value="item.key">
                      </el-option>
                    </el-select>
                  </el-form-item>
              </div>
            </el-col>
            <el-col :span="24">
              <div class="grid-content bg-purple" style="text-align: center;margin:0;width:300px">
                <vue-preview :slides="img3"></vue-preview>
                  <!-- <el-upload
                    class="avatar-uploader"
                    action="https://up-z1.qbox.me"
                    :show-file-list="false"
                    :data="imgForm"
                    :disabled="true"
                    >
                    <img v-if="img3" :src="img3" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload> -->
                  <span>行驶证正本照片</span>
                </div>
            </el-col>
        </el-row>
      </div>
      
    </el-form>
    <!-- <div slot="footer" class="dialog-footer" style="margin: 30px;margin-top: 100px;">
        <el-button @click="cancel1">取 消</el-button>
      </div> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import baseComponents from '@/common/base.js'
import { getUserId, getCommercialId } from '@/utils/auth'
import { strateStatus } from '@/utils/statusCode'
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
      slide1: [
          {
            src: 'https://farm6.staticflickr.com/5591/15008867125_68a8ed88cc_b.jpg',
            msrc: 'https://farm6.staticflickr.com/5591/15008867125_68a8ed88cc_m.jpg',
            alt: 'picture1',
            title: 'Image Caption 1',
            w: 600,
            h: 400
          },
          {
            src: 'https://farm4.staticflickr.com/3902/14985871946_86abb8c56f_b.jpg',
            msrc: 'https://farm4.staticflickr.com/3902/14985871946_86abb8c56f_m.jpg',
            alt: 'picture2',
            title: 'Image Caption 2',
            w: 1200,
            h: 900
          }
      ],
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
      activeName:'first',
      gridData:[],
      anctionName:'SetEmployee',
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
    detailCar:function(){
      this.setInit()
    },
  },
  computed: {
    ...mapGetters([
      'detailCar',
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
      this.img4 = this.forImgdata(this.detailCar.imageInfo[0].imageUrl)
      this.bone = this.detailCar.insuranceInfos[0]
      this.bone.imgsdd = {
        imageType:this.detailCar.insuranceInfos[0].imageInfo[0].imageType
      }
      this.img1 = this.forImgdata(this.detailCar.insuranceInfos[0].imageInfo[0].imageUrl)
      this.bone.time = [this.bone.startDate, this.bone.endDate]
      if(this.detailCar.insteadPay){
        this.btwo = this.detailCar.insuranceInfos[1]
        this.btwo.imgsdd = {
          imageType:this.detailCar.insuranceInfos[1].imageInfo[0].imageType
        }
        this.img2 = this.forImgdata(this.detailCar.insuranceInfos[0].imageInfo[0].imageUrl)
        this.btwo.time = [this.btwo.startDate, this.btwo.endDate]
        this.bthree = this.detailCar.insuranceInfos[2]
        this.bthree.imgsdd = {
          imageType:this.detailCar.insuranceInfos[2].imageInfo[0].imageType
        }
        this.img3 = this.forImgdata(this.detailCar.insuranceInfos[0].imageInfo[0].imageUrl)
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
    forImgdata(url){
      return [{src: url,msrc: url,alt: 'picture1',title: 'Image Caption 1',w: 1200,h: 900}]
    },
    cancel1(){
      this.$emit('dialogMsgrew', {status:false})
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
  .grid-content{
    img{
      width: 100px;
      height:100px;
    }
  }
</style>