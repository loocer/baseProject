<template>
  <div v-if="listLoading">
    <el-dialog title="账号配置" :visible.sync="dialogFlagKey1" width="800px" :before-close="cancel1" center>
      <el-form>
        <p v-if="infos.length ===0">稍等，正在获取配置信息。。。</p>
      <div v-if="infos.length !==0">
        <el-row>
          <el-col :span="24">
            <div class="grid-content bg-purple" style="color:#999999">
                <span class="filed_key">商户名称：</span>
                <span class="filed_value"> {{filingObject.storeTitle}} </span>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <template v-for="igm in infos">
            <el-col :span="24">
              <div class="grid-content bg-purple-light" style="font-family:'Arial Negreta','Arial';margin:5px 0;font-weight: 700;font-style: normal;font-size: 14px;">
                  <span class="filed_key">{{igm.title}}：</span>
              </div>
            </el-col>
            <el-col :span="12" v-for="(item,index) in igm.temp">
              <div class="grid-content bg-purple">
                  <span class="filed_key">{{item.configItemName}}：</span>
                  <el-radio-group v-model="formObj[item.configItemCode]" >
                    <template v-for="im in item.configItemSet.split('|')">
                      <el-radio :label="im" >{{im}}</el-radio>
                    </template>
                  </el-radio-group>
              </div>
            </el-col>
          </template>
        </el-row>
      </div>
    </el-form>
    <div slot="footer" class="dialog-footer">
        <el-button @click="cancel1">关闭</el-button>
        <el-button type="primary" @click="toAccountSublmit">提交</el-button>
      </div>
  </el-dialog>  
  <el-dialog title="查看账号配置" :visible.sync="dialogFlagKey2" width="800px" :before-close="cancel1" center>
      <el-form v-loading.fullscreen.lock="dcLoading">
      <div>
        <el-row>
          <el-col :span="24">
            <div class="grid-content bg-purple" style="color:#999999">
                <span class="filed_key">商户名称：</span>
                <span class="filed_value"> {{filingObject.storeTitle}} </span>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <template v-for="igm in infoValues">
            <el-col :span="24">
              <div class="grid-content bg-purple-light" style="font-family:'Arial Negreta','Arial';margin:5px 0;font-weight: 700;font-style: normal;font-size: 14px;">
                  <span class="filed_key">{{igm.title}}：</span>
              </div>
            </el-col>
            <el-col :span="12" v-for="(item,index) in igm.temp">
              <div class="grid-content bg-purple">
                  <span class="filed_key">{{item.configItemName}}：</span>
                  <span>
                    {{item.value}}
                  </span>
              </div>
            </el-col>
          </template>
        </el-row>
      </div>
    </el-form>
  </el-dialog>

   <el-dialog title="修改配置" :visible.sync="dialogFlagKey4" width="800px" :before-close="cancel1" center>
      <el-form>
      <div>
        <el-row>
          <el-col :span="24">
            <div class="grid-content bg-purple" style="color:#999999">
                <span class="filed_key">商户名称：</span>
                <span class="filed_value"> {{filingObject.storeTitle}} </span>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <template v-for="igm in infos">
            <el-col :span="24">
              <div class="grid-content bg-purple-light" style="font-family:'Arial Negreta','Arial';margin:5px 0;font-weight: 700;font-style: normal;font-size: 14px;">
                  <span class="filed_key">{{igm.title}}：</span>
              </div>
            </el-col>
            <el-col :span="12" v-for="(item,index) in igm.temp">
              <div class="grid-content bg-purple">
                  <span class="filed_key">{{item.configItemName}}：</span>
                  <template v-for="im in item.configItemSet.split('|')">
                    <input type="radio"  :value="im"  v-model="formObj[item.configItemCode]">
                    <label >{{im}}</label>
                    <!-- <el-radio :label="im" >{{im}}</el-radio> -->
                  </template>
              </div>
            </el-col>
          </template>
        </el-row>
      </div>
    </el-form>
    <div slot="footer" class="dialog-footer">
        <el-button @click="cancel1">关闭</el-button>
        <el-button type="primary" @click="modifyAccountConfigSublmit">提交</el-button>
    </div>
  </el-dialog>  
  <el-dialog  :visible.sync="dialogFlagKey3" v-if="dialogFlagKey3" title="审核记录" :before-close="cancel1" width="600px" :show-close="true">
    <records :filingObject="detailList"/>
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
      gfg:null,
      querys:[],
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
        this.formObj = {}
        this.bank = null
        this.infos = []
        this.dcLoading = true
        const curruid = getUserId()
        this.$store.dispatch('AddAccountBase', {curruid}).then((data)=>{
          this.dcLoading = false
          this.baseInfos = data
          this.baseTool(data)
        })
      }
    },
    dialogFlagKey2:function(val){
      if(val){
        const curruid = getUserId()
        const accountId = this.filingObject.accountId
        this.dcLoading = true
        this.$store.dispatch('GetAccountConfig', {curruid, accountId}).then((data)=>{
          this.dcLoading = false
          this.infoTool(data)
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
    fdfdfdf(v){
      console.log(v);
    },
    infoTool(data){
      let list = data.configItems
      let fList = []
      let res = []
      for(let i in list){
        if(fList.indexOf(list[i].pageName) === -1){
          fList.push(list[i].pageName)
        }
      }
      for(let f in fList){
        let title = fList[f]
        let temp = []
        for(let i in list){
          if(list[i].pageName === fList[f]){
            for(let di in data.accountConfig){
              if(data.accountConfig[di].configItemCode===list[i].configItemCode){
                list[i].value = data.accountConfig[di].configItemVal
                temp.push(list[i])
              }
            }
          }
        }
        res.push({title,temp})
      }
      this.infoValues = res
    },
    initFormat(){
      for(let i in this.infoValues){

      }
    },
    baseTool(list){
      console.log("-----------------------")
      console.log(list)
      let fList = []
      let res = []
      for(let i in list){
        if(fList.indexOf(list[i].pageName) === -1){
          fList.push(list[i].pageName)
        }
      }
      console.log(fList)
      for(let f in fList){
        let title = fList[f]
        let temp = []
        for(let i in list){
          if(list[i].pageName === fList[f]){
            list[i].value = fList[f]
            temp.push(list[i])
          }
        }
        res.push({title,temp})
      }
      this.infos = res
    },
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
    modifyAccountConfigSublmit(){
      if(this.validate()){
        const formObj = this.querys
        const curruid = getUserId()
        const accountId = this.filingObject.accountId
        this.$store.dispatch('ModifyAccountConfig', {curruid,formObj,accountId}).then((data)=>{
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