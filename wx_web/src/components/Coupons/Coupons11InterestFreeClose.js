import React from 'react';
import ImgEvent3 from '../../assets/couple/event-3.png';
import ImgEvent3X2 from '../../assets/couple/event-3@2x.png';
import ImgEvent3X3 from '../../assets/couple/event-3@3x.png';
import ImgEndBg from '../../assets/couple/end-bg.png';
import styles from './Flex.less';

export default () => {
  return (<main className={styles.flex}>
    <a className={styles.end}>
      <img
        src={ImgEvent3}
        srcSet={`${ImgEvent3X2} 2x, ${ImgEvent3X3} 3x`}
        alt=""
      />
      <figure>
        <img src={ImgEndBg} alt="该活动已结束" />
        <figcaption>已结束</figcaption>
      </figure>
    </a>
  </main>);
};
