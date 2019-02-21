<template>
  <div>
    <div class="app-container">
      <div class="container-header">
        <el-form :inline="true" :model="formObj" class="demo-form-inline">
          <el-form-item label=" ">
            <el-input v-model="formObj.name" placeholder="输入员工姓名或电话"></el-input>
          </el-form-item>
          <el-form-item label=" ">
            <el-button type="info" @click="resetForm">清空</el-button>
            <el-button type="primary" @click="search">查询</el-button>
          </el-form-item>
          <el-button type="success"  @click="openDiaLoag(1,null)">添加</el-button>
        </el-form>
      </div>
      <el-table
        v-loading="listLoading"
        :data="results"
        border
        fit
        highlight-current-row
        element-loading-text="加载中。。。。。">
        <el-table-column label="员工姓名"  align="center">
          <template slot-scope="scope">
            {{ scope.row.name }}
          </template>
        </el-table-column>
        <el-table-column label="联系电话"  align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.mobile }}</span>
          </template>
        </el-table-column>
        <el-table-column label="数据权限类型"  align="center">
          <template slot-scope="scope">
            {{ scope.row.leaderName }}
          </template>
        </el-table-column>

        <el-table-column label="账号状态"  align="center">
          <template slot-scope="scope">
            {{ scope.row.status | stateFilter }}
          </template>
        </el-table-column>
        <el-table-column label="创建时间"  align="center">
          <template slot-scope="scope">
            {{ scope.row.createTime }}
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
           align="center">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="openDiaLoag(2,scope.row)">编辑</el-button>
            <el-button type="text" size="small" @click="openDiaLoag(3,scope.row)"><span style="color:red">离职</span></el-button>
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
import { getCommercialId, getUserId } from '@/utils/auth'
export default {
  components: {
    create,
    searchForm
  },
  filters: {
    stateFilter(val) {
      return val === '0' ? '无效' : '有效'
    },
    roles(list){
      const array = []
      for(let i in list){
        array.push(list[i].roleName)
      }
      return array.join("|");
    }
  },
  data() {
    return {
      list: [],
      cloading:true,
      qloading:true,
      dlistLoading: false,
      formObj:{},
      anctionName:'GetUserList',
    }
  },
  extends: baseComponents,
  computed: {
    ...mapGetters([
      'roleList'
    ])
  },
  created() {
    this.isActive = false
    const userId = getUserId()
    const commercialId = getCommercialId()
    this.params = {userId, commercialId} 
    this.getData()
  },
  watch:{
  },
  methods: {
    handleClick(row) {
      console.log(row);
    },
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
.table-fixed {
  .el-table__fixed-right {
  height: 100% !important; //设置高优先，以覆盖内联样式
  }
}
</style>