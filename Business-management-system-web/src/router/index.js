import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index')
    }]
  },
  {
    path: '/authority',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: { title: '权限管理', icon: 'example' },
    children: [
    {
        path: 'user',
        name: 'user',
        component: () => import('@/views/user/index'),
        meta: { title: '员工管理', icon: 'tree' }
      },
      {
        path: 'roles',
        name: 'roles',
        component: () => import('@/views/roles/index'),
        meta: { title: '职务管理', icon: 'tree' }
      },
      {
        path: 'area',
        name: 'area',
        component: () => import('@/views/area/index'),
        meta: { title: '区域管理', icon: 'table' }
      },
      {
        path: 'route',
        name: 'route',
        component: () => import('@/views/route/index'),
        meta: { title: '路由管理', icon: 'tree' }
      }
    ]
  },
  {
    path: '/comperation',
    component: Layout,
    redirect: '/example/table',
    name: 'Cooperation',
    meta: { title: '商户合作管理', icon: 'example' },
    children: [
      {
        path: 'merchant-review',
        name: 'merchantReview',
        component: () => import('@/views/merchantReview/index'),
        meta: { title: '商户管理', icon: 'table' }
      },
      {
        path: 'contract',
        name: 'contract',
        component: () => import('@/views/contract/index'),
        meta: { title: '合同管理', icon: 'tree' }
      },
      {
        path: 'account',
        name: 'account',
        component: () => import('@/views/account/index'),
        meta: { title: '账号管理', icon: 'table' }
      },
      {
        path: 'filing-management',
        name: 'Tree',
        component: () => import('@/views/filingManagement/index'),
        meta: { title: '备案管理', icon: 'tree' }
      }
    ]
  },
  {
    path: '/check',
    component: Layout,
    redirect: '/example/table',
    name: 'Cooperation',
    meta: { title: '下户管理', icon: 'example' },
    children: [
      {
        path: 'check-user',
        name: 'checkUser',
        component: () => import('@/views/checkUser/index'),
        meta: { title: '商户尽调', icon: 'table' }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
