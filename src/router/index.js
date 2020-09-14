import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('@/views/Main.vue'),
    children: [
      {
        path: '/',
        name: 'home',
        component: () => import('@/views/home/Home')
      },
      {
        path: '/video',
        name: 'video',
        component: () => import('@/views/video/VideoManage')
      },
      {
        path: '/user',
        name: 'user',
        component: () => import('@/views/user/User')
      },
      {
        path: '/page1',
        name: 'page1',
        component: () => import('@/views/other/PageOne')
      },
      {
        path: '/page2',
        name: 'page2',
        component: () => import('@/views/other/PageTwo')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
