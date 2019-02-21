import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { stringify } from 'query-string';
import { createForm } from 'rc-form';
import { List, WhiteSpace, Toast } from 'antd-mobile';
import BaseFormContext from '../common/BaseFormContext';
import InputItem from '../common/InputItem';
import Picker from '../common/Picker';
import { INDIV_POSITION } from '../../picker-data';
import { ZH_CN, ID_CARD, PHONE, MORE_THAN_THREE_ZH_CN } from '../../utils/pattern';
import Button from '../common/Button';
import styles from './Credit.less';

const PICKERS = ['married', 'post', 'expectedPeriod'];

@connect(state => ({
  award: state.credit.award,
  credit: state.credit.credit || [],
}))
@createForm()
export default class Award extends BaseFormContext {
  state = { credit: {} };

  componentWillMount() {
    this.props.dispatch({ type: 'global/getUserInfo' }).then(() => {
      this.props.dispatch({ type: 'credit/getCreditInfo' });
    });
  }

  componentWillReceiveProps(nextProps) {
    const { award, credit } = nextProps;

    this.setState({ credit, award });
  }

  onOkHandler = () => {
    const { form, dispatch } = this.props;

    form.validateFields((err, values) => {
      if (!err) {
        const payload = Object.assign({}, values);

        PICKERS.forEach((item) => {
          if (Array.isArray(values[item])) {
            payload[item] = values[item][0]; // eslint-disable-line
          }
        });

        dispatch({ type: 'credit/award', payload }).then(this.onAwardSuccessHandler, this.onAwardFailHandler);
      } else {
        this.setState({ error: err });
      }
    });
  }

  onAwardFailHandler = () => {
    this.props.dispatch(routerRedux.replace({
      pathname: '/credit/award/fail',
    }));
  }

  onAwardSuccessHandler = () => {
    const { award } = this.state;
    const params = {
      limit: award.creditLimit_show,
      couponShow: !!award.coupon_show,
      showIncreaseLimitBtn: award.showIncreaseLimitBtn,
    };

    this.props.dispatch(routerRedux.replace({
      pathname: '/credit/award/success',
      search: `?${stringify(params)}`,
    }));
  }

  decreaseNumber = () => {
    if (this.state.number) {
      this.setState({ number: this.state.number - 1 });
      setTimeout(this.decreaseNumber, 1000);
    }
  }

  onSendCaptureHandler = () => {
    if (this.state.number) return;
    const { form, dispatch } = this.props;
    form.validateFields(['phoneNo'], (err, values) => {
      if (err && err.phoneNo) {
        Toast.fail(err.phoneNo.errors[0].message, 2, null, false);
      } else {
        dispatch({ type: 'global/sendCaptcha', payload: values.phoneNo });
        this.setState({ number: 60 });
        setTimeout(this.decreaseNumber, 1000);
      }
    });
  }

  render() {
    const { getFieldProps } = this.props.form;
    const getFieldDecorator = (field, options) => {
      let initialValue = this.state.credit[field];
      if (field === 'post' && !/^\d+$/.test(this.state.credit[field])) {
        initialValue = null;
      } else if (PICKERS.indexOf(field) >= 0) {
        initialValue = [this.state.credit[field]];
      }
      const ops = Object.assign({ initialValue }, options);
      return Object.assign({ id: field, error: this.state.error }, getFieldProps(field, ops));
    };

    return (<div className={styles['step-info']}>
      <WhiteSpace size="xs" />
      <List>
        <InputItem
          {...getFieldDecorator('realName', {
            rules: [{ required: true, message: '请输入姓名' },
              { pattern: ZH_CN, message: '姓名必须为中文名称' }],
          })}
          placeholder="请输入姓名"
        >姓名
        </InputItem>
        <InputItem
          {...getFieldDecorator('idCard', {
            rules: [{ required: true, message: '请输入身份证号' },
              { pattern: ID_CARD, message: '请正确输入身份证号' }],
          })}
          placeholder="请输入身份证号"
        >身份证号
        </InputItem>
        <InputItem
          {...getFieldDecorator('phoneNo', {
            rules: [{ required: true, message: '请输入手机号' },
              { pattern: PHONE, message: '请正确输入手机号' }],
          })}
          placeholder="请输入手机号"
          maxLength={11}
          type="number"
        >手机号
        </InputItem>
        <Picker
          {...getFieldDecorator('married', {
            initialValue: [this.state.credit.isMarried],
            rules: [{ required: true, message: '请选择婚姻状况' }],
          })}
          data={[{}, { label: '已婚', value: true },
            { label: '未婚', value: false }]}
          cols={1}
        >婚姻状况
        </Picker>
      </List>
      <WhiteSpace size="xs" />
      <List>
        <InputItem
          {...getFieldDecorator('companyName', {
            rules: [{ required: true, message: '请输入工作单位名称' },
              { pattern: MORE_THAN_THREE_ZH_CN, message: '工作单位名称不能少于三个汉字' }],
          })}
          placeholder="请输入工作单位全称"
        >工作单位
        </InputItem>
        <Picker
          {...getFieldDecorator('post', {
            rules: [{ required: true, message: '请选择个人职务' }],
          })}
          data={INDIV_POSITION}
          cols={1}
        >个人职务
        </Picker>
        <InputItem
          {...getFieldDecorator('monthlyIncome', {
            rules: [{ required: true, message: '请输入税后月收入' }],
          })}
          placeholder="请输入金额"
          type="number"
        >税后月收入
        </InputItem>
      </List>
      <WhiteSpace size="xs" />
      <List>
        <InputItem
          {...getFieldDecorator('decorationArea', {
            rules: [{ required: true, message: '请输入待装修房屋面积' }],
          })}
          placeholder="请输入平米数"
          labelNumber={7}
          type="number"
        >待装修房屋面积
        </InputItem>
        <Picker
          {...getFieldDecorator('expectedPeriod', {
            rules: [{ required: true, message: '请选择期望分期期限' }],
          })}
          data={[{}, { label: '12期', value: 12 },
            { label: '24期', value: 24 },
            { label: '36期', value: 36 }]}
          cols={1}
        >期望分期期限
        </Picker>
        <InputItem
          {...getFieldDecorator('smsCode', {
            rules: [{ required: true, message: '请输入手机验证码' },
              { pattern: /^\d{4}$/, message: '请正确输入验证码' }],
          })}
          placeholder="请输入验证码"
          extra={<a
            style={{ color: `${this.state.number ? '#CCC' : '#1B98F4'}` }}
            onClick={this.onSendCaptureHandler}
          >
            {this.state.number ? `(${this.state.number})` : ''}获取验证码</a>}
          maxLength={4}
          type="number"
        >输入验证码
        </InputItem>
      </List>
      <WhiteSpace size="xs" />
      <div className={styles['btn-container']}>
        <Button type="primary" onClick={this.onOkHandler}>授信审批</Button>
      </div>
    </div>);
  }
}
