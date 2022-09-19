import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: ()=> import('../views/layout'),
    children: [
      {
        path: '/',
        redirect:'/home'
      },
      {
        path: '/home',  //为空则默认子路由
        name: 'home',
        component: ()=> import('../views/home')
      },
      {
        path: '/qa',
        name: 'qa',
        component: ()=> import('../views/qa')
      },
      {
        path: '/video',
        name: 'video',
        component: ()=> import('../views/video')
      },
      {
        path: '/my',
        name: 'my',
        component: ()=> import('../views/my')
      },
    ]
  },
  {
    path:'/login',
    name:'login',
    component: () => import('../views/login')
  },
  {
    path: '/search',
    name:'search',
    component:() => import('../views/search')
  },
  {
    path: '/article/:articleId',
    name: 'article',
    component:() => import('../views/article'),
    props:true
  },
  {
    path: '/XSS',
    component:() => import('../views/xss')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
