import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { createForm } from 'rc-form';
import moment from 'moment';
import { Button, Modal, List, Switch, DatePicker, Toast } from 'antd-mobile';
import { VelocityTransitionGroup } from 'velocity-react';
import { QINIU_BASE_PATH } from '../../constants';
import Icon from '../common/Icon';
import { getImageCameraType } from '../../utils/image-util';
import InputItem from '../common/InputItem';
import { ID_CARD, ZH_CN } from '../../utils/pattern';
import BaseFormContext from '../common/BaseFormContext';
import ImagePicker from '../common/ImagePicker/ImagePicker';
import ImgSample from '../../assets/sample-mini@xhdpi.png';
import ImgSample2X from '../../assets/sample-mini@2x.png';
import ImgSample3X from '../../assets/sample-mini@3x.png';
import ImgNoEdge from '../../assets/no_edge@xhdpi.png';
import ImgNoEdge2X from '../../assets/no_edge@2x.png';
import ImgNoEdge3X from '../../assets/no_edge@3x.png';
import ImgFuzzy from '../../assets/fuzzy@xhdpi.png';
import ImgFuzzy2X from '../../assets/fuzzy@2x.png';
import ImgFuzzy3X from '../../assets/fuzzy@3x.png';
import ImgExposure from '../../assets/exposure@xhdpi.png';
import ImgExposure2X from '../../assets/exposure@2x.png';
import ImgExposure3X from '../../assets/exposure@3x.png';
import ImgRight from '../../assets/right@xhdpi.png';
import ImgRight2X from '../../assets/right@2x.png';
import ImgRight3X from '../../assets/right@3x.png';
import IconCloseSVG from '../../assets/fonts/close-red.svg';
import IconFront from '../../assets/fonts/idcard-front.svg';
import IconReverse from '../../assets/fonts/idcard-reverse.svg';
import styles from './IdCard.less';

@connect(state => ({
  token: state.global.qn.token,
  idCard: state.ocr.idCard,
  loading: state.loading.models.ocr || state.loading.models.rna,
}))
@createForm()
export default class IdCard extends BaseFormContext {
  state = { checked: false };

  path = {};

  componentWillMount() {
    const idCardFrontPath = sessionStorage.getItem('$$RNA-FRONT');
    const idCardBackPath = sessionStorage.getItem('$$RNA-REVERSE');
    const validDate = sessionStorage.getItem('$$RNA-VALID-DATE');

    if (idCardFrontPath) this.path.idCardFront = idCardFrontPath;
    if (idCardBackPath) this.path.idCardReverse = idCardBackPath;
    if (validDate && validDate === '长期') this.setState({ checked: true });

    if (this.props.message) this.alertMessage(this.props.message);
  }

  alertMessage = (message) => {
    Modal.alert(message, '', [{ text: '确定' }]);

    const error = {};
    if (~message.indexOf('身份证号')) error.idCard = '请核对身份证号码';
    if (~message.indexOf('姓名')) error.realName = '请核对姓名';
    this.setState({ error });
  }

  onChangedHandler = (type, src, source) => {
    this.path[type] = src;

    if (type === 'idCardReverse') {
      this.setState({ idCardReverse: '' });
      if (source === 'native') {
        this.idCardBackType = getImageCameraType(src);
      }
      return;
    }
    if (type === 'idCardFront' && source === 'native') {
      this.idCardFrontType = getImageCameraType(src);
    }
    this.props.dispatch({ type: 'ocr/cognizeIdCard', payload: { [type]: src } }).then(() => {
      const { idCard, form: { setFieldsValue } } = this.props;
      const values = {};
      // if (idCard.validDate) {
      //   if (idCard.validDate === '长期') {
      //     values.Switch2 = true;
      //   } else {
      //     const [y, m, d] = idCard.validDate.split('.');
      //     values.validDate = new Date(+y, +m - 1, +d);
      //     if (values.validDate < new Date()) {
      //       Toast.fail('身份证有效期必须大于当前时间');
      //       delete values.validDate;
      //     }
      //   }
      // }
      if (idCard.name) values.realName = idCard.name;
      if (idCard.idCardNo) values.idCard = idCard.idCardNo;

      if (Object.values(values).length) {
        if (!this.toasted) {
          this.toasted = true;
          Toast.success('请确认您的身份信息是否正确');
        }
      } else {
        Toast.fail('身份证照片识别失败，请输入您的身份信息或重新上传照片');
      }

      setFieldsValue(values);
    });
  }

  onOkHandler = () => {
    const { dispatch, form: { validateFields }, redirect } = this.props;
    const { idCardBackType, idCardFrontType } = this;
    if (!this.path.idCardReverse || !this.path.idCardFront) {
      Toast.fail('请上传身份证正面/反面照片');
      return;
    }

    validateFields((err, values) => {
      if (!err) {
        sessionStorage.removeItem('$$RNA-FRONT');
        sessionStorage.removeItem('$$RNA-NAME');
        sessionStorage.removeItem('$$RNA-ID-CARD');
        sessionStorage.removeItem('$$RNA-REVERSE');
        sessionStorage.removeItem('$$RNA-VALID-DATE');
        sessionStorage.setItem('$$RNA-FRONT', this.path.idCardFront);
        sessionStorage.setItem('$$RNA-REVERSE', this.path.idCardReverse);
        sessionStorage.setItem('$$RNA-NAME', values.realName);
        sessionStorage.setItem('$$RNA-ID-CARD', values.idCard);
        sessionStorage.setItem('$$RNA-VALID-DATE', this.state.checked ? '长期' : moment(values.validDate).format('YYYYMMDD'));

        dispatch(routerRedux.push({
          pathname: '/rna/face',
          search: `?realName=${values.realName}&idCard=${values.idCard}${idCardBackType ? `&idCardBackType=${idCardBackType}` : ''}${idCardFrontType ? `&idCardFrontType=${idCardFrontType}` : ''}${redirect ? `&redirect=${redirect}` : ''}`,
        }));
      } else {
        this.setState({ error: err });
        if (err.validDate) {
          Toast.fail('请选择身份证有效期');
        }
      }
    });
  }

  renderInfo = () => {
    const { idCard } = this.props;
    const realName = sessionStorage.getItem('$$RNA-NAME');
    const idCardNo = sessionStorage.getItem('$$RNA-ID-CARD');
    let validDate = sessionStorage.getItem('$$RNA-VALID-DATE');
    const idCardFrontPath = sessionStorage.getItem('$$RNA-FRONT');
    const idCardBackPath = sessionStorage.getItem('$$RNA-REVERSE');

    if (idCard && idCard.validDate) {
      const [y, m, d] = idCard.validDate.split('.');
      validDate = new Date(+y, +m - 1, +d);
    } else if (validDate && validDate !== '长期') {
      const month = (+validDate.substr(4, 2)) - 1;
      validDate = new Date(+validDate.substr(0, 4), month, validDate.substr(6, 2));
    }

    if (!idCard && !idCardFrontPath && !idCardBackPath) return null;

    return (<List>
      {
        this.path.idCardFront || idCardFrontPath ? <div>
          <InputItem
            {...this.getFieldDecorator('realName', {
              initialValue: (idCard && idCard.name) || realName,
              rules: [
                { required: true, message: '请输入您的姓名' },
                { pattern: ZH_CN, message: '姓名必须为中文' },
              ],
            })}
            placeholder="请输入姓名"
          >姓名</InputItem>
          <InputItem
            {...this.getFieldDecorator('idCard', {
              initialValue: (idCard && idCard.idCardNo) || idCardNo,
              rules: [
                { required: true, message: '请输入身份证号' },
                { pattern: ID_CARD, message: '请输入正确的身份证号' },
              ],
            })}
            placeholder="请输入身份证号"
          >身份证号</InputItem>
        </div> : null
      }
      {
        this.path.idCardReverse || idCardBackPath ? <div>
          <List.Item
            className={styles.switch}
            extra={<Switch {
              ...this.getFieldDecorator('Switch2', {
                onChange: () => { this.setState({ checked: !this.state.checked }); },
                initialValue: false,
                valuePropName: 'checked',
              })}
            />}
          >是否长期有效</List.Item>
          <VelocityTransitionGroup enter={{ animation: 'slideDown' }} leave={{ animation: 'slideUp' }}>
            {
              !this.state.checked ? <DatePicker
                {
                  ...this.getFieldDecorator('validDate', {
                    initialValue: validDate,
                    rules: [{ required: true, message: '请选择身份证有效期' }],
                  })
                }
                mode="date"
                title="有效期至"
                extra={idCard ? '请选择身份证的有效期限' : '请拍摄您的身份证反面照片'}
                disabled={!idCard}
                maxDate={new Date(2100, 11, 31)}
                minDate={new Date()}
              ><List.Item arrow="horizontal">有效期至</List.Item></DatePicker> : null
            }
          </VelocityTransitionGroup>
        </div> : null
      }
    </List>);
  }

  render() {
    const idCardFrontPath = sessionStorage.getItem('$$RNA-FRONT');
    const idCardBackPath = sessionStorage.getItem('$$RNA-REVERSE');

    return (<section className={styles.wrap}>
      <main>
        <section className={styles.top}>
          <h4>请上传身份证照片正反面</h4>
          <section className={styles['picker-wrap']}>
            <div>
              <ImagePicker
                camera="idCardFront"
                className={styles.picker}
                onChange={this.onChangedHandler.bind(this, 'idCardFront')}
                token={this.props.token}
                src={idCardFrontPath && `${QINIU_BASE_PATH}/${idCardFrontPath}`}
              >
                <Icon type={IconFront} />
              </ImagePicker>
              <span>身份证正面</span>
            </div>
            <div className={styles.whitespace} />
            <div>
              <ImagePicker
                camera="idCardReverse"
                className={styles.picker}
                onChange={this.onChangedHandler.bind(this, 'idCardReverse')}
                token={this.props.token}
                src={idCardBackPath && `${QINIU_BASE_PATH}/${idCardBackPath}`}
              >
                <Icon type={IconReverse} />
              </ImagePicker>
              <span>身份证反面</span>
            </div>
          </section>
          {
            <VelocityTransitionGroup enter={{ animation: 'slideDown' }} leave={{ animation: 'slideUp' }}>
              {this.props.idCard ? null : <section className={styles.tooltip}>
                <h4>拍摄时请保障<strong>身份证边框完整、字体清晰、亮度均匀</strong></h4>
                <section>
                  <div>
                    <img src={ImgSample} alt="拍摄示例" srcSet={`${ImgSample2X} 2x,${ImgSample3X} 3x`} />
                    <div><img src={ImgRight} srcSet={`${ImgRight2X} 2x, ${ImgRight3X} 3x`} alt="" /> 正确示例</div>
                  </div>
                  <div>
                    <img
                      className={styles['img-item']}
                      src={ImgNoEdge}
                      alt="边框不完整"
                      srcSet={`${ImgNoEdge2X} 2x,${ImgNoEdge3X} 3x`}
                    />
                    <div><Icon type={IconCloseSVG} />边缘被裁</div>
                  </div>
                  <div>
                    <img
                      className={styles['img-item']}
                      src={ImgFuzzy}
                      alt="信息模糊"
                      srcSet={`${ImgFuzzy2X} 2x,${ImgFuzzy3X} 3x`}
                    />
                    <div><Icon type={IconCloseSVG} />照片模糊</div>
                  </div>
                  <div>
                    <img
                      className={styles['img-item']}
                      src={ImgExposure}
                      alt="反光严重"
                      srcSet={`${ImgExposure2X} 2x,${ImgExposure3X} 3x`}
                    />
                    <div><Icon type={IconCloseSVG} />反光严重</div>
                  </div>
                </section>
              </section>}
            </VelocityTransitionGroup>
          }
        </section>
        {this.renderInfo()}
      </main>
      <footer><Button type="primary" onClick={this.onOkHandler}>下一步</Button></footer>
    </section>);
  }
}
