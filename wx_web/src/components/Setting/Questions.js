import React, { Component } from 'react';
import { connect } from 'dva';
import { Badge } from 'antd-mobile';
import Loading from '../common/Loading';
import styles from './Questions.less';

@connect(state => ({
  questions: state.setting.questions || [],
  loading: state.loading.models.setting,
}))
export default class Questions extends Component {
  constructor(props) {
    super(props);
    const { questions, loading } = props;
    this.state = { questions, loading };
  }

  componentWillMount() {
    this.props.dispatch({ type: 'setting/getQuestions' });
  }

  componentWillReceiveProps(nextProps) {
    const { questions, loading } = nextProps;
    this.setState({ questions, loading });
  }

  /* eslint-disable react/no-danger */
  render() {
    return (<Loading loading={this.state.loading}>
      <div className={styles.list}>
        {
          this.state.questions.map((q, i) => (<article key={q.id}>
            <header><h5><Badge text={i + 1} />{q.title}</h5></header>
            <section dangerouslySetInnerHTML={{ __html: q.content }} />
          </article>))
        }
      </div>
    </Loading>);
  }
}
