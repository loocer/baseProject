import IndexPage from '../components/Setting/Index';
import QuestionPage from '../components/Setting/Questions';
import ContactPage from '../components/Setting/Contact';
import FeedbackPage from '../components/Setting/Feedback';
import ProcessPage from '../components/Setting/Process';
import CalculatorPage from '../components/Setting/Calculator';
import StandardPage from '../components/Setting/Standard';
import getRoute from '../utils/routeutil';


const ROUTES = [
  { path: '/setting', title: '个人中心', component: IndexPage },
  { path: '/setting/questions', title: '常见问题', component: QuestionPage },
  { path: '/setting/contact', title: '关于我们', component: ContactPage },
  { path: '/setting/feedback', title: '问题反馈', component: FeedbackPage },
  { path: '/setting/process', title: '申请流程', component: ProcessPage },
  { path: '/setting/calculator', title: '计算器', component: CalculatorPage },
  { path: '/setting/standard', title: '分期填写规范', component: StandardPage },
];

export default function Loans({ location: { pathname } }) {
  return getRoute(ROUTES, pathname);
}
