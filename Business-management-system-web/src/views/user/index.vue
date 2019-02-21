<template>
  <div>
    <div class="app-container">
      <div class="container-header">
        <el-form :inline="true" :model="formObj" class="demo-form-inline">
          <el-form-item label=" ">
            <el-input v-model="formObj.realname" placeholder="姓名"></el-input>
          </el-form-item>
          <el-select v-model="formObj.roleid" clearable placeholder="选择角色" label="   " :loading="roleList.length==0">
            <el-option
              v-for="g in roleList"
              :key="g.id"
              :label="g.roleName"
              :value="g.id">
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
        <el-table-column label="序号" min-width="190" align="center">
          <template slot-scope="scope">
            {{ scope.row.id }}
          </template>
        </el-table-column>
        <el-table-column label="姓名" min-width="100" align="center">
          <template slot-scope="scope">
            {{ scope.row.realName }}
          </template>
        </el-table-column>
        <el-table-column label="联系电话" min-width="100" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.mobile }}</span>
          </template>
        </el-table-column>
        <el-table-column label="e-mail" min-width="120" align="center">
          <template slot-scope="scope">
            {{ scope.row.email }}
          </template>
        </el-table-column>
        <el-table-column label="团队负责人" min-width="90" align="center">
          <template slot-scope="scope">
            {{ scope.row.leaderName }}
          </template>
        </el-table-column>
        <el-table-column label="角色" min-width="120" align="center">
          <template slot-scope="scope">
            {{ scope.row.roles | roles }}
          </template>
        </el-table-column>
        <el-table-column label="状态" min-width="60" align="center">
          <template slot-scope="scope">
            {{ scope.row.status | stateFilter }}
          </template>
        </el-table-column>
        <el-table-column label="创建时间" min-width="120" align="center">
          <template slot-scope="scope">
            {{ scope.row.createDate }}
          </template>
        </el-table-column>
        <el-table-column label="更新时间" min-width="120" align="center">
          <template slot-scope="scope">
            {{ scope.row.updateDate }}
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          min-width="100" align="center">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="openDiaLoag(1,scope.row)">编辑</el-button>

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
    let userId = getUserId()
    this.getData()
    this.$store.dispatch('GetCityList', userId)
    this.$store.dispatch('SetSignsList', userId)
    this.$store.dispatch('GetAreasTree', userId)
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