<template>
  <div>
    
    <div class="app-container">
      <div class="container-header">
        <el-form :inline="true" :model="formObj" class="demo-form-inline">
          <el-select v-model="formObj.status" clearable placeholder="请选择备案状态" label="   ">
            <el-option
              v-for="item in filingTree"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-form-item label=" ">
            <el-input v-model="formObj.people" placeholder="商户名称、联系人"></el-input>
          </el-form-item>
          <el-select v-model="formObj.cityt" clearable placeholder="选择城市" label="   ">
            <el-option
              v-for="g in cityList"
              :key="g.value"
              :label="g.label"
              :value="g.value">
            </el-option>
          </el-select>
          <el-select v-model="formObj.shangpele" clearable placeholder="选择签约人" label="   ">
            <el-option
              v-for="item in contractors"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-select v-model="formObj.storeType" clearable placeholder="商户类型" label="   ">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-form-item label=" ">
            <el-button type="info">清空</el-button>
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-table
        v-loading="listLoading"
        :data="employees.list"
        element-loading-text="加载中。。。。。"
        border
        fit
        highlight-current-row>
        <el-table-column align="center" label="序号" >
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
          <el-button type="text" size="small" @click="openDiaLoag(1)">发起备案</el-button>
          <el-button type="text" size="small" @click="openDiaLoag(4)">备案记录</el-button>
          <el-button type="text" size="small" @click="openDiaLoag(1)">重新发起</el-button>
          <el-button type="text" size="small" @click="openDiaLoag(2)">备案成功</el-button>
          <el-button type="text" size="small" @click="openDiaLoag(3)">备案失败</el-button>
        </template>
      </el-table-column>
      </el-table>
      <div class="pagertion">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="pageNo"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
      <create :dialogFlagKeyfoo="dialogVisible" v-on:dialogFlagKeyBackfoo='dialogFlagKeyBackfoo'></create>
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
      dialogVisible:0,
      value4:3,
      formObj:{
        cityt:null,
        people:null,
        shangType:null,
        shangpele:null,
        status:null
      },
      formInline:{
        user:434,
        region:333
      },
      options:[
        {
          label:'待备案',
          value:'dfr'
        },
        {
          label:'发起备案',
          value:'33'
        },
        {
          label:'备案中',
          value:'dfr4'
        }
      ],
      filingTree:[
        {
          label:'待备案',
          value:'dfr'
        },
        {
          label:'发起备案',
          value:'33'
        },
        {
          label:'备案中',
          value:'dfr4'
        },
        {
          label:'备案通过',
          value:'dfr5'
        },
        {
          label:'已备案',
          value:'df6r'
        },
        {
          label:'备案失败',
          value:'1dfr'
        }
      ]
    }
  },
  extends: baseComponents,
  computed: {
  // 使用对象展开运算符将 getter 混入 computed 对象中
    ...mapGetters([
      'employees',
      'cityList',
      'contractors',
      'banks',
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
    dialogFlagKeyBackfoo(v){
      this.dialogVisible = v
    },  
    onSubmit(){
      console.log(555);
    },
    openDiaLoag(n) {
      this.dialogVisible = 0
      this.dialogVisible = n
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
        margin:0 10px;
      }
    }
  }
</style>