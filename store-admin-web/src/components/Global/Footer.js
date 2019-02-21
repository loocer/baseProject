import React, { Component } from 'react';

export default class Footer extends Component {
  render() {
    const { className } = this.props;
    return (
      <div className={className}>
      Copyright@2017 元宝e家官网版权所有 京ICP备16018518号-1 京ICP许可证：京B2-20160097
    </div>);
  }
}
