<template>
  <div v-if="listLoading">
    <el-dialog title="添加员工" :visible.sync="dialogFlagKey1" width="320px" :before-close="cancel1" center>
      <el-form  label-width="80px" :model="formObj">
        <el-form-item label="*姓名">
          <el-input v-model="formObj.name" ></el-input>
        </el-form-item>
        <el-form-item label="*手机号">
          <el-input v-model="formObj.mobile" ></el-input>
        </el-form-item>
        <el-form-item label="*数据权限">
          <el-select v-model="formObj.dataPermissions"   placeholder="请选择数据权限">
            <el-option
              v-for="item in dataPermissions"
              :key="item.id"
              :label="item.name"
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
    <el-dialog title="修改员工" :visible.sync="dialogFlagKey2" width="320px" :before-close="cancel1" center>
      <div>
        <el-form label-width="80px" :model="filingObject">
          <el-form-item label="*姓名">
            <el-input v-model="filingObject.name" ></el-input>
          </el-form-item>
          <el-form-item label="*手机号">
            <el-input v-model="filingObject.mobile" ></el-input>
          </el-form-item>
          <el-form-item label="*数据权限">
            <el-select v-model="filingObject.dataPermissions"   placeholder="请选择数据权限">
              <el-option
                v-for="item in dataPermissions"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="toFilingSublmit">提交</el-button>
      </div>
    </el-dialog>
    <el-dialog title="离职交接" :visible.sync="dialogFlagKey3" width="350px" :before-close="cancel1" center>
      <div>
        <el-form>
          <el-form-item label="订单交接人">
            <el-select v-model="jiaojieId" clearable placeholder="请选择员工" label="请选择员工" >
              <el-option
                v-for="item in users"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="deleteUser">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import baseComponents from '@/common/base.js'
import { getUserId, getCommercialId } from '@/utils/auth'
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
      banks:[{
        label:'加载中。。。。',
        value:0
      }],
      bank:null,
      jiaojieId:null,
      gridData: [],
      formObj:{},
      userState:[
        {key:'1',value:'有效'},
        {key:'0',value:'禁用'}
      ]
    }
  },
  extends: baseComponents,
  computed: {
    ...mapGetters([
      'dataPermissions',
      'users'
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
    const curruid = getUserId()
    const commercialId = getCommercialId()
    this.$store.dispatch('GetPermissions', {curruid, commercialId})
    this.$store.dispatch('GetAllUser', {curruid, commercialId})
  },
  methods: {
    fllingSucces(){
      this.toLists
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
    toFilingSublmit(){
      const curruid = getUserId()
      const id  = this.filingObject.id
      const userVO  = this.filingObject
      const commercialId = getCommercialId()
      this.$store.dispatch('ModifyUser', {curruid, commercialId, id, userVO}).then((data)=>{
          this.turnMsg(data)
      })
    },
    deleteUser(){
      const curruid = getUserId()
      const id  = this.filingObject.id
      const heirId = this.jiaojieId
      const commercialId = getCommercialId()
      this.$store.dispatch('DeleteUser', {curruid, commercialId, heirId, id}).then((data)=>{
          this.turnMsg(data)
      })
    },
    toSublmit(){
      const curruid = getUserId()
      const commercialId = getCommercialId()
      const userVO  = this.formObj
      this.$store.dispatch('AddUser', {curruid, commercialId, userVO}).then((data)=>{
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