<template>
  <div>
    <div class="app-container">
      <div class="container-header">
        <el-button type="primary" style="margin-bottom: 20px;" @click="openDiaLoag(1,null)">新建区域</el-button>
      </div>
      <el-table
        v-loading="listLoading"
        :data="results"
        element-loading-text="加载中。。。。。"
        border
        fit
        highlight-current-row>
        <el-table-column label="序号" min-width="100" align="center">
          <template slot-scope="scope">
            {{ scope.row.id }}
          </template>
        </el-table-column>
        <el-table-column label="区域名称" min-width="230" align="center">
          <template slot-scope="scope">
            {{ scope.row.name }}
          </template>
        </el-table-column>
        <el-table-column label="创建时间" min-width="190" align="center">
          <template slot-scope="scope">
            {{ scope.row.createTime }}
          </template>
        </el-table-column>
        <el-table-column label="更新时间" min-width="100" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.updateTime}}</span>
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          min-width="200" align="center">
          <template slot-scope="scope">
            <!-- <el-button type="text" size="small" @click="openDiaLoag(1,scope.row)" v-if="scope.row.flowState==='WAIT_FOR_CONFIG'">修改</el-button>
            <el-button type="text" size="small" @click="openDiaLoag(2,scope.row)" v-if="scope.row.flowState==='WAIT_FOR_AUDIT'">删除</el-button> -->
            <el-button type="text" size="small" @click="openDiaLoag(2,scope.row)">修改</el-button>
            <el-button type="text" size="small" @click="openDiaLoag(3,scope.row)">删除</el-button>
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
import { storeAccountState } from '@/utils/statusCode'
export default {
  components: {
    create
  },
  filters: {
    storeAccountStateFilter(val) {
      return storeAccountState[val]
    }
  },
  data() {
    return {
      list: [],
      cloading:true,
      qloading:true,
      dlistLoading: false,
      formObj:{},
      anctionName:'GetAreaList',
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