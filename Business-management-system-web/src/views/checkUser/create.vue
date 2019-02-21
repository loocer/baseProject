<template>
  <div v-if="listLoading">
    
    <el-dialog title="元宝亿家租赁外访调研表（商户）" :visible.sync="dialogFlagKey1" width="800px" :before-close="cancel1" center>
      <checkInfo :filingObject="infoValues"/>
    </el-dialog>
    
    <el-dialog title="商户资料" :visible.sync="dialogFlagKey2" width="1200px" :before-close="cancel1" center>
      <info :filingObject="baseInfos"/>
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
import checkInfo from './checkInfo'
import info from './info'
import { parseTime } from '@/utils/index'
import records from '@/common/records'
export default {
  components: {
    records,
    checkInfo,
    info
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
      listLoading: false,
      dcLoading:true,
      baseInfos:{},
      infoValues:{},
      infos:[],
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
        this.dcLoading = true
        const curruid = getUserId()
        const inspectId = this.filingObject.id
        this.$store.dispatch('GetReports', {curruid, inspectId}).then((data)=>{
          this.infoValues = data.data
        })
      }
    },
    dialogFlagKey2:function(val){
      if(val){
        const curruid = getUserId()
        const id = this.filingObject.storeId
        this.$store.dispatch('StoreDetails', { curruid, id }).then((data) => {
          this.baseInfos = data.data
          console.log(data)
        }) 
      }
    },
    dialogFlagKey3:function(val){
      if(val){
        const curruid = getUserId()
        const accountId = this.filingObject.id
        this.$store.dispatch('GetAccountRecords', {curruid, id:accountId}).then((data)=>{
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
    fllingSucces(){
      this.toLists
    },
    onSubmit(){
      console.log('onSubmit')
    },
    cancel1(isLoad=false){
      this.listLoading = isLoad
      let msg = {isLoad:isLoad,code:0}
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