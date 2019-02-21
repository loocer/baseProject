import React from 'react';
import { connect } from 'dva';
import { Card, Flex } from 'antd-mobile';
import { createForm } from 'rc-form';
import Icon from '../common/Icon';
import Picker from '../common/Picker';
import ImgInfo1 from '../../assets/couple/event2/查看您的精准额度.png';
import ImgInfo1X2 from '../../assets/couple/event2/查看您的精准额度@2x.png';
import ImgInfo1X3 from '../../assets/couple/event2/查看您的精准额度@3x.png';
import ImgDesc from '../../assets/couple/event2/活动须知.png';
import ImgDesc2X from '../../assets/couple/event2/活动须知@2x.png';
import ImgDesc3X from '../../assets/couple/event2/活动须知@3x.png';
import ImgSearch from '../../assets/couple/event2/搜索查看您附近的装修商家.png';
import ImgSearch2X from '../../assets/couple/event2/搜索查看您附近的装修商家@2x.png';
import ImgSearch3X from '../../assets/couple/event2/搜索查看您附近的装修商家@3x.png';
import ImgQRCode from '../../assets/qrcode.jpg';
import IconPhone from '../../assets/fonts/phone-circle.svg';
import IconLocation from '../../assets/fonts/location.svg';
import IconTelphone from '../../assets/fonts/telphone.svg';
import provinces from '../../utils/activity-city';
import BaseFormContext from '../common/BaseFormContext';
import DEFALULT_COMPANT_PATH from '../../assets/logo.png';
import { QINIU_BASE_PATH } from '../../constants';
import styles from './Event2Use.less';

@connect(state => ({ list: state.coupons.store || [] }))
@createForm()
export default class Event2Use extends BaseFormContext {
  constructor(props) {
    super(props);
    const width = document.documentElement.clientWidth;
    const height = (width * 1018) / 384;
    const marginTop = (height * 55) / 1018;
    const qrHeight = (height * 100) / 1018;
    const descMarginTop = (height * 275) / 1018;
    const areaMarginTop = (height * 470) / 1018;
    this.state = {
      height, marginTop, qrHeight, descMarginTop, areaMarginTop,
    };
    document.body.scrollTop = 0;
  }

  componentWillReceiveProps(nextProps) {
    const { list } = nextProps;
    this.setState({ list });
  }

  onCountContactHandler = (data) => {
    const payload = {
      actionName: '授信领券',
      commercialName: data.title,
      commercialPhone: data.companyTel,
    };
    this.props.dispatch({ type: 'analysis/dailingContact', payload });
  }

  onSearchStore = (value) => {
    const city = value.join(',');
    this.searched = true;
    this.props.dispatch({ type: 'coupons/getStoreList', payload: city });
  }

  renderList = () => {
    if (!this.searched) return null;

    return this.state.list && this.state.list.length ? this.state.list.map(key => (<Card>
      <Card.Header
        title={<div style={{ width: '100%', position: 'relative' }}>
          <h3>{key.title}</h3>
          <Flex justify="between" className={styles['flex-container']}>
            <div className={styles.contact}>
              <p><Icon type={IconLocation} size="xs" />{key.companyAdr}</p>
              <a href={`tel:${key.companyTel}`} onClick={this.onCountContactHandler.bind(this, key)}>
                <Icon type={IconTelphone} size="xs" />{key.companyTel}
              </a>
            </div>
            <a href={`tel:${key.companyTel}`} onClick={this.onCountContactHandler.bind(this, key)}><Icon type={IconPhone} className={styles['icon-phone']} /></a>
          </Flex>
        </div>}
        thumb={key.path ? `${QINIU_BASE_PATH}${key.path}` : DEFALULT_COMPANT_PATH}
      />
    </Card>)) : <Card>
      <Card.Header
        title={<div>该地区暂无商家</div>}
      />
    </Card>;
  }

  render() {
    const { getFieldProps } = this.props.form;

    return (<main className={styles.event} style={{ height: `${this.state.height}px` }}>
      <section className={styles.qrcode} style={{ top: `${this.state.marginTop}px` }}>
        <img
          src={ImgInfo1}
          srcSet={`${ImgInfo1X2} 2x, ${ImgInfo1X3} 3x`}
          alt=""
          className={styles.info1}
        />
        <div className={styles.code}>
          <img src={ImgQRCode} alt="" height={this.state.qrHeight} />
        </div>
      </section>
      <section className={styles.desc} style={{ top: `${this.state.descMarginTop}px` }}>
        <img src={ImgDesc} srcSet={`${ImgDesc2X} 2x, ${ImgDesc3X} 3x`} alt="" />
      </section>
      <section className={styles.area} style={{ top: `${this.state.areaMarginTop}px` }}>
        <img src={ImgSearch} srcSet={`${ImgSearch2X} 2x, ${ImgSearch3X} 3x`} alt="" />
        <Picker
          {...getFieldProps('area', {
            onChange: this.onSearchStore,
          })}
          data={provinces}
          extra="请选择所在地区"
        />
        <div className={styles.list}>
          {this.renderList()}
        </div>
      </section>
    </main>);
  }
}
