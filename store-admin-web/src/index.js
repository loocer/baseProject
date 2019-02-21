import dva from 'dva';
import createLoading from 'dva-loading';
import { message } from 'antd';
import debug from 'debug';
import './index.less';

// 浏览器兼容性

// 1. Initialize
const app = dva({
  onError(ex, dispatch) {
    debug('finace')(ex);
    dispatch({ type: 'global/throwError', payload: ex });
    setTimeout(() => { dispatch({ type: 'global/clearError' }); }, 0);
    message.error(ex.message || ex.msg || '系统异常');
  },
});

message.config({ duration: 5, top: 60 });

// 2. Plugins
// app.use({});

app.use(createLoading({ effects: true }));

// 3. Model
// app.model(require('./models/example'));
app.model(require('./models/global'));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
