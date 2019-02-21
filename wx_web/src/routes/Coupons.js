import CouponsPage from '../components/Coupons/Coupons1';
import CouponsListPage from '../components/Coupons/CouponsList';
import Event2Page from '../components/Coupons/Coupons2';
import Event2UsePage from '../components/Coupons/Event2Use';
import Coupon11InterestFree from '../components/Coupons/Coupons11InterestFreeClose';
import EventsPage from '../components/Coupons/Events';
import getRoute from '../utils/routeutil';

export default function Loans({ location: { pathname } }) {
  const ROUTES = [
    { path: '/huodong/11/jzmx', title: '热血双十一  装修分期还免息', component: Coupon11InterestFree },
    { path: '/huodong/jzmx', title: '免息券大派送', component: CouponsPage },
    { path: '/huodong/list', title: '优惠券列表', component: CouponsListPage },
    { path: '/huodong/sx', title: '测测我的装修额度--元宝e家', component: Event2Page },
    { path: '/huodong/sx/use', title: '免息分期活动详情--元宝e家', component: Event2UsePage },
    { path: '/huodong/rm', title: '热门活动', component: EventsPage },
  ];
  return getRoute(ROUTES, pathname);
}
