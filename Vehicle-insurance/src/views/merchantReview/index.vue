<template>
  <div>
    <div class="app-container">
      <div class="container-header">
        <searchForm v-on:newObj='newObj' v-on:searchOn='search'/>
      </div>
      <el-table
       
        :data="results"
        element-loading-text="加载中。。。。。"
        border
        fit
        highlight-current-row>
        <el-table-column label="提交时间" min-width="190" align="center">
          <template slot-scope="scope">
            {{ scope.row.createDate }}
          </template>
        </el-table-column>
        <el-table-column label="订单编号" min-width="190" align="center">
          <template slot-scope="scope">
            {{ scope.row.orderNumber }}
          </template>
        </el-table-column>
        <el-table-column label="业务类型" min-width="190" align="center">
          <template slot-scope="scope">
            {{ scope.row.clientType | statusFilter}}
          </template>
        </el-table-column>
        <el-table-column label="提单人" min-width="100" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.applyName}}</span>
          </template>
        </el-table-column>
        <el-table-column label="下单电话" min-width="120" align="center">
          <template slot-scope="scope">
            {{ scope.row.applyMobile }}
          </template>
        </el-table-column>
        <el-table-column label="保单总金额" min-width="120" align="center">
          <template slot-scope="scope">
            {{ scope.row.totalPremium }}
          </template>
        </el-table-column>
        <el-table-column label="分期金额" min-width="120" align="center">
          <template slot-scope="scope">
            {{ scope.row.installmentTotalAmount}}
          </template>
        </el-table-column>
        <el-table-column label="分期数" min-width="120" align="center">
          <template slot-scope="scope">
            {{ scope.row.periodsFormt }}
          </template>
        </el-table-column>
        <el-table-column label="经纪人" min-width="120" align="center">
          <template slot-scope="scope">
            {{ scope.row.storeInfoName }}
          </template>
        </el-table-column>
        <el-table-column label="经纪人电话" min-width="120" align="center">
          <template slot-scope="scope">
            {{ scope.row.agentMobile }}
          </template>
        </el-table-column>
        <el-table-column label="订单状态" min-width="120" align="center">
          <template slot-scope="scope">
            {{ scope.row.mainState | orderStatusFilter}}
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
            <el-button type="text" size="small"  @click="openDiaLoag(4,scope.row)" >还款计划</el-button>
            <el-button type="text" size="small"  @click="openDiaLoag(5,scope.row)" >订单详情</el-button>
            <!-- <el-button type="text" size="small"  @click="openDiaLoag(3,scope.row)" >商户资料</el-button>
            <el-button type="text" size="small" v-if="scope.row.storeState!=='RISK_AUDITING'&&scope.row.storeState!=='INSPECT_COMMERCIAL_AUDITING'" @click="openDiaLoag(2,scope.row)" >审核记录</el-button>
            <el-button type="text" size="small" v-if="scope.row.storeState==='SIGNED'" @click="openDiaLoag(1,scope.row)" >切换签约人</el-button> -->
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
import searchForm from '@/common/searchForm'
import create from './create'
import { getToken, setToken, removeToken, setUserId, getUserId, getCommercialId } from '@/utils/auth'
import { tuancheType, orderStatus } from '@/utils/statusCode'
export default {
  components: {
    create,
    searchForm
  },
  filters: {
    statusFilter(val) {
      return tuancheType[val]
    },
    orderStatusFilter(val){
      return orderStatus[val]
    },

  },
  data() {
    return {
      list: [],
      cloading:true,
      qloading:true,
      dlistLoading: false,
      formObj:{},
      anctionName:'OrderList',
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
    this.isActive = false
    const userId = getUserId()
    const commercialId = getCommercialId()
    this.params = {curruid: userId, commercialId}
    this.getData()
    this.$store.dispatch('GetCityList', userId)
    this.$store.dispatch('SetSignsList', userId)
    this.isActive = !this.isActive

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
    newObj(){
      this.openDiaLoag(1,null)
    },
    search(params){
      console.log(params)
      this.params = params
      this.getData()
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss">
  .app-container{
    margin:10px 5px;
    .container-header{
      margin:0;
      button{
        float:right;
        margin-right:10px;
      }
    }
  }
  .teddd{
    .el-dialog{
      // overflow-y: auto;
      height: 800px;
    }
    .el-dialog__body{
      overflow-y: auto;
       height: 750px;
    }
  }
</style>