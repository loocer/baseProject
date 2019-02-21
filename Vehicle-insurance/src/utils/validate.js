/**
 * Created by jiachenpan on 16/11/18.
 */

export function isvalidUsername(str) {
  // const valid_map = ['1111111', 'editor']
  // return valid_map.indexOf(str.trim()) >= 0
  return true
}

/* 合法uri*/
export function validateURL(textval) {
  const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return urlregex.test(textval)
}

/* 小写字母*/
export function validateLowerCase(str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

/* 大写字母*/
export function validateUpperCase(str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

/* 大小写字母*/
export function validatAlphabets(str) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}
export const jiekuanrenRules =  {
  name: [
    { required: true, message: '请填写姓名', trigger: 'change' }
  ],
  mobileNo: [
    { required: true, message: '请填写电话', trigger: 'change' }
  ],
  certId: [
    { required: true, message: '请填写身份证', trigger: 'change' }
  ],
  address: [
    {  required: true, message: '请选择证件地址', trigger: 'change' }
  ],
  contactName: [
    { required: true, message: '请填写联系人', trigger: 'change' }
  ],
  contactMobile: [
    { required: true, message: '请填写联系电话', trigger: 'change' }
  ],
  companyName: [
    { required: true, message: '请填写公司名', trigger: 'blur' }
  ],
  companyCode: [
    { required: true, message: '请填写信用代码', trigger: 'change' }
  ],
  registAddress: [
    { required: true, message: '请填写注册地址', trigger: 'blur' }
  ],
  contactRelation: [
    { required: true, message: '请选择借款人关系', trigger: 'change' }
  ],
  imageInfo: [
    { required: true, message: '请选择借款人关系', trigger:  ['blur', 'change']  }
  ],
}

export const addCarRules =  {
  No: [
    { required: true, message: '请输入活动名称', trigger: 'blur' },
    { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
  ],
  plateNo: [
    { required: true, message: '请填写此字段',trigger: 'change' }
  ],
  model: [
    { required: true, message: '请填写此字段',trigger: 'change' }
  ],
  vin: [
    { required: true, message: '请填写此字段',trigger: 'change' }
  ],
  engineNo: [
    { required: true, message: '请填写此字段',trigger: 'change' }
  ],
  registerDate: [
    { required: true, message: '请填写此字段',trigger: 'change' }
  ],
  insteadPay: [
    { required: true, message: '请填写此字段',trigger: 'change' }
  ],
  premium: [
    { required: true, message: '请填写此字段',trigger: 'change' }
  ],
  imageType: [
    { required: true, message: '请填写此字段',trigger: 'change' }
  ],
  time: [
    { required: true, message: '请填写此字段',trigger: 'change' }
  ],
}