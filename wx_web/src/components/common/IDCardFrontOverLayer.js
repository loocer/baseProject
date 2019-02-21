import React from 'react';
import { Flex, Button } from 'antd-mobile';
import Icon from './Icon';
import OverLayer from './OverLayer';
import ImgSample from '../../assets/sample@xhdpi.png';
import ImgSample2X from '../../assets/sample@2x.png';
import ImgSample3X from '../../assets/sample@3x.png';
import ImgNoEdge from '../../assets/no_edge@xhdpi.png';
import ImgNoEdge2X from '../../assets/no_edge@2x.png';
import ImgNoEdge3X from '../../assets/no_edge@3x.png';
import ImgFuzzy from '../../assets/fuzzy@xhdpi.png';
import ImgFuzzy2X from '../../assets/fuzzy@2x.png';
import ImgFuzzy3X from '../../assets/fuzzy@3x.png';
import ImgExposure from '../../assets/exposure@xhdpi.png';
import ImgExposure2X from '../../assets/exposure@2x.png';
import ImgExposure3X from '../../assets/exposure@3x.png';
import IconCloseSVG from '../../assets/fonts/close-red.svg';
import styles from './OverLayer.less';
import listStyles from '../common/List.less';

export default function IDCardFrontOverLayer({ picker, id }) {
  return (<OverLayer
    title="拍摄示例"
    subTitle="请水平垂直拍摄"
    picker={picker}
    footer={<label htmlFor={id} className={listStyles['btn-container']}><Button type="primary">立即拍摄</Button></label>}
  >
    <img src={ImgSample} alt="拍摄示例" srcSet={`${ImgSample2X} 2x,${ImgSample3X} 3x`} />
    <Flex>
      <Flex.Item>
        <img
          className={styles['img-item']}
          src={ImgNoEdge}
          alt="边框不完整"
          srcSet={`${ImgNoEdge2X} 2x,${ImgNoEdge3X} 3x`}
        />
        <div><Icon type={IconCloseSVG} />边框不完整</div>
      </Flex.Item>
      <Flex.Item>
        <img
          className={styles['img-item']}
          src={ImgFuzzy}
          alt="信息模糊"
          srcSet={`${ImgFuzzy2X} 2x,${ImgFuzzy3X} 3x`}
        />
        <div><Icon type={IconCloseSVG} />信息模糊</div>
      </Flex.Item>
      <Flex.Item>
        <img
          className={styles['img-item']}
          src={ImgExposure}
          alt="反光严重"
          srcSet={`${ImgExposure2X} 2x,${ImgExposure3X} 3x`}
        />
        <div><Icon type={IconCloseSVG} />反光严重</div>
      </Flex.Item>
    </Flex>
  </OverLayer>);
}
