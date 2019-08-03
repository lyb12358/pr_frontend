
const routes = [
  {
    path: '/',
    redirect: '/index',
    component: () => import('layouts/mainLayout.vue'),
    meta: { requiresAuth: false },
    children: [
      { path: '/index', name: 'index', component: () => import('pages/index'), meta: { title: '主页', requiresAuth: false } },
      { path: '/user', name: 'user', component: () => import('pages/user'), meta: { title: '用户管理', requiresAuth: true, auth: 3 } },
      { path: '/role', name: 'role', component: () => import('pages/role'), meta: { title: '角色管理', requiresAuth: true, auth: 4 } },
      { path: '/reviewManage', name: 'reviewManage', component: () => import('pages/reviewManage'), meta: { title: '评审会管理', requiresAuth: true, auth: 7 } },
      { path: '/productManage', name: 'productManage', component: () => import('pages/productManage'), meta: { title: '产品管理', requiresAuth: true, auth: 8 } },
      { path: '/reviewData', name: 'reviewData', component: () => import('pages/reviewData'), meta: { title: '数据统计', requiresAuth: true, auth: 9 } }
    ]
  },
  {
    path: '/auth',
    redirect: '/auth/login',
    meta: { requiresAuth: false },
    component: () => import('layouts/authLayout'),
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import('pages/auth/login'),
        meta: { requiresAuth: false }
      },
      {
        path: 'register',
        name: 'register',
        component: () => import('pages/auth/register'),
        meta: { requiresAuth: false }
      }
    ]
  },
  {
    path: '/review',
    redirect: '/index',
    meta: { requiresAuth: false },
    component: () => import('layouts/reviewLayout'),
    children: [
      {
        path: 'reviewing',
        name: 'reviewing',
        component: () => import('pages/review/reviewing'),
        meta: { requiresAuth: true, auth: 5 }
      },
      {
        path: 'reviewResult',
        name: 'reviewResult',
        component: () => import('pages/review/reviewResult'),
        meta: { requiresAuth: true, auth: 6 }
      }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
