import { getUserId, getCommercialId } from '@/utils/auth'
import { recordStatus, merchantType } from '@/utils/statusCode'
export default {
  data() {
    return {
      listLoading: false,
      pageNo: 1,
      pageSize: 10,
      results:null,
      params:null,
      isActive:true,
      formObj:{},
      imageUrl: '',
      total:120,
      imgForm:{},
      dialogFlagKey1:false,
      dialogFlagKey2:false,
      dialogFlagKey3:false,
      dialogFlagKey4:false,
      dialogFlagKey5:false,
      dialogFlagKey6:false,
      dialogFlagKey7:false,
      dialogFlagKey8:false,
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
  // computed: {
  //   imgForm:function(){
  //     let imgFormToken = this.$store.state.user.imgToken
  //     const time = new Date()
  //     return {
  //       token:imgFormToken,
  //       key:'upload/image/'+ time.toLocaleDateString().split('/').join('-') +
  //       '/' + time.getHours()+'_' + time.getMinutes()+'_' +time.getSeconds()+
  //       '/'+Number(Math.random().toString().substr(3,length) + Date.now()).toString(36)
  //     }
  //   }
  // },
  mounted(){
    const that = this
    setInterval(()=>{
      let imgFormToken = that.$store.state.user.imgToken
      const time = new Date()
      that.imgForm = {
        token:imgFormToken,
        key:'upload/image/'+ time.toLocaleDateString().split('/').join('-') +
        '/' + time.getHours()+'_' + time.getMinutes()+'_' +time.getSeconds()+
        '/'+Number(Math.random().toString().substr(3,length) + Date.now()).toString(36)
      }
    },1000)
  },
  created() {
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
      this.pageSize = 10
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
      const pageObject = { pageNo: this.pageNo, pageSize: this.pageSize, curruid: getUserId(),commercialId: getCommercialId()}
      const params = this.params
      const fordata = {...this.formObj};
      const pm = Object.assign({}, params, pageObject, fordata)
      delete pm.time
      this.listLoading = true
      this.$store.dispatch(anctionName, pm).then((data) => {
        this.total = data.total
        this.pageNo =  data.pageNum
        this.pageSize = data.pageSize==0?10:data.pageSize
        this.results = data.list
        this.listLoading = false
      })
    },
    dialogFlagKeyBackfoo(v){
      this.dialogVisible = v.code
      v.isLoad&&this.getData()
    },
    openDiaLoag(n,row) {
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
    handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      // const isJPG = file.type === 'image/jpeg';
      // const isLt2M = file.size / 1024 / 1024 < 2;

      // if (!isJPG) {
      //   this.$message.error('上传头像图片只能是 JPG 格式!');
      // }
      // if (!isLt2M) {
      //   this.$message.error('上传头像图片大小不能超过 2MB!');
      // }
      // return isJPG && isLt2M;
    }
  }
}