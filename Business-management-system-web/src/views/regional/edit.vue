<template>
  <div v-if="listLoading">
    <el-dialog title="发起备案" :visible.sync="dialogFlagKey1" width="400px" :before-close="cancel1" center>
      <div>
        <el-form>
          <el-form-item label=" 银行账户">
            <el-select v-model="bank" clearable placeholder="选择城市" label="银行账户">
              <el-option
                v-for="item in banks"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel1">取 消</el-button>
        <el-button type="primary" @click="dialogFlagKey = false">发起备案</el-button>
      </div>
    </el-dialog>
    <el-dialog title="确定已通过备案吗？" :visible.sync="dialogFlagKey2" :before-close="cancel1" :show-close="false" width="260px" center>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel1">取 消</el-button>
        <el-button type="primary" @click="fllingSucces">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog  :visible.sync="dialogFlagKey4" :before-close="cancel1" width="700px" :show-close="false">
      <h1 style="text-align: center">备案记录</h1>
      <el-table :data="gridData">
        <el-table-column property="date" label="发起时间" width="150"></el-table-column>
        <el-table-column property="name" label="审核人" width="200"></el-table-column>
        <el-table-column property="fdf" label="审核状态" width="200"></el-table-column>
        <el-table-column property="address" label="审核信息"></el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel1">关闭</el-button>
      </div>
    </el-dialog>
    <el-dialog title="备案失败" :visible.sync="dialogFlagKey3" :before-close="cancel1" width="400px">
      <span>失敗原因：</span>
      <el-input
        type="textarea"
        :rows="4"
        placeholder="请输入内容"
        v-model="textarea">
      </el-input>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel1">取 消</el-button>
        <el-button type="primary" @click="dialogFlagKey = false">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import baseComponents from '@/common/base.js'
export default {
  props: {
    dialogFlag:Boolean,
    dialogFlagKeyfoo:Number
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
      dialogFlagKey1:false,
      bank:null,
      dialogFlagKey2:false,
      textarea:'rerr',
      dialogFlagKey3:false,
      gridData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          fdf:4234234
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          fdf:4234234
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          fdf:4234234
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          fdf:4234234
        }],
    }
  },
  extends: baseComponents,
  computed: {
  // 使用对象展开运算符将 getter 混入 computed 对象中
    ...mapGetters([
      'employees',
      'banks'
      // ...
    ])
  },
  mounted:function(){
  },
  watch:{
    dialogFlagKeyfoo:function(a){
      a&&(this.listLoading = true)
      this.dialogFlagKey1 = this.dialogFlagKey2 = this.dialogFlagKey3 = this.dialogFlagKey4 =false
      switch(a)
      {
        case 1:
          this.dialogFlagKey1 = true
        break;
        case 2:
          this.dialogFlagKey2 = true
        break;
        case 3:
          this.dialogFlagKey3 = true
          break;
        case 4:
          this.dialogFlagKey4 = true
      }
      // this.$emit('dialogFlagKeyBackfoo', a)
    }
  },
  created() {
    this.getData()
  },
  methods: {
    fllingSucces(){
      alert('确认铜鼓偶尔变')
    },
    handleClick(row) {
      console.log(row);
    },
    cancel1(){
      this.listLoading = false
      this.$emit('dialogFlagKeyBackfoo', 0)
      this.dialogFlagKey1 = this.dialogFlagKey3= this.dialogFlagKey2= this.dialogFlagKey4=false
    },
    cancel(){
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