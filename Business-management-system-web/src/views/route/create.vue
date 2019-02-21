<template>
  <div v-if="listLoading">
    <el-dialog title="新建路由" :visible.sync="dialogFlagKey1" width="500px" :before-close="cancel1" center>
      <el-form  label-width="80px" :model="formObj">
        <el-form-item label="*功能名称">
          <el-input v-model="formObj.functionName"></el-input>
        </el-form-item>
        <el-form-item label="访问路劲">
          <el-input v-model="formObj.url"></el-input>
        </el-form-item>
        <el-form-item label="请求方法">
          <el-input v-model="formObj.method"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel1">关闭</el-button>
        <el-button type="primary" @click="toSublmit">提交</el-button>
      </div>
    </el-dialog>  
    <el-dialog title="编辑路由" :visible.sync="dialogFlagKey2" width="800px" :before-close="cancel1" center>
        <el-form  label-width="80px" :model="formObj">
          <el-form-item label="*功能名称">
            <el-input v-model="formObj.functionName"></el-input>
          </el-form-item>
          <el-form-item label="访问路劲">
            <el-input v-model="formObj.url"></el-input>
          </el-form-item>
          <el-form-item label="请求方法">
            <el-input v-model="formObj.method"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancel1">关闭</el-button>
          <el-button type="primary" @click="mySublmit">提交</el-button>
        </div>
    </el-dialog>
    <el-dialog
      title="提示"
      :visible.sync="dialogFlagKey3"
      width="400px"
      >
      <span>确定删除吗？</span>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel1">取 消</el-button>
        <el-button type="primary" @click="deleteData">确 定</el-button>
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
import records from '@/common/records'
export default {
  components: {
    records
  },
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
      baseInfos:null,
      infoValues:null,
      infos:[],
      querys:[],
      formObj:{},
      detailList:[],
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
    dialogFlagKey1:function(val){
      if(val){
        this.bank = null
        this.infos = []
        this.dcLoading = true
        const curruid = getUserId()
        const id = this.filingObject.id
        this.$store.dispatch('GetRouter', {curruid, id}).then((data)=>{
          this.dcLoading = false
          this.formObj = data
        })
      }
    },
    dialogFlagKey2:function(val){
      if(val){
        const curruid = getUserId()
        const id = this.filingObject.id
        this.$store.dispatch('GetRouter', {curruid, id}).then((data)=>{
          this.dcLoading = false
          this.formObj = data
        })
      }
    },
    dialogFlagKey3:function(val){
      if(val){
        const curruid = getUserId()
        const accountId = this.filingObject.accountId
        this.dcLoading = true
        this.$store.dispatch('GetAccountRecords', {curruid, id:accountId}).then((data)=>{
          this.dcLoading = false
          this.detailList = data
        })
      }
    },
    dialogFlagKey4:function(val){
      if(val){
        this.bank = null
        this.infos = []
        this.dcLoading = true
        const curruid = getUserId()
        this.$store.dispatch('AddAccountBase', {curruid}).then((data)=>{
          this.dcLoading = false
          this.baseInfos = data
          let a = this.baseTool(data)

          const curruid = getUserId()
          const accountId = this.filingObject.accountId
          this.dcLoading = true
          this.$store.dispatch('GetAccountConfig', {curruid, accountId}).then((data)=>{
            this.dcLoading = false
            let accountConfig = data.accountConfig
            for(let a in accountConfig){
              this.formObj = {}
              // this.formObj[accountConfig[a].configItemCode] = accountConfig[a].configItemVal
            }
            // this.infoTool(data)
          })
          // }).then(()=>{
          //   console.log(this.formObj)
        })
      }
    },
  },
  created() {
  },
  methods: {
    toSublmit(){
      const curruid = getUserId()
      const func = this.formObj
      this.$store.dispatch('addRouter', {curruid, func}).then((data)=>{
        this.turnMsg(data)
        console.log(data)
      })
    },
    deleteData(){
      const curruid = getUserId()
      const id = this.filingObject.id
      this.$store.dispatch('DeleteRouter', {curruid, id}).then((data)=>{
        this.turnMsg(data)
        console.log(data)
      })
    },
    mySublmit(){
      const curruid = getUserId()
      const id = this.filingObject.id
      const func = this.formObj
      this.$store.dispatch('ModifyRouter', {curruid, func, id}).then((data)=>{
        this.turnMsg(data)
        console.log(data)
      })
    }, 
    validate(){
      const storeId = this.filingObject.storeId
      const bInfo = this.baseInfos
      const obj = this.formObj
      let querys = []
      for(let b in bInfo){
        let tempG = false
        let mes = ''
        for (let key in obj) {
          if(key === bInfo[b].configItemCode){
            tempG = true
            mes = obj[key]
          } 
        }
        if(!tempG){
          this.$message.error('请勾选' + bInfo[b].configItemName);
          return false
        } else {
          querys.push({
            configItemCode: bInfo[b].configItemCode,
            configItemVal: mes,
            storeId: storeId
          })
        }
      }
      this.querys = querys
      return true
    },
    toAccountSublmit(){
      if(this.validate()){
        const formObj = this.querys
        const curruid = getUserId()
        const accountId = this.filingObject.accountId
        this.$store.dispatch('addAccount', {curruid,formObj,accountId}).then((data)=>{
          this.turnMsg(data)
        })
      }
    },
    onSubmit(){
      console.log('onSubmit')
    },
    cancel1(isLoad=false){
      this.listLoading = isLoad
      let msg = {isLoad:isLoad,code:0}
      console.log(66666666666)
      console.log(msg)
      this.$emit('dialogFlagKeyBackfoo', msg)
      this.dialogFlagKey1 = this.dialogFlagKey3= this.dialogFlagKey2= this.dialogFlagKey4=false
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
  .el-row{
    div{
       line-height: 25px;
       font-size: 13px;
    }
  }
  
</style>