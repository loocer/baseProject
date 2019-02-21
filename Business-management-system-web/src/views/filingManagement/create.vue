<template>
  <div v-if="listLoading">
    <el-dialog title="发起备案" :visible.sync="dialogFlagKey1" width="400px" :before-close="cancel1" center>
      <div>
        <el-form>
          <el-form-item label=" 银行账户">
            <el-select v-model="bank" clearable placeholder="请选择银行账户" label="银行账户" >
              <el-option
                v-for="item in banks"
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
        <el-button type="primary" @click="toFilingSublmit">发起备案</el-button>
      </div>
    </el-dialog>
    <el-dialog title="重新发起备案" :visible.sync="dialogFlagKey5" width="400px" :before-close="cancel1" center>
      <div>
        <el-form>
          <el-form-item label=" 银行账户">
            <el-select v-model="bank" clearable placeholder="请选择银行账户" label="银行账户" >
              <el-option
                v-for="item in banks"
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
        <el-button type="primary" @click="toFilingAgainSublmit">发起备案</el-button>
      </div>
    </el-dialog>
    <el-dialog title="确定已通过备案吗？" :visible.sync="dialogFlagKey2" :before-close="cancel1" :show-close="false" width="220px" center>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel1">取 消</el-button>
        <el-button type="primary" @click="toLists('PASS')">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="备案记录" :visible.sync="dialogFlagKey4" :before-close="cancel1" width="700px" :show-close="false">
      <el-table :data="gridData" v-loading="dcLoading">
        <el-table-column property="date" label="发起时间" width="200">
          <template slot-scope="scope">
            {{ scope.row.createDate }}
          </template>
        </el-table-column>
        <el-table-column property="name" label="审核人" width="150">
          <template slot-scope="scope">
            {{ scope.row.auditorName }}
          </template>
        </el-table-column>
        <el-table-column property="fdf" label="审核状态" width="200">
          <template slot-scope="scope">
            {{ scope.row.status | statusFilter }}
          </template>
        </el-table-column>
        <el-table-column property="address" label="审核信息">
          <template slot-scope="scope">
            {{ scope.row.reason }}
          </template>
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel1()">关闭</el-button>
      </div>
    </el-dialog>
    <el-dialog title="备案失败" :visible.sync="dialogFlagKey3" :before-close="cancel1" width="400px">
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
import { strateStatus } from '@/utils/statusCode'
import { parseTime } from '@/utils/index'
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
      listLoading: false,
      dcLoading:true,
      dialogFlagKey5:false,
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
      this.dialogFlagKey1 = this.dialogFlagKey2 = this.dialogFlagKey3 = this.dialogFlagKey4 = this.dialogFlagKey5 =false
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
        case 5:
          this.dialogFlagKey5 = true
          break;  
        case 4:
          this.dialogFlagKey4 = true
      }
    },
    dialogFlagKey1:function(val){
      if(val){
        this.bank = null
        const curruid = getUserId()
        const storeId = this.filingObject.storeId
        this.$store.dispatch('GetStoreAccountList', {curruid, storeId}).then((data)=>{
          this.dcLoading = true
          this.banks = data
        })
      }
    },
    dialogFlagKey5:function(val){
      if(val){
        this.bank = null
        const curruid = getUserId()
        const storeId = this.filingObject.storeId
        this.$store.dispatch('GetStoreAccountList', {curruid, storeId}).then((data)=>{
          this.dcLoading = true
          this.banks = data
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
            this.$message.error(data.err.msg);
          }
        })
      }else{
        this.$message.error('请选择银行卡！');
      }
    },
    toFilingAgainSublmit(){
      if(this.bank){
        const curruid = getUserId()
        let recordVO = this.filingObject
        recordVO.accountId = this.bank
        this.$store.dispatch('ToFilingAgain', {curruid, recordVO}).then((data)=>{
          console.log(data)
          if(data.status){
            this.cancel1(true)
            this.$message({
              message: '备案成功！',
              type: 'success'
            });
          }else{
            this.$message.error(data.err.msg);
          }
        })
      }else{
        this.$message.error('请选择银行卡！');
      }
    },
    toLists(status){
      const curruid = getUserId()
      const recordId = this.filingObject.id
      let reason = this.textarea
      if(status === 'REJECT'&&reason===""){
        this.$message.error('请填写备案驳回原因！');
        return
      }
      if(status !== 'REJECT'){
        reason = null
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
</style>