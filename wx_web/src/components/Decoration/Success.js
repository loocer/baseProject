import React, { Component } from 'react';
import { Button } from 'antd-mobile';
import listStyles from '../common/List.less';
import ImgSuccess from '../../assets/success_icon@xhdpi.png';
import ImgSuccess2X from '../../assets/success_icon@2x.png';
import ImgSuccess3X from '../../assets/success_icon@3x.png';
import Header from './Header';
import { close } from '../../utils/pageutil';

export default class Success extends Component {
  render() {
    const style = {
      background: '#FFF', position: 'absolute', left: 0, right: 0, top: 0, bottom: 0,
    };
    return (<div style={style}>
      <Header current={3} />
      <main>
        <div className="clearfix" style={{ textAlign: 'center', textIndent: 0 }}>
          <img
            src={ImgSuccess}
            alt="已提交审核"
            srcSet={`${ImgSuccess2X} 2x,${ImgSuccess3X} 3x`}
            style={{ width: '25%', marginTop: '1rem' }}
          />
          <h4>合同已提交审核</h4>
          <section>
            我们的工作人员会在三天内<br />
            对您的信息进行审核、请保持电话通畅!
          </section>
        </div>
        <div className={listStyles['btn-container']} style={{ marginTop: 'calc(100VH - 7.5rem)', paddingBottom: '.6rem' }}>
          <Button type="primary" onClick={close}>确定</Button>
        </div>
      </main>
    </div>);
  }
}
