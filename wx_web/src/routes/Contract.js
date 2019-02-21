import React, { PureComponent } from 'react';
import ImgIndex from '../assets/contract/1/index.png';
import Img1 from '../assets/contract/1/1.png';
import Img2 from '../assets/contract/1/2.png';
import Img3 from '../assets/contract/1/3.png';
import Img4 from '../assets/contract/1/4.png';
import Img5 from '../assets/contract/1/5.png';
import Img6 from '../assets/contract/1/6.png';
import Img7 from '../assets/contract/1/7.png';
import Img8 from '../assets/contract/1/8.png';
import Img9 from '../assets/contract/1/9.png';

export default class Contract extends PureComponent {
  componentWillMount() {
    const meta = Array.prototype.find.call(document.getElementsByTagName('meta'), item => item.name === 'viewport');
    this.oldMeta = meta.getAttribute('content');
    meta.setAttribute('content', 'width=device-width,user-scalable=no,initial-scale=1,maximum-scale=1,minimum-scale=1');
  }

  componentWillUnmount() {
    this.loopPayment = null;
    this.loopStatus = null;
    const meta = Array.prototype.find.call(document.getElementsByTagName('meta'), item => item.name === 'viewport');
    meta.setAttribute('content', this.oldMeta);
  }

  render() {
    const style = { width: '100%' };

    return (<section>
      <img src={ImgIndex} style={style} alt="" />
      <img src={Img1} style={style} alt="" />
      <img src={Img2} style={style} alt="" />
      <img src={Img3} style={style} alt="" />
      <img src={Img4} style={style} alt="" />
      <img src={Img5} style={style} alt="" />
      <img src={Img6} style={style} alt="" />
      <img src={Img7} style={style} alt="" />
      <img src={Img8} style={style} alt="" />
      <img src={Img9} style={style} alt="" />
    </section>);
  }
}
