import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/authStore'

const routes = [
  {
    path: '/',
    redirect: '/emploi-du-temps'
  },
  {
    path: '/emploi-du-temps',
    name: 'emploi-du-temps',
    component: () => import('../views/EmploiDuTempsView.vue'),
    meta: { requiresAuth: false, layout: 'dashboard' }
  },
  {
    path: '/professeurs',
    name: 'professeurs',
    component: () => import('../views/ProfesseursView.vue'),
    meta: { requiresAuth: true, roles: ['administrator'], layout: 'dashboard' }
  },
  {
    path: '/disponibilite',
    name: 'disponibilite',
    component: () => import('../views/DisponibiliteView.vue'),
    meta: { requiresAuth: true, roles: ['professor', 'administrator'], layout: 'dashboard' }
  },
  {
    path: '/cours',
    name: 'cours',
    component: () => import('../views/CoursView.vue'),
    meta: { requiresAuth: true, roles: ['administrator'], layout: 'dashboard' }
  },
  {
    path: '/parametre',
    name: 'parametre',
    component: () => import('../views/ParametreView.vue'),
    meta: { requiresAuth: true, roles: ['professor','administrator'], layout: 'dashboard' }
  },
  {
    path: '/connexion',
    name: 'connexion',
    component: () => import('../views/ConnexionView.vue'),
    meta: { requiresGuest: true, layout: 'auth' }
  },
  {
    path: '/inscription-admin',
    name: 'inscription-admin',
    component: () => import('../views/InscriptionAdminView.vue'),
    meta: { requiresGuest: true, layout: 'auth' }
  },
  {
    path: '/inscription-prof',
    name: 'inscription-prof',
    component: () => import('../views/InscriptionProfView.vue'),
    meta: { requiresGuest: true, layout: 'auth' }
  },
  // {
  //   path: '/inscription',
  //   redirect: '/inscription-prof'
  // },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/emploi-du-temps'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()
  authStore.initialize()

  // Liste des routes nécessitant d'être déconnecté
  const authRoutes = ['/connexion', '/inscription-admin', '/inscription-prof']

  if (authStore.isLoggedIn && authRoutes.includes(to.path)) {
    next('/emploi-du-temps')
    return
  }

  if (to.meta.requiresAuth && !authStore.isLoggedIn) {
    next('/connexion')
  } else if (to.meta.roles && !to.meta.roles.includes(authStore.user?.role)) {
    next('/emploi-du-temps')
  } else {
    next()
  }
})

export default router
