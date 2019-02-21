<template>
  <div>
    
    <div class="app-container">
      <div class="container-header"><span>职务管理</span><el-button type="primary" v-on:click="createRole">创建角色</el-button></div>
      <el-table
        v-loading="listLoading"
        :data="employees.list"
        element-loading-text="加载中。。。。。"
        border
        fit
        highlight-current-row>
        <el-table-column align="center" label="序号" min-width="200">
          <template slot-scope="scope">
            {{ scope.$index }}
          </template>
        </el-table-column>
        <el-table-column label="名称" min-width="100" align="center">
          <template slot-scope="scope">
            {{ scope.row.cl1 }}
          </template>
        </el-table-column>
        <el-table-column label="编码" min-width="150" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.cl2 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="创建者" min-width="120" align="center">
          <template slot-scope="scope">
            {{ scope.row.cl3 }}
          </template>
        </el-table-column>
        <el-table-column label="创建时间" min-width="180" align="center">
          <template slot-scope="scope">
            {{ scope.row.cl4 }}
          </template>
        </el-table-column>
        <el-table-column
        fixed="right"
        label="操作"
        min-width="200" align="center">
        <template slot-scope="scope">
          <el-button type="text" size="small">编辑</el-button>
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
      <create :dialogFlag="dialogVisible"></create>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import baseComponents from '@/common/base.js'
import create from './create'
export default {
  components: {
    create
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: [],
      listLoading: false,
      swwww:4444444444444444,
      anctionName:'SetEmployee',
      dialogVisible:false
    }
  },
  extends: baseComponents,
  computed: {
  // 使用对象展开运算符将 getter 混入 computed 对象中
    ...mapGetters([
      'employees'
      // ...
    ])
  },
  created() {
    this.getData()
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
      }
    }
  }
</style>