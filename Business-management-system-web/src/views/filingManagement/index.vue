<template>
  <div>
    <div class="app-container">
      <div class="container-header">
        <el-form :inline="true" :model="formObj" class="demo-form-inline">
          <el-select v-model="formObj.status" clearable placeholder="请选择备案状态" label="   ">
            <el-option
              v-for="item in filingStatus"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-form-item label=" ">
            <el-input v-model="formObj.storeTitle" placeholder="商户名称"></el-input>
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
            <el-button type="info" @click="resetForm">清空</el-button>
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
        <el-table-column label="商户名称" min-width="190" align="center">
          <template slot-scope="scope">
            {{ scope.row.storeTitle }}
          </template>
        </el-table-column>
        <el-table-column label="资方" min-width="100" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.capitalName}}</span>
          </template>
        </el-table-column>
        <el-table-column label="备案状态" min-width="120" align="center">
          <template slot-scope="scope">
            {{ scope.row.status | statusFilter }}
          </template>
        </el-table-column>
        <el-table-column label="经营城市" min-width="120" align="center">
          <template slot-scope="scope">
            {{ scope.row.managerCity }}
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
        <el-table-column label="团队负责人" min-width="120" align="center">
          <template slot-scope="scope">
            {{ scope.row.leaderName }}
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          min-width="200" align="center">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="openDiaLoag(1,scope.row)" v-if="scope.row.status==='UNRECORD'">发起备案</el-button>
            <el-button type="text" size="small" @click="openDiaLoag(3,scope.row)" v-if="scope.row.status==='RECORDING'">备案失败</el-button>
            <el-button type="text" size="small" @click="openDiaLoag(2,scope.row)" v-if="scope.row.status==='RECORDING'">备案成功</el-button>
            <el-button type="text" size="small" @click="openDiaLoag(5,scope.row)" v-if="scope.row.status==='FAILURE'">重新发起</el-button>
            <el-button type="text" size="small" @click="openDiaLoag(4,scope.row)" v-if="scope.row.status==='FAILURE'||scope.row.status==='RECORDED'">备案记录</el-button>
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
export default {
  components: {
    create
  },
  data() {
    return {
      list: [],
      cloading:true,
      qloading:true,
      dlistLoading: false,
      formObj:{},
      anctionName:'SetRecord',
    }
  },
  extends: baseComponents,
  computed: {
  // 使用对象展开运算符将 getter 混入 computed 对象中
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
    let userId = getUserId()
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