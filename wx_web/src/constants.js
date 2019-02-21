// 登陆跳转的地址
/* global location */
export const LOGIN_URL = '/logout';

export const APP_NAME = 'wx_client';

// 未登录的CODE
export const NOT_LOGINED_CODE = '1';

export const DATE_FORMATTER = 'YYYY-MM-DD';

export const DATE_HOURS_FORMATTER = 'YYYY-MM-DD HH:mm';

export const TYPE_MAPPING = {
  '01': '家装',
  '02': '租房',
};
export const TYPE_URL_MAPPING = {
  '01': 'decoration',
  '02': 'rent',
};
export const TYPE_RENT = '02';
export const TYPE_DECORATION = '01';

export const CLIENT_STATE_CREATED = 'created';
export const CLIENT_STATE_CANCELED = 'canceled';
export const CLIENT_STATE_REPAYMENT = 'repayment';
export const CLIENT_STATE_LOANING = 'loaning';
export const CLIENT_STATE_PASSED = 'passed';
export const CLIENT_STATE_AUDITING = 'auditing';
export const CLIENT_STATE_REJECTED = 'rejected';
export const CLIENT_STATE_PAID_OFF = 'paid_off';
export const CLIENT_STATE_REFUNDED = 'refunded';
export const CLIENT_STATE_TURN_DOWN_TO_BOTH = 'turn_down_both';
export const CLIENT_STATE_TURN_DOWN_TO_USER = 'turn_down_user';
export const CLIENT_STATE_TURN_DOWN_TO_MERCHANTE = 'turn_down_merchant';

export const BANK_TYPE_MAPPING = {
  ABC: '中国农业银行',
  BOC: '中国银行',
  CCB: '中国建设银行',
  CEB: '中国光大银行',
  CIB: '兴业银行',
  CITIC: '中信银行',
  CMBC: '民生银行',
  ICBC: '中国工商银行',
  PINGANBK: '平安银行',
  PSBC: '中国邮政储蓄银行',
  COMM: '交通银行',
  CMB: '招商银行',
  SPDB: '浦发银行',
  HXB: '华夏银行',
  CGB: '广发银行',
  BCOM: '中国交通银行',
  GDB: '广发银行',
  PAB: '平安银行',
  SHB: '上海银行',
};

export const BAOFOO_BANK_MAPPING = {
  ABC: '中国农业银行',
  BCOM: '中国交通银行',
  BOC: '中国银行',
  CCB: '中国建设银行',
  CEB: '中国光大银行',
  CIB: '兴业银行',
  CITIC: '中信银行',
  CMB: '招商银行',
  CMBC: '民生银行',
  GDB: '广发银行',
  HXB: '华夏银行',
  ICBC: '中国工商银行',
  PAB: '平安银行',
  PSBC: '中国邮政储蓄银行',
  SHB: '上海银行',
  SPDB: '浦东发展银行',
};

export const PAY_TYPE_MAPPING = {
  chargeoneforone: '押一付一',
  chargetwoforone: '押二付一',
};
export const PAY_BACK_MAPPING = {
  averagecapital: '等额本息',
  takingbuckle: '一次性支付服务费',
  paybyboth: '商家贴息',
};

export const BALANCE_PAYMENT = {
  '03': '整月提单',
  '02': '零天合并提单',
  '01': '零天单独提单',
};

let DEVELOPMENT = '';
let appId = 'wx7bbd473e4055456d'; // 生产的app_id
let wxDebug = false;
let appDebug = false;

// @ifdef DEVELOPMENT
DEVELOPMENT = 'test';
appId = 'wx69838af14862d7a9';
wxDebug = false;
appDebug = true;
// @endif


export const WX_DEBUG = wxDebug;
export const APP_DEBUG = appDebug;

export const QINIU_BASE_PATH = `https://img${DEVELOPMENT}.ybejia.com`;
export const QINIU_UPLOAD_PATH = 'https://up-z1.qbox.me';
export const QN_TOKEN_SERVICE_PATH = `https://image${DEVELOPMENT}.ybejia.com/jsp/controller.jsp?action=getToken`;
export const TRACE_URL = `https://${DEVELOPMENT || 'www'}.ybejia.com/logPoint`;

export const REQUEST_URL_PREFIX = '/client/api';
export const WX_URL_PREFIX = '/wechat/wx';

export const USER_KEY = '$$user';
export const TOKEN_KEY = '$$token';

export const APP_ID = appId;

export const SHARE_COUPON_PATH = `https://weixin${DEVELOPMENT}.ybejia.com/#/huodong/jzmx`;

export const SHARE_ICON_PATH = '/upload/image/2017_08_14/13_03_39_1502687019828_648633.png';

export const PAGE_PREFIX = '/page';
