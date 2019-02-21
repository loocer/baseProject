<template>
  <div v-if="listLoading">
    <el-dialog title="新建角色" :visible.sync="dialogFlagKey1" width="500px" :before-close="cancel1" center>
      <el-form  label-width="100px" :model="formObj">
        <el-form-item label="*角色编码">
          <el-input v-model="formObj.roleCode"></el-input>
        </el-form-item>
        <el-form-item label="*角色名称">
          <el-input v-model="formObj.roleName"></el-input>
        </el-form-item>
        <el-form-item label="权限">
          <el-tree
            :data="functions"
            show-checkbox
            node-key="id"
            @check-change="chagneNode"
            :props="defaultProps1">
          </el-tree>
        </el-form-item>
        <el-form-item label="菜单">
          <el-tree
            :data="muneTree"
            show-checkbox
            node-key="id"
            default-expand-all
            @check= "checkgoo"
            @check-change="changeMnue"
            :props="defaultProps2">
          </el-tree>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel1">关闭</el-button>
        <el-button type="primary" @click="toSublmit">提交</el-button>
      </div>
    </el-dialog>  
    <el-dialog
      title="提示"
      :visible.sync="dialogFlagKey2"
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
import { formatToTree } from '@/utils/tool'
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
      menues:[],
      deflts:[],
      roles:[],
      mune:[],
      functions:[],
      defaultProps1: {
        children: 'children',
        label: 'label'
      },
      defaultProps2: {
        children: 'children',
        label: 'label'
      }
    }
  },
  extends: baseComponents,
  computed: {
    ...mapGetters([
      'muneTree'
    ])
  },
  mounted:function(){
  },
  watch:{
    dialogFlagKey1:function(val){
      if(val){
        const curruid = getUserId()
        this.$store.dispatch('GetMuneTree', curruid)
        this.$store.dispatch('GetRolesList', {curruid}).then(()=>{
          this.deflts = ['28468368b01c11e8a79300163e000102']
        })
        this.$store.dispatch('SetRouter', {curruid}).then((data)=>{
          console.log(data)
          this.deflts = ['402848865b46f6f5015b46fba8c40000']
          this.functions = formatToTree(data.list)
          console.log(this.functions)
        })
      }
    },
    dialogFlagKey2:function(val){
    },
  },
  methods: {
    formatData(array){
      const list = []
      for(let a in array){
        list.push({
          id:array[a]
        })
      }
      return list
    },
    chagneNode(data, checked){
      if(checked){
        this.roles.push(data.value)
      } else {
        this.roles.splice(this.roles.indexOf(data.value), 1);
      }
      console.log(this.roles);
    },
    changeMnue(data, checked, dffe){
      if(checked){
        this.mune.push(data.id)
      } else {
        this.mune.splice(this.mune.indexOf(data.id), 1);
      }
      console.log(this.mune);
    },
    checkgoo(val){
      console.log(val)
    },
    deleteData(){
      const curruid = getUserId()
      const id = this.filingObject.id
      this.$store.dispatch('DeleteRoles', {curruid, id}).then((data)=>{
          this.turnMsg(data)
      })
    },
    toSublmit(){
      this.formObj.functions = this.formatData(this.roles)
      this.formObj.menus = this.formatData(this.mune)
      const curruid = getUserId()
      const role = this.formObj
      this.$store.dispatch('AddRoles', {curruid, role}).then((data)=>{
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