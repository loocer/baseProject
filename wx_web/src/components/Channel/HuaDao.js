import React from 'react';
import { createForm } from 'rc-form';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { List, WhiteSpace, Toast } from 'antd-mobile';
import { PAGE_PREFIX } from '../../constants';
import BaseFormContext from '../common/BaseFormContext';
import InputItem from '../common/InputItem';
import Loading from '../common/Loading';
import Button from '../common/Button';
import styles from '../common/List.less';

@connect(state => Object.assign({ loading: state.loading.models.loan }, state.channel.huadao || {}))
@createForm()
export default class HuaDao extends BaseFormContext {
  state = {};

  componentWillMount() {
    const { dispatch, id } = this.props;
    dispatch({ type: 'channel/sendHuaDaoCode', payload: id });
  }

  onOkHandler = () => {
    const { form, dispatch, id } = this.props;
    form.validateFields((err, value) => {
      if (!err) {
        dispatch({ type: 'channel/authHuaDao', payload: { loanId: id, smsCode: value.smsCode } }).then(() => {
          const { check: { url } } = this.props;
          const path = /(https?:\/\/[^/]*)/.exec(window.location.href)[1];
          /* eslint-disable no-template-curly-in-string */
          if (url === '1' || url === 1) {
            dispatch(routerRedux.push({ patname: `/channel/${btoa(id)}/auth/success` }));
          } else {
            window.location.href = url.replace('${redirect}', `${path}${PAGE_PREFIX}/channel/${btoa(id)}/auth/success`);
          }
        });
      } else {
        Toast.fail('请输入验证码', 2, null, false);
      }
    });
  }

  render() {
    const { getFieldProps } = this.props.form;

    return (<Loading loading={this.props.loading}>
      <div className={styles['step-info']}>
        <WhiteSpace size="xl" />
        <List>
          <InputItem
            {
              ...getFieldProps('smsCode', {
                rules: [
                  { required: true, message: '请输入手机验证码' },
                ],
              })
            }
            placeholder="请输入手机验证码"
            maxLength={8}
          >手机验证码
          </InputItem>
        </List>
        <footer><Button type="primary" onClick={this.onOkHandler}>提交</Button></footer>
      </div>
    </Loading>);
  }
}
