<template>
  <div id="stup2">
    <el-steps :active="tuancheStup" finish-status="success">
      <el-step title="步骤1" description="添加法人信息"></el-step>
      <el-step title="步骤2" description="添加车辆"></el-step>
      <el-step title="步骤3" description="完成订单"></el-step>
    </el-steps>
    <el-form>
      <div class="panel-info">
        <el-row>
          <el-col :span="24">
            <div class="grid-content bg-purple-light" style="font-family:'Arial Negreta','Arial';margin:5px 0;font-weight: 700;font-style: normal;font-size: 18px;">
                <span class="filed_key" style="margin-right: 30px;">车辆信息</span><el-button type="primary" @click="dialogManager(1)" size="mini" icon="el-icon-plus" circle></el-button>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="9" v-for="item in carList">
            <!-- <el-tooltip content="点击选择要保险的车辆" placement="bottom" effect="light" v-if="item.chiosStatus"> -->
              <div style="height: 340px;padding: 0 20px 0 0;border: 1px solid rgb(235, 238, 245); margin-bottom:10px;" @click="chiose(item)" v-if="item.chiosStatus">
                <i class="el-icon-success" style="font-size: 30px;position: relative;left: 376px;color:green"></i>
                <el-col :span="24">
                  <div class="grid-content bg-purple">
                      <div style="position: relative;width: 150px;height: 30px;border: 1px dashed darkcyan;position: relative;top: 31px;"></div>
                      <div class="paizi-title">
                        <i class="el-icon-close" style="float: left" @click="deleteCar(item.plateNo)"></i>
                        <a> <span @click="xiangqing(item)">{{item.plateNo}}</span></a>
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
                          <el-input v-model="name" :disabled="true" autocomplete="off"></el-input>
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
              </div> 
            <!-- </el-tooltip>  -->
            <el-tooltip content="点击选择要保险的车辆" placement="bottom" effect="light" v-if="!item.chiosStatus">
              <div style="height: 340px;padding: 0 20px 0 0;border: 1px solid rgb(235, 238, 245); margin-bottom:10px;" @click="chiose(item)">
                <i class="el-icon-success" style="font-size: 30px;position: relative;left: 376px;color:#d0d0d0"></i>
                <el-col :span="24">
                  <div class="grid-content bg-purple">
                      <div style="position: relative;width: 150px;height: 30px;border: 1px dashed darkcyan;position: relative;top: 31px;"></div>
                      <div class="paizi-title">
                        <i class="el-icon-close" style="float: left" @click="deleteCar(item.plateNo)"></i>
                        <a> <span @click="xiangqing(item)">{{item.plateNo}}</span></a>
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
                          <el-input v-model="name" :disabled="true" autocomplete="off"></el-input>
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
              </div> 
            </el-tooltip> 
          </el-col>
        </el-row>    
      </div>
      
    </el-form>
    <div slot="footer" class="dialog-footer" style="margin: 30px;margin-top: 100px;text-align: center;">
        <el-button @click="lastPanel"><上一步</el-button>
        <el-button type="primary" @click="onSubmit">下一步></el-button>
      </div>
    <el-dialog
      width="60%"
      title="车辆添加"
      :visible.sync="dialogFlagKeyw1"
      :close-on-click-modal="false"
      append-to-body>
      <div>
        <addCar v-on:dialogMsg='dialogMsgMy'/>
      </div>
    </el-dialog>
    <el-dialog
      width="60%"
      title="车辆修改"
      :close-on-click-modal="false"
      :visible.sync="dialogFlagKeyw2"
      append-to-body>
      <div>
        <modifyCar v-on:dialogMsg='dialogMsgMy'/>
      </div>
    </el-dialog>
    <el-dialog
      width="60%"
      title="车辆详情"
      :visible.sync="dialogFlagKeyw3"
      append-to-body>
      <div>
        <carDetails v-on:dialogMsg='dialogMsgMy'/>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import baseComponents from '@/common/base.js'
import { getUserId } from '@/utils/auth'
import { addCarRules } from '@/utils/validate'
import { strateStatus } from '@/utils/statusCode'
import addCar from './car/addCar'
import modifyCar from './car/modifyCar'
import carDetails from './car/carDetails'
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
      myCar:null,
      cars:[],
      name:'卡卡罗特',
      chir:[],
      dialogFlagKeyw1:false,
      dialogFlagKeyw2:false,
      dialogFlagKeyw3:false,
    }
  },
  extends: baseComponents,
  mounted:function(){
  },
  computed: {
    ...mapGetters([
      'tuancheStup',
      'carList',
      'orderDetail'
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
    carList:function(){
      console.log(55555555555)
    }
  },
  methods: {
    chiose(val){
      const cars = this.carList
      for(let i in cars){
        if(val.plateNo ==cars[i].plateNo){
          cars[i].chiosStatus = !cars[i].chiosStatus
        }
      }
      this.$store.dispatch('ChangeCarList', cars.concat())
    },
    dialogManager(a){
      this.dialogFlagKeyw1 = this.dialogFlagKeyw2 = this.dialogFlagKeyw3 = false
      switch(a)
      {
        case 1:
          this.dialogFlagKeyw1 = true
        break;
        case 2:
          this.dialogFlagKeyw2 = true
        break;
        case 3:
          this.dialogFlagKeyw3 = true
        break;
      }
    },
    xiangqing(row){
      this.dialogManager(3)
    },
    onSubmit(){
      const cars = this.carList
      const vas = []
      for(let i in cars){
        if(cars[i].chiosStatus){
          vas.push(cars[i])
        }
      }
      this.$store.dispatch('SetVehicles',vas);
      this.$store.dispatch('SetTuancheStup', 2);
    },
    lastPanel(){
      this.$store.dispatch('SetTuancheStup', 0);
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
      window.alert(val)
      this.$store.dispatch('deleteCatList', val);
    },
    dialogMsgMy(value){
      if(value.status){
        this.dialogManager(0)
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
#stup2{
  .el-form-item {
    margin-bottom:10px;
  }
  .panel-info{
    .el-col{
      margin:0 10px; 
    }
  }
  .el-form{
    min-height:400px;
  }
  // overflow-y: auto;
  // height: 700px;
}
</style>