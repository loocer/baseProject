import React from 'react';
import ImgEvent1 from '../../assets/couple/events-1.png';
import ImgEvent1X2 from '../../assets/couple/events-1@2x.png';
import ImgEvent1X3 from '../../assets/couple/events-1@3x.png';
import ImgEvent2 from '../../assets/couple/events-2.png';
import ImgEvent2X2 from '../../assets/couple/events-2@2x.png';
import ImgEvent2X3 from '../../assets/couple/events-2@3x.png';
import ImgEvent3 from '../../assets/couple/event-3.png';
import ImgEvent3X2 from '../../assets/couple/event-3@2x.png';
import ImgEvent3X3 from '../../assets/couple/event-3@3x.png';
import ImgEndBg from '../../assets/couple/end-bg.png';
import styles from './Flex.less';

export default () => {
  return (<main className={styles.flex}>
    <div className={styles.end}>
      <img
        src={ImgEvent3}
        srcSet={`${ImgEvent3X2} 2x, ${ImgEvent3X3} 3x`}
        alt=""
      />
      <figure>
        <img src={ImgEndBg} alt="该活动已结束" />
        <figcaption>已结束</figcaption>
      </figure>
    </div>
    <div className={styles.end}>
      <img
        src={ImgEvent2}
        srcSet={`${ImgEvent2X2} 2x, ${ImgEvent2X3} 3x`}
        alt=""
      />
      <figure>
        <img src={ImgEndBg} alt="该活动已结束" />
        <figcaption>已结束</figcaption>
      </figure>
    </div>
    <div className={styles.end}>
      <img
        src={ImgEvent1}
        srcSet={`${ImgEvent1X2} 2x, ${ImgEvent1X3} 3x`}
        alt=""
      />
      <figure>
        <img src={ImgEndBg} alt="该活动已结束" />
        <figcaption>已结束</figcaption>
      </figure>
    </div>
  </main>);
};
