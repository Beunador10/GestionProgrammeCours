// router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import EmploiDuTempsView from '../views/EmploiDuTempsView.vue'
import ProfesseursView from '../views/ProfesseursView.vue'
import CoursView from '../views/CoursView.vue'
import DisponibiliteView from '../views/DisponibiliteView.vue'
import ParametreView from '@/views/ParametreView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/emploi-du-temps'
    },
    {
      path: '/emploi-du-temps',
      name: 'emploi-du-temps',
      component: EmploiDuTempsView
    },
    {
      path: '/professeurs',
      name: 'professeurs',
      component: ProfesseursView
    },
    {
      path: '/cours',
      name: 'cours',
      component: CoursView
    },
    {
      path: '/disponibilite',
      name: 'disponibilite',
      component: DisponibiliteView
    },
    {
      path: '/parametre',
      name: 'parametre',
      component: ParametreView
    }
  ],
})

export default router
