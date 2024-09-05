
import { createRouter, createWebHistory } from 'vue-router'
import { ElMessage } from 'element-plus'
//创建路由
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {//登录
      name: 'Login',
      path: '/login',
      meta: {
        title: '登录'
      },
      component: () => import('@/views/Login.vue'),

    },
    {//主页
      name: 'Home',
      path: '/index',
      meta: {
        title: '主页'
      },
      component: () => import('@/views/Home.vue'),
      redirect: '/index',
      children: [
        {
          name: 'Welcome',
          path: '/index',
          meta: {
            title: '首页',
            requiresLogin: true
          },
          component: () => import('@/views/Welcome.vue')
        },
        {

          path: '/user/list',
          meta: {
            title: '用户管理',
            requiresLogin: true
          },
          component: () => import('@/views/user/index.vue')
        },
        {

          path: '/Admin/admin',
          meta: {
            title: '管理员列',
            requiresLogin: true,
            requiresAdmin: true
          },
          component: () => import('@/views/Admin/Admin.vue')
        }
      ]
    },
    {//404
      name: 'NotFound',
      path: '/:pathMatch(.*)*',
      component: () => import('@/views/NotFound.vue'),
    },

  ]
})
router.beforeEach((to, _, next) => {
  const isLoggedIn = Boolean(localStorage.getItem('token'))
  if (to.meta.requiresLogin && !isLoggedIn) {
    next('/login'); // 如果未登录，跳转到登录页面
  } else {
    next(); // 允许访问
  }
})
router.beforeEach((to, _, next) => {
  const roleAdmin = localStorage.getItem('token')


  if (to.meta.requiresAdmin && roleAdmin !== 'admin-token') {
    next('/index')
    ElMessage.error('你没有查看权限')
  } else {
    next(); // 允许访问
  }
})
export default router