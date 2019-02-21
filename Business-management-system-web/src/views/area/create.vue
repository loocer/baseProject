<template>
  <div v-if="listLoading">
    <el-dialog title="新建区域" :visible.sync="dialogFlagKey1" width="320px" :before-close="cancel1" center>
      <el-form  label-width="80px" :model="formObj">
        <el-form-item label="*区域编码">
          <el-input v-model="formObj.code"></el-input>
        </el-form-item>
        <el-form-item label="*区域名称">
          <el-input v-model="formObj.name"></el-input>
        </el-form-item>
        <el-form-item label="*包含省份">
          <el-select
            v-model="formObjProvinces"
            multiple
            filterable
            @change="changeProvinces"
            allow-create
            default-first-option
            placeholder="请选择包含省份">
            <el-option
              v-for="item in provincesList"
              :key="item.value"
              :label="item.fullName"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="*包含城市">
          <el-select
            v-model="formObjCities"
            multiple
            filterable
            :loading="dcLoading"
            allow-create
            default-first-option
            placeholder="请选择城市">
            <el-option
              v-for="item in areasCitiesList"
              :key="item.value"
              :label="item.fullName"
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
    <el-dialog title="编辑区域" :visible.sync="dialogFlagKey2" width="330px" :before-close="cancel1" center>
      <el-form  label-width="80px" :model="formObj">
        <el-form-item label="*区域编码">
          <el-input v-model="formObj.code"></el-input>
        </el-form-item>
        <el-form-item label="*区域名称">
          <el-input v-model="formObj.name"></el-input>
        </el-form-item>
        <el-form-item label="*包含省份">
          <el-select
            v-model="formObjProvinces"
            multiple
            filterable
            allow-create
            @change="changeProvinces"
            default-first-option
            placeholder="请选择包含省份">
            <el-option
              v-for="item in provincesList"
              :key="item.value"
              :label="item.fullName"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="*包含城市">
          <el-select
            v-model="formObjCities"
            multiple
            filterable
            allow-create
            default-first-option
            placeholder="请选择城市">
            <el-option
              v-for="item in areasCitiesList"
              :key="item.value"
              :label="item.fullName"
              :value="item.id">
            </el-option>
          </el-select>
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
      detailList:[],
      cities:[],
      anctionName:'SetEmployee',
      banks:[{
        label:'加载中。。。。',
        value:0
      }],
      bank:null,
      textarea:'',
      gridData: [],
      formObjProvinces:null,
      formObjCities:null
    }
  },
  extends: baseComponents,
  computed: {
    ...mapGetters([
      'provincesList',
      'areasCitiesList',
    ])
  },
  created() {
    // const userId = getUserId()
    // this.params = {curruid: userId}
    // this.$store.dispatch('GetProvincesList', userId)
    // this.$store.dispatch('GetAreaCitiesList', userId)
  },
  mounted:function(){
  },
  watch:{
    dialogFlagKey1:function(val){
      if(val){
        this.initCommonData()
      }
    },
    dialogFlagKey2:function(val){
      if(val){
        const curruid = getUserId()
        const id = this.filingObject.id
        this.initCommonData()
        this.$store.dispatch('GetArea', {curruid, id}).then((data)=>{
          const regions = data.regions
          this.formObj = data
          const formObjProvinces = []
          const formObjCities = []
          const ids = []
          for(let r in regions){
            if(regions[r].type == '01'){
              formObjProvinces.push(regions[r].id)
              ids.push(regions[r].id)
            } else {
              formObjCities.push(regions[r].id)
            }
          }
          this.formObjProvinces = formObjProvinces
          this.changeProvinces(ids)
          this.formObjCities = formObjCities
        })
      }
    },
  },
  created() {
  },
  methods: {
    initCommonData(v){
      const curruid = getUserId()
      this.$store.dispatch('GetProvincesList', curruid)
    },
    fllingSucces(){
      this.toLists
    },
    changeProvinces(val){
      if(val){
        console.log('cities')
      }
      let pids = []
      for(let i in val){
        pids.push(val[i])
      }
      console.log(pids)
      this.dcLoading = true
      const curruid = getUserId()
      this.formObjCities = []
      this.$store.dispatch('GetAreaCitiesList', {curruid, pids}).then(()=>{
        this.dcLoading = false
      })
    },
    handleClick(row) {
      console.log(row);
    },
    validate(){
    },
    deleteData(){
      const curruid = getUserId()
      const id = this.filingObject.id
      this.$store.dispatch('DleteArssea', {curruid, id}).then((data)=>{
        this.dcLoading = false
        this.turnMsg(data)
      })
    },
    fomatData(){
      const curruid = getUserId()
      const cities = this.formObjProvinces
      const provinces = this.formObjCities
      const pclist = provinces.concat(cities)
      const list = []
      for(let f in pclist){
        let obj = {
          id: pclist[f]
        }
        list.push(obj)
      }
      this.formObj.regions = list
      return {curruid:curruid, areaVO :this.formObj}
    },
    toSublmit(){
      const obj = this.fomatData()
      this.$store.dispatch('AddArea', obj).then((data)=>{
        this.dcLoading = false
        this.turnMsg(data)
      })
    },
    resetForm(){
      this.formObjProvinces = []
      this.formObjCities = []
      this.formObj = {}
    },
    mySublmit(){
      const obj = this.fomatData()
      this.$store.dispatch('AddArea', obj).then((data)=>{
        this.dcLoading = false
        this.turnMsg(data)
      })
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
  .el-row{
    div{
       line-height: 25px;
       font-size: 13px;
    }
  }
  
</style>