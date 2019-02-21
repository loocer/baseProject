import React from 'react';
import { Link } from 'dva/router';
import ImgEvent2 from '../../assets/couple/events-2.png';
import ImgEvent2X2 from '../../assets/couple/events-2@2x.png';
import ImgEvent2X3 from '../../assets/couple/events-2@3x.png';
import ImgEndBg from '../../assets/couple/end-bg.png';
import styles from './Flex.less';

export default () => {
  return (<main className={styles.flex}>
    <Link to="/huodong/sx" className={styles.end}>
      <img
        src={ImgEvent2}
        srcSet={`${ImgEvent2X2} 2x, ${ImgEvent2X3} 3x`}
        alt=""
      />
      <figure>
        <img src={ImgEndBg} alt="改活动已结束" />
        <figcaption>已结束</figcaption>
      </figure>
    </Link>
  </main>);
};
