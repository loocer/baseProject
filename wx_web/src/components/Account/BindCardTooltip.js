import React, { Component } from 'react';
import styles from './BindCardTooltip.less';

export default class BindCardTooltip extends Component {
  constructor(props) {
    super(props);
    this.state = { visible: props.visible };
  }

  render() {
    if (!this.state.visible) return null;
    return (<div className={styles.tooltip} onClick={() => this.setState({ visible: false })}>
      <div>
        <h4>温馨提示</h4>
        <section>
          请仔细核对页面所填姓名、身份证号是否与本人一致，确认无误后再继续填写订单。
        </section>
      </div>
    </div>);
  }
}
