import dva from 'dva';
import createHistory from 'history/createBrowserHistory';
import { Toast } from 'antd-mobile';
import createLoading from 'dva-loading';
import { close } from './utils/pageutil';
import { APP_DEBUG, PAGE_PREFIX } from './constants';
import '../lib/Array-polyfill';
import './index.less';
import { deducePlatform } from './utils/platform';

if (!window.btoa || !window.atob) {
  require.ensure([], (require) => {
    const { atob, btoa } = require('Base64');
    window.atob = atob;
    window.btoa = btoa;
  });
}
if (!String.prototype.padStart) {
  String.prototype.padStart = function padStart(length,str) { //eslint-disable-line
    let padString = String((typeof str !== 'undefined' ? str : ' '));
    if (this.length > (length >> 0)) {
      return String(this);
    } else {
      const targetLength = (length >> 0) - this.length;
      if (targetLength > padString.length) {
        padString += padString.repeat(targetLength / padString.length);
      }
      return padString.slice(0, targetLength) + String(this);
    }
  };
}

// routerRedux.push 添加path前缀处理
const history = createHistory({ basename: PAGE_PREFIX });
history.action = 'PUSH'; // 防止直接进入程序判断未是返回

// 1. Initialize
const app = dva({
  history,
  onError(ex, dispatch) {
    Toast.hide();
    if (ex.code === 401 || ex.code === 403) {
      dispatch({ type: 'global/clearLogin' });
      if (localStorage && localStorage.clear) localStorage.clear();
      Toast.fail(ex.message || ex.msg || '您已登录超时，请重新登录', 2, () => {
        if (deducePlatform()) close();
      });
      return;
    }
    if (ex.code === 502 || ex.name === 'SyntaxError') {
      if (APP_DEBUG) {
        Toast.offline(JSON.stringify(ex), 10);
      } else {
        Toast.offline('网络加载较慢，请稍后重试。', 5, () => {
          window.location.reload();
        });
      }
      return;
    }
    dispatch({ type: 'global/throwError', payload: ex });
    setTimeout(() => dispatch({ type: 'global/clearError' }), 2000);
    if (APP_DEBUG) {
      Toast.fail(JSON.stringify(ex), 10, null, false);
    } else {
      Toast.fail(ex.message || ex.msg || '系统异常', 2, () => {
        if (ex.code === 403 || ex.code === 401) close();
      }, false);
    }
  },
});

app.model(require('./models/global').default);
app.model(require('./models/trace').default);
app.model(require('./models/loan').default);

// 2. Plugins
// app.use({});
app.use(createLoading());

// 3. Model
// app.model(require('./models/example'));

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');
