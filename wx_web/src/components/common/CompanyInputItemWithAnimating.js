import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { ActivityIndicator } from 'antd-mobile';
import { RAF } from '../../utils/bomutil';
import { showBar, hideBar } from '../../utils/platform';
import InputItem from './InputItem';
import Icon from './Icon';
import IconArrow from '../../assets/fonts/arrow-right-blue.svg';
import ImgAnimate from '../../assets/gif/飞机.gif';
import styles from './CompanyInputItem.less';

const INPUT_STYLE = {
  position: 'fixed',
  left: '.35rem',
  right: '.55rem',
  top: '.15rem',
  'z-index': 999,
  width: 'calc(100% - .9rem)',
  'text-align': 'left',
  background: '#F4F4F7',
  'border-radius': '.04rem',
  padding: '.05rem',
};

@connect(state => ({
  searchResult: state.spider.searchResult || {},
  searchDetailResult: state.spider.searchDetailResult || {},
  loading: state.loading.models.spider,
}))
export default class CompanyInputItem extends InputItem {
  static propTypes = {
    onSuggest: PropTypes.func,
  };

  static defaultProps = {
    onSuggest: () => {},
  };

  componentWillReceiveProps({ searchResult }) {
    if (this.changed && searchResult && searchResult[this.changed]) {
      let str = this.changed;
      let suggest = searchResult[this.changed];

      while (!suggest.length && str) {
        str = str.substr(0, str.length - 1);
        suggest = searchResult[str] || [];
      }

      this.setState({ suggest });
      this.changed = null;
    }
  }

  onChangeHandler = (val) => {
    const { onChange, id } = this.props;
    const { form } = this.context;

    if (onChange) onChange(val, true);

    if (this.state.error) {
      RAF(() => {
        const errors = form.getFieldError(id);
        if (errors) {
          this.setState({ error: true, message: errors[0] });
        } else {
          this.setState({ error: false, message: '' });
        }
      });
    }

    this.changed = val;
    this.props.dispatch({ type: 'spider/search', payload: val });
  }

  onClickHandler = () => {
    if (this.state.clicked) return;
    this.setState({ clicked: true });
    const ele = ReactDOM.findDOMNode(this.input); // eslint-disable-line
    const input = ele.getElementsByTagName('input')[0];

    this.oldValue = input.value;
    if (!this.oldStyle) {
      this.oldStyle = {};

      Object.keys(INPUT_STYLE).forEach((key) => {
        this.oldStyle[key] = input.style[key];
        input.style[key] = INPUT_STYLE[key];
      });
    }
    hideBar();
  }

  onCancelHandler = () => {
    this.props.onChange(this.oldValue);
    this.resetInput();
  }

  onOkHandler = () => {
    this.resetInput();
    this.setState({ animating: true });
    setTimeout(() => {
      const { searchDetailResult } = this.props;
      const ele = ReactDOM.findDOMNode(this.input); // eslint-disable-line
      const input = ele.getElementsByTagName('input')[0];
      const item = (searchDetailResult[input.value] || [])[0] || {};

      if (this.props.onSuggest) this.props.onSuggest(item);
      this.setState({ animating: false });
      showBar();
    }, 2000);
  }

  onSuggestHandler = (item) => {
    const val = item.title || item.name.replace(/<\/?em>/g, '');
    this.props.onChange(val);
    this.setState({ item });
  }

  resetInput = () => {
    this.setState({ clicked: false });
    const ele = ReactDOM.findDOMNode(this.input); // eslint-disable-line
    const input = ele.getElementsByTagName('input')[0];

    this.props.dispatch({ type: 'spider/searchDetail', payload: input.value });

    Object.keys(INPUT_STYLE).forEach((key) => {
      input.style[key] = this.oldStyle[key];
    });
    this.oldStyle = null;
  }

  renderSuggestPage = () => {
    const { suggest = [], animating } = this.state;
    const style = {};
    const layerStyle = {};

    if (animating) {
      layerStyle.background = 'rgba(0, 0, 0, 0)';
    }

    return [<div className={styles.overlayer} key="layer" style={layerStyle} />,
      <div className={`${styles.wrap} ${this.state.animating ? styles['wrap-animate'] : ''}`} style={style} key="wrap">
        <section className={styles.header}>
          <Icon type={IconArrow} onClick={this.onCancelHandler} />
          <a onClick={this.onOkHandler}>确定</a>
        </section>
        <section className={styles.content}>
          {this.props.loading ? <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}><ActivityIndicator /></div> : null}
          {
            this.state.animating ? null : <ul>
              {suggest.filter(item => !!item).map(item =>
                (<li key={item.id} onClick={this.onSuggestHandler.bind(this, item)}>
                  {item.title || item.name.replace(/<\/?em>/g, '')}
                </li>))}
            </ul>
          }
        </section>
        <img className={styles.animate} style={{ display: animating ? 'block' : 'none' }} src={ImgAnimate} alt="" />
      </div>];
  }

  render() {
    return (<span>
      {super.render()}
      {this.state.clicked || this.state.animating ? this.renderSuggestPage() : null}
    </span>);
  }
}
