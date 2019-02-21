import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Picker, List } from 'antd-mobile';
import { RAF } from '../../utils/bomutil';
import styles from './Picker.less';

export default class MyPicker extends PureComponent {
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
    const { error, id } = nextProps;
    if (error && error[id] && !this.state.error) {
      if (error[id].reason && !this.changed) {
        this.setState({ error: true, message: error[id].reason });
      } else {
        const errors = this.context.form.getFieldError(id);
        if (errors) {
          this.setState({ error: true, message: errors[0] });
        }
      }
    }
  }

  onChangeHandler = (val) => {
    const { onChange, id } = this.props;
    const { form } = this.context;

    if (onChange) {
      onChange(val);
    }

    RAF(() => {
      const errors = form.getFieldError(id);
      if (errors) {
        this.setState({ error: true, message: errors[0] });
      } else {
        this.setState({ error: false, message: '' });
      }
    });

    this.changed = true;
  }

  render() {
    /* eslint-disable no-unused-vars */
    const { children, error, ...otherProps } = this.props;
    const clsObj = {};
    clsObj[styles.normal] = true;
    clsObj[styles.disabled] = this.props.disabled;
    clsObj[styles.error] = this.state.error;
    if (otherProps.value && otherProps.value.length) {
      const value = otherProps.cols ? otherProps.value[0] : otherProps.value[2];
      clsObj[styles.placeholder] = value === null || value === undefined;
    } else {
      clsObj[styles.placeholder] = true;
    }
    const cls = classnames(clsObj);

    if (otherProps.value && !Array.isArray(otherProps.value)) {
      otherProps.value = [otherProps.value];
    }

    // if (otherProps.placeholder) {
    //   const Data = `${otherProps.data[1].label},${otherProps.data[1].value},全部`;
    //   otherProps.extra = Data;
    // }


    return (<span className={cls} key={this.props.id} onClick={this.props.onClickHandler}>
      <Picker {...otherProps} onChange={this.onChangeHandler} className={this.props.classname}>
        <List.Item arrow="horizontal">{children}</List.Item>
      </Picker>
      {
        this.state.error ? <div className="message">{this.state.message}</div> : null
      }
    </span>);
  }
}
