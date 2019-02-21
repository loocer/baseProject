import React from 'react';
import { createForm } from 'rc-form';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { VelocityTransitionGroup } from 'velocity-react';
import { List, Toast, Switch, WhiteSpace } from 'antd-mobile';
import provinces from '../../utils/cascader-address-options';
import {
  QUALFICATIONS, MARRIAGE, PROPERTIES,
  SOCIAL_JOB_FOR_DECORATION, LIVE_INFO, HOUSING_NATURE, INDIV_POSITION, MARRIED,
} from '../../picker-data';
import { DIALING_CODE, MORE_THAN_THREE_ZH_CN, TEL_OR_400, TEL_OR_PHONE, NUMBER } from '../../utils/pattern';
import { RAF } from '../../utils/bomutil';
import Loading from '../common/Loading';
import Header from './Header';
import styles from '../common/List.less';
import dStyles from './DecorationStep1.less';
import InputItem from '../common/InputItem';
import CompanyInputItem from '../common/CompanyInputItemWithAnimating';
import Picker from '../common/Picker';
import Button from '../common/Button';
import BaseFormContext from '../common/BaseFormContext';

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
  'qualifications',
  'marriage',
  'socialJob',
  'securities',
  'nowHouseState',
  'houseNature',
  'post',
];

function transformPicker(arr) {
  return arr ? arr[arr.length - 1] : arr;
}

function transformAreaPicker(arr) {
  return arr ? arr[2] : arr;
}

@connect(state => ({
  contract: state.decoration.contract,
  loan: state.decoration.loan,
  amount: state.decoration.amount,
  loading: state.loading.models.decoration,
}))
@createForm()
export default class DecorationStep1 extends BaseFormContext {
  constructor(props) {
    super(props);
    this.state = { isSame: false };
  }

  componentWillMount() {
    const { dispatch, id } = this.props;
    this.loadLoan = true;
    dispatch({ type: 'decoration/getLoan', payload: id });
    dispatch({ type: 'decoration/getContract', payload: id });
    dispatch({ type: 'decoration/getLoanAmount', payload: id });
  }

  componentWillReceiveProps(nextProps) {
    const {
      contract, loan, amount, id,
    } = nextProps;

    if (amount && amount[id]) {
      this.setState({ amount: amount[id] });
    }

    if (contract && contract[id]) {
      this.setState({ contract: contract[id] });
    }

    if (loan[id] && loan[id].info && this.loadLoan) {
      const { info = {} } = loan[id];
      RAF(() => {
        this.setState({
          info,
          socialJob: info.socialJob,
          isSame: !(Object.keys(info).length && info.nowAddressDetail),
          nowHouseState: info.nowHouseState,
        });
      });
      this.loadLoan = false;
    }

    // 初始化驳回原因高亮信息
    this.initRejectError(nextProps, 'person');
  }

  onCompanyChangeHandler = ({
    regProvince, regCity, regArea, regLocation,
  }) => {
    this.props.form.setFieldsValue({
      companyArea: [regProvince, regCity, regArea],
      companyAddress: regLocation,
    });
  }

  onSocialJobChangedHandler = (keys) => {
    this.setState({ socialJob: keys[0] });
  }

  onSwitchChangedHandler = (isSame) => {
    this.setState({ isSame });
  }

  onNowHouseStateChangedHandler = (val) => {
    this.setState({ nowHouseState: val[0] });
  }

  onOkHandler = () => {
    this.props.form.validateFields((err, value) => {
      document.body.scrollTop = 0;
      if (err) {
        this.setState({ error: err });
        Toast.fail('请正确输入信息', 2, null, false);
      } else {
        const { dispatch, id } = this.props;
        pickers.forEach((picker) => {
          if (value[picker]) {
            value[picker] = value[picker][0]; // eslint-disable-line
          }
        });
        // 电话号码去掉空白符
        ['userCellphone'].forEach((tel) => {
          if (value[tel]) {
            value[tel] = value[tel].replace(/\s/ig, '');
          }
        });
        // 工作单位省市区信息
        if (value.companyArea) {
          const [pro, city, town] = value.companyArea;
          value.companyPro = pro;
          value.companyCity = city;
          value.companyTown = town;
          delete value.companyArea;
        }
        // 现居住地信息
        if (value.nowAddrArea) {
          const [pro, city, town] = value.nowAddrArea;
          value.nowAddrProvince = pro;
          value.nowAddrCity = city;
          value.nowAddrTown = town;
          delete value.nowAddrArea;
        }
        if (this.state.amount > THRESHOLD_VALUE) value.marriage = MARRIED;
        dispatch({ type: 'decoration/saveInfo', payload: { info: value, id: this.props.id } }).then(() => {
          dispatch(routerRedux.push({
            pathname: `/decoration/${btoa(id)}/step/1/related`,
          }));
        });
      }
    });
  }

  compareTel = (prop) => {
    const MAPPING = {
      userCellphone: '用户手机号',
      companyTel: '单位电话',
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
      } else {
        callback();
      }
    };

    return { validator };
  }

  render() {
    const { info = {}, contract = {} } = this.state;
    const JOB = JOB_MAPPING[this.state.socialJob || '01'];
    const isSame = !!Object.keys(info).length && !info.nowAddressDetail;

    return (<div className={styles['step-info']} style={{ paddingBottom: 0 }}>
      <Loading loading={this.props.loading}>
        <Header current={0} />
        <main>
          <List>
            <InputItem
              placeholder="请输入用户姓名"
              {...this.getFieldDecorator('userName', {
                initialValue: contract.name,
              })}
              editable={false}
            >姓名
            </InputItem>
            <InputItem
              {...this.getFieldDecorator('userCellphone', {
                initialValue: contract.phoneNo,
              })}
              placeholder="请输入手机号"
              editable={false}
            >手机号
            </InputItem>
            <Picker
              {
                ...this.getFieldDecorator('qualifications', {
                  initialValue: [info.qualifications],
                  rules: [
                    { required: true, message: '请选择最高学历', transform: transformPicker },
                  ],
                })
              }
              data={QUALFICATIONS}
              cols={1}
            >学历
            </Picker>
            {
              this.state.amount > THRESHOLD_VALUE ? <InputItem value="已婚" editable={false}>婚姻状况</InputItem> : <Picker
                {
                  ...this.getFieldDecorator('marriage', {
                    initialValue: [info.marriage],
                    rules: [{ required: true, message: '请选择婚姻状况', transform: transformPicker }],
                  })
                }
                data={MARRIAGE}
                cols={1}
              >婚姻状况</Picker>
            }
          </List>
          <List>
            <Picker
              {
                ...this.getFieldDecorator('socialJob', {
                  onChange: this.onSocialJobChangedHandler,
                  initialValue: [info.socialJob],
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
                      ...this.getFieldDecorator('post', {
                        initialValue: [info.post],
                        rules: [{ required: true, message: '请选择职务', transform: transformPicker }],
                      })
                    }
                    data={INDIV_POSITION}
                    cols={1}
                  >职务
                  </Picker>
                  <CompanyInputItem
                    {
                      ...this.getFieldDecorator('companyName', {
                        rules: [
                          { required: true, message: `请输入${JOB.nameLabel}` },
                          { pattern: MORE_THAN_THREE_ZH_CN, message: `${JOB.nameLabel}不能少于三个汉字` },
                        ],
                        onChange: this.onCompanyNameChangedHandler,
                      })
                    }
                    onSuggest={this.onCompanyChangeHandler}
                    placeholder={`请输入${JOB.nameLabel}`}
                    labelNumber={7}
                  >{JOB.nameLabel}
                  </CompanyInputItem>
                  <Picker
                    data={provinces}
                    {
                      ...this.getFieldDecorator('companyArea', {
                        initialValue: info.companyTown ?
                          [info.companyPro, info.companyCity, info.companyTown] : [],
                        rules: [{ required: true, message: `请选择${JOB.areaLabel}`, transform: transformAreaPicker }],
                      })
                    }
                    labelNumber={7}
                  >{JOB.areaLabel}
                  </Picker>
                  <InputItem
                    {
                      ...this.getFieldDecorator('companyAddress', {
                        rules: [
                          { required: true, message: `请输入${JOB.addressLabel}` },
                        ],
                      })
                    }
                    placeholder={`请输入${JOB.addressLabel}`}
                    labelNumber={7}
                  >{JOB.addressLabel}
                  </InputItem>
                  <InputItem
                    {
                      ...this.getFieldDecorator('officeCode', {
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
                      ...this.getFieldDecorator('companyTel', {
                        rules: [
                          { required: true, message: `请输入${JOB.telLabel}` },
                          { pattern: JOB.telReg, message: '请输入正确的电话号码' },
                          this.compareTel('companyTel'),
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
            <InputItem
              {
                ...this.getFieldDecorator('income', {
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
          </List>
          <List>
            <Picker
              {
                ...this.getFieldDecorator('securities', {
                  initialValue: [info.securities],
                  rules: [
                    { required: true, message: '请选择产权证明', transform: transformPicker },
                  ],
                })
              }
              data={PROPERTIES}
              cols={1}
            >产权证明
            </Picker>
            <div className={dStyles['switch-item']}>
              <List.Item
                extra={<Switch
                  platform="ios"
                  {...this.props.form.getFieldProps('isSame', {
                    initialValue: isSame,
                    onChange: this.onSwitchChangedHandler,
                    valuePropName: 'checked',
                  })}
                />}
              >装修地址与现居住地址一致
              </List.Item>
            </div>
            <VelocityTransitionGroup enter={{ animation: 'slideDown' }} leave={{ animation: 'slideUp' }}>
              {
                this.state.isSame ? null : <div>
                  <Picker
                    {
                      ...this.getFieldDecorator('nowAddrArea', {
                        initialValue: info.nowAddrTown ?
                          [info.nowAddrProvince, info.nowAddrCity, info.nowAddrTown] : [],
                        rules: [{ required: true, message: '请选择现居住所在区', transform: transformAreaPicker }],
                      })
                    }
                    data={provinces}
                  >现居住所在区
                  </Picker>
                  <InputItem
                    clear
                    {
                      ...this.getFieldDecorator('nowAddressDetail', {
                        rules: [
                          { required: true, message: '请输入现居住详细地址' },
                        ],
                      })
                    }
                    placeholder="请输入现居住详细地址"
                    labelNumber={7}
                  >现居住详细地址
                  </InputItem>
                </div>
              }
            </VelocityTransitionGroup>
            <Picker
              {
                ...this.getFieldDecorator('nowHouseState', {
                  onChange: this.onNowHouseStateChangedHandler,
                  initialValue: [info.nowHouseState],
                  rules: [
                    { required: true, message: '请选择现住房状况', transform: transformPicker },
                  ],
                })
              }
              data={LIVE_INFO}
              cols={1}
            >现住房状况
            </Picker>
            <Picker
              {
                ...this.getFieldDecorator('houseNature', {
                  initialValue: [info.houseNature],
                  rules: [
                    { required: true, message: '请选择房屋性质', transform: transformPicker },
                  ],
                })
              }
              data={HOUSING_NATURE}
              cols={1}
            >待装修房屋性质
            </Picker>
            {
              this.state.nowHouseState === '20' ? <InputItem
                {
                  ...this.getFieldDecorator('lastRepayAmount', {
                    rules: [
                      { required: true, message: '请输入房产月还款金额' },
                    ],
                  })
                }
                placeholder="请输入房产月还款金额"
                labelNumber={7}
                type="number"
              >房产月还款额</InputItem> : null
            }
          </List>
          <WhiteSpace size="xl" />
          <div className={styles['btn-container']}>
            <Button type="primary" onClick={this.onOkHandler}>下一步</Button>
          </div>
        </main>
      </Loading>
    </div>);
  }
}
