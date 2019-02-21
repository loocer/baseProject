import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { List, WhiteSpace, Switch, Toast } from 'antd-mobile';
import { createForm } from 'rc-form';
import { VelocityTransitionGroup } from 'velocity-react';
import BaseFormContext from '../common/BaseFormContext';
import Header from './Header';
import Loading from '../common/Loading';
import InputItem from '../common/InputItem';
import CompanyInputItem from '../common/CompanyInputItemWithAnimating';
import Picker from '../common/Picker';
import { RELATION_WITHOUT_MARRIAGE, MARRIED, RELATION_MARRIED, QUALFICATIONS, SOCIAL_JOB_FOR_DECORATION, INDIV_POSITION, BANKS } from '../../picker-data';
import { ZH_CN, PHONE, TEL_OR_400, TEL_OR_PHONE, ID_CARD, MORE_THAN_THREE_ZH_CN, DIALING_CODE, NUMBER } from '../../utils/pattern';
import { RAF } from '../../utils/bomutil';
import provinces from '../../utils/cascader-address-options';
import Button from '../common/Button';
import styles from '../common/List.less';
import './DecorationStep1.less';

function transformPicker(arr) {
  return arr ? arr[arr.length - 1] : arr;
}

function transformAreaPicker(arr) {
  return arr ? arr[2] : arr;
}

const THRESHOLD_VALUE = 200000;
const JOB_MAPPING = {
  '01': {
    visible: true,
    nameLabel: '现单位名称',
    areaLabel: '现单位区域',
    addressLabel: '单位详细地址',
    codeLabel: '工作单位电话区号',
    telLabel: '工作单位电话',
    telReg: TEL_OR_400,
  },
  '02': { visible: false },
  '03': {
    visible: true,
    nameLabel: '经营执照名称',
    areaLabel: '经营所在地区',
    addressLabel: '经营详细地址',
    codeLabel: '经营城市电话区号',
    telLabel: '座机或手机号码',
    telReg: TEL_OR_PHONE,
  },
  90: { visible: false },
  99: { visible: false },
};
const pickers = [
  'commonRelation',
  'commonTwoRelation',
  'commonThreeRelation',
  'commonBankCode',
  'commonTwoBankCode',
  'commonThreeBankCode',
  'emergencyRelation',
  'emergencyOtherRelation',
  'gjrQualifications',
  'gjrTwoQualifications',
  'gjrThreeQualifications',
  'gjrProfession',
  'gjrTwoProfession',
  'gjrThreeProfession',
  'gjrPost',
  'gjrTwoPost',
  'gjrThreePost',
];

@connect(state => ({
  loan: state.decoration.loan,
  amount: state.decoration.amount,
  guarantorCount: state.decoration.guarantorCount,
  loading: state.loading.models.decoration,
}))
@createForm()
export default class DecorationStep1Related extends BaseFormContext {
  constructor(props) {
    super(props);
    this.state = { hasCommonInfo: true };
  }

  componentWillMount() {
    const { dispatch, id } = this.props;
    dispatch({ type: 'decoration/getLoan', payload: id }).then(() => {
      const { loan } = this.props;
      if (loan && loan[id] && !this.inited) {
        const { info = {} } = loan[id];
        this.inited = true;
        RAF(() => {
          this.setState({
            info,
            isMarried: info.marriage === MARRIED,
            gjrProfession: info.gjrProfession,
          });
        });
      }
    });
    dispatch({ type: 'decoration/getLoanAmount', payload: id });
  }

  componentWillReceiveProps(nextProps) {
    const { amount, id, guarantorCount } = nextProps;

    if (amount && amount[id]) {
      this.setState({
        guarantorCount: guarantorCount && guarantorCount[id],
        amount: amount[id],
      });
    }

    // 初始化驳回原因高亮信息
    this.initRejectError(nextProps, 'person');
  }

  onCompanyChangeHandler = (type, {
    regProvince, regCity, regArea, regLocation,
  }) => {
    if (type === 'gjr') {
      this.props.form.setFieldsValue({
        gjrCompanyArea: [regProvince, regCity, regArea],
        gjrCompanyAddr: regLocation,
      });
    } else {
      this.props.form.setFieldsValue({
        commonCompanyAddr: regLocation,
      });
    }
  }

  onGjrSocialJobChangedHandler = (keys) => {
    this.setState({ gjrProfession: keys[0] });
  }

  onGjrTelChangedHandler = (val) => {
    this.setState({ telChanged: val.replace(/\s/g, '') !== this.state.info.commonTel });
  }

  onOkHandler = () => {
    this.props.form.validateFields((err, value) => {
      document.body.scrollTop = 0;
      if (err) {
        this.setState({ error: err });
        Toast.fail('请正确输入信息', 2, null, false);
      } else {
        this.doSaveInfo(value);
      }
    });
  }

  doSaveInfo = (value) => {
    const { dispatch, id } = this.props;
    pickers.forEach((picker) => {
      if (value[picker]) {
        value[picker] = value[picker][0]; // eslint-disable-line
      }
    });
    // 电话号码去掉空白符
    ['commonTel', 'commonTwoTel', 'commonThreeTel', 'emergencyTel', 'emergencyOtherTel'].forEach((tel) => {
      if (value[tel]) value[tel] = value[tel].replace(/\s/ig, '');
    });
    // 共借人单位省市区信息
    if (value[this.getCommonParamName('gjrCompanyArea')] && value[this.getCommonParamName('gjrCompanyArea')].length) {
      const [pro, city, area] = value[this.getCommonParamName('gjrCompanyArea')];
      value[this.getCommonParamName('gjrCompanyProvince')] = pro;
      value[this.getCommonParamName('gjrCompanyCity')] = city;
      value[this.getCommonParamName('gjrCompanyArea')] = area;
    }
    if ((this.state.isMarried || this.state.amount > THRESHOLD_VALUE)
      && this.props.step === 1) {
      value.commonRelation = RELATION_MARRIED;
    }
    // 处理共借人单位信息及单位详细地址信息无法输入的问题
    if (value[this.getCommonParamName('gjrCompanyName')]) {
      value[this.getCommonParamName('commonCompanyName')] = value[this.getCommonParamName('gjrCompanyName')];
      delete value[this.getCommonParamName('gjrCompanyName')];
    }
    if (value[this.getCommonParamName('gjrCompanyAddr')]) {
      value[this.getCommonParamName('commonCompanyAddr')] = value[this.getCommonParamName('gjrCompanyAddr')];
      delete value[this.getCommonParamName('gjrCompanyAddr')];
    }

    dispatch({ type: 'decoration/saveInfo', payload: { info: value, id: this.props.id } }).then(() => {
      if (this.props.step < this.state.guarantorCount) {
        dispatch(routerRedux.push({
          pathname: `/decoration/${btoa(id)}/step/1/related/${this.props.step + 1}`,
        }));
      } else {
        dispatch(routerRedux.push({
          pathname: `/decoration/${btoa(id)}/step/2`,
        }));
      }
    });
  }

  onSendCaptchaHandler = () => {
    if (this.state.seconds) return;
    const phone = this.props.form.getFieldValue(this.getCommonParamName('commonTel'));
    if (!phone || !PHONE.test(phone.replace(/\s+/g, ''))) {
      document.body.scrollTop = 0;
      Toast.fail('请正确输入手机号码', 2, null, false);
      return;
    }
    this.props.dispatch({ type: 'global/sendCaptcha', payload: phone.replace(/\s+/g, '') });
    const intervalId = setInterval(() => {
      if (this.state.seconds === 0) {
        clearInterval(intervalId);
        this.setState({ seconds: undefined });
      } else {
        this.setState({ seconds: this.state.seconds ? this.state.seconds - 1 : 60 });
      }
    }, 1000);
  }

  compareTel = (prop) => {
    const MAPPING = {
      commonTel: '共借人手机号',
      commonTwoTel: '共借人二手机号',
      commonThreeTel: '共借人三手机号',
      emergencyTel: '紧急联系人一手机号',
      emergencyOtherTel: '紧急联系人二手机号',
      gjrCompanyPhone: '共借人单位电话',
    };
    const { getFieldsValue } = this.props.form;
    const validator = (rule, value, callback) => {
      const values = getFieldsValue(Object.keys(MAPPING));
      let errorProp;
      Object.keys(MAPPING).forEach((key) => {
        const val = values[key] ? values[key] : '';
        if (key !== prop && value === val.replace(/\s+/g, '')) errorProp = key;
      });
      if (errorProp) {
        callback({ message: `${MAPPING[prop]}不能与${MAPPING[errorProp]}相同` });
      } else if (value === this.state.info.userCellphone) {
        callback({ message: `${MAPPING[prop]}不能与用户手机号码相同` });
      } else {
        callback();
      }
    };
    return { validator };
  }

  getCommonParamName = (name) => {
    const infoStep = { 1: '', 2: 'Two', 3: 'Three' }[this.props.step];
    return name.replace(/([a-z]+)/, `$1${infoStep}`);
  }

  renderCommon = () => {
    const { getFieldProps } = this.props.form;
    const { info = {} } = this.state;
    const JOB = JOB_MAPPING[this.state.gjrProfession || '01'];
    const getFieldDecorator = (name, options) =>
      this.getFieldDecorator(this.getCommonParamName(name), options);

    return (<List
      renderHeader={() => {
        if (this.state.amount <= THRESHOLD_VALUE && !this.state.isMarried) {
          return (<div className={styles['switch-item']}>共借人{{ 1: '', 2: '二', 3: '三' }[this.props.step]}信息
            <span style={{ float: 'right' }}>
              <Switch
                platform="ios"
                {...getFieldProps('hasCommonInfo', {
                  valuePropName: 'checked',
                  initialValue: this.state.hasCommonInfo,
                  onChange: (value) => { this.setState({ hasCommonInfo: value }); },
                })}
              />
            </span>
          </div>);
        } else {
          return '共借人信息';
        }
      }}
    >
      <VelocityTransitionGroup enter={{ animation: 'slideDown' }} leave={{ animation: 'slideUp' }}>
        {
          this.state.hasCommonInfo ? <div>
            <InputItem
              {
                ...getFieldDecorator('commonName', {
                  rules: [
                    { required: true, message: '请输入共借人姓名' },
                    { pattern: ZH_CN, message: '共借人姓名必须为中文名称' },
                  ],
                })
              }
              placeholder="请输入姓名"
            >姓名
            </InputItem>
            <InputItem
              {
                ...getFieldDecorator('commonTel', {
                  rules: [
                    { required: true, message: '请输入共借人手机号' },
                    { pattern: PHONE, message: '请输入正确的手机号码', transform(value) { return value ? value.replace(/\s/ig, '') : value; } },
                    this.compareTel(this.getCommonParamName('commonTel')),
                  ],
                  onChange: this.onGjrTelChangedHandler,
                })
              }
              type="number"
              maxLength={11}
              placeholder="请输入手机号"
            >手机号
            </InputItem>
            {
              this.state.amount > THRESHOLD_VALUE && (!info.commonName || this.state.telChanged) ?
                <InputItem
                  {
                    ...getFieldDecorator('gjrPhoneCode', {
                      rules: [{ required: true, message: '请输入验证码' }],
                    })
                  }
                  placeholder="请输入手机验证码"
                  maxLength={4}
                  type="number"
                  extra={<a style={{ color: '#1b98f4', fontSize: '.12rem' }} onClick={this.onSendCaptchaHandler}>
                    {
                    typeof this.state.seconds === 'number' ?
                      <span style={{ color: '#CCC' }}>({this.state.seconds})</span>
                        :
                      null
                  }发送验证码</a>}
                >验证码
                </InputItem> : null
            }
            <InputItem
              {
                ...getFieldDecorator('commonIdCard', {
                  rules: [
                    { required: true, message: '请输入共借人身份证号' },
                    { pattern: ID_CARD, message: '请输入正确的身份证号' },
                  ],
                })
              }
              placeholder="请输入身份证号"
            >身份证号
            </InputItem>
            {
              this.state.amount > THRESHOLD_VALUE ? <div>
                <Picker
                  {
                    ...getFieldDecorator('gjrQualifications', {
                      initialValue: [info[this.getCommonParamName('gjrQualifications')]],
                      rules: [
                        { required: true, message: '请选择最高学历', transform: transformPicker },
                      ],
                    })
                  }
                  data={QUALFICATIONS}
                  cols={1}
                >最高学历
                </Picker>
                <Picker
                  {
                    ...getFieldDecorator('gjrProfession', {
                      onChange: this.onGjrSocialJobChangedHandler,
                      initialValue: [info[this.getCommonParamName('gjrProfession')]],
                      rules: [{ required: true, message: '请请选择社会职业', transform: transformPicker }],
                    })
                  }
                  data={SOCIAL_JOB_FOR_DECORATION}
                  cols={1}
                >社会职业
                </Picker>
                <VelocityTransitionGroup enter={{ animation: 'slideDown' }} leave={{ animation: 'slideUp' }}>
                  {
                    JOB.visible ? <div>
                      <Picker
                        {
                          ...getFieldDecorator('gjrPost', {
                            initialValue: [info[this.getCommonParamName('gjrPost')]],
                            rules: [{ required: true, message: '请选择职务', transform: transformPicker }],
                          })
                        }
                        data={INDIV_POSITION}
                        cols={1}
                      >职务
                      </Picker>
                      <Picker
                        data={provinces}
                        {
                          ...getFieldDecorator('gjrCompanyArea', {
                            initialValue: info[this.getCommonParamName('gjrCompanyArea')] ?
                              [info[this.getCommonParamName('gjrCompanyProvince')],
                                info[this.getCommonParamName('gjrCompanyCity')],
                                  info[this.getCommonParamName('gjrCompanyArea')]]
                              : [],
                            rules: [{ required: true, message: `请选择${JOB.areaLabel}`, transform: transformAreaPicker }],
                          })
                        }
                      >{JOB.areaLabel}
                      </Picker>
                      <CompanyInputItem
                        {
                          ...getFieldDecorator('gjrCompanyName', {
                            initialValue: info[this.getCommonParamName('commonCompanyName')],
                            rules: [
                              { required: true, message: `请输入共借人${JOB.nameLabel}` },
                              { pattern: MORE_THAN_THREE_ZH_CN, message: `${JOB.nameLabel}不能少于三个汉字` },
                            ],
                          })
                        }
                        onSuggest={this.onCompanyChangeHandler.bind(this, 'gjr')}
                        placeholder={`请输入${JOB.nameLabel}`}
                        labelNumber={7}
                      >{JOB.nameLabel}
                      </CompanyInputItem>
                      <InputItem
                        {
                          ...getFieldDecorator('gjrCompanyAddr', {
                            initialValue: info[this.getCommonParamName('commonCompanyAddr')],
                            rules: [
                              { required: true, message: `请输入共借人${JOB.addressLabel}` },
                            ],
                          })
                        }
                        placeholder={`请输入${JOB.addressLabel}`}
                        labelNumber={7}
                      >{JOB.addressLabel}
                      </InputItem>
                      <InputItem
                        {
                          ...getFieldDecorator('gjrCompanyAreaCode', {
                            rules: [
                              { required: true, message: `请输入${JOB.codeLabel}` },
                              { pattern: DIALING_CODE, message: '请输入正确的电话区号' },
                            ],
                          })
                        }
                        type="number"
                        placeholder={`请输入${JOB.codeLabel}`}
                        maxLength={4}
                        labelNumber={7}
                      >{JOB.codeLabel}
                      </InputItem>
                      <InputItem
                        {
                          ...getFieldDecorator('gjrCompanyPhone', {
                            rules: [
                              { required: true, message: `请输入${JOB.telLabel}` },
                              { pattern: JOB.telReg, message: '请输入正确的电话号码' },
                              this.compareTel('gjrCompanyPhone'),
                            ],
                          })
                        }
                        type="number"
                        placeholder={`请输入${JOB.telLabel}`}
                        maxLength={11}
                        labelNumber={7}
                      >{JOB.telLabel}
                      </InputItem>
                    </div> : null
                  }
                </VelocityTransitionGroup>
              </div> : <div>
                <CompanyInputItem
                  {
                    ...getFieldDecorator('commonCompanyName', {
                      rules: [
                        { required: true, message: '请输入共借人单位名称' },
                      ],
                    })
                  }
                  onSuggest={this.onCompanyChangeHandler.bind(this, 'common')}
                  placeholder="请输入单位名称"
                >单位名称
                </CompanyInputItem>
                <InputItem
                  {
                    ...getFieldDecorator('commonCompanyAddr', {
                      rules: [
                        { required: true, message: '请输入共借人单位地址' },
                      ],
                    })
                  }
                  placeholder="请输入单位地址"
                >单位地址
                </InputItem>
              </div>
            }
            <InputItem
              {
                ...getFieldDecorator('gjrIncome', {
                  rules: [
                    { required: true, message: '请输入月均收入(税后)' },
                    { pattern: NUMBER, message: '收入必须为纯数字' },
                  ],
                })
              }
              labelNumber={7}
              placeholder="请输入月均收入(税后)"
            >月均收入(税后)
            </InputItem>
            {
              (this.state.isMarried || this.state.amount > THRESHOLD_VALUE) && this.props.step === 1 ? <InputItem labelNumber={7} editable={false} value="夫妻">与申请人关系</InputItem> : <Picker
                data={RELATION_WITHOUT_MARRIAGE}
                cols={1}
                {
                  ...getFieldDecorator('commonRelation', {
                    initialValue: [info[this.getCommonParamName('commonRelation')]],
                    rules: [
                      { required: true, message: '请选择共借人与申请人的关系', transform: transformPicker },
                    ],
                  })
                }
              >与申请人关系</Picker>
            }
            {
              this.state.amount > THRESHOLD_VALUE ? <div>
                <InputItem
                  {
                    ...getFieldDecorator('commonBankCardNo', {
                      rules: [
                        { required: true, message: '请输入共借人的银行卡号' },
                      ],
                    })
                  }
                  labelNumber={7}
                  placeholder="请输入银行卡号"
                >银行卡号</InputItem>
                <Picker
                  {
                    ...getFieldDecorator('commonBankCode', {
                      initialValue: info[this.getCommonParamName('commonBankCode')],
                      rules: [
                        { required: true, message: '请选择共借人银行卡开户行' },
                      ],
                    })
                  }
                  data={BANKS}
                  cols={1}
                  placeholder="请选择开户行"
                >开户行</Picker>
                <InputItem
                  {
                    ...getFieldDecorator('commonBankPhone', {
                      rules: [
                        { required: true, message: '请输入共借人银行卡绑定的手机号' },
                        { pattern: PHONE, message: '请输入正确的手机号码' },
                      ],
                    })
                  }
                  labelNumber={7}
                  placeholder="请输入银行卡绑定的手机号码"
                >银行卡手机号</InputItem>
              </div> : null
            }
          </div> : null
        }
      </VelocityTransitionGroup>
    </List>);
  }

  renderEmergencyOne() {
    const { info = {} } = this.state;

    return (<List renderHeader={() => '紧急联系人一'}>
      <InputItem
        {
          ...this.getFieldDecorator('emergencyName', {
            rules: [
              { required: true, message: '请输入紧急联系人一姓名' },
              { pattern: ZH_CN, message: '姓名必须为中文名称' },
            ],
          })
        }
        placeholder="请输入姓名"
      >姓名
      </InputItem>
      <InputItem
        {
          ...this.getFieldDecorator('emergencyTel', {
            rules: [
              { required: true, message: '请输入紧急联系人一手机号' },
              { pattern: PHONE, message: '请输入正确的手机号码', transform(value) { return value ? value.replace(/\s/ig, '') : value; } },
              this.compareTel('emergencyTel'),
            ],
          })
        }
        type="number"
        maxLength={11}
        placeholder="请输入手机号"
      >手机号
      </InputItem>
      <InputItem
        {
          ...this.getFieldDecorator('emergencyAddress', {
            rules: [
              { required: true, message: '请输入紧急联系人一联系地址' },
            ],
          })
        }
        placeholder="请输入联系地址"
      >联系地址
      </InputItem>
      <Picker
        data={RELATION_WITHOUT_MARRIAGE}
        {
          ...this.getFieldDecorator('emergencyRelation', {
            initialValue: [info.emergencyRelation],
            rules: [
              { required: true, message: '请选择与申请人关系', transform: transformPicker },
            ],
          })
        }
        cols={1}
      >与申请人关系
      </Picker>
      <CompanyInputItem
        {
          ...this.getFieldDecorator('emergencyCompanyName', {
            rules: [
              { required: true, message: '请输入紧急联系人一单位名称' },
            ],
          })
        }
        placeholder="请输入单位名称"
      >单位名称
      </CompanyInputItem>
    </List>);
  }

  renderEmergencyTwo() {
    const { info = {} } = this.state;

    return (<List renderHeader={() => '紧急联系人二'}>
      <InputItem
        {
          ...this.getFieldDecorator('emergencyOtherName', {
            rules: [
              { required: true, message: '请输入紧急联系人二姓名' },
              { pattern: ZH_CN, message: '姓名必须为中文名称' },
            ],
          })
        }
        placeholder="请输入姓名"
      >姓名
      </InputItem>
      <InputItem
        {
          ...this.getFieldDecorator('emergencyOtherTel', {
            rules: [
              { required: true, message: '请输入紧急联系人二手机号' },
              { pattern: PHONE, message: '请输入正确的手机号', transform(value) { return value ? value.replace(/\s/ig, '') : value; } },
              this.compareTel('emergencyOtherTel'),
            ],
          })
        }
        type="number"
        maxLength={11}
        placeholder="请输入手机号"
      >手机号
      </InputItem>
      <InputItem
        {
          ...this.getFieldDecorator('emergencyOtherAddress', {
            rules: [
              { required: true, message: '请输入紧急联系人二联系地址' },
            ],
          })
        }
        placeholder="请输入联系地址"
      >联系地址
      </InputItem>
      <Picker
        data={RELATION_WITHOUT_MARRIAGE}
        {
          ...this.getFieldDecorator('emergencyOtherRelation', {
            initialValue: [info.emergencyOtherRelation],
            rules: [
              { required: true, message: '请选择与申请人关系', transform: transformPicker },
            ],
          })
        }
        cols={1}
      >与申请人关系
      </Picker>
      <CompanyInputItem
        {
          ...this.getFieldDecorator('emergencyOtherCompanyName', {
            rules: [
              { required: true, message: '请输入紧急联系人二单位名称' },
            ],
          })
        }
        placeholder="请输入单位名称"
      >单位名称
      </CompanyInputItem>
    </List>);
  }

  render() {
    return (<div className={styles['step-info']} style={{ paddingBottom: 0 }}>
      <Loading loading={this.props.loading}>
        <Header current={0} />
        <main>
          {this.renderCommon()}
          {
            this.state.guarantorCount === 0 || this.state.guarantorCount === this.props.step ?
              this.renderEmergencyOne() : null
          }
          {
            this.state.guarantorCount === 0 || this.state.guarantorCount === this.props.step ?
              this.renderEmergencyTwo() : null
          }
          <WhiteSpace size="xl" />
          <div className={styles['btn-container']}>
            <Button type="primary" onClick={this.onOkHandler}>下一步</Button>
          </div>
        </main>
      </Loading>
    </div>);
  }
}
