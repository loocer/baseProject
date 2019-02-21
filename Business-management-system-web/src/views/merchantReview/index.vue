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
          <el-select v-model="formObj.isConnect" clearable placeholder="是否存在关联关系" label="   " :loading="qloading">
            <el-option
              v-for="item in guanxi"
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
            <el-input v-model="formObj.storeTitle" placeholder="商户名称"></el-input>
          </el-form-item>
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
        <el-table-column label="申请时间" min-width="190" align="center">
          <template slot-scope="scope">
            {{ scope.row.createDate }}
          </template>
        </el-table-column>
        <el-table-column label="商户名称" min-width="190" align="center">
          <template slot-scope="scope">
            {{ scope.row.storeTitle }}
          </template>
        </el-table-column>
        <el-table-column label="经营城市" min-width="190" align="center">
          <template slot-scope="scope">
            {{ scope.row.manageCity }}
          </template>
        </el-table-column>
        <el-table-column label="所属大区" min-width="100" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.areaName}}</span>
          </template>
        </el-table-column>
        <el-table-column label="商户类型" min-width="120" align="center">
          <template slot-scope="scope">
            {{ scope.row.storeType | statusFilter }}
          </template>
        </el-table-column>
        <el-table-column label="签约人" min-width="120" align="center">
          <template slot-scope="scope">
            {{ scope.row.signName }}
          </template>
        </el-table-column>
        <el-table-column label="团队负责人" min-width="120" align="center">
          <template slot-scope="scope">
            {{ scope.row.leaderName }}
          </template>
        </el-table-column>
        <el-table-column label="商户状态" min-width="120" align="center">
          <template slot-scope="scope">
            {{ scope.row.storeState | storeStatusFilter }}
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          min-width="200" align="center">
          <template slot-scope="scope">
            <!-- <el-button type="text" size="small" @click="openDiaLoag(1,scope.row)" v-if="scope.row.status==='UNRECORD'">商户资料</el-button>
            <el-button type="text" size="small" @click="openDiaLoag(3,scope.row)" v-if="scope.row.status==='RECORDING'">修改</el-button>
            <el-button type="text" size="small" @click="openDiaLoag(2,scope.row)" v-if="scope.row.status==='RECORDING'">审核记录</el-button>
            <el-button type="text" size="small" @click="openDiaLoag(1,scope.row)" v-if="scope.row.status==='FAILURE'">商户资料</el-button>
            <el-button type="text" size="small" @click="openDiaLoag(4,scope.row)" v-if="scope.row.status==='FAILURE'||scope.row.status==='RECORDED'">恢复</el-button> -->
            <el-button type="text" size="small"  @click="openDiaLoag(3,scope.row)" >商户资料</el-button>
            <el-button type="text" size="small" v-if="scope.row.storeState!=='RISK_AUDITING'&&scope.row.storeState!=='INSPECT_COMMERCIAL_AUDITING'" @click="openDiaLoag(2,scope.row)" >审核记录</el-button>
            <el-button type="text" size="small" v-if="scope.row.storeState==='SIGNED'" @click="openDiaLoag(1,scope.row)" >切换签约人</el-button>
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
import { getToken, setToken, removeToken, setUserId, getUserId } from '@/utils/auth'
import { merchantType, storeStatus } from '@/utils/statusCode'
export default {
  components: {
    create
  },
  filters: {
    statusFilter(val) {
      return merchantType[val]
    },
    storeStatusFilter(val){
      return storeStatus[val]
    }
  },
  data() {
    return {
      list: [],
      cloading:true,
      qloading:true,
      dlistLoading: false,
      formObj:{},
      anctionName:'SetStoreList',
      guanxi:[{
        value:true,
        label:'有关联关系'
      },{
        value:false,
        label:'无关联关系'
      }]
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
    handleClick(row) {
      console.log(row);
    },
    createRole() {
      this.dialogVisible = true
    },
    onSubmit(){

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
        margin-right:10px;
      }
    }
  }
</style>