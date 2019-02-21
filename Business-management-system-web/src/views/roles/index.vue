<template>
  <div>
    
    <div class="app-container">
      <div class="container-header">
        <el-button type="primary" style="margin-bottom: 20px;" @click="openDiaLoag(1,null)">新建职务</el-button>
      </div>
      <el-table
        v-loading="listLoading"
        :data="results"
        element-loading-text="加载中。。。。。"
        border
        fit
        highlight-current-row>
        <el-table-column label="序号" min-width="260" align="center">
          <template slot-scope="scope">
            {{ scope.row.id }}
          </template>
        </el-table-column>
        <el-table-column label="名称" min-width="160" align="center">
          <template slot-scope="scope">
            {{ scope.row.roleName }}
          </template>
        </el-table-column>
        <el-table-column label="编码" min-width="230" align="center">
          <template slot-scope="scope">
            {{ scope.row.roleCode }}
          </template>
        </el-table-column>
        <el-table-column label="创建者" min-width="230" align="center">
          <template slot-scope="scope">
            {{ scope.row.creater }}
          </template>
        </el-table-column>
        <el-table-column label="创建时间" min-width="190" align="center">
          <template slot-scope="scope">
            {{ scope.row.createDate }}
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          min-width="200" align="center">
          <template slot-scope="scope">
            <!-- <el-button type="text" size="small" @click="openDiaLoag(1,scope.row)" v-if="scope.row.flowState==='WAIT_FOR_CONFIG'">修改</el-button>
            <el-button type="text" size="small" @click="openDiaLoag(2,scope.row)" v-if="scope.row.flowState==='WAIT_FOR_AUDIT'">删除</el-button> -->
            <el-button type="text" size="small" @click="openDiaLoag(2,scope.row)">删除</el-button>
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
      anctionName:'SetRoles',
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
    this.$store.dispatch('SetRolesTree', {curruid:userId})
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