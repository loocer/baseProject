import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Button, WhiteSpace, Carousel } from 'antd-mobile';
import Loading from '../common/Loading';
import { HUADAO_PROTOCOL_BASE_PATH } from '../../constants';
import styles from './Protocol.less';

@connect(state => ({
  protocols: state.loan.protocols,
  loading: state.loading.models.loan,
}))
export default class Protocol extends Component {
  constructor(props) {
    super(props);
    const { loading } = props;
    this.state = {
      pathes: [],
      loading,
      height: (3461 / 2447) * document.documentElement.clientWidth,
      current: 0,
    };
  }

  componentWillMount() {
    const {
      id, type, dispatch,
    } = this.props;
    dispatch({ type: 'loan/getProtocols', payload: { id, type } });
  }

  componentWillReceiveProps(nextProps) {
    const {
      protocols, id, type, loading,
    } = nextProps;
    const pathes = protocols && protocols[id] && protocols[id][type];
    if (this.loaded) {
      this.setState({ loading: false });
      return;
    }
    this.setState({ pathes, loading });
    if (pathes && pathes.length) this.loaded = true;
  }

  onOkHandler = () => {
    const { id, type, dispatch } = this.props;

    if (localStorage && localStorage.setItem) {
      localStorage.setItem(`${btoa(id)}-${type}`, true);
    }

    dispatch(routerRedux.goBack());
  }

  render() {
    const pathes = this.state.pathes || [];
    const className = pathes.length === 1 ? styles.protocol : '';

    if (!pathes.length) return <Loading loading={this.state.loading} style={{ minHeight: '100VH' }} mask />;

    return (<div className={className}>
      <Carousel
        selectedIndex={0}
        afterChange={(current) => { this.setState({ current }); }}
      >
        {
          pathes.map((path, i) => (i === this.state.current ? <img
            height={this.state.height}
            key={path}
            src={`${HUADAO_PROTOCOL_BASE_PATH}${path}`}
            alt="协议内容"
            style={{ width: '100%', height: `${this.state.height}px` }}
          /> : <div key={path} style={{ height: `${this.state.height}px` }}>&nbsp;</div>))
        }
      </Carousel>
      <WhiteSpace size="xl" />
      {pathes.length ? <Button type="primary" disabled={this.state.current !== pathes.length - 1} onClick={this.onOkHandler}>同意</Button> : null}
    </div>);
  }
}
