import { getUserId } from '@/utils/auth'
import { recordStatus, merchantType } from '@/utils/statusCode'
export default {
  data() {
    return {
      listLoading: false,
      pageNo: 1,
      pageSize: 10,
      results:null,
      params:null,
      formObj:{},
      total:120,
      dialogFlagKey1:false,
      dialogFlagKey2:false,
      dialogFlagKey3:false,
      dialogFlagKey4:false,
      row:null,
      dialogVisible:0,
      anctionName:'tertgert',
      filed:{
      }
    }
  },
  filters: {
    statusFilter(val) {
      return recordStatus[val]
    },
    merchantTypeFilter(val) {
      return merchantType[val]
    }
  },
  computed: {
    imgForm:function(){
      let imgFormToken = this.$store.state.commonData.imgToken
      return {
        token:imgFormToken
      }
    }
  },
  created() {
    // store.dispatch('incrementAsync', {
    //   amount: 10
    // })
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
    }
  },
  methods: {
    handleCurrentChange(val) {
      this.pageNo = val
      this.getData()
    },
    turnMsg(data){
      if(data.status){
        this.$message({
          message: '操作成功！',
          type: 'success'
        });
        this.resetForm()
        this.cancel1(true)
      } else {
        this.$message({
          message: data.err?data.err.msg:'发生不可抗力原因引起失败！',
          type: 'error'
        });
      }
    },
    turnMsg2(data){
      if(data.status){
        this.$message({
          message: '操作成功！',
          type: 'success'
        });
      } else {
        this.$message({
          message: data.err?data.err.msg:'发生不可抗力原因引起失败！',
          type: 'error'
        });
      }
      this.getData()
    },
    search() {
      this.pageNo = 1
      this.getData()
    },
    getRecords(){
      const curruid = getUserId()
      const id = this.filingObject.id
      this.dcLoading = true
      this.$store.dispatch('GetAccountRecords', {curruid, id}).then((data)=>{
        this.dcLoading = false
        this.detailList = data
      })
    },
    resetForm() {
      this.formObj = {}
    },
    getData() {
      if(this.formObj.time){
        this.formObj.startDate = this.formObj.time[0]
        this.formObj.endDate = this.formObj.time[1]
      }
      const anctionName = this.anctionName
      const pageObject = { pageNo: this.pageNo, pageSize: this.pageSize, curruid: getUserId()}
      const params = this.params
      const fordata = {...this.formObj};
      delete fordata.time
      const pm = Object.assign({}, params, pageObject, fordata)
      this.listLoading = true
      this.$store.dispatch(anctionName, pm).then((data) => {
        this.total = data.total
        this.pageNo =  data.pageNum
        this.pageSize = data.pageSize
        this.results = data.list
        this.listLoading = false
      })
    },
    dialogFlagKeyBackfoo(v){
      this.dialogVisible = v.code
      v.isLoad&&this.getData()
    },
    openDiaLoag(n,row) {
      console.log(n)
      this.dialogVisible = 0
      this.dialogVisible = n
      this.row = row||null
    },
    cancel1(isLoad=false){
      this.resetForm()
      this.listLoading = isLoad
      let msg = {isLoad:isLoad,code:0}
      this.$emit('dialogFlagKeyBackfoo', msg)
      this.dialogFlagKey1 = this.dialogFlagKey3= this.dialogFlagKey2= this.dialogFlagKey4=false
    },
  }
}