import React from 'react';
import { Flex, Button } from 'antd-mobile';
import Icon from './Icon';
import OverLayer from './OverLayer';
import ImgSample from '../../assets/handheld_simple@xhdpi.png';
import ImgSample2X from '../../assets/handheld_simple@2x.png';
import ImgSample3X from '../../assets/handheld_simple@3x.png';
import ImgNoEdge from '../../assets/handheld_edge@xhdpi.png';
import ImgNoEdge2X from '../../assets/handheld_edge@2x.png';
import ImgNoEdge3X from '../../assets/handheld_edge@3x.png';
import ImgFuzzy from '../../assets/handheld_fuzzy@xhdpi.png';
import ImgFuzzy2X from '../../assets/handheld_fuzzy@2x.png';
import ImgFuzzy3X from '../../assets/handheld_fuzzy@3x.png';
import ImgKeepOut from '../../assets/keep_out@xhdpi.png';
import ImgKeepOut2X from '../../assets/keep_out@2x.png';
import ImgKeepOut3X from '../../assets/keep_out@3x.png';
import IconCloseSVG from '../../assets/fonts/close-red.svg';
import styles from './OverLayer.less';
import listStyles from '../common/List.less';

export default function IDCardHandledOverLayer({ picker, id }) {
  return (<OverLayer
    title="拍摄示例"
    subTitle="请水平拍摄并露出半身"
    picker={picker}
    footer={<label htmlFor={id} className={listStyles['btn-container']}><Button type="primary">立即拍摄</Button></label>}
  >
    <img src={ImgSample} alt="拍摄示例" srcSet={`${ImgSample2X} 2x,${ImgSample3X} 3x`} />
    <Flex>
      <Flex.Item>
        <img
          className={styles['img-item']}
          src={ImgNoEdge}
          alt="信息不清晰"
          srcSet={`${ImgNoEdge2X} 2x,${ImgNoEdge3X} 3x`}
        />
        <div><Icon type={IconCloseSVG} />信息不清晰</div>
      </Flex.Item>
      <Flex.Item>
        <img
          className={styles['img-item']}
          src={ImgFuzzy}
          alt="头部边缘被裁"
          srcSet={`${ImgFuzzy2X} 2x,${ImgFuzzy3X} 3x`}
        />
        <div><Icon type={IconCloseSVG} />头部边缘被裁</div>
      </Flex.Item>
      <Flex.Item>
        <img
          className={styles['img-item']}
          src={ImgKeepOut}
          alt="遮挡脸部"
          srcSet={`${ImgKeepOut2X} 2x,${ImgKeepOut3X} 3x`}
        />
        <div><Icon type={IconCloseSVG} />遮挡脸部</div>
      </Flex.Item>
    </Flex>
  </OverLayer>);
}
