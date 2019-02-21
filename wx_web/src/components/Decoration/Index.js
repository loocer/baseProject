import React, { PureComponent } from 'react';
import { createForm } from 'rc-form';
import { connect } from 'dva';
import { stringify } from 'query-string';
import moment from 'moment';
import { routerRedux } from 'dva/router';
import { List, InputItem, TextareaItem, Checkbox, Button, WhiteSpace } from 'antd-mobile';
import Loading from '../common/Loading';
import { getDateString } from '../../utils/dateutil';
import { PAY_BACK_MAPPING, CLIENT_STATE_CREATED } from '../../constants';
import NoticePage from './Notice';
import styles from '../common/List.less';

const FORMATTER = 'YYYY/MM/DD';

@connect(state => ({
  loading: state.loading.models.decoration,
  contract: state.decoration.contract,
  loan: state.decoration.loan,
  hasCard: state.decoration.hasCard,
}))
@createForm()
export default class IndexPage extends PureComponent {
  state = {};

  componentWillMount() {
    const { dispatch, id } = this.props;
    dispatch({ type: 'decoration/getIndexInfo', payload: id });
  }

  componentWillReceiveProps(nextProps) {
    const {
      contract, dispatch, hasCard, id, loading, loan,
    } = nextProps;
    this.setState({ loading, info: contract[id], hasCard });

    if (loan && loan[id] && loan[id].info
      && loan[id].info.clientState !== CLIENT_STATE_CREATED && !this.toDetail) {
      this.toDetail = true;
      dispatch(routerRedux.push({ pathname: `/loan/${btoa(id)}` }));
    }
  }

  onAgreeChangedHandler = (type) => {
    sessionStorage.setItem(`$$DECORATION-PROTOCOL-${type}`, true);
  }

  onOkHandler = (e) => {
    e.preventDefault();
    const { dispatch, id } = this.props;
    const { info = {} } = this.state;

    // 清空loaninfo 防止app个人信息不回填
    dispatch({ type: 'decoration/getLoanSuccess', payload: { id } });
    if (this.state.hasCard) {
      dispatch(routerRedux.push({
        pathname: `/decoration/${btoa(id)}/step/1`,
      }));
    } else {
      dispatch(routerRedux.push({
        pathname: '/account/bank/card',
        search: `?${stringify({ redirect: `/decoration/${btoa(id)}/step/1`, name: info.name, phone: info.phoneNo })}`,
      }));
    }
  }

  onRenderNoticePageHandler = () => {
    document.body.scrollTop = 0;
    this.setState({ renderNotice: true });
  }

  toProtocolPage = () => {
    const { dispatch, id } = this.props;
    sessionStorage.setItem('$$DECORATION-PROTOCOL-1', true);
    dispatch(routerRedux.push(`/protocol/${btoa(id)}`));
  }

  agreements = {};

  render() {
    const { info = {} } = this.state;
    const newState = {};
    let i = 0;
    while (i++ < 5) {
      if (sessionStorage.getItem(`$$DECORATION-PROTOCOL-${i}`)) newState[`p${i}`] = true;
    }

    if (this.state.renderNotice) {
      return (<NoticePage>
        <WhiteSpace size="xl" />
        <div className={styles['btn-container']}>
          <Button type="primary" onClick={this.onOkHandler}>确定</Button>
        </div>
      </NoticePage>);
    }

    return (<div className={styles['step-info']} style={{ paddingBottom: 0 }}>
      <Loading loading={this.state.loading}>
        <WhiteSpace size="xs" />
        <List>
          <InputItem editable={false} value={info.name}>姓名</InputItem>
          <InputItem editable={false} value={info.phoneNo}>电话</InputItem>
          <InputItem editable={false} value={info.idCard}>身份证号</InputItem>
        </List>
        <List>
          <InputItem editable={false} value={info.enterpriseName} labelNumber={7}>装修公司名称</InputItem>
          <InputItem editable={false} value={info.storeName} labelNumber={7}>装修项目负责人</InputItem>
          <InputItem editable={false} value={info.storePhone} labelNumber={7}>负责人联系电话</InputItem>
        </List>
        <List>
          <InputItem
            editable={false}
            value={`${info.province}${info.city}${info.town}${info.addrDetail}`}
            labelNumber={7}
          >装修房屋地址</InputItem>
          <InputItem editable={false} value={info.homeAmount} labelNumber={7}>装修合同金额</InputItem>
          <InputItem editable={false} value={info.loanAmount} labelNumber={7}>申请分期金额</InputItem>
          <InputItem
            editable={false}
            value={`${info.loanPeriod}期`}
            labelNumber={7}
          >申请分期期限</InputItem>
          <InputItem
            editable={false}
            value={`${getDateString(info.rentStartTime, FORMATTER)}至${getDateString(info.rentEndTime, FORMATTER)}`} // eslint-disable-line
            labelNumber={7}
          >预计装修时间
          </InputItem>
          <InputItem editable={false} value={info.payBack ? PAY_BACK_MAPPING[info.payBack.toLowerCase()] : ''} labelNumber={7}>服务费支付方式</InputItem>
          <InputItem editable={false} value={info.feePayer === '01' ? '用户' : '地产公司'} labelNumber={7}>服务费支付方</InputItem>
        </List>
        {
          info.decoration ? <List renderHeader={() => '备注信息'}>
            <TextareaItem rows={4} editable={false} value={info.description} />
          </List> : null
        }
        <List renderHeader={() => '用户服务协议'}>
          <Checkbox.AgreeItem disabled checked={newState.p1}>
            同意用户服务协议
            <a onClick={this.toProtocolPage} className={styles.fr}>协议内容</a>
          </Checkbox.AgreeItem>
          <Checkbox.AgreeItem disabled checked={newState.p2}>
            同意用户注册协议
            <a
              href="https://m-zl.mucfc.com/static/agreement/index.html?list=2"
              className={styles.fr}
              onClick={this.onAgreeChangedHandler.bind(this, 2)}
            >
              协议内容
            </a>
          </Checkbox.AgreeItem>
          <Checkbox.AgreeItem disabled checked={newState.p3}>
            个人征信等信息查询及使用授权书
            <a
              href={`https://m-zl.mucfc.com/static/agreement/index.html?list=4&${stringify({
                userId: info.idCard && info.idCard.replace(/^(\d{3})(.*)(.{4})$/, (...arg) => `${arg[1]}${''.padStart(arg[2].length, '*')}${arg[3]}`),
                userName: info.name && info.name.replace(/^(.{1})(.*)$/, '*$2'),
                agreementDate: moment().format('YYYY年MM月DD日'),
              })}`}
              className={styles.fr}
              onClick={this.onAgreeChangedHandler.bind(this, 3)}
            >
              协议内容
            </a>
          </Checkbox.AgreeItem>
          <Checkbox.AgreeItem disabled checked={newState.p4}>
            个人借款额度合同
            <a
              href={`https://m-zl.mucfc.com/static/agreement/index.html?list=9&${stringify({
                userId: info.idCard && info.idCard.replace(/^(\d{3})(.*)(.{4})$/, (...arg) => `${arg[1]}${''.padStart(arg[2].length, '*')}${arg[3]}`),
                userName: info.name && info.name.replace(/^(.{1})(.*)$/, '*$2'),
                userMobile: info.phoneNo && info.phoneNo.replace(/^(.{3})(.*)(.{4})$/, '$1****$3'),
              })}`}
              className={styles.fr}
              onClick={this.onAgreeChangedHandler.bind(this, 4)}
            >
              协议内容
            </a>
          </Checkbox.AgreeItem>
          <Checkbox.AgreeItem disabled checked={newState.p5}>
            芝麻授权协议
            <a
              href="https://m-zl.mucfc.com/static/agreement/index.html?list=AUTHORIZATION_SESAME"
              className={styles.fr}
              onClick={this.onAgreeChangedHandler.bind(this, 5)}
            >
              协议内容
            </a>
          </Checkbox.AgreeItem>
        </List>
        <WhiteSpace size="xl" />
        <div className={styles['btn-container']}>
          <Button type="primary" disabled={Object.values(newState).length !== 5} onClick={this.onRenderNoticePageHandler}>确定</Button>
        </div>
      </Loading>
    </div>);
  }
}
