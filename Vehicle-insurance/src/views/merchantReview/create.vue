<template>
  <div  v-if="listLoading">
    <div class="teddd">
      <el-dialog title="新建个人车险订单" :visible.sync="dialogFlagKey2" width="1200px"  :before-close="cancel1" center>
        <geren v-on:dialogMsg='dialogMsg' />
      </el-dialog>
    </div>  
    <div class="teddd">
      <el-dialog title="新建团车车险订单" :visible.sync="dialogFlagKey3" :before-close="cancel1" :show-close="true" width="1200px" center>
        <tuanche v-on:dialogMsg='dialogMsg' />
      </el-dialog>
    </div>
    <el-dialog title="新建订单" :visible.sync="dialogFlagKey1" width="400px" :before-close="cancel1" center>
      <div>
        <el-form>
          <el-form-item label="订单类型">
            <el-radio-group v-model="chexianTyle">
              <el-radio label="1">个车车险</el-radio>
              <el-radio label="2">团车车险</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="newChexian">确定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="还款计划" :visible.sync="dialogFlagKey4" :before-close="cancel1" width="1200px" :show-close="true">
      <div style="padding: 10px;">
        <el-table :data="gridData">
          <el-table-column property="date" label="期数" width="100">
            <template slot-scope="scope">
              {{ scope.row.storeTitle }}
            </template>
          </el-table-column>
          <el-table-column property="name" label="应还日期" width="150">
            <template slot-scope="scope">
              {{ scope.row.relationType | statusFilter}}
            </template>
          </el-table-column>
          <el-table-column property="fdf" label="应还金额" width="100">
            <template slot-scope="scope">
              {{ scope.row.createDate }}
            </template>
          </el-table-column>
          <el-table-column property="date" label="服务费" width="100">
            <template slot-scope="scope">
              {{ scope.row.storeTitle }}
            </template>
          </el-table-column>
          <el-table-column property="name" label="逾期天数" width="100">
            <template slot-scope="scope">
              {{ scope.row.relationType | statusFilter}}
            </template>
          </el-table-column>
          <el-table-column property="fdf" label="逾期滞纳金" width="100">
            <template slot-scope="scope">
              {{ scope.row.createDate }}
            </template>
          </el-table-column><el-table-column property="date" label="合计应还" width="100">
            <template slot-scope="scope">
              {{ scope.row.storeTitle }}
            </template>
          </el-table-column>
          <el-table-column property="name" label="应还日期" width="150">
            <template slot-scope="scope">
              {{ scope.row.relationType | statusFilter}}
            </template>
          </el-table-column>
          <el-table-column property="fdf" label="实还金额" width="100">
            <template slot-scope="scope">
              {{ scope.row.createDate }}
            </template>
          </el-table-column><el-table-column property="date" label="还款状态" width="100">
            <template slot-scope="scope">
              {{ scope.row.storeTitle }}
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-dialog>
    <el-dialog title="订单详情" :visible.sync="dialogFlagKey5" width="1200px"  :before-close="cancel1" center>
      <div>
        <orderDetails/>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import baseComponents from '@/common/base.js'
import { getUserId, getCommercialId } from '@/utils/auth'
import { strateStatus } from '@/utils/statusCode'
import records from '@/common/records'
import tuanche from './tuanche'
import geren from './geren'
import createTuanche from './createTuanche'
import orderDetails from './orderDetails'
import info from './info'
import { parseTime } from '@/utils/index'
export default {
  props: {
    dialogFlag:Boolean,
    filingObject:Object,
    dialogFlagKeyfoo:Number
  },
  components: {
    records,
    tuanche,
    geren,
    createTuanche,
    orderDetails,
    info,
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
      chexianTyle: true,
      listLoading: true,
      dcLoading:true,
      detailList:[],
      formLabelWidth:'120px',
      activeName:'first',
      gridData:[],
      dieObj:null,
      anctionName:'SetEmployee',
      signsList:[{
        label:'加载中。。。。',
        value:0
      }],
      bank:null,
      textarea:'',
      gridData: [],
      form:{},
    }
  },
  extends: baseComponents,
  computed: {
    ...mapGetters([
      'signs',
      'tuancheStup'
    ])
  },
  mounted:function(){

  },
  watch:{
    dialogFlagKeyfoo:function(a){
      a&&(this.listLoading = true)
      this.dialogFlagKey1 = this.dialogFlagKey2 = this.dialogFlagKey3 = 
      this.dialogFlagKey4 = this.dialogFlagKey5 = this.dialogFlagKey6 = 
      this.dialogFlagKey7 = this.dialogFlagKey7 = false
      switch(a)
      {
        case 1:
          this.dialogFlagKey1 = true
        break;
        case 2:
          this.dialogFlagKey2 = true
        break;
        case 3:
          this.dialogFlagKey3 = true
          break;
        case 4:
          this.dialogFlagKey4 = true
        break;
        case 5:
          this.dialogFlagKey5 = true
        break;
        case 6:
          this.dialogFlagKey6 = true
          break;  
        case 7:
          this.dialogFlagKey7 = true
          break; 
        case 8:
          this.dialogFlagKey8 = true
          break;  
      }
    },
    dialogFlagKey1:function(val){
      if(val){
        this.bank = null
        const curruid = getUserId()
      }
    },
    dialogFlagKey2:function(val){
      if(val){
        
      }
    },
    dialogFlagKey3:function(val){
      if(val){
      }
    },
    dialogFlagKey4:function(val){
      if(val){
        console.log(this.filingObject)
      }
    },
    dialogFlagKey5:function(val){
      if(val){
        console.log(val)
        const curruid = getUserId()
        const commercialId = getCommercialId()
        const id = this.filingObject.loanId
       this.$store.dispatch('GetOrder', {curruid, commercialId, id})
      }
    }
  },
  created() {
    
  },
  methods: {
    fllingSucces(){
      this.toLists
    },
    dialogMsg(obj){
      this.cancel1()
    },
    qihuanfsd(){
      if(this.bank){
        const curruid = getUserId()
        const userId = this.bank
        const storeId = this.filingObject.id
        this.$store.dispatch('ChangeSigns', {curruid, userId, storeId}).then((data)=>{
          if(data.status){
            this.cancel1(true)
            this.$message({
              message: '切换签约人成功！',
              type: 'success'
            });
          }else{
            this.$message.error('发生不可抗力原因引起失败！');
          }
        })
      }else{
        this.$message.error('请选择签约人！');
      }
    },
    handleClick(row) {
    },
    toFilingSublmit(){
      if(this.bank){
        const curruid = getUserId()
        let recordVO = this.filingObject
        recordVO.accountId = this.bank
        this.$store.dispatch('ToFiling', {curruid, recordVO}).then((data)=>{
          if(data.status){
            this.cancel1(true)
            this.$message({
              message: '备案成功！',
              type: 'success'
            });
          }else{
            this.$message.error('发生不可抗力原因引起失败！');
          }
        })
      }else{
        this.$message.error('请选择银行卡！');
      }
    },
    newChexian(status){
      if(this.chexianTyle == 1){
        this.dialogFlagKeyfoo = 2
      }else{
        this.dialogFlagKeyfoo = 3
      }
    },
    queryFiledList(){

    },
    onSubmit(){
      console.log('onSubmit')
    },
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
  .el-dialog__body {
    padding: 0px;
    color: #606266;
    font-size: 14px;
  }
  .el-tabs__header{
    margin:0; 
    padding: 3px 3px 3px 10px;
  }
</style>