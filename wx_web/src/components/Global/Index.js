import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Carousel, Flex, Modal } from 'antd-mobile';
import { USER_KEY, TOKEN_KEY, CLIENT_STATE_CREATED } from '../../constants';
import { close } from '../../utils/pageutil';
import Loans from './Loans';
import Loading from '../common/Loading';
import CompleteModal from './CompleteModal';
import Icon from '../common/Icon';
import ImgMBg1 from '../../assets/mine_bg1@xhdpi.png';
import ImgMBg12X from '../../assets/mine_bg1@2x.png';
import ImgMBg13X from '../../assets/mine_bg1@3x.png';
import ImgMBg from '../../assets/mine_bg@xhdpi.png';
import ImgMBg2X from '../../assets/mine_bg@2x.png';
import ImgMBg3X from '../../assets/mine_bg@3x.png';
import ImgEmpty from '../../assets/empty@xhdpi.png';
import ImgEmpty2X from '../../assets/empty@2x.png';
import ImgEmpty3X from '../../assets/empty@3x.png';
import ImgLogout2X from '../../assets/logout@2x.png';
import IconPreferential from '../../assets/fonts/preferential_wechat@xhdpi.svg';
import IconBankCard from '../../assets/fonts/bankcard_wechat@xhdpi.svg';
import IconIdCard from '../../assets/fonts/idcard_wechat@xhdpi.svg';
import styles from './Index.less';

function getMobile(str) {
  if (str && str.length >= 7) {
    return str.replace(/^(.{3})(.{4})/, (arg0, g1) => `${g1}****`);
  }
  return str;
}

@connect(state =>
  Object.assign({}, state.global, {
    loans: state.loan.loans || [],
    loading: state.loading.models.loan || state.loading.models.gloabl,
  }))
export default class Index extends PureComponent {
  constructor(props) {
    super(props);
    const { user, loans, loading } = props;
    this.state = { user, loans, loading };
  }

  componentWillMount() {
    if (this.props.isLogined) {
      this.props.dispatch({ type: 'loan/getLoans' });
      this.props.dispatch({ type: 'global/getUserInfo' });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { user, loans, loading } = nextProps;
    this.setState({ user, loans, loading });
  }

  onLogoutHandler = () => {
    Modal.alert('是否退出登录?', '', [
      { text: '取消' },
      {
        text: '确定',
        style: { background: '#1B88EE', color: '#FFF' },
        onPress: () => {
          this.props.dispatch({ type: 'global/logout' }).then(() => {
            if (localStorage && localStorage.clear) localStorage.clear();
            if (localStorage && localStorage.removeItem) {
              localStorage.removeItem(USER_KEY);
              localStorage.removeItem(TOKEN_KEY);
            }
            setTimeout(close, 500);
          });
        },
      },
    ]);
  }

  renderCredit = () => {
    const { user } = this.state;
    if (!user.creditLimit) {
      return <Link to="/credit/award" className={styles.award}>{this.state.user.creditType === 'simple' ? '精准' : '申请'}授信</Link>;
    }
    if (user.showIncreaseLimitBtn) {
      return [<Link to="/credit/increase" key="1">提额</Link>, <Link to="/credit/award" key="2" className={styles.award}>重新授信</Link>];
    }
    return <Link to="/credit/award" key="2" className={styles.award}>重新授信</Link>;
  }

  renderEmptyPage = () => (<div className={styles.empty}>
    <Carousel selectedIndex={0} infinite>
      <div>
        <Flex justify="center" align="start">
          <Flex.Item>
            <figure>
              <img src={ImgEmpty} srcSet={`${ImgEmpty2X} 2x, ${ImgEmpty3X} 3x`} alt="" />
              <figcaption>还没有您的订单</figcaption>
              <figcaption>快来分期畅享分期e生活吧!</figcaption>
            </figure>
            <Link to="/setting/process">立即分期</Link>
          </Flex.Item>
        </Flex>
      </div>
    </Carousel>
  </div>)

  renderIntro = () => (<div className={styles.intro}>
    <Carousel selectedIndex={0} infinite>
      <div>
        <Flex justify="center" align="start">
          <Flex.Item>
            <img src={ImgMBg1} srcSet={`${ImgMBg12X} 2x,${ImgMBg13X} 3x`} alt="" />
            <h3>申请简单，轻松提交</h3>
            <h4>快速放款，24小时完成审核放款</h4>
          </Flex.Item>
        </Flex>
      </div>
      <div>
        <Flex justify="center" align="start">
          <Flex.Item>
            <img src={ImgMBg} srcSet={`${ImgMBg2X} 2x,${ImgMBg3X} 3x`} alt="" />
            <h3>零担保、零抵押</h3>
            <h4>使用安全，无需担心隐私泄露</h4>
          </Flex.Item>
        </Flex>
      </div>
    </Carousel>
  </div>)

  render() {
    let main = this.renderEmptyPage();
    const newLoans = this.props.loans.filter(loan =>
      loan.loanDetail.clientState === CLIENT_STATE_CREATED);

    if (!this.props.isLogined) main = this.renderIntro();
    else if (this.props.loans && this.props.loans.length) main = <Loans loans={this.state.loans} />;

    return (<Loading loading={this.state.loading}>
      <div className={styles.normal}>
        <header>
          <section className={styles.banner}>
            <div className={styles.mobile}>
              {this.props.isLogined ? getMobile(this.state.user.loginName) : <Link to="/login">登录</Link>}
            </div>
            {
              this.props.isLogined ? <img
                className={styles.logout}
                src={ImgLogout2X}
                alt=""
                onClick={this.onLogoutHandler}
              /> : null
            }
          </section>
          <nav>
            <ul>
              <li>
                <Link to="/account/bank/card"><Icon type={IconBankCard} />银行卡</Link>
              </li>
              <li>
                <Link to="/rna"><Icon type={IconIdCard} />实名认证</Link>
              </li>
              <li>
                <Link to="/huodong/list"><Icon type={IconPreferential} />优惠券</Link>
              </li>
            </ul>
          </nav>
        </header>
        <main>
          {main}
        </main>
        <CompleteModal loan={newLoans && newLoans[0]} />
      </div>
    </Loading>);
  }
}
