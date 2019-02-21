<template>
  <div>
    <div class="search-container">
        <div class="status-bar" v-if="searchButton.length">
          <el-row>
            <template v-for="(item, index) in searchButton">
              <el-button v-if="status===item.code" type="primary">{{item.text}}</el-button>
              <el-button v-if="status!==item.code" v-on:click="chioseStatus(item.code)">{{item.text}}</el-button>
            </template>
          </el-row>
        </div>
        <el-form :inline="true" :model="searchValidateForm" class="demo-form-inline" ref="searchValidateForm" v-if="searchForm.length">
          <template v-for="(item, index) in searchForm">
            <el-form-item label=" " v-if="item==='time'">
              <el-date-picker
                v-model="searchValidateForm.startDate"
                type="daterange"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item label=" " v-if="item==='mobile'">
              <el-input width="150px;" v-model="searchValidateForm.keyword" placeholder="请输入订单号、姓名、电话或地址查询"></el-input>
            </el-form-item>
          </template>
          <el-form-item label=" ">
            <template v-for="(item, index) in formButtons">
              <el-button type="info" v-if="item==='clear'" @click="resetForm('searchValidateForm')">清空</el-button>
<!--               <el-button type="primary" v-if="item==='export'" @click="onExport">导出</el-button>
              <el-button type="success" v-if="item==='packageLoan'" @click="onListPeriod">打包放款</el-button> -->
              <el-button type="primary" v-if="item==='search'"  @click="onSubmit">查询</el-button>
            </template>
          </el-form-item>
          <el-button type="success" @click="openg()" icon="el-icon-plus">添加</el-button>
        </el-form>
      </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import baseComponents from '@/common/base.js'
export default {
  components: {
  },
  props: {
    filed:Object,
  },
  data() {
    return {
      status:null,
      value6:434,
      searchValidateForm:{
      },
      stee:434,
      buttons:[
        {code:null,text:"全部"},
        {code:"user_order_auditing",text:"订单审核中"},
        {code:"user_order_canceled",text:"订单已取消"},
        {code:"user_order_created",text:"待填写"},
        {code:"user_order_loaning",text:"放款中"},
        {code:"user_order_overdue",text:"已逾期"},
        {code:"user_order_paid_off",text:"已结清"},
        {code:"user_order_rejected",text:"订单已拒绝"},
        {code:"user_order_repayment",text:"还款中"},
        {code:"user_order_turn_down_to_user",text:"待修改"},
        {code:"user_order_to_credit",text:"待授信"},
        {code:"user_order_crediting",text:"授信结果处理中"},
        {code:"user_order_to_loan",text:"待申请分期"},
        {code:"user_order_surrender",text:"已退保"},
      ],
      forms:[
        'time',
        'mobile',
        'title',
      ],
      formButton:[
        'packageLoan',
        'export',
        'clear',
        'search',
      ]
    }
  },
  extends: baseComponents,
  computed: {
    searchButton(){
      let filed = this.filed
      let buttons = this.buttons
      if(!filed||!filed.buttons){
        return buttons
      }else {
        return filed.buttons
      }
    },
    searchForm(){
      let filed = this.filed
      let forms = this.forms
      if(!filed||!filed.forms){
        return forms
      }else {
        return filed.forms
      }
    },
    formButtons(){
      let filed = this.filed
      let formButton = this.formButton
      if(!filed||!filed.formButton){
        return formButton
      }else {
        return filed.formButton
      }
    },
    options(){
      let list =[]
      for(let i =1;i<12;i++){
        list.push({
            value: i,
            label: i +'期'
        })
      }
      return list
    }
  },
  created() {
  },
  watch:{
  },
  methods: {
    formatData(){
      if(this.searchValidateForm.time){
        this.searchValidateForm.startDate = this.searchValidateForm.time[0]
        this.searchValidateForm.endDate = this.searchValidateForm.time[1]
      }
      return Object.assign({
        status:this.status,
      },this.searchValidateForm);
    },
    chioseStatus(code){
      this.status = code
      this.$emit('searchOn', this.formatData())
    },
    onSubmit(){
      this.$emit('searchOn', this.formatData())
    },
    onExport(){
      this.$emit('exportOn', this.formatData())
    },
    resetForm(formName) {
      this.searchValidateForm = {}
    },
    onListPeriod(){
      this.$emit('listPeriodOn', this.formatData())
    },
    openg(){
      this.$emit('newObj', null)
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss">
  .app-container{
    margin:10px 5px;
    .container-header{
      margin:0;
      button{
        margin:0 10px;
      }
    }
    .status-bar{
      button{
        float:left!important;;
      }
    }
  }
</style>