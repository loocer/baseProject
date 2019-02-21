export const TEL = /^\d{7,8}$/;

export const PHONE = /^1\d{10}$/;

export const BANK_CARD = /^\d{15,19}$/;

export const DIALING_CODE = /^\d{3,4}$/;

export const ZH_CN = /^[\u4e00-\u9fa5]+$/;

export const USERNAME = /(^1\d{10}$)|(^admin$)/;

export const EMAIL = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;

export const ID_CARD = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}$)/;
