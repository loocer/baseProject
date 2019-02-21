<template>
  <div v-if="listLoading">
    <el-dialog title="切换签约人" :visible.sync="dialogFlagKey1" width="330px" :before-close="cancel1" center>
      <div>
        <el-form>
          <el-form-item label="签约人">
            <el-select v-model="bank" clearable placeholder="选择签约人" label="银行账户" >
              <el-option
                v-for="item in signs"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel1">取 消</el-button>
        <el-button type="primary" @click="qihuanfsd">确定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="审核记录" :visible.sync="dialogFlagKey2" :before-close="cancel1" :show-close="true" width="600px" center>
      <records :filingObject="detailList"/>
    </el-dialog>
    <el-dialog title="操作" :visible.sync="dialogFlagKey3" :before-close="cancel1" width="900px" :show-close="true">
      <el-tabs v-model="activeName" @tab-click="handleClick" v-loading.fullscreen.lock="!dieObj">
        <el-tab-pane label="基本信息" name="first">
          <info :filingObject="dieObj"/>
        </el-tab-pane>
        <el-tab-pane label="关联商户" name="second">
          <associatedMerchant :filingObject="filingObject"/>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import baseComponents from '@/common/base.js'
import { getUserId } from '@/utils/auth'
import { strateStatus } from '@/utils/statusCode'
import records from '@/common/records'
import associatedMerchant from './associatedMerchant'
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
    associatedMerchant,
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
      list: [],
      listLoading: false,
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
    ])
  },
  mounted:function(){
  },
  watch:{
    dialogFlagKeyfoo:function(a){
      a&&(this.listLoading = true)
      this.dialogFlagKey1 = this.dialogFlagKey2 = this.dialogFlagKey3 = this.dialogFlagKey4 =false
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
      }
    },
    dialogFlagKey1:function(val){
      if(val){
        this.bank = null
        const curruid = getUserId()
        this.$store.dispatch('SetSignsList', curruid)
      }
    },
    dialogFlagKey2:function(val){
      if(val){
        this.getRecords()
      }
    },
    dialogFlagKey3:function(val){
      if(val){
        const curruid = getUserId()
        const storeId= this.filingObject.id
        this.$store.dispatch('StoreRelationList', {storeId, curruid})
        const inspectId = this.filingObject.id
        this.$store.dispatch('GetReports', {curruid, inspectId})
        const id = this.filingObject.id
        this.$store.dispatch('StoreDetails', { curruid, id }).then((data) => {
          this.dieObj = data.data
          console.log(data)
        }) 
      }
    }
  },
  created() {
    
  },
  methods: {
    fllingSucces(){
      this.toLists
    },
    qihuanfsd(){
      if(this.bank){
        const curruid = getUserId()
        const userId = this.bank
        const storeId = this.filingObject.id
        this.$store.dispatch('ChangeSigns', {curruid, userId, storeId}).then((data)=>{
          console.log(data)
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
      console.log(row);
    },
    toFilingSublmit(){
      if(this.bank){
        const curruid = getUserId()
        let recordVO = this.filingObject
        recordVO.accountId = this.bank
        this.$store.dispatch('ToFiling', {curruid, recordVO}).then((data)=>{
          console.log(data)
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
    toLists(status){
      const curruid = getUserId()
      const recordId = this.filingObject.id
      const reason = this.textarea
      if(status === 'REJECT'&&reason===""){
        this.$message.error('请填写备案驳回原因！');
        return
      }
      const listVO = {
        action: status,
        reason: reason
      }
      this.$store.dispatch('Lists', {curruid, recordId, listVO}).then((data)=>{
        console.log(data)
        if(data.status){
          this.cancel1(true)
          this.$message({
            message: '操作成功！',
            type: 'success'
          });
        }else{
          this.$message.error('发生不可抗力原因引起失败！');
        }
      })
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