<script setup>
import SideBar from './components/SideBar.vue';
import DashboardHeader from './components/DashboardHeader.vue';
</script>

<template>
  <!-- Container global pleine hauteur -->
  <div class="h-screen flex overflow-hidden">
    <!-- Sidebar, fixe en largeur, pleine hauteur -->
    <aside class="w-64 bg-gray-800  text-white flex-none">
      <SideBar />
    </aside>


    <!-- Zone de droite : Header + contenu scrollable -->
    <div class="flex flex-col flex-1">
      <!-- Header (au-dessus du contenu) -->
      <header class="h-25 bg-white shadow flex-none px-7">
        <DashboardHeader />
      </header>

      <!-- Contenu principal, scrollable -->
      <main class="flex-1 overflow-y-auto p-4">
        <router-view />
      </main>
    </div>
  </div>
</template>

<style scoped>
</style>
