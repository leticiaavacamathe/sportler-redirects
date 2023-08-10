import { createRouter, createWebHistory } from 'vue-router'

import RedirectList from '../components/RedirectList.vue'
import RegisterOrLoginForm from '../components/RegisterOrLoginForm.vue'

const routes = [
  {
    path: '/',
    component: RegisterOrLoginForm
  },
  {
    path: '/links',
    component: RedirectList
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
