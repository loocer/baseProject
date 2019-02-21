import debug from 'debug';
import { Toast } from 'antd-mobile';
import { APP_ID, WX_DEBUG } from '../constants';
import { getCouponsAccount } from '../services/coupons';

const echo = debug('wx');
let isConfiged = false;

const SHARE_APIS = ['onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareQZone', 'onMenuShareTimeline', 'onMenuShareWeibo'];

const sendInfo = ['friend', 'QQ', 'Qzone', 'circle', 'weibo'];
/* eslint-disable no-undef */
export function share(signature, info, actionName) {
  config(signature, [].concat(SHARE_APIS), doShare.bind(null, info, actionName));
}

function shareSuccess(type, actionName) {
  getCouponsAccount(type, actionName);
  Toast.success('分享成功');
}

function doShare(info, actionName) {
  let api;
  for (let i = 0; i < SHARE_APIS.length; i++) {
    api = SHARE_APIS[i];
    echo(api);
    wx[api]({
      ...Object.assign(info, {
        success: shareSuccess.bind(null, sendInfo[i], actionName),
      }),
    });
  }
}

function config({ noncestr, timestamp, signature }, apis, ready = () => {}) {
  /* eslint-disable global-require */
  require('jweixin').then(() => {
    if (!isConfiged) {
      wx.config({
        debug: WX_DEBUG,
        appId: APP_ID,
        timestamp,
        nonceStr: noncestr,
        signature,
        jsApiList: apis,
      });
      wx.ready(ready);
      isConfiged = true;
    } else {
      ready();
    }
  });
}
