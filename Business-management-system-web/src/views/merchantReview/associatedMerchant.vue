<template>
  <div style="margin:50px; ">
    <el-button type="primary"  @click="dialogFormVisible = true">新建</el-button>
          <el-dialog title="关联商户" :visible.sync="dialogFormVisible" append-to-body width="700px">
            <el-form ref="formObj" :model="formObj" label-width="80px" style="margin: 10 20px;padding: 0 30px 0 10px">
              <el-form-item label="关联关系">
                <el-radio-group v-model="formObj.relationType" @change="chioseCp">
                  <el-radio label="child">子公司</el-radio>
                  <el-radio label="parent">母公司</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="关联商户">
                <el-select v-model="formObj.relationId" filterable placeholder="请搜索选择" @change="chioseRelationId">
                  <el-option
                    v-for="item in signed"
                    :key="item.id"
                    :label="item.storeTitle"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="提单主体">
                <el-input v-model="zhuti" :disabled="true"></el-input>
              </el-form-item>
              <el-form-item label="证明资料">
                <el-upload
                      action="https://up-z1.qbox.me"
                      :on-change="handleChange"
                      :on-remove="handremove"
                      list-type="picture-card"
                      :data="imgForm"
                      >
                      <i class="el-icon-plus"></i>
                </el-upload>
              </el-form-item>
              <el-form-item label="备注">
                <el-input
                  type="textarea"
                  :rows="2"
                  placeholder="请输入内容"
                  v-model="formObj.remark">
                </el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="addSubmit">确 定</el-button>
            </div>
          </el-dialog>

          <div style="border:1px solid #ebebeb;margin-top: 20px;">
            <el-table :data="gridData" v-loading="listLoading">
              <el-table-column property="date" label="商户名称" width="200">
                <template slot-scope="scope">
                  {{ scope.row.storeTitle }}
                </template>
              </el-table-column>
              <el-table-column property="name" label="关联关系" width="150">
                <template slot-scope="scope">
                  {{ scope.row.relationType | statusFilter}}
                </template>
              </el-table-column>
              <el-table-column property="fdf" label="关联时间" width="200">
                <template slot-scope="scope">
                  {{ scope.row.createDate }}
                </template>
              </el-table-column>
              <el-table-column
                fixed="right"
                label="操作"
                min-width="200" align="center">
                <template slot-scope="scope">
                  <el-popover
                    placement="top"
                    width="160"
                    v-model="visible2">
                    <p>确定取消关联吗？</p>
                    <div style="text-align: right; margin: 0">
                      <el-button size="mini" type="text" @click="visible2 = false">取消</el-button>
                      <el-button type="primary" size="mini" @click="deleteGuanxi(scope.row.relationId)">确定</el-button>
                    </div>
                    <el-button type="text" size="small" slot="reference" @click="visible2 = true">取消关联</el-button>
                  </el-popover>
                  
                  <!-- <el-button type="text" size="small" @click="openDiaLoag(1,scope.row)" v-if="scope.row.status==='UNRECORD'">商户资料</el-button>
                  <el-button type="text" size="small" @click="openDiaLoag(3,scope.row)" v-if="scope.row.status==='RECORDING'">修改</el-button>
                  <el-button type="text" size="small" @click="openDiaLoag(2,scope.row)" v-if="scope.row.status==='RECORDING'">审核记录</el-button>
                  <el-button type="text" size="small" @click="openDiaLoag(1,scope.row)" v-if="scope.row.status==='FAILURE'">商户资料</el-button>
                  <el-button type="text" size="small" @click="openDiaLoag(4,scope.row)" v-if="scope.row.status==='FAILURE'||scope.row.status==='RECORDED'">恢复</el-button> -->
                </template>
              </el-table-column>
            </el-table>
          </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import baseComponents from '@/common/base.js'
import { getUserId } from '@/utils/auth'
import { strateStatus } from '@/utils/statusCode'
export default {
  props: {
    dialogFlag:Boolean,
    filingObject:Object,
    dialogFlagKeyfoo:Number
  },
  filters: {
    statusFilter(val) {
      if(val === 'child'){
        return "子公司"
      } else {
        return "母公司"
      }
    },
    timeFilter(val) {
      return parseTime[val]
    }
  },
  data() {
    return {
      list: [],
      dieObj:{},
      xinLoading:false,
      relationType:'',
      gridData:[],
      visible2:false,
      anctionName:'SetEmployee',
      signsList:[{
        label:'加载中。。。。',
        value:0
      }],
      chioseRelationName:'',
      zhuti: '',
      dialogFormVisible:false,
      owner_card_back:'https://gss0.bdstatic.com/94o3dSag_xI4khGkpoWK1HF6hhy/baike/crop%3D0%2C0%2C550%2C363%3Bc0%3Dbaike80%2C5%2C5%2C80%2C26/sign=c0a36d315ee736d14c5cd648a66063f2/f11f3a292df5e0fee188aaec566034a85fdf724e.jpg'
    }
  },
  extends: baseComponents,
  mounted:function(){
  },
  watch:{
  },
  computed: {
    ...mapGetters([
      'signed',
      'storesRelation'
    ])
  },
  created() {
    const curruid = getUserId()
    const storeId = this.filingObject.id
    this.$store.dispatch('StoreSigned', { curruid, storeId })
    this.getRalationList()
  },
  watch:{
  },
  methods: {
    addNewStoreRalation(){},
    chioseCp(val){
      if('child' == val){
        this.zhuti = this.filingObject.storeTitle
      } else {
        this.zhuti = this.chioseRelationName
      }
    },
    findText(id){
      const signed = this.signed
      for(let s in signed){
        if(signed[s].id == id){
          return signed[s].storeTitle
        }
      }
    },
    chioseRelationId(val){
      this.chioseRelationName = this.findText(val)
      if('child' == this.formObj.relationType){
        this.zhuti = this.filingObject.storeTitle
      } else {
        this.zhuti = this.chioseRelationName
      }
    },
    addSubmit(){
      const storeId = this.filingObject.id
      const curruid = getUserId()
      this.formObj.storeId = storeId
      const relationVO = this.formObj
      this.$store.dispatch('AddStoreRalation', { curruid, storeId, relationVO }).then((data) => {
        if(data.status){
          this.$message({
            message: '新建成功！',
            type: 'success'
          });
          this.resetForm()
          this.getRalationList()
          this.dialogFormVisible = false
        } else {
          this.$message({
            message: data.err?data.err.msg:'发生不可抗力原因引起失败！',
            type: 'error'
          });
        }
      })
    },
    handremove(val,fileList){
      let fileLists= []
      for(let f in fileList){
        fileLists.push(fileList[f].name)
      }
      this.formObj.proveAttments  = fileLists.join(",");
    },
    handleChange(val,fileList){
      let fileLists= []
      for(let f in fileList){
        fileLists.push(fileList[f].name)
      }
      this.formObj.proveAttments  = fileLists.join(",");
    },
    getRalationList(){
      const storeId = this.filingObject.id
      const curruid = getUserId()
      this.$store.dispatch('GetRalationList', { curruid, storeId }).then((data) => {
        this.gridData = data.data
        console.log(data)
      })
    },
    deleteGuanxi(id){
      const storeId = this.filingObject.id
      const curruid = getUserId()
      this.xinLoading = true
      this.$store.dispatch('DeleteRatation', { curruid, storeId, id }).then((data) => {
        if(data.status){
          this.$message({
            message: '删除成功！',
            type: 'success'
          });
          this.xinLoading = false
          this.getRalationList()
        } else {
          this.$message({
            message: data.err?data.err.msg:'发生不可抗力原因引起失败！',
            type: 'error'
          });
        }
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
  .grid-content{
    margin:10px 0; 
  }
  #chef-ddf{
    span{
      margin-left:20px; 
    }
  }

</style>