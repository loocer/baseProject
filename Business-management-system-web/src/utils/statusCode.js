export const recordStatus =  
{
	'UNRECORD':'未备案',
	'RECORDING':' 备案中',
	'RECORDED':'已备案',
	'FAILURE':'备案失败'
}

export const strateStatus =  
{
	'PASS':'通过',
	'REJECT':'拒绝',
}

export const merchantType =  
{
	'rent':'房租',
	'home':' 家装'
}

export const storeAccountState =  
{
	// 'WAIT_FOR_GENERATOR':'待生成',
	'WAIT_FOR_CONFIG':'待配置',
	'WAIT_FOR_AUDIT':'待审核',
	'ACCOUNT_EFFECT':'账号已生效',
	'REJECT':' 审核驳回'
}

export const contractStatus =  
{
	'INIT':'待录入',
	'COMPAREING':'合同校对中',
	'WAIT_FOR_SAVE_FILE':'通过, 待归档',
	'REJECT':'驳回',
	'FILE_SAVED':'合同已归档'
}
export const storeStatus = {
	'SUBMITTED':'信息已提交状态',
	'RISK_AUDITING':'风控审核中',
	'WAIT_FOR_INSPECT':'待发起尽调',
	'AUDIT_REJECT':'审核拒绝',
	'INSPECTING':'尽调中',
	'INSPECT_COMMERCIAL_AUDITING':'商务系统尽调审核中',
	'INSPECT_RISK_AUDITING':'商务系统风控审核中',
	'WAIT_FOR_SIGN':'待签约',
	'INSPECT_REJECT':'尽调未通过',
	'SIGNED':'已签约'
}
export const hezuoStatus = {
	'SIGNED':'已签约',
	'RELIEVED_SIGN':'已解约',
	'EXPIRED':'已到期',
	'FROZE':'已冻结',
	'WAIT_FOR_SIGN':'待签约',
}
export const attachments = {
	'storeContract':'商户合同',
	'relatedDuty':'连带责任书',
	'signatureImpower':'电子签章授权',
	'privateAccountImpower':'私户授权书',
	'coopOtherReplenish':'其他补充授权',
	'storeOpeningLicence':'开户许可证',
	'coopOtherReplenish':'其他补充授权',
	'storeLogo':'商户logo',
	'storePremises':'经营场地',
	'storePremisesContract':'经营场地租赁合同',
	'storeOtherReplenish':'其他补件资料'
}
export const fangyuanType = {
	'disperse':'分散房源',
	'focusApartment':'集中公寓',
	'mixture':'混合房源',
}