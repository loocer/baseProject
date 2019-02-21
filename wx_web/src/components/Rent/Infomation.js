import React from 'react';
import { createForm } from 'rc-form';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { List, Toast, WhiteSpace } from 'antd-mobile';
import { deducePlatform } from '../../utils/platform';
import { close } from '../../utils/pageutil';
import { MORE_THAN_THREE_ZH_CN, NUMBER, ZH_CN, PHONE } from '../../utils/pattern';
import { MARRIAGE, MARRIED, QUALFICATIONS } from '../../picker-data';
import InputItem from '../common/InputItem';
import CompanyInputItem from '../common/CompanyInputItem';
import Picker from '../common/Picker';
import Loading from '../common/Loading';
import BaseFormContext from '../common/BaseFormContext';
import Alert from '../common/Alert';
import Button from '../common/Button';
import Notice from './Notice';
import styles from './Infomation.less';

const pickers = ['marriage', 'qualifications'];

function transformPicker(arr) {
  return arr ? arr[arr.length - 1] : arr;
}

@connect(state => ({
  loan: state.rent.loan || {},
  contract: state.rent.contract,
  user: state.global.user,
  loading: state.loading.models.rent || state.loading.models.global,
}))
@createForm()
export default class RentInfomation extends BaseFormContext {
  state = { emergencyMessage: {} };

  componentWillMount() {
    const { dispatch, id, redirected } = this.props;

    if (!redirected) {
      dispatch({ type: 'face/getLiveCheckResult' }).then(({ manuallyCertification }) => {
        if (manuallyCertification) {
          dispatch(routerRedux.replace({
            pathname: `/rent/${btoa(id)}/ocr`,
            search: `?redirect=/rent/${btoa(id)}&hasHold=true`,
          }));
        } else {
          this.init();
        }
      });
    } else {
      this.init();
    }
  }

  componentWillReceiveProps(nextProps) {
    const { contract, id, loan } = nextProps;

    if (!this.state.info && loan[id] && loan[id].info) {
      this.setState({
        contract: contract && contract[id],
        info: loan[id].info,
        isMarried: loan[id].info.marriage === MARRIED,
      });
    } else if (!this.state.contract) {
      this.setState({ contract: contract && contract[id] });
    }

    // 初始化驳回错误信息
    this.initRejectError(nextProps, 'person');
  }

  init = () => {
    const {
      dispatch, id, success, redirected,
    } = this.props;
    dispatch({ type: 'rent/getLoan', payload: id });
    dispatch({ type: 'rent/getContract', payload: id });
    dispatch({ type: 'global/getUserInfo' }).then(() => {
      const { certificationPasswd } = this.props.user;
      if (!certificationPasswd && !redirected) {
        Alert({
          title: <div>您还没有进行实名认证<div>需要实名认证才可以完善订单哦~</div></div>,
          okText: '立即认证',
          cancelText: '稍后再来',
          onOkHandler: () => {
            dispatch(routerRedux.push({ pathname: '/rna/id', search: `?redirect=/rent/${btoa(id)}` }));
          },
          onCancelHandler: () => {
            if (deducePlatform()) close();
            else dispatch(routerRedux.push('/'));
          },
        });
      }
    });

    if (success) {
      Toast.success('实名认证已通过，请继续完善订单');
    }
  }

  onMarriageChangedHandler = ([marriage]) => {
    this.setState({ isMarried: marriage === MARRIED });
  }

  onHidePopInfoHandler = () => {
    document.body.style.overflow = 'auto';
    this.setState({ visible: false });
  }

  onOkHandler = () => {
    this.props.form.validateFields((err, value) => {
      document.body.scrollTop = 0;
      if (err) {
        this.setState({ error: err });
        Toast.fail('请正确输入信息', 2, null, false);
      } else {
        const { dispatch, id, edit } = this.props;
        const { ...params } = value;

        pickers.forEach((picker) => {
          if (params[picker]) [params[picker]] = params[picker]; // eslint-dsiable-line
        });
        ['emergencyOtherTel', 'emergencyTel', 'mateMobile'].forEach((tel) => {
          if (params && params[tel]) params[tel] = params[tel].replace(/\s/ig, '');
        });

        params.emergencyInfoVos = [
          { name: value.emergencyOtherName, phoneNo: value.emergencyOtherTel },
        ];
        if (this.state.isMarried) {
          params.mateName = value.mateName;
          params.mateMobile = value.mateMobile;
        } else {
          params.emergencyInfoVos.push({
            name: value.emergencyName, phoneNo: value.emergencyTel,
          });
        }

        dispatch({ type: 'rent/saveInfo', payload: { info: { ...params }, id } }).then(() => {
          dispatch(routerRedux.push({
            pathname: `/rent/${btoa(id)}/step/1`,
            search: `?edit=${edit || ''}`,
          }));
        });
      }
    });
  }

  compareName = (prop) => {
    const MAPPING = {
      mateName: '配偶姓名',
      emergencyName: '紧急联系人一姓名',
      emergencyOtherName: '紧急联系人二姓名',
    };
    const { form: { getFieldsValue }, id, loan } = this.props;
    const validator = (rule, value, callback) => {
      const values = getFieldsValue(Object.keys(MAPPING));
      const { info } = (loan && loan[id]) || {};
      let errorProp;

      Object.keys(MAPPING).forEach((key) => {
        const val = values[key] ? values[key] : '';
        if (key !== prop && value === val.replace(/\s+/g, '')) errorProp = key;
      });

      if (errorProp) {
        callback({ message: `${MAPPING[prop]}不能与${MAPPING[errorProp]}相同` });
      } else if (info && info.userName === value) {
        callback({ message: `${MAPPING[prop]}不能与用户姓名相同` });
      } else {
        callback();
      }
    };

    return { validator };
  }

  compareTel = (prop) => {
    const MAPPING = {
      mateMobile: '配偶信息',
      emergencyTel: '紧急联系人一手机号',
      emergencyOtherTel: '紧急联系人二手机号',
    };
    const { form: { getFieldsValue }, id, loan } = this.props;
    const validator = (rule, value, callback) => {
      const values = getFieldsValue(Object.keys(MAPPING));
      const { info } = (loan && loan[id]) || {};
      let errorProp;

      Object.keys(MAPPING).forEach((key) => {
        const val = values[key] ? values[key] : '';
        if (key !== prop && value === val.replace(/\s+/g, '')) errorProp = key;
      });
      if (errorProp) {
        callback({ message: `${MAPPING[prop]}不能与${MAPPING[errorProp]}相同` });
      } else if (info && info.userCellphone === value) {
        callback({ message: `${MAPPING[prop]}不能与用户手机号相同` });
      } else {
        callback();
      }
    };

    return { validator };
  }

  setEmergencyErrorMessage = (type, message) => {
    if (this.state.emergencyMessage[type] !== message) {
      this.setState({
        emergencyMessage: Object.assign({}, this.state.emergencyMessage, { [type]: message }),
      });
    }
  }

  renderEmergencyInfo = () => {
    const { loan, id } = this.props;
    const info = (loan[id] && loan[id].info) || {};
    const messages = Object.values(this.state.emergencyMessage).filter(item => !!item);

    return (<List renderHeader={() => <div><i className={styles.required} />紧急联系人 (2位)</div>}>
      {
        this.state.isMarried ? <section className={styles.contact}>
          <InputItem
            {
              ...this.getFieldDecorator('mateName', {
                rules: [
                  { required: true, message: '请输入配偶姓名' },
                  { pattern: ZH_CN, message: '姓名必须为中文名称' },
                  this.compareName('mateName'),
                ],
              })
            }
            placeholder="请输入配偶姓名"
            onError={this.setEmergencyErrorMessage.bind(this, 'mateName')}
          />
          <div />
          <InputItem
            {
              ...this.getFieldDecorator('mateMobile', {
                initialValue: info && info.mateTel,
                rules: [
                  { required: true, message: '请输入配偶手机号' },
                  { pattern: PHONE, message: '请输入正确的手机号码', transform(value) { return value ? value.replace(/\s/ig, '') : value; } },
                  this.compareTel('mateMobile'),
                ],
              })
            }
            onError={this.setEmergencyErrorMessage.bind(this, 'mateMobile')}
            type="number"
            maxLength={11}
            placeholder="请输入配偶手机号"
          />
        </section> : <section className={styles.contact}>
          <InputItem
            {
              ...this.getFieldDecorator('emergencyName', {
                rules: [
                  { required: true, message: '请输入联系人姓名' },
                  { pattern: ZH_CN, message: '姓名必须为中文名称' },
                  this.compareName('emergencyName'),
                ],
              })
            }
            onError={this.setEmergencyErrorMessage.bind(this, 'emergencyName')}
            placeholder="请输入联系人姓名"
          />
          <div />
          <InputItem
            {
              ...this.getFieldDecorator('emergencyTel', {
                rules: [
                  { required: true, message: '请输入联系人手机号' },
                  { pattern: PHONE, message: '请输入正确的手机号码', transform(value) { return value ? value.replace(/\s/ig, '') : value; } },
                  this.compareTel('emergencyTel'),
                ],
              })
            }
            onError={this.setEmergencyErrorMessage.bind(this, 'emergencyTel')}
            type="number"
            maxLength={11}
            placeholder="请输入联系人手机号"
          />
        </section>
      }
      <section className={styles.contact}>
        <InputItem
          {
            ...this.getFieldDecorator('emergencyOtherName', {
              rules: [
                { required: true, message: '请输入联系人姓名' },
                { pattern: ZH_CN, message: '姓名必须为中文名称' },
                this.compareName('emergencyOtherName'),
              ],
            })
          }
          placeholder="请输入联系人姓名"
          onError={this.setEmergencyErrorMessage.bind(this, 'emergencyOtherName')}
        />
        <div />
        <InputItem
          {
            ...this.getFieldDecorator('emergencyOtherTel', {
              rules: [
                { required: true, message: '请输入联系人手机号' },
                { pattern: PHONE, message: '请输入正确的手机号码', transform(value) { return value ? value.replace(/\s/ig, '') : value; } },
                this.compareTel('emergencyOtherTel'),
              ],
            })
          }
          type="number"
          maxLength={11}
          placeholder="请输入联系人手机号"
          onError={this.setEmergencyErrorMessage.bind(this, 'emergencyOtherTel')}
        />
      </section>
      <div className={styles.error}>
        {messages.map(msg => <div>{msg}</div>)}
      </div>
    </List>);
  }

  render() {
    const { loan, id } = this.props;
    const info = (loan[id] && loan[id].info) || {};

    if (!localStorage.getItem('$$RENT-NOTICE-POPED') && !this.state.poped) {
      return <Notice onClose={() => { this.setState({ poped: true }); }} />;
    }

    return (<Loading loading={this.props.loading}>
      <div className={styles['step-info']} style={{ paddingBottom: '.75rem' }}>
        <WhiteSpace size="xs" />
        <List>
          <Picker
            {
              ...this.getFieldDecorator('qualifications', {
                initialValue: info.qualifications && [info.qualifications],
                rules: [{ required: true, message: '请选择最高学历', transform: transformPicker }],
              })
            }
            data={QUALFICATIONS}
            cols={1}
          >学历</Picker>
          <Picker
            {
              ...this.getFieldDecorator('marriage', {
                initialValue: info.marriage && [info.marriage],
                onChange: this.onMarriageChangedHandler,
                rules: [{ required: true, message: '请选择婚姻状况', transform: transformPicker }],
              })
            }
            data={MARRIAGE}
            cols={1}
          >婚姻</Picker>
          <CompanyInputItem
            loanId={id}
            {
              ...this.getFieldDecorator('companyName', {
                rules: [
                  { required: true, message: '请输入关键字查询企业名称' },
                  { pattern: MORE_THAN_THREE_ZH_CN, message: '企业名称不能少于三个汉字' },
                ],
              }, ~['无', '无固定单位'].indexOf(info.companyName))
            }
            placeholder="请输入关键字查询企业名称"
            labelNumber={7}
            title="工作单位"
          >工作单位</CompanyInputItem>
          <InputItem
            {
              ...this.getFieldDecorator('salary', {
                initialValue: info.income,
                rules: [
                  { required: true, message: '请输入月均收入' },
                  { pattern: NUMBER, message: '收入必须为纯数字' },
                ],
              })
            }
            labelNumber={7}
            placeholder="请输入月均收入(税后)"
          >月均收入(税后)</InputItem>
        </List>
        {this.renderEmergencyInfo()}
        <div style={{ height: '.1rem' }} />
        <div className={styles['btn-container']}>
          <Button type="primary" onClick={this.onOkHandler}>下一步</Button>
        </div>
      </div>
    </Loading>);
  }
}
