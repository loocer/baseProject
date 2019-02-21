import React, { Component } from 'react';
import { Button } from 'antd-mobile';

export default class CommonButton extends Component {
  onClickHandler = (e) => {
    if (!this.clicked && this.props.onClick) {
      this.props.onClick(e);
      this.clicked = true;
      setTimeout(() => {
        this.clicked = false;
      }, 3000);
    }
  }

  render() {
    const { onClick, ...props } = this.props; // eslint-disable-line no-unused-vars
    return <Button {...props} onClick={this.onClickHandler} />;
  }
}
