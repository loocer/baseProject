import React, { PureComponent } from 'react';
import Icon from './Icon';
import IconSelected from '../../assets/fonts/radio-select.svg';
import IconUnSelected from '../../assets/fonts/radio-unselect.svg';
import styles from './Radio.less';

export default class Radio extends PureComponent {
  componentDidMount() {
    if (this.props.checked && this.props.onChange) this.props.onChange();
  }

  onChangeHandler = () => {
    const { onChange } = this.props;
    if (onChange) onChange();
  }

  onClickHandler = (e) => {
    const { onCancel } = this.props;

    e.preventDefault();
    e.stopPropagation();
    this.radio.checked = false;
    if (onCancel) onCancel();
  }

  render() {
    return (<label className={`${styles.radio} ${this.props.className}`}>
      <input
        ref={(node) => { this.radio = node; }}
        type="radio"
        name={this.props.name}
        onChange={this.onChangeHandler}
        defaultChecked={this.props.checked}
      />
      <Icon type={IconUnSelected} />
      <Icon type={IconSelected} onClick={this.onClickHandler.bind(this)} />
    </label>);
  }
}
