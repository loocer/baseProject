<template>
  <div v-if="listLoading">
    <el-dialog title="校对记录" :visible.sync="dialogFlagKey3" v-if="dialogFlagKey3" width="700px" :before-close="cancel1" center>
      <records :filingObject="detailList"/>
    </el-dialog>
    <el-dialog title="确定要归档吗？" :visible.sync="dialogFlagKey2" :before-close="cancel1" :show-close="false" width="220px" center>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel1">取 消</el-button>
        <el-button type="primary" @click="toFilingSublmit('PASS')">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="合同信息" :visible.sync="dialogFlagKey1" :before-close="cancel1" width="1200px" :show-close="false">
      <detailsd :filingObject="infos"/>
    </el-dialog>
    <el-dialog title="备案失败" :visible.sync="dialogFlagKey4" :before-close="cancel1" width="400px">
      <el-input
        type="textarea"
        :rows="4"
        placeholder="请输入失敗原因"
        v-model="textarea">
      </el-input>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel1()">取 消</el-button>
        <el-button type="primary" @click="toLists('REJECT')">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import baseComponents from '@/common/base.js'
import { getUserId } from '@/utils/auth'
import detailsd from './detailsd'
import { strateStatus } from '@/utils/statusCode'
import { parseTime } from '@/utils/index'
import records from '@/common/records'
export default {
  props: {
    dialogFlag:Boolean,
    filingObject:Object,
    dialogFlagKeyfoo:Number
  },
  components: {
    detailsd,
    records
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
      infos:[],
      anctionName:'SetEmployee',
      banks:[{
        label:'加载中。。。。',
        value:0
      }],
      bank:null,
      textarea:'',
      gridData: [],
    }
  },
  extends: baseComponents,
  computed: {
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
        const id = this.filingObject.id
        this.$store.dispatch('ContractDiely', {curruid, id}).then((data)=>{
          this.dcLoading = true
          this.infos = data
          this.infos.storeTitle = this.filingObject.storeTitle
        })
      }
    },
    dialogFlagKey3:function(val){
      if(val){
        const curruid = getUserId()
        const id = this.filingObject.id
        this.dcLoading = true
        this.$store.dispatch('GetAccountRecords', {curruid, id}).then((data)=>{
          this.dcLoading = false
          this.detailList = data
        })
      }
    },
    dialogFlagKey4:function(val){
      if(val){
        const curruid = getUserId()
        const recordId = this.filingObject.id
        this.dcLoading = true
        this.$store.dispatch('FiledList', {curruid, recordId}).then((data)=>{
          this.dcLoading = false
          this.gridData = data
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
    handleClick(row) {
      console.log(row);
    },
    toFilingSublmit(){
      const curruid = getUserId()
      const id = this.filingObject.id
      this.$store.dispatch('ContractTidy', {curruid, id}).then((data)=>{
        if(data.status){
          this.cancel1(true)
          this.$message({
            message: '归档成功！',
            type: 'success'
          });
        }else{
          this.$message.error(data.err.msg);
        }
      })
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
    cancel1(isLoad=false){
      this.listLoading = isLoad
      let msg = {isLoad:isLoad,code:0}
      console.log(msg)
      this.$emit('dialogFlagKeyBackfoo', msg)
      this.dialogFlagKey1 = this.dialogFlagKey3= this.dialogFlagKey2= this.dialogFlagKey4=false
    },
    cancel(){
    }
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
  .el-dialog__body{
    padding: 50px;
  }
</style>