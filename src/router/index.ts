import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import store from '@/store/index'

import Main from '../views/Main.vue'
import Home from '../views/Home.vue'
import Login from '@/views/security/Login.vue'
import SignIn from '@/views/security/SignIn.vue'
import Articles from '@/views/articles/Articles.vue'
import ArticlesEdit from '@/views/articles/ArticlesEdit.vue'
import { ClientUnauthorizedResponse } from '@/services/api/response/ClientUnauthorizedResponse'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
    beforeEnter: () => {
      if (store.getters.hasUser) return { name: 'Home' }
    },
  },
  {
    path: '/sign-in',
    name: 'SignIn',
    component: SignIn,
    beforeEnter: () => {
      if (store.getters.hasUser) return { name: 'Home' }
    },
  },
  {
    path: '/',
    name: 'Main',
    component: Main,
    children: [
      { path: 'home', name: 'Home', component: Home },
      { path: 'articles', name: 'Articles', component: Articles },
      { path: 'articles/add', name: 'ArticlesAdd', component: ArticlesEdit },
      { path: 'articles/update/:id', name: 'ArticleUpdate', component: ArticlesEdit, props: true },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

router.beforeEach(async (to) => {
  if (to.name === 'Login' || to.name === 'SignIn') {
    return
  }

  if (store.getters.hasUserSession) {
    try {
      await store.dispatch('refreshSessionData')
      return
    } catch (error) {
      if (error instanceof ClientUnauthorizedResponse) return { name: 'Login' }
    }
  }

  return { name: 'Login' }
})

export default router
