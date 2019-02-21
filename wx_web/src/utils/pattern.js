export const ZH_CN = /^[\u4e00-\u9fa5]+$/;

export const MORE_THAN_THREE_ZH_CN = /[\u4e00-\u9fa5]+.*[\u4e00-\u9fa5]+.*[\u4e00-\u9fa5]+/;

export const PHONE = /^1\d{10}$/;

export const BANK_CARD = /^\d{15,19}$/;

export const DIALING_CODE = /^\d{3,4}$/;

export const TEL = /^\d{7,8}$/;

export const TEL_OR_400 = /^\d{7,8}$|^[48]00\d{7}$/;

export const TEL_OR_PHONE = /^\d{7,8}$|^1\d{10}$/;

export const TEL_OR_400_OR_PHONE = /^\d{7,8}$|^[48]00\d{7}$|^1\d{10}$/;

export const ID_CARD = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}$)/;

export const NUMBER = /^\d*$/;

export const BASE64 = /^[A-Za-z\d+/]{32,64}([A-Za-z\d+/][A-Za-z\d+/=]|==)$/;
