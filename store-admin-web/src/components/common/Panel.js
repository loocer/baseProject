import React from 'react';
import PropTypes from 'prop-types';
import styles from './Panel.less';

export default function Panel({ children, title }) {
  return (<article className={styles.panel}>
    {
        title == 'none' ? <header className={styles['panel-none']}></header> : <header className={styles['panel-title']}>{typeof title === 'string' ? <h3>{title}</h3> : title}</header>
    }
    <section >
      {children}
    </section>
  </article>);
}

Panel.PropTypes = {
  title: PropTypes.any,
};
