<script setup>
import { RouterLink } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import { onMounted, watch } from 'vue'

const authStore = useAuthStore()

// Ajouter cette partie pour le logging
onMounted(() => {
  if (authStore.isLoggedIn) {
    console.log('Rôle actuel (au chargement) :', authStore.user?.role)
    console.log("le token de l'utilisateur connecté est :", authStore.token)
  }
})

watch(
  () => authStore.user,
  (newUser) => {
    if (newUser) {
      console.log('Nouveau rôle détecté :', newUser.role)
    }
  },
  { immediate: true }
)
</script>

<template>
  <aside class="bg-gray-800 flex flex-col items-center justify-between text-white">
    <div class="flex-1 flex-col items-center w-full">
      <h1 class="pl-5 pt-2 mb-10 text-xl font-bold">ProgrammeCours</h1>

      <div class="flex flex-col w-full">
        <!-- Emploi du temps (toujours visible) -->
        <RouterLink
          to="/emploi-du-temps"
          class="flex items-center gap-2 px-5 py-3 hover:bg-gray-700 transition-colors"
        >
          <!-- Icône... -->
          <span>Emploi du temps</span>
        </RouterLink>

        <!-- Disponibilité (uniquement pour professeurs/admins connectés) -->
        <RouterLink
          v-if="authStore.isLoggedIn && (authStore.user.role === 'professor')"
          to="/disponibilite"
          class="flex items-center gap-2 px-5 py-3 hover:bg-gray-700 transition-colors"
        >
          <span>Disponibilité</span>
        </RouterLink>

        <!-- Menu admin -->
        <template v-if="authStore.isLoggedIn && authStore.user.role === 'administrator'">
          <RouterLink
            to="/professeurs"
            class="flex items-center gap-2 px-5 py-3 hover:bg-gray-700 transition-colors"
          >
            <span>Professeurs</span>
          </RouterLink>

          <RouterLink
            to="/cours"
            class="flex items-center gap-2 px-5 py-3 hover:bg-gray-700 transition-colors"
          >
            <span>Cours</span>
          </RouterLink>

          <RouterLink
            to="/parametre"
            class="flex items-center gap-2 px-5 py-3 hover:bg-gray-700 transition-colors"
          >
            <span>Paramètre</span>
          </RouterLink>
        </template>
      </div>
    </div>
  </aside>
</template>
