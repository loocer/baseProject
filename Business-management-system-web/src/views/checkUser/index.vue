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
        <el-table-column label="发起日期" min-width="150" align="center">
          <template slot-scope="scope">
            {{ scope.row.sendTime }}
          </template>
        </el-table-column>
        <el-table-column label="商户名称" min-width="230" align="center">
          <template slot-scope="scope">
            {{ scope.row.storeTitle }}
          </template>
        </el-table-column>
        <el-table-column label="经营城市" min-width="190" align="center">
          <template slot-scope="scope">
            {{ scope.row.manageCity }}
          </template>
        </el-table-column>
        <el-table-column label="联系人" min-width="100" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.dutyPerson}}</span>
          </template>
        </el-table-column>
        <el-table-column label="联系电话" min-width="100" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.dutyMobile}}</span>
          </template>
        </el-table-column>
        <el-table-column label="商户类型" min-width="100" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.storeType | merchantTypeFilter }}</span>
          </template>
        </el-table-column>
        <el-table-column label="尽调状态" min-width="100" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.updateTime}}</span>
          </template>
        </el-table-column>
        <el-table-column label="尽调人" min-width="100" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.inspectUserName}}</span>
          </template>
        </el-table-column>
        <el-table-column label="审核完成时间" min-width="100" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.checkedTime}}</span>
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          min-width="200" align="center">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="openDiaLoag(1,scope.row)">报告审核</el-button>
            <el-button type="text" size="small" @click="openDiaLoag(2,scope.row)">商户资料</el-button>
            <el-button type="text" size="small" @click="openDiaLoag(3,scope.row)">审核记录</el-button>
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
import { merchantType } from '@/utils/statusCode'
export default {
  components: {
    create
  },
  filters: {
    merchantTypeFilter(val) {
      return merchantType[val]
    }
  },
  data() {
    return {
      list: [],
      cloading:true,
      qloading:true,
      dlistLoading: false,
      formObj:{},
      anctionName:'SetInspects',
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