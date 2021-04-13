import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/layout'

Vue.use(VueRouter)

import Error404 from '@/layout/error-page/404.vue'
const Login = () => import(/* webpackChunkName: "login" */ '@/pages/login')
const Redirect = () =>
  import(/* webpackChunkName: "layout" */ '@/layout/redirect.vue')
const otherRoute = [
  {
    path: '/',
    component: Layout,
    redirect: '/index',
    meta: {
      title: '首页'
    },
    children: [
      {
        path: '/index',
        name: 'index',
        component: () => import(/* webpackChunkName: "home" */ '@/pages/home'),
        hidden: true,
        meta: { title: '' }
      }
    ]
  },
  {
    path: '/articles',
    name: 'articles',
    component: Layout,
    meta: {
      title: '文章列表',
      roles: ['admin'],
      icon: 'iconzhanghao',
      leve: 1
    },
    children: [
      {
        path: '/articles',
        name: '',
        meta: {
          title: '',
          roles: ['admin']
        },
        hidden: true,
        redirect: '/articles/list',
        component: () =>
          import(/* webpackChunkName: "articles" */ '@/pages/articles/index'),
        children: [
          {
            path: 'list',
            name: '',
            meta: {
              title: '',
              roles: ['admin']
            },
            hidden: true,
            component: () =>
              import(/* webpackChunkName: "articles" */ '@/pages/articles/list')
          },
          {
            path: 'add',
            name: 'articleAdd',
            hidden: true,
            meta: {
              title: '添加文章',
              roles: ['admin']
            },
            component: () =>
              import(/* webpackChunkName: "articles" */ '@/pages/articles/add')
          },
          {
            path: 'edit',
            name: 'articleEdit',
            hidden: true,
            meta: {
              title: '编辑文章',
              roles: ['admin']
            },
            component: () =>
              import(/* webpackChunkName: "articles" */ '@/pages/articles/add')
          }
        ]
      }
    ]
  },
  {
    path: '/imageTypes',
    name: 'imageTypes',
    component: Layout,
    meta: {
      title: '图片分类',
      roles: ['admin'],
      icon: 'iconzhanghao',
      leve: 1
    },
    children: [
      {
        path: '/imageTypes',
        name: '',
        component: () =>
          import(/* webpackChunkName: "home" */ '@/pages/image-types'),
        hidden: true,
        meta: { title: '' }
      }
    ]
  },
  {
    path: '/imageList',
    name: 'imageList',
    component: Layout,
    meta: {
      title: '图片列表',
      roles: ['admin'],
      icon: 'iconzhanghao',
      leve: 1
    },
    children: [
      {
        path: '/imageList',
        name: '',
        component: () =>
          import(/* webpackChunkName: "home" */ '@/pages/image-list'),
        hidden: true,
        meta: { title: '' }
      }
    ]
  },
  {
    path: '/account',
    name: 'account',
    component: Layout,
    meta: {
      title: '个人中心',
      roles: ['admin'],
      icon: 'iconzhanghao',
      leve: 1
    },
    children: [
      {
        path: '/account',
        name: '',
        component: () =>
          import(/* webpackChunkName: "home" */ '@/pages/account'),
        hidden: true,
        meta: { title: '' }
      }
    ]
  }
]

export const constantRoutes = [
  {
    path: '/login',
    name: 'login',
    hidden: true,
    meta: { title: '登录' },
    component: Login
  },
  {
    path: '*',
    component: Error404
  },
  {
    path: '/redirect',
    component: Layout,
    children: [{ path: '/redirect/:path*', component: Redirect }]
  }
].concat(otherRoute)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: constantRoutes
})

import { getToken } from '@/utils'
router.beforeEach((to, from, next) => {
  const token = getToken()
  if (token) {
    if (to.name === 'login') {
      next({ name: 'index' })
    } else {
      next()
    }
  } else {
    if (to.name !== 'login') {
      next({
        redirect: true,
        name: 'login'
      })
    } else {
      next()
    }
    next()
  }
})

router.afterEach(() => {
  window.scrollTo(0, 0)
})

export default router
