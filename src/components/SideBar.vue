<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <aside class="bg-gray-800 flex flex-col items-center justify-between text-white">
    <div class="flex-1 flex-col items-center w-full">
      <h1 class="pl-5 pt-2 mb-10 text-xl font-bold">ProgrammeCours</h1>

      <div class="flex flex-col w-full">
        <!-- Emploi du temps -->
        <RouterLink
          to="/emploi-du-temps"
          class="flex items-center gap-2 px-5 py-3 hover:bg-gray-700 transition-colors"
        >
          <!-- Icône -->
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 20 20">
            <path
              fill="#ffffff"
              d="M15 4h3v15H2V4h3V3c0-.41.15-.76.44-1.06c.29-.29.65-.44 1.06-.44s.77.15 1.06.44c.29.3.44.65.44 1.06v1h4V3c0-.41.15-.76.44-1.06c.29-.29.65-.44 1.06-.44s.77.15 1.06.44c.29.3.44.65.44 1.06zM6 3v2.5a.49.49 0 0 0 .5.5a.49.49 0 0 0 .5-.5V3c0-.14-.05-.26-.15-.35c-.09-.1-.21-.15-.35-.15s-.26.05-.35.15c-.1.09-.15.21-.15.35m7 0v2.5c0 .14.05.26.14.36c.1.09.22.14.36.14s.26-.05.36-.14c.09-.1.14-.22.14-.36V3a.49.49 0 0 0-.5-.5a.49.49 0 0 0-.5.5m4 15V8H3v10zM7 9v2H5V9zm2 0h2v2H9zm4 2V9h2v2zm-6 1v2H5v-2zm2 0h2v2H9zm4 2v-2h2v2zm-6 1v2H5v-2zm4 2H9v-2h2zm4 0h-2v-2h2z"
            />
          </svg>
          <span>Emploi du temps</span>
        </RouterLink>

        <!-- Disponibilité -->
        <RouterLink
          to="/disponibilite"
          class="flex items-center gap-2 px-5 py-3 hover:bg-gray-700 transition-colors"
        >
          <img src="../assets/images/DashiconsCalendarAlt.png" alt="Logo" class="w-5 h-5" />
          <span>Disponibilité</span>
        </RouterLink>

        <!-- Professeur -->
        <RouterLink
          to="/professeurs"
          class="flex items-center gap-2 px-5 py-3 hover:bg-gray-700 transition-colors"
        >
          <img src="../assets/images/DashiconsCalendarAlt.png" alt="Logo" class="w-5 h-5" />
          <span>Professeurs</span>
        </RouterLink>

        <!-- Cours -->
        <RouterLink
          to="/cours"
          class="flex items-center gap-2 px-5 py-3 hover:bg-gray-700 transition-colors"
        >
          <img src="../assets/images/DashiconsCalendarAlt.png" alt="Logo" class="w-5 h-5" />
          <span>Cours</span>
        </RouterLink>

        <!-- Paramètre -->
        <RouterLink
          to="/parametre"
          class="flex items-center gap-2 px-5 py-3 hover:bg-gray-700 transition-colors"
        >
          <img src="../assets/images/DashiconsCalendarAlt.png" alt="Logo" class="w-5 h-5" />
          <span>Paramètre</span>
        </RouterLink>


      </div>
    </div>
  </aside>
</template>

<style scoped>
</style>
