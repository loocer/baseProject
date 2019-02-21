<template>
  <div>
    <el-steps :active="tuancheStup" finish-status="success">
      <el-step title="步骤1" description="添加法人信息"></el-step>
      <el-step title="步骤2" description="添加车辆"></el-step>
      <el-step title="步骤3" description="完成订单"></el-step>
    </el-steps>
    <el-form ref="JiekuanUser" :model="JiekuanUser" :rules="rules"  label-width="130px">
      <div class="panel-info">
        <!-- <el-row>
          <el-col :span="24">
            <div class="grid-content bg-purple-light" style="font-family:'Arial Negreta','Arial';margin:5px 0;font-weight: 700;font-style: normal;font-size: 18px;">
                <span class="filed_key">法人信息</span>
            </div>
          </el-col>
        </el-row> -->
        <el-row>
          <el-col :span="7">
            <div class="grid-content bg-purple">
                <el-form-item label="身份证件号" prop="certId">
                  <el-input v-model="JiekuanUser.certId" @blur="chajiekuanren"></el-input>
                </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row>
            <el-col :span="7">
              <div class="grid-content bg-purple">
                  <el-form-item label="姓名" prop="name">
                    <el-input v-model="JiekuanUser.name"></el-input>
                  </el-form-item>
              </div>
            </el-col>
            <el-col :span="7">
              <div class="grid-content bg-purple">
                  <el-form-item label="电话" prop="mobileNo">
                    <el-input v-model="JiekuanUser.mobileNo"></el-input>
                  </el-form-item>
              </div>
            </el-col>
            <el-col :span="7">
              <div class="grid-content bg-purple">
                  <el-form-item label="证件地址" prop="address">
                    <el-input v-model="JiekuanUser.address"></el-input>
                  </el-form-item>
              </div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="7">
              <div class="grid-content bg-purple">
                  <el-form-item label="联系人" prop="contactName">
                    <el-input v-model="JiekuanUser.contactName"></el-input>
                  </el-form-item>
              </div>
            </el-col>
            <el-col :span="7">
              <div class="grid-content bg-purple">
                  <el-form-item label="联系电话" prop="contactMobile">
                    <el-input v-model="JiekuanUser.contactMobile"></el-input>
                  </el-form-item>
              </div>
            </el-col>
            <el-col :span="7">
              <div class="grid-content bg-purple">
                  <el-form-item label="与借款人关系" prop="contactRelation">
                    <el-select v-model="JiekuanUser.contactRelation" placeholder="请选择">
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
            <el-col :span="7">
              <div class="grid-content bg-purple">
                  <el-form-item label="公司名称" prop="companyName">
                    <el-input v-model="JiekuanUser.companyName"></el-input>
                  </el-form-item>
              </div>
            </el-col>
            <el-col :span="7">
              <div class="grid-content bg-purple">
                  <el-form-item label="信用代码" prop="companyCode">
                    <el-input v-model="JiekuanUser.companyCode"></el-input>
                  </el-form-item>
              </div>
            </el-col>
            <el-col :span="7">
              <div class="grid-content bg-purple">
                  <el-form-item label="注册地址" prop="registAddress">
                    <el-input v-model="JiekuanUser.registAddress"></el-input>
                  </el-form-item>
              </div>
            </el-col>
            <el-col :span="24">
              <div class="grid-content bg-purple" style="text-align: center;margin:0;width:300px">
                <el-form-item label="营业执照" prop="imageInfo">
                  <el-upload
                    class="avatar-uploader"
                    action="https://up-z1.qbox.me"
                    :show-file-list="false"
                    :data="imgForm"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload">
                    <img v-if="JiekuanUser.imageInfo&&JiekuanUser.imageInfo[0].imageUrl" :src="JiekuanUser.imageInfo&&JiekuanUser.imageInfo[0].imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                  <span>营业执照</span>
                 </el-form-item> 
                </div>
            </el-col>
        </el-row>
      <div slot="footer" class="dialog-footer" style="margin: 30px;text-align: center;">
        <el-button type="primary" @click="onSubmit">下一步></el-button>
      </div>
      </div>
    </el-form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import baseComponents from '@/common/base.js'
import { formatImg } from '@/utils'
import { getUserId, getCommercialId } from '@/utils/auth'
import { jiekuanrenRules } from '@/utils/validate'
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
      applicantVO:{
        imageInfo:[null,null],
      },
      rType:'add',
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
      rules:jiekuanrenRules,
      innerVisible:false,
      innerVisibleMy:false,
      innerVisibleDe:false,
      gridData:[],
      img1:null,
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
      'JiekuanUser'
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
  methods: {
    chajiekuanren(){
      const curruid = getUserId()
      const commercialId = getCommercialId()
      const certId = this.JiekuanUser.certId
      this.$store.dispatch('GetJiekuanrenByidcard',{ curruid, commercialId, certId }).then((data)=>{
        if(data.data){
          this.rType = 'modify'
        }else{
          this.$store.dispatch('deleteJiekuanrenId')
        }
      });
    },
    handleAvatarSuccess(res, file) {
      const imgObj = {
        imageType :'bizLicence',
        imageUrl:formatImg(file.response.key)
      } 
      this.JiekuanUser.imageInfo = [imgObj]
      this.img1 = formatImg(file.response.key);
      this.$refs['JiekuanUser'].validate((valid) => {
      });
    },
    onSubmit(){
      this.$refs['JiekuanUser'].validate((valid) => {
          if (valid) {
            const curruid = getUserId()
            const commercialId = getCommercialId()
            this.$store.dispatch('AddJiekuanUser',{ curruid, commercialId }).then((data)=>{
              if(data.status){
                const userId = data.data.userId
                this.$store.dispatch('GetCatByUserId', {curruid, commercialId, userId})
                this.$store.dispatch('SetTuancheStup', 1)
              }else{
                this.$message({
                  message: data.err?data.err.msg:'发生不可抗力原因引起失败！',
                  type: 'error'
                });
              }
              // data.status&&this.$store.dispatch('SetTuancheStup', 1)
            });
          } else {
            console.log('error submit!!');
            return false;
          }
      });
      
      // this.$store.dispatch('SetTuancheStup', 1);
      // this.InsuranceOrderVO.vehicles = this.cars
      // console.log(this.InsuranceOrderVO)
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

</style>