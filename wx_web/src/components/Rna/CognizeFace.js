import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Toast } from 'antd-mobile';
import { deducePlatform, checkFace } from '../../utils/platform';
import { getBasePath } from '../../utils/query-util';
import { PAGE_PREFIX } from '../../constants';
import Loading from '../common/Loading';
import styles from './CognizeFace.less';

@connect(state => ({
  faceRedirect: state.face.redirect,
  user: state.global.user || {},
  loading: state.loading.models.rna || state.loading.models.face,
}))
export default class CognizeFace extends PureComponent {
  componentWillMount() {
    const { success, message, dispatch } = this.props;

    if (success) this.toNextPage();
    else if (message) dispatch(routerRedux.push({ pathname: '/rna/id', search: `?message=${message}` }));
    else this.cognizeFace();
  }

  cognizeFace = () => {
    const { dispatch } = this.props;
    dispatch({ type: 'face/getLiveCheckResult' }).then(({ manuallyCertification }) => {
      if (!manuallyCertification) this.doCognizeFace();
      else this.toNextPage();
    });
  }

  doCognizeFace = () => {
    const {
      dispatch, redirect, user: { id: userId }, realName, idCard, idCardFrontType, idCardBackType,
    } = this.props;
    const returnUrl = `${getBasePath()}${PAGE_PREFIX}/rna/face?realName=${encodeURIComponent(realName)}${idCardBackType ? `&idCardBackType=${idCardBackType}` : ''}${idCardFrontType ? `&idCardFrontType=${idCardFrontType}` : ''}&idCard=${idCard}${(redirect && `&redirect=${redirect}`) || ''}`;
    if (deducePlatform()) {
      checkFace(userId, idCard, realName, (score, message) => {
        try { dispatch({ type: 'trace/trace', payload: { pathname: '/rna/id', search: `?score=${score}&message=${message}` } }); } catch (e) {} //eslint-disable-line

        if (parseFloat(score) >= 60) this.toNextPage();
        else dispatch(routerRedux.push({ pathname: '/rna/id', search: `?message=${message || '认证失败，人脸识别时请严格按照提示操作'}` }));
      });
    } else {
      dispatch({
        type: 'face/getRedirectCheckFaceUrl',
        payload: {
          returnUrl, idCard, idCardName: realName,
        },
      }).then(() => {
        // 进行人脸识别
        const { faceRedirect } = this.props;
        if (faceRedirect.url && faceRedirect.url !== 'null') {
          dispatch({ type: 'face/clearRedirect' });
          window.location.href = faceRedirect.url;
        } else {
          this.toNextPage();
        }
      });
    }
  }

  toNextPage = () => {
    const {
      dispatch,
      redirect,
      idCardFrontType,
      idCardBackType,
    } = this.props;
    const idCardFrontPath = sessionStorage.getItem('$$RNA-FRONT');
    const realName = sessionStorage.getItem('$$RNA-NAME');
    const idCard = sessionStorage.getItem('$$RNA-ID-CARD');
    const idCardBackPath = sessionStorage.getItem('$$RNA-REVERSE');
    const validDate = sessionStorage.getItem('$$RNA-VALID-DATE');
    const payload = {
      idCard,
      idCardFrontPath,
      idCardBackPath,
      realName,
      idCardFrontType,
      idCardBackType,
      validDate: validDate === '长期' ? validDate : validDate.replace(/\D/ig, ''),
    };

    Toast.info('调用接口实名认证');
    dispatch({ type: 'rna/authenticate', payload }).then(() => {
      sessionStorage.removeItem('$$RNA-FRONT');
      sessionStorage.removeItem('$$RNA-NAME');
      sessionStorage.removeItem('$$RNA-ID-CARD');
      sessionStorage.removeItem('$$RNA-REVERSE');
      sessionStorage.removeItem('$$RNA-VALID-DATE');
      Toast.success('恭喜！您的实名认证已通过', 2, () => {
        dispatch(routerRedux.push({
          pathname: redirect || '/rna',
          search: `?success=true&realName=${realName}&idCard=${idCard}`,
        }));
      });
    });
  }
  render() {
    return (<Loading loading={this.props.loading}>
      <section className={styles.wrap}>
        <main>正在进行人脸识别，请稍等</main>
      </section>
    </Loading>);
  }
}
