<template>
  <div v-if="listLoading">
    <el-dialog title="编辑员工" :visible.sync="dialogFlagKey1" width="700px" :before-close="cancel1" center>
      <el-form  label-width="120px" :model="formObj">
        <el-form-item label="*姓名">
          <el-input v-model="formObj.realName" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="*联系电话">
          <el-input v-model="formObj.mobile" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="*邮箱">
          <el-input v-model="formObj.email" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="*负责人">
          <el-input v-model="formObj.leaderName" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="*区域">
          <el-select v-model="formObj.areas" multiple  placeholder="请选择区域">
            <el-option
              v-for="item in areasTree"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <!-- <el-cascader
            expand-trigger="hover"
            :options="areasTree"
            v-model="formObjProvinces"
            @change="changeProvinces">
          </el-cascader> -->
        </el-form-item>
        <el-form-item label="*角色">
          <el-select v-model="formObj.roles" multiple placeholder="请选择">
            <el-option
              v-for="item in roleList"
              :key="item.id"
              :label="item.roleName"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="*状态">
          <el-select
            v-model="formObj.status"
            filterable
            allow-create
            default-first-option
            placeholder="请选择状态">
            <el-option
              v-for="item in userState"
              :key="item.key"
              :label="item.value"
              :value="item.key">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="*合同数据权限">
          <el-select v-model="formObj.contractPermissions" multiple placeholder="请选择合同数据权限">
            <el-option
              v-for="item in contractPermissions"
              :key="item.id"
              :label="item.permission"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel1">关闭</el-button>
        <el-button type="primary" @click="toSublmit">提交</el-button>
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
      roles:[],
      dialogFlagKey5:false,
      anctionName:'SetEmployee',
      banks:[{
        label:'加载中。。。。',
        value:0
      }],
      bank:null,
      textarea:'',
      gridData: [],
      formObj:{},
      contractPermissions:[],
      userState:[
        {key:'1',value:'有效'},
        {key:'0',value:'禁用'}
      ]
    }
  },
  extends: baseComponents,
  computed: {
    ...mapGetters([
      'areasTree',
      'roleList'
    ])
  },
  mounted:function(){
  },
  watch:{
    areasTree:function(val){
      console.log(val)
    },
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
        const curruid = getUserId()
        const id = this.filingObject.id
        this.$store.dispatch('ContractPermissions', curruid).then((data)=>{
          this.dcLoading = false
          this.contractPermissions = data
        })
        this.$store.dispatch('GetUserDilel', {curruid, id}).then((data)=>{
          this.dcLoading = false
          this.formObj = data
          this.formObj.roles = this.getIds(data.roles)
          this.formObj.areas = this.getIds(data.areas)
          this.formObj.contractPermissions = this.getIds(data.contractPermissions)
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
    getIds(list){
      let arry = []
      for(let i in list){
        arry.push(list[i].id)
      }
      return arry
    },
    formatData(array){
      const list = []
      for(let a in array){
        list.push({
          id:array[a]
        })
      }
      return list
    },
    handleClick(row) {
      console.log(row);
    },
    toSublmit(){
      this.formObj.roles = this.formatData(this.formObj.roles)
      this.formObj.areas = this.formatData(this.formObj.areas)
      this.formObj.contractPermissions = this.formatData(this.formObj.contractPermissions)
      const curruid = getUserId()
      const id = this.filingObject.id
      const user = this.formObj
      this.$store.dispatch('ModifyUser', {curruid, id, user}).then((data)=>{
          this.turnMsg(data)
      })
    },
    cancel1(isLoad=false){
      this.listLoading = isLoad
      let msg = {isLoad:isLoad,code:0}
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
</style>