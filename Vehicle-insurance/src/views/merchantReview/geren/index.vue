
<template>
  <div>
    <stup1 v-if="tuancheStup=='0'"/>
    <stup2 v-if="tuancheStup=='1'"/>
    <stup3 v-if="tuancheStup=='2'"/>
    <stup3 v-if="tuancheStup=='3'"/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import baseComponents from '@/common/base.js'
import { getUserId } from '@/utils/auth'
import { strateStatus } from '@/utils/statusCode'
import stup1 from './stup1'
import stup2 from './stup2'
import stup3 from './stup3'
import succes from './succes'
export default {
  props: {
    dialogFlag:Boolean,
    filingObject:Object,
    dialogFlagKeyfoo:Number
  },
  components: {
  	stup1,
  	stup2,
  	stup3,
    succes
  },
  filters: {
  },
  data() {
    return {
    }
  },
  extends: baseComponents,
  mounted:function(){
  },
  computed: {
    ...mapGetters([
      'tuancheStup',
    ])
  },
  created() {
  
  },
  watch:{
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