import React from 'react';
import { Flex } from 'antd-mobile';
import Icon from '../common/Icon';
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
import ImgleHand from '../../assets/handheld_simple@xhdpi.png';
import ImgHand2X from '../../assets/handheld_simple@2x.png';
import ImgHand3X from '../../assets/handheld_simple@3x.png';
import ImgHandNoEdge from '../../assets/handheld_edge@xhdpi.png';
import ImgHandNoEdge2X from '../../assets/handheld_edge@2x.png';
import ImgHandNoEdge3X from '../../assets/handheld_edge@3x.png';
import ImgHandFuzzy from '../../assets/handheld_fuzzy@xhdpi.png';
import ImgHandFuzzy2X from '../../assets/handheld_fuzzy@2x.png';
import ImgHandFuzzy3X from '../../assets/handheld_fuzzy@3x.png';
import ImgHandKeepOut from '../../assets/keep_out@xhdpi.png';
import ImgHandKeepOut2X from '../../assets/keep_out@2x.png';
import ImgHandKeepOut3X from '../../assets/keep_out@3x.png';
import ImgSamplePic from '../../assets/user_page5.png';
import IconCoseSVG from '../../assets/fonts/close-red.svg';
import styles from './Standard.less';

export default function Standard() {
  return (
    <div className={styles['standard-list']}>
      <section className={styles.page1}>
        <h2>个人信息填写</h2>
        <p>要求填写内容真实、准确，否则会导致<br />订单审核无法通过</p>
      </section>
      <section className={styles.page2}>
        <h4>证件拍照规范</h4>
        <h3>拍摄示例</h3>
        <h5>请水平垂直拍摄</h5>
        <div className={styles['image-container']}>
          <img src={ImgSample} alt="" srcSet={`${ImgSample2X} 2x,${ImgSample3X} 3x`} />
        </div>
        <Flex>
          <Flex.Item>
            <img src={ImgNoEdge} srcSet={`${ImgNoEdge2X} 2x,${ImgNoEdge3X} 3x`} alt="" />
            <div><Icon type={IconCoseSVG} />边框不完整</div>
          </Flex.Item>
          <Flex.Item>
            <img src={ImgFuzzy} srcSet={`${ImgFuzzy2X} 2x,${ImgFuzzy3X} 3x`} alt="" />
            <div><Icon type={IconCoseSVG} />信息模糊</div>
          </Flex.Item>
          <Flex.Item>
            <img src={ImgExposure} srcSet={`${ImgExposure2X} 2x,${ImgExposure3X} 3x`} alt="" />
            <div><Icon type={IconCoseSVG} />反光严重</div>
          </Flex.Item>
        </Flex>
        <h3>拍摄示例</h3>
        <h5>请水平正面拍摄并露出半身</h5>
        <div className={styles['image-container']}>
          <img src={ImgleHand} alt="" srcSet={`${ImgHand2X} 2x,${ImgHand3X} 3x`} />
        </div>
        <Flex>
          <Flex.Item>
            <img src={ImgHandFuzzy} srcSet={`${ImgHandFuzzy2X} 2x,${ImgHandFuzzy3X} 3x`} alt="" />
            <div><Icon type={IconCoseSVG} />信息不清晰</div>
          </Flex.Item>
          <Flex.Item>
            <img src={ImgHandNoEdge} srcSet={`${ImgHandNoEdge2X} 2x,${ImgHandNoEdge3X} 3x`} alt="" />
            <div><Icon type={IconCoseSVG} />边缘被裁</div>
          </Flex.Item>
          <Flex.Item>
            <img src={ImgHandKeepOut} srcSet={`${ImgHandKeepOut2X} 2x,${ImgHandKeepOut3X} 3x`} alt="" />
            <div><Icon type={IconCoseSVG} />遮挡脸部</div>
          </Flex.Item>
        </Flex>
      </section>
      <section className={styles.page2}>
        <h4>文档拍照规范</h4>
        <div className={styles['image-contract']}>
          <img src={ImgSamplePic} alt="" />
        </div>
        <p className={styles.txt}>文档资料拍照必须完整清晰<br />无重影、虚影文档内容真实有效</p>
      </section>
    </div>
  );
}
