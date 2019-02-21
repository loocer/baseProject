<template>
  <div>
    <el-dialog title="收货地址" :visible.sync="dialogFlag">
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFlag = false">取 消</el-button>
          <el-button type="primary" @click="dialogFlag = false">确 定</el-button>
        </div>
      </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import baseComponents from '@/common/base.js'
export default {
  props: {
    dialogFlag:Boolean
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
      anctionName:'SetEmployee'
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