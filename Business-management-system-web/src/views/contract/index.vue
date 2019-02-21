<template>
  <div>
    <div class="app-container">
      <div class="container-header">
        <el-form :inline="true" :model="formObj" class="demo-form-inline">
          <el-form-item label=" ">
            <el-date-picker
              v-model="formObj.time"
              type="daterange"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label=" ">
            <el-input v-model="formObj.storeTitle" placeholder="商户名称、合同编号"></el-input>
          </el-form-item>
          <el-select v-model="formObj.manageCity" clearable placeholder="选择城市" label="   " :loading="cloading">
            <el-option
              v-for="g in cityList"
              :key="g.value"
              :label="g.label"
              :value="g.value">
            </el-option>
          </el-select>
          <el-select v-model="formObj.signId" clearable placeholder="选择签约人" label="   " :loading="qloading">
            <el-option
              v-for="item in signs"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-select v-model="formObj.storeType" clearable placeholder="商户类型" label="   ">
            <el-option
              v-for="item in jiazu"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          
          <el-form-item label=" ">
            <el-button type="info"  @click="resetForm">清空</el-button>
            <el-button type="primary" @click="search">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-table
        v-loading="listLoading"
        :data="results"
        element-loading-text="加载中。。。。。"
        border
        fit
        highlight-current-row>
        <el-table-column label="合同编号" min-width="190" align="center">
          <template slot-scope="scope">
            {{ scope.row.contractNo }}
          </template>
        </el-table-column>
        <el-table-column label="签约时间" min-width="190" align="center">
          <template slot-scope="scope">
            {{ scope.row.signDate }}
          </template>
        </el-table-column>
        <el-table-column label="商户名称" min-width="100" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.storeTitle}}</span>
          </template>
        </el-table-column>
        <el-table-column label="商户类型" min-width="120" align="center">
          <template slot-scope="scope">
            {{ scope.row.storeType | merchantTypeFilter }}
          </template>
        </el-table-column>
        <el-table-column label="经营城市" min-width="120" align="center">
          <template slot-scope="scope">
            {{ scope.row.manageCity }}
          </template>
        </el-table-column>
        <el-table-column label="所属大区" min-width="120" align="center">
          <template slot-scope="scope">
            {{ scope.row.areaName }}
          </template>
        </el-table-column>
        <el-table-column label="签约人" min-width="120" align="center">
          <template slot-scope="scope">
            {{ scope.row.signPerson }}
          </template>
        </el-table-column>
        <el-table-column label="合同状态" min-width="120" align="center">
          <template slot-scope="scope">
            {{ scope.row.contractState | contractStatusFilter}}
          </template>
        </el-table-column>
        <el-table-column label="合作状态" min-width="120" align="center">
          <template slot-scope="scope">
            {{ scope.row.coopState | coopStateStatusFilter}}
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          min-width="200" align="center">
          <template slot-scope="scope">
            <el-button type="text" size="small"  @click="openDiaLoag(1,scope.row)" >查看</el-button>
            <el-button type="text" size="small" v-if="'REJECT'===scope.row.contractState||'FILE_SAVED'===scope.row.contractState
            &&'SIGNED'===scope.row.coopState||scope.row.contractState==='WAIT_FOR_SAVE_FILE'" 
            @click="openDiaLoag(3,scope.row)" >校对记录</el-button>
            <el-button type="text" size="small" v-if="scope.row.contractState==='WAIT_FOR_SAVE_FILE'" @click="openDiaLoag(2,scope.row)" >归档</el-button>
            <el-button type="text" size="small" v-if="scope.row.contractState==='FILE_SAVED'&&scope.row.coopState==='SIGNED'" @click="exportFiles(scope.row)" >导出</el-button>
            <el-button type="text" size="small" v-if="scope.row.contractState==='FILE_SAVED'&&scope.row.coopState==='SIGNED'" 
            @click="changeStatus(scope.row,'RELIEVE_SIGN')" >解约</el-button>
            <el-button type="text" size="small" v-if="scope.row.contractState==='FILE_SAVED'&&scope.row.coopState==='SIGNED'" 
            @click="changeStatus(scope.row,'FREEZE')" >冻结</el-button>
            <el-button type="text" size="small" v-if="scope.row.contractState==='FILE_SAVED'&&scope.row.coopState==='FROZE'" 
            @click="changeStatus(scope.row,'RECOVER')" >恢复</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagertion">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="pageNo"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="10"
          layout="sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
      <create :dialogFlagKeyfoo="dialogVisible" :filingObject="row" v-on:dialogFlagKeyBackfoo='dialogFlagKeyBackfoo'></create>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import baseComponents from '@/common/base.js'
import create from './create'
import { getUserId } from '@/utils/auth'
import { merchantType, contractStatus, hezuoStatus } from '@/utils/statusCode'
export default {
  components: {
    create
  },
  data() {
    return {
      list: [],
      cloading:true,
      guanxi:[{
        label:'是',
        value:true
      },{
        label:'无',
        value:false
      }],
      qloading:true,
      dlistLoading: false,
      formObj:{},
      anctionName:'SetContract',
    }
  },
  filters: {
    merchantTypeFilter(val) {
      return merchantType[val]
    },
    contractStatusFilter(val) {
      return contractStatus[val]
    },
    coopStateStatusFilter(val){
      return hezuoStatus[val]
    }
  },
  extends: baseComponents,
  computed: {
    ...mapGetters([
      'record',
      'userInfo',
      'filingStatus',
      'cityList',
      'signs',
      'jiazu'
      // ...
    ])
  },
  created() {
    const userId = getUserId()
    this.params = {curruid: userId}
    this.getData()
    this.$store.dispatch('GetCityList', userId)
    this.$store.dispatch('SetSignsList', userId)
  },
  watch:{
    cityList:function(val){
      if(val){
        this.cloading=false
      }
    },
    signs:function(val){
      if(val){
        this.qloading=false
      }
    }
  },
  methods: {
    createRole() {
      this.dialogVisible = true
    },
    exportFiles(val){
      window.open(val.archiveUrl)
    },
    changeStatus(val,event){
      const curruid = getUserId()
      const id = val.id
      this.$store.dispatch('ChangeStatus', {curruid, id, event:event}).then((data)=>{
        this.turnMsg2(data)
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
        margin-right:10px;
      }
    }
  }
</style>