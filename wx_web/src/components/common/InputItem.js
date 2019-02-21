import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { InputItem } from 'antd-mobile';
import { RAF } from '../../utils/bomutil';
import styles from './InputItem.less';

export default class MyInputItem extends PureComponent {
  static contextTypes = {
    form: PropTypes.object,
  };

  constructor(props) {
    super(props);
    const { error, id } = props;
    if (error && error[id]) {
      this.state = { error: true, message: error[id] };
    } else {
      this.state = {};
    }
  }

  componentWillReceiveProps(nextProps) {
    const { error, id, onError } = nextProps;

    if (error && error[id]) {
      if (error[id].reason && !this.changed) {
        this.setState({ error: true, message: error[id].reason });
        if (onError) onError(error[id].reason);
      } else {
        const errors = this.context.form.getFieldError(id);
        if (errors) this.setState({ error: true, message: errors[0] });
        if (onError) onError(errors && errors[0]);
      }
    }
  }

  onChangeHandler = (val) => {
    const { onChange } = this.props;

    if (onChange) onChange(val, true);

    if (this.state.error) this.setErrorState();

    this.changed = true;
  }

  onBlurHandler = () => {
    this.setErrorState();
  }

  onClickHandler = () => {}

  setErrorState = () => {
    const { id, onError } = this.props;
    const { form } = this.context;

    RAF(() => {
      const errors = form.getFieldError(id);
      if (errors) {
        this.setState({ error: true, message: errors[0] });
      } else {
        this.setState({ error: false, message: '' });
      }

      if (onError) {
        onError(errors && errors[0]);
      }
    });
  }

  render() {
    const clsObj = {};
    clsObj[styles.placeholder] = true;
    clsObj[styles.error] = this.state.error;
    const cls = classnames(clsObj);
    /* eslint-disable no-unused-vars */
    const {
      error, dispatch, searchResult, onError, ...otherProps
    } = this.props;

    return (<span className={cls} key={this.props.id}>
      <InputItem
        ref={(node) => { this.input = node; }}
        {...otherProps}
        onBlur={this.onBlurHandler}
        onChange={this.onChangeHandler}
        onFocus={this.onClickHandler}
      />
      {this.state.error ? <div className="message">{typeof this.state.message === 'string' ? this.state.message : this.state.message.reason}</div> : null}
    </span>);
  }
}
