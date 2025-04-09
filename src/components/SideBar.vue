<script setup>
import { RouterLink } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import { onMounted, watch } from 'vue'
import { Icon } from "@iconify/vue";

const authStore = useAuthStore()

// Pour afficher le token et le rôle de l'utilisateur connecté
onMounted(() => {
  if (authStore.isLoggedIn) {
    // console.log('Rôle actuel (au chargement) :', authStore.user?.role)
    // console.log("Le token de l'utilisateur connecté est :", authStore.token)
  }
})

watch(
  () => authStore.user,
  (newUser) => {
    if (newUser) {
      // console.log('Nouveau rôle détecté :', newUser.role)
    }
  },
  { immediate: true }
)
</script>

<template>
  <aside class="bg-gray-800 flex flex-col items-center justify-between h-screen text-white">
    <div class="flex-1 flex-col items-center w-full">
      <h1 class="pl-5 pt-2 mb-10 text-xl font-bold">ProgrammeCours</h1>

      <div class="flex flex-col w-full">
        <!-- Emploi du temps (toujours visible) -->
        <RouterLink
          to="/emploi-du-temps"
          active-class="active-link"
          class="flex items-center gap-2 px-5 py-3 hover:bg-gray-700 transition-colors"
        >
          <Icon icon="material-symbols:calendar-month-outline" width="24" height="24" />
          <span>Emploi du temps</span>
        </RouterLink>

        <!-- Disponibilité (uniquement pour professeurs/admins connectés) -->
        <RouterLink
          v-if="authStore.isLoggedIn && (authStore.user.role === 'professor')"
          to="/disponibilite"
          active-class="active-link"
          class="flex items-center gap-2 px-5 py-3 hover:bg-gray-700 transition-colors"
        >
          <Icon icon="material-symbols:event-available" width="auto" height="auto" />
          <span>Disponibilité</span>
        </RouterLink>

        <!-- Menu admin -->
        <template v-if="authStore.isLoggedIn && authStore.user.role === 'administrator'">
          <RouterLink
            to="/professeurs"
            active-class="active-link"
            class="flex items-center gap-2 px-5 py-3 hover:bg-gray-700 transition-colors"
          >
            <Icon icon="material-symbols:group" width="auto" height="auto" />
            <span>Professeurs</span>
          </RouterLink>

          <RouterLink
            to="/cours"
            active-class="active-link"
            class="flex items-center gap-2 px-5 py-3 hover:bg-gray-700 transition-colors"
          >
            <Icon icon="material-symbols:menu-book" width="auto" height="auto" />
            <span>Cours</span>
          </RouterLink>

          <!-- <RouterLink
            to="/parametre"
            active-class="active-link"
            class="flex items-center gap-2 px-5 py-3 hover:bg-gray-700 transition-colors"
          >
            <span>Paramètre</span>
          </RouterLink> -->
        </template>
      </div>
    </div>

    
    <a class="w-full px-5 py-4 border-t border-gray-700 text-sm text-gray-300 hover:text-white hover:bg-gray-700 transition-colors" href="https://documentation-programmecours.web.app/accueil" target="_blank">
        Documentation de l'app
    </a>
  </aside>
</template>

<style scoped>
.active-link {
  background-color: #4a5568; /* Couleur de fond pour le lien actif */
  color: #ffffff;            /* Couleur du texte en mode actif */
}
</style>
