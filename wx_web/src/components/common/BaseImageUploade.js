import React, { PureComponent } from 'react';
import debug from 'debug';
import { Toast } from 'antd-mobile';
import { QINIU_BASE_PATH } from '../../constants';

const log = debug('wx');

export default class BaseImageUpload extends PureComponent {
  constructor(props) {
    super(props);
    this.pathes = {};
    this.state = {};
  }

  componentWillReceiveProps(nextProps) {
    const { loan, id } = nextProps;
    if (loan && loan[id] && !this.loaded) {
      this.loaded = true;
      this.onLoadImagesHandler(loan[id].image);
    }
  }

  onLoadImagesHandler = (image = {}) => {
    const newState = {};
    const pathes = {};

    this.keys.forEach((key) => {
      let path;
      if (image && image[key] && /upload\/image\//.test(image[key])) { // 过滤掉无效图片地址
        path = image[key];
      } else if (localStorage && localStorage.getItem) {
        path = localStorage.getItem(this.getStorageKey(key));
      }

      if (path) {
        const matches = /(upload\/image\/.*)/.exec(path);
        if (matches && matches[1]) {
          path = matches[1]; // eslint-disable-line
          newState[key] = `${QINIU_BASE_PATH}/${path}`;
          pathes[key] = path.charAt(0) === '/' ? path : `/${path}`;
        }
      }
    });

    this.pathes = pathes;
    this.setState(newState);
    log('当前的文件参数为:', pathes);
  }

  onImageUploadedHandler = (key, path) => {
    const url = path.charAt(0) === '/' ? path : `/${path}`;
    const newPathes = {};
    const newState = {};

    if (localStorage && localStorage.setItem) {
      localStorage.setItem(this.getStorageKey(key), url);
    }
    newPathes[key] = path;
    this.pathes = Object.assign({}, this.pathes, newPathes);

    Object.keys(this.pathes).forEach((k) => {
      newState[k] = this.pathes[k].charAt(0) === '/' ?
        `${QINIU_BASE_PATH}${this.pathes[k]}` : `${QINIU_BASE_PATH}/${this.pathes[k]}`;
    });

    this[`${key}changed`] = true;
    this.setState(newState);
    log('当前的文件参数为：', this.pathes);
  }

  getStorageKey = (key) => {
    return `${this.LOAN_ID}:${key}`;
  }

  getPickerStyle = (key, loanKey) => {
    if (this[`${key}changed`] || !this.state.error || !this.state.error[loanKey]) return {};

    return { border: '.01rem solid red' };
  }

  getPickerError = (key, loanKey, style) => {
    if (this[`${key}changed`] || !this.state.error || !this.state.error[loanKey]) return null;

    const styles = Object.assign({
      color: 'red', textAlign: 'center', fontSize: '.14rem', marginTop: '-.14rem',
    }, style || {});
    return <div style={styles}>{this.state.error[loanKey].reason}</div>;
  }

  initError = (props, categories) => {
    const { loan } = props;
    const id = props.id || this.loanId;
    // 设置驳回高亮显示
    if (loan && loan[id] && loan[id].fieldsMap && !this.initederror) {
      const error = {};
      const reasons = [];

      Object.values(loan[id].fieldsMap).forEach((item) => {
        if (categories !== item.category && categories.indexOf(item.category) < 0) return;

        if (item.property === 'loanAttachDetail') {
          reasons.push(item.reason);
          return;
        }

        if (!error[item.property]) {
          error[item.property] = item;
        } else {
          error[item.property].reason = `${error[item.property].reason},${item.reason}`;
        }
      });

      this.initederror = true;
      this.setState({ error });
      if (reasons.length) {
        Toast.fail(reasons.join(','), 5, null, false);
      }
    }
  }
}
