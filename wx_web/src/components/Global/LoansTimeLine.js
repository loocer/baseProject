import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Link, routerRedux } from 'dva/router';
import { Modal, Toast } from 'antd-mobile';
import { CLIENT_STATE_TURN_DOWN_TO_BOTH, CLIENT_STATE_TURN_DOWN_TO_USER, CLIENT_STATE_PASSED, TYPE_URL_MAPPING } from '../../constants';
import { deducePlatform, openWindow } from '../../utils/platform';
import ImgCurrent from '../../assets/mine_select_icon@xhdpi.png';
import ImgCurrent2X from '../../assets/mine_select_icon@2x.png';
import ImgCurrent3X from '../../assets/mine_select_icon@3x.png';
import ImgDone from '../../assets/mine_finish@xhdpi.png';
import ImgDone2X from '../../assets/mine_finish@2x.png';
import ImgDone3X from '../../assets/mine_finish@3x.png';
import styles from './LoansTimeLine.less';

const REG_TIMES = /^\d+$/;

@connect(state => ({ agree: state.loan.agree || '' }))
export default class TimeLine extends PureComponent {
  state = { scroll: 0 };

  onAgreeDoneHandler = () => {
    const { agree, id, dispatch } = this.props;
    if (!agree) setTimeout(this.onAgreeDoneHandler, 10);
    if (agree && agree.flag) {
      if (deducePlatform()) {
        openWindow(`channel/${btoa(id)}?type=${agree.flag}`);
      } else {
        dispatch(routerRedux.push({ pathname: `/channel/${btoa(id)}`, search: `?type=${agree.flag}` }));
      }
    } else {
      Toast.success('订单同意成功', 2, () => {
        dispatch({ type: 'loan/getLoans' });
      });
    }
  }

  onAgreeHandler = () => {
    const { dispatch } = this.props;
    const type = TYPE_URL_MAPPING[this.props.type];
    dispatch({ type: `loan/${type}Agreement`, payload: this.props.id }).then(this.onAgreeDoneHandler);
  }

  onAlertAgreeHandler = () => {
    if (deducePlatform()) {
      const { id } = this.props;
      openWindow(`loan/${btoa(id)}`);
    } else {
      Modal.alert('是否同意分期?', '', [
        { text: '再想想' },
        { text: '确定', onPress: this.onAgreeHandler, style: { background: '#1B88EE', color: '#FFF' } },
      ]);
    }
  }

  onEditHandler = () => {
    openWindow(`loan/${btoa(this.props.id)}/edit`);
  }

  renderDate = (date) => {
    return (<section className="time">
      <div>{date.getHours() > 9 ? date.getHours() : `0${date.getHours()}`}:{date.getMinutes() > 9 ? date.getMinutes() : `0${date.getMinutes()}`}</div>
      <div>{date.getMonth() > 8 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`}-{date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`}</div>
    </section>);
  }

  renderStatus = (state, i) => {
    let dote;

    if (!i) {
      dote = <img src={ImgCurrent} srcSet={`${ImgCurrent2X} 2x,${ImgCurrent3X} 3x`} alt="" />;
    } else if (/^turn_down.*$/.test(state)) {
      dote = <div className="reject">驳</div>;
    } else {
      dote = <img src={ImgDone} srcSet={`${ImgDone2X} 2x,${ImgDone3X} 3x`} alt="" />;
    }

    return (<section className="status">{dote}</section>);
  }

  renderMessage = (message, state, i) => {
    let btn;
    const { h5Supported } = this.props;
    const supported = (h5Supported !== false && h5Supported !== 'false') || deducePlatform();

    if (!i) {
      if (~[CLIENT_STATE_TURN_DOWN_TO_BOTH, CLIENT_STATE_TURN_DOWN_TO_USER].indexOf(state)
        && supported) {
        if (deducePlatform()) {
          btn = <a onClick={this.onEditHandler}>立即修改&gt;</a>;
        } else {
          btn = <Link to={`/loan/${btoa(this.props.id)}/edit`}>立即修改&gt;</Link>;
        }
      } else if (state === CLIENT_STATE_PASSED) {
        btn = <a onClick={this.onAlertAgreeHandler}>立即确认&gt;</a>;
      }
    }

    return (<section className="message">{message}<section>{btn}</section></section>);
  }

  renderItem = (data, index) => {
    const { updateTime: time, clientState: state, stateDescription: message } = data;
    let date;

    if (REG_TIMES.test(time)) {
      date = new Date(~~time);
    } else {
      date = new Date(...time.split(/[^0-9]+/).map((item, i) => (i === 1 ? ~~item - 1 : ~~item)));
    }

    return (<section className={`item${!index ? ' active' : ''}`} key={`${index}-${date.getTime()}`}>
      {this.renderDate(date)}
      {this.renderStatus(state, index)}
      {this.renderMessage(message, state, index)}
    </section>);
  }

  render() {
    return (<div
      className={styles.wrapper}
      onScroll={(e) => { this.setState({ scroll: e.target.scrollTop }); }}
    >
      <div className={styles['time-line']}>{this.props.dataSource.map((item, i) => this.renderItem(item, i))}</div>
      <div
        className={styles.layer}
        style={{
          bottom: 0 - this.state.scroll - 100,
        }}
      />
    </div>);
  }
}
