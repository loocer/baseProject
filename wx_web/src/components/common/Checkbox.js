import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styles from './Checkbox.less';

export default class Checkbox extends PureComponent {
  static propTypes = {
    checked: PropTypes.bool,
    onClick: PropTypes.func,
    value: PropTypes.string,
  };

  static defaultProps = {
    checked: false,
    onClick: () => {},
    value: '',
  };

  constructor(props) {
    super(props);
    this.OnchangeHandle = this.OnchangeHandle.bind(this);
  }

  OnchangeHandle() {
    const { onClick, value } = this.props;
    onClick(value);
  }

  render() {
    const { children, value, checked } = this.props;
    return (
      <label className={styles.checkboxWrapper}>
        <span className={`checkbox ${checked ? 'checkboxed' : ''}`} onClick={this.OnchangeHandle} >
          <input type="checkbox" className={styles.checkboxInput} value={value || ''} checked={checked} />
        </span>
        <span>{children !== undefined ? children : null }</span>
      </label>);
  }
}
