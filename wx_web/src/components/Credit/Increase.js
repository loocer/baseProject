import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { stringify } from 'query-string';
import { createForm } from 'rc-form';
import { VelocityTransitionGroup } from 'velocity-react';
import { List, WhiteSpace, Toast } from 'antd-mobile';
import BaseFormContext from '../common/BaseFormContext';
import InputItem from '../common/InputItem';
import Picker from '../common/Picker';
import { ZH_CN, PHONE, MORE_THAN_THREE_ZH_CN } from '../../utils/pattern';
import { INDIV_POSITION } from '../../picker-data';
import provinces from '../../utils/cascader-address-options';
import Button from '../common/Button';
import styles from './Credit.less';

const PICKERS = ['hasVehicle', 'deposit', 'hasOtherHouse', 'matePost'];

@connect(state => ({
  married: state.global.user.married,
  increase: state.credit.increase,
}))
@createForm()
export default class Increase extends BaseFormContext {
  constructor(props) {
    super(props);
    const { married } = props;
    this.state = { married };
  }

  componentWillMount() {
    this.props.dispatch({ type: 'global/getUserInfo' });
  }

  componentWillReceiveProps(nextProps) {
    const { married, increase } = nextProps;
    this.setState({ married, increase });
  }

  onOkHandler = () => {
    const { form, dispatch } = this.props;

    form.validateFields((err, values) => {
      if (!err) {
        const params = Object.assign({}, values);

        PICKERS.forEach((key) => {
          if (values[key]) {
            params[key] = values[key][0]; // eslint-disable-line
          }
        });

        if (values.otherHouseRegion) {
          params.otherHouseRegion = values.otherHouseRegion.join(',');
        }

        params.married = this.state.married;

        dispatch({ type: 'credit/increase', payload: params }).then(() => {
          const { increasedLimit_show, orginCreditLimit_show } = this.state.increase; // eslint-disable-line
          this.props.dispatch(routerRedux.replace({
            pathname: '/credit/increase/success',
            search: `?${stringify({ limit: orginCreditLimit_show, increase: increasedLimit_show })}`,
          }));
        }, () => {
          Toast.fail('提额失败');
        });
      } else {
        Toast.fail('请输入相关信息', 2, null, false);
      }
    });
  }

  render() {
    const { getFieldProps } = this.props.form;
    const getFieldDecorator = (field, options) => {
      return Object.assign({ id: field, error: this.state.error }, getFieldProps(field, options));
    };

    return (<div className={styles['step-info']}>
      <WhiteSpace size="xs" />
      <List>
        <Picker
          {...getFieldDecorator('hasVehicle', {
            rules: [{ required: true, message: '请选择名下机动车' }],
          })}
          data={[{}, { label: '是', value: true }, { label: '否', value: false }]}
          cols={1}
        >名下机动车
        </Picker>
        <Picker
          {...getFieldDecorator('deposit', {
            rules: [{ required: true, message: '请选择个人存款' }],
          })}
          data={[{}, { label: '10万以下', value: '10万以下' },
            { label: '10万-30万', value: '10万-30万' },
            { label: '30万以上', value: '30万以上' }]}
          cols={1}
        >个人存款
        </Picker>
        <Picker
          {...getFieldDecorator('hasOtherHouse', {
            onChange: (values) => { this.setState({ hasOtherHouse: values[0] }); },
            rules: [{ required: true, message: '请选择名下其它房产' }],
          })}
          labelNumber={6}
          data={[{}, { label: '是', value: true }, { label: '否', value: false }]}
          cols={1}
        >名下其它房产
        </Picker>
        <VelocityTransitionGroup enter={{ animation: 'slideDown' }} leave={{ animation: 'slideUp' }}>
          {
            this.state.hasOtherHouse ? <div>
              <Picker
                {...getFieldDecorator('otherHouseRegion', {
                  rules: [{ required: true, message: '请选择其它住房所在区域' }],
                })}
                data={provinces}
                labelNumber={7}
              >其它住房所在区域
              </Picker>
              <InputItem
                {...getFieldDecorator('otherHouseAddr', {
                  rules: [{ required: true, message: '请输入其它住房详细地址' }],
                })}
                placeholder="请输入详细地址"
                labelNumber={6}
              >其它住房地址
              </InputItem>
              <InputItem
                {...getFieldDecorator('otherMonthlyRepayment', {
                  rules: [{ required: true, message: '请输入当前余额还款额' }],
                })}
                placeholder="请输入当前月还款额"
                labelNumber={6}
                type="number"
              >其它月付贷款
              </InputItem>
            </div> : null
          }
        </VelocityTransitionGroup>
      </List>
      <VelocityTransitionGroup enter={{ animation: 'slideDown' }} leave={{ animation: 'slideUp' }}>
        {
          this.state.married ? <div>
            <WhiteSpace size="xs" />
            <List>
              <InputItem
                {...getFieldDecorator('mateName', {
                  rules: [{ required: true, message: '请输入配偶姓名' },
                    { pattern: ZH_CN, message: '姓名必须为中文名称' }],
                })}
                placeholder="请输入配偶姓名"
                labelNumber={7}
              >配偶姓名
              </InputItem>
              <InputItem
                {...getFieldDecorator('matePhoneNo', {
                  rules: [{ required: true, message: '请输入手机号码' },
                    { pattern: PHONE, message: '请正确输入手机号码' }],
                })}
                placeholder="请输入手机号码"
                maxLength={11}
                type="number"
              >手机号码
              </InputItem>
              <InputItem
                {...getFieldDecorator('mateCompanyName', {
                  rules: [{ required: true, message: '请输入工作单位名称' },
                    { pattern: MORE_THAN_THREE_ZH_CN, message: '单位名称不能少于三个汉字' }],
                })}
                placeholder="请输入工作单位名称"
              >工作单位
              </InputItem>
              <Picker
                {...getFieldDecorator('matePost', {
                  rules: [{ required: true, message: '请选择职务' }],
                })}
                data={INDIV_POSITION}
                cols={1}
              >个人职务
              </Picker>
              <InputItem
                {...getFieldDecorator('mateMonthlyIncome', {
                  rules: [{ required: true, message: '请输入金额' }],
                })}
                placeholder="请输入金额"
                type="number"
              >税后月收入
              </InputItem>
            </List>
          </div> : null
        }
      </VelocityTransitionGroup>
      <WhiteSpace size="xs" />
      <div className={styles['btn-container']}>
        <Button type="primary" onClick={this.onOkHandler}>立即提额</Button>
      </div>
    </div>);
  }
}
