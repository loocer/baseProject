export const DEFAULT_PAGE_SIZE = 10;
export const DEFAULT_PAGE = { current: 1, pageSize: DEFAULT_PAGE_SIZE };
export const GET_PAGE_ALL = { current: '', pageSize: '' };

// 省市区类型值
export const PROVINCE_TYPE = '01';
export const CITY_TYPE = '02';
export const TOWN_TYPE = '03';

export const KAPTCHA = '/user/kaptcha.jpg';

let DEVELOPMENT = '';

// @ifdef DEVELOPMENT
DEVELOPMENT = 'test';
// @endif

// 图片资料相关配置
export const IMG_BASE_PATH = `https://image${DEVELOPMENT}.ybejia.com`;
export const QN_TOKEN_SERVICE_PATH = `https://image${DEVELOPMENT}.ybejia.com/jsp/controller.jsp?action=getToken`;
export const QN_UPLOAD_PATH = DEVELOPMENT ? '//upload-z1.qiniu.com' : '//up-z1.qbox.me';
export const CAPTCHA_URL = `https://storetest.ybejia.com/store/api/v1/authentication`;

// 登陆跳转的地址
/* global location */
export const LOGIN_URL = '/api/logout';

// 未登录的CODE
export const NOT_LOGINED_CODE = '1';

export const DECORATION_THRESHOLD_VALUE = 200000;

export const DATE_FORMATTER = 'YYYY-MM-DD';

export const ONLINE_MAPPING = {
  0: '下线',
  1: '上线',
};

export const STATUS = {
  0: '已租',
  1: '未租',
};

export const LEASETYPE = {
  'entireRent': '整租',
  'sublet': '分租',
};

export const USER_KEY = '$$employee';
export const TOKEN_KEY = '$$token';

export const REQ_PREFIX = '/store';
