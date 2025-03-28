<template>
  <header class="py-7 flex items-center justify-between">
    <div class="flex-1 flex items-center justify-start gap-4">
      <div class="bg-gray-200 p-2 rounded-xl">
        <p class="font-bold text-xs">{{ dateTime.date }}</p>
        <p class="text-xs">{{ dateTime.time }}</p>
      </div>
      <p class="text-xl font-bold capitalize">{{ dateTime.day }}</p>
    </div>

    <div class="flex-1 flex items-center justify-end gap-4">
      <template v-if="authStore.isLoggedIn">
        <div class="rounded-full border-2 border-amber-300 w-11 h-11 overflow-hidden">
          <img src="/src/assets/images/User_icon_2.svg.png" alt="profil">
        </div>
        <div class="flex items-center">
          <p class="pr-2">{{ authStore.user.lastname }}</p>
          <p>{{ authStore.user.firstname }}</p>
        </div>
        <button
          @click="authStore.logout"
          class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
        >
          Se déconnecter
        </button>
      </template>
      <template v-else>
        <RouterLink
          to="/connexion"
          class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Se connecter
        </RouterLink>
      </template>
    </div>
  </header>
</template>

<script setup>
import { computed } from 'vue'
import { useAuthStore } from '@/stores/authStore'

const authStore = useAuthStore()

const dateTime = computed(() => {
  const now = new Date()
  return {
    date: now.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' }).toUpperCase(),
    time: now.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit', hour12: true }),
    day: now.toLocaleDateString('fr-FR', { weekday: 'long' })
  }
})
</script>
