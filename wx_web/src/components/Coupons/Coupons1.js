import React from 'react';
import { Link } from 'dva/router';
import ImgEvent1 from '../../assets/couple/events-1.png';
import ImgEvent1X2 from '../../assets/couple/events-1@2x.png';
import ImgEvent1X3 from '../../assets/couple/events-1@3x.png';
import ImgEndBg from '../../assets/couple/end-bg.png';
import styles from './Flex.less';

export default () => {
  return (<main className={styles.flex}>
    <Link to="/huodong/jzmx" className={styles.end}>
      <img
        src={ImgEvent1}
        srcSet={`${ImgEvent1X2} 2x, ${ImgEvent1X3} 3x`}
        alt=""
      />
      <figure>
        <img src={ImgEndBg} alt="该活动已结束" />
        <figcaption>已结束</figcaption>
      </figure>
    </Link>
  </main>);
};
