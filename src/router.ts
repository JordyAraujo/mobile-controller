import { createRouter, createWebHistory } from 'vue-router'

import JoinPage from './pages/JoinPage.vue'
import LobbyPage from './pages/LobbyPage.vue'
import ControllerPage from './pages/ControllerPage.vue'

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: JoinPage
    },
    {
      path: '/lobby',
      component: LobbyPage
    },
    {
      path: '/controller',
      component: ControllerPage
    }
  ]
})