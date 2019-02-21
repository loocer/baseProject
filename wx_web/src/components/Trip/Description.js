import React, { PureComponent } from 'react';
import { Carousel } from 'antd-mobile';
import { RAF } from '../../utils/bomutil';
import bj from './Data/BeiJing.json';
import gx from './Data/GuangXi.json';
import jn from './Data/JiangNan.json';
import jx from './Data/JiangXi.json';
import txm from './Data/Txm.json';
import burma from './Data/Burma.json';
import europe from './Data/Europe.json';
import russia from './Data/Russia.json';
import styles from './Description.less';

const MAPPING = {
  bj,
  gx,
  jn,
  jx,
  txm,
  burma,
  europe,
  russia,
};

export default class Description extends PureComponent {
  state = {
    current: 0,
    tab: 0,
    stick: false,
    goTop: false,
  };

  componentDidMount() {
    const base = parseInt(getComputedStyle(document.documentElement)['font-size'], 10);
    this.mounted = true;
    this.offsetY = base * 0.4;
    document.addEventListener('scroll', this.onScrollHandler);
    RAF(this.onScrollHandler);
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.onScrollHandler);
    this.mounted = false;
  }

  onScrollHandler = () => {
    let tab = 0;
    const scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    const top = this.topBar.getBoundingClientRect().height;
    if (!top) {
      RAF(this.onScrollHandler);
      return;
    }

    if (top <= scrollTop) this.setState({ stick: true });
    else if (this.state.stick) this.setState({ stick: false });
    if (scrollTop > 500) this.setState({ goTop: true });
    else this.setState({ goTop: false });
    if (this.trip.getBoundingClientRect().top <= this.offsetY) tab = 1;
    if (this.notice.getBoundingClientRect().top <= this.offsetY) tab = 2;
    this.setState({ tab });
  }

  moveTop = () => {
    window.scrollTo(0, 0);
  }

  renderTrip = (item) => {
    return (<div key={item.day} className={styles.trip}>
      <a>第&nbsp;{item.day}&nbsp;天</a>
      <h3>{item.title}</h3>
      {item.content.map(t => (<div key={t.key}>
        <i className={styles[`icon-${t.type}`]} />
        <div dangerouslySetInnerHTML={{ __html: t.data }} />
      </div>))}
    </div>);
  }

  render() {
    const { area } = this.props;
    const data = MAPPING[area];
    const anchorStyle = {
      position: 'relative',
      height: 0,
      top: '-.4rem',
      padding: 0,
      margin: 0,
    };

    return (<div className={styles.wrap}>
      <div ref={(node) => { this.topBar = node; }}>
        <Carousel dots={false} afterChange={current => this.setState({ current })}>
          {data.images.map(item => <img key={item} src={item} alt="" />)}
        </Carousel>
        <div className={styles.dots}><i />{this.state.current + 1}/{data.images.length}</div>
      </div>
      <header>
        <h3>{data.title}</h3>
        <div>
          <div><div className={styles.price}>￥<strong>{data.price}</strong></div>/人/期</div>
          <a>{data.periods}期</a>
        </div>
      </header>
      <div className={styles.desc}>
        出发地：{data.departure}
        <strong>人数限定：{data.limit}人</strong>
      </div>
      <div className={styles.tabs}>
        <div className={`${styles['tabs-header']} ${this.state.stick ? styles['tabs-header-stick'] : ''}`} ref={(node) => { this.tab = node; }}>
          <a href="#desc" className={this.state.tab === 0 ? styles['tabs-active'] : ''}>线路特色</a>
          <a href="#trip" className={this.state.tab === 1 ? styles['tabs-active'] : ''}>行程介绍</a>
          <a href="#notice" className={this.state.tab === 2 ? styles['tabs-active'] : ''}>预定须知</a>
        </div>
        {this.state.stick && <div className={styles.placeholder} />}
        <div className={styles['tabs-content']} id="desc" name="desc">
          {
            data.description.map(item => ([
              <h3 key={`${item.title}-title`}>{item.title}</h3>,
              <p key={`${item.title}-content`} dangerouslySetInnerHTML={{ __html: item.content }} />]))
          }
        </div>
      </div>
      <div style={anchorStyle} id="trip" name="trip" ref={(node) => { this.trip = node; }} />
      {data.trip.map(this.renderTrip)}
      <div style={anchorStyle} id="notice" name="notice" ref={(node) => { this.notice = node; }} />
      {data.notice && <div className={styles.notice}>
        <h3>{data.notice.title}</h3>
        {data.notice.content.map(item => (<div key={item.key}>
          <h4>{item.title}</h4>
          <div dangerouslySetInnerHTML={{ __html: item.content }} />
        </div>))}
      </div>}
      <div onClick={this.moveTop} className={styles.gotop} style={this.state.goTop ? { display: 'block' } : { display: 'none' }} />
      <a href={`tel:${data.telephone}`} className={styles.tel}>电话咨询</a>
    </div>);
  }
}
