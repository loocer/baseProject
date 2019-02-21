import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { ActivityIndicator, Button } from 'antd-mobile';
import { RAF } from '../../utils/bomutil';
import { showBar, hideBar } from '../../utils/platform';
import InputItem from './InputItem';
import Icon from './Icon';
import IconArrow from '../../assets/fonts/arrow-right-blue.svg';
import styles from './CompanyInputItem.less';

const INPUT_STYLE = {
  position: 'fixed',
  left: '.35rem',
  right: '.55rem',
  top: '.15rem',
  'z-index': 999,
  width: 'calc(100% - 1.2rem)',
  'text-align': 'left',
  background: '#F4F4F7',
  'border-radius': '.04rem',
  padding: '.05rem',
};

@connect(state => ({
  searchResult: state.spider.searchResult || {},
  loading: state.loading.models.spider,
}))
export default class CompanyInputItem extends InputItem {
  static propTypes = {
    onSuggest: PropTypes.func,
  };

  static defaultProps = {
    onSuggest: () => {},
  };

  state = { disabled: true };

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

  onInpClick = () => {
    const ele = ReactDOM.findDOMNode(this.input); // eslint-disable-line
    const input = ele.getElementsByTagName('input')[0];
    const val = input.value;
    const { onChange, id, loanId } = this.props;
    const { form } = this.context;
    this.searched = true;
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

    this.setState({ disabled: true });
    this.changed = val;
    this.props.dispatch({ type: 'spider/search', payload: { keyword: val, loanId } });
  }

  onClickHandler = () => {
    if (this.state.clicked) return;
    const { loanId } = this.props;
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
    if (this.oldValue) {
      this.changed = this.oldValue;
      this.props.dispatch({ type: 'spider/search', payload: { keyword: this.oldValue, loanId } });
    }
    hideBar();
  }

  onCancelHandler = () => {
    this.props.onChange(this.oldValue);
    this.resetInput();
  }

  onSuggestHandler = (item) => {
    const val = item.title || item.name.replace(/<\/?em>/g, '');
    this.props.onChange(val);
    this.setState({ item, disabled: false });
    if (this.props.onSuggest) this.props.onSuggest({});
    showBar();
    this.resetInput();
  }

  resetInput = () => {
    this.setState({ clicked: false });
    const ele = ReactDOM.findDOMNode(this.input); // eslint-disable-line
    const input = ele.getElementsByTagName('input')[0];

    Object.keys(INPUT_STYLE).forEach((key) => {
      input.style[key] = this.oldStyle[key];
    });
    this.oldStyle = null;
  }

  renderSuggestPage = () => {
    const { suggest = [] } = this.state;
    return (<div className={styles.wrap} key="wrap">
      <section className={styles.header}>
        <Icon type={IconArrow} onClick={this.onCancelHandler} />
      </section>
      <section className={styles.content}>
        {this.props.loading ? <div style={{ position: 'fixed', right: '.3rem', top: '.2rem' }}><ActivityIndicator /></div> : <div style={{ position: 'fixed', right: '.15rem', top: '.15rem' }}><Button className={styles.search} onClick={this.onInpClick} type="primary">查询</Button></div>}
        <ul>
          {suggest.filter(item => !!item).map(item =>
            (<li key={item.id} onClick={this.onSuggestHandler.bind(this, item)}>
              {item.title || item.name.replace(/<\/?em>/g, '')}
            </li>))}
          {suggest.length === 0 &&
            this.searched
            && !this.props.loading && <li className={styles.nodata}>未查询到相关企业</li>}
        </ul>
      </section>
    </div>);
  }

  render() {
    return (<span>
      {super.render()}
      {this.state.clicked ? this.renderSuggestPage() : null}
    </span>);
  }
}
