import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { createForm } from 'rc-form';
import { routerRedux } from 'dva/router';
import { List, WhiteSpace, Toast } from 'antd-mobile';
import InputItem from '../common/InputItem';
import Picker from '../common/Picker';
import Loading from '../common/Loading';
import Button from '../common/Button';
import styles from './PaymentInfo.less';
import { BAOFOO_BANKS } from '../../picker-data';
import { PHONE, BANK_CARD } from '../../utils/pattern';

@connect(state => ({
  user: state.global.user || {},
  formData: state.payment.formData,
}))
@createForm()
export default class PaymentInfo extends Component {
  static childContextTypes = {
    form: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  getChildContext() {
    return { form: this.props.form };
  }

  componentWillMount() {
    this.props.dispatch({ type: 'global/getUserInfo' });
  }

  onConfirmHandle = (e) => {
    const { dispatch } = this.props;
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({ loading: true });
        values.bankCode = Array.isArray(values.bankCode) ? values.bankCode[0] : values.bankCode; // eslint-disable-line
        dispatch({ type: 'payment/bindCard', payload: { values } }).then(() => {
          this.props.dispatch(routerRedux.go(-1));
        }, () => {
          this.setState({ loading: false });
        });
      } else {
        Toast.fail('请正确输入信息', 2, null, false);
        this.setState({ error: err });
      }
    });
  }

  render() {
    const { getFieldProps } = this.props.form;
    const { error } = this.state;
    const getFieldDecorator = (field, options) => {
      return Object.assign({ id: field, error }, getFieldProps(field, options));
    };
    return (<Loading loading={this.state.loading} mask={false}>
      <div className={`${styles['step-info']} ${styles['payment-info']}`}>
        <WhiteSpace size="xs" />
        <List>
          <Picker
            {
              ...getFieldDecorator('bankCode', {
                rules: [{ required: true, message: '请选择银行' }],
                initialValue: this.props.formData.bankCode,
              })
            }
            data={BAOFOO_BANKS}
            extra="请选择银行"
            cols={1}
          >银行
          </Picker>
          <InputItem
            {
              ...getFieldDecorator('cardNumber', {
                rules: [
                  { required: true, message: '请输入银行卡号' },
                  { pattern: BANK_CARD, message: '请输入正确的银行卡号' },
                ],
                initialValue: this.props.formData.cardNumber,
              })
            }
            clear
            placeholder="请输入银行卡号"
            labelNumber={6}
          >银行卡号
          </InputItem>
        </List>
        <WhiteSpace size="xs" />
        <List>
          <InputItem
            {
              ...getFieldDecorator('accountName', {
                initialValue: this.props.formData.accountName || this.props.user.realName,
              })
            }
            editable={false}
            placeholder="请输入您的真实姓名"
            labelNumber={6}
          >姓名
          </InputItem>
          <InputItem
            {
              ...getFieldDecorator('idCard', {
                initialValue: this.props.formData.idCard || this.props.user.idCard,
              })
            }
            editable={false}
            placeholder="请输入您的身份证号"
            maxLength={18}
            labelNumber={6}
          >身份证号
          </InputItem>
          <InputItem
            {
              ...getFieldDecorator('mobile', {
                initialValue: this.props.formData.mobile,
                rules: [
                  { required: true, message: '请输入银行卡预留手机号' },
                  { pattern: PHONE, message: '请输入正确的手机号' },
                ],
              })
            }
            clear
            placeholder="请输入银行卡预留手机号"
            labelNumber={6}
          >预留手机号
          </InputItem>
        </List>
        <div className={styles['btn-container']}><Button className="btn btn-reject" type="primary" onClick={this.onConfirmHandle}>确认</Button></div>
      </div>
    </Loading>
    );
  }
}
