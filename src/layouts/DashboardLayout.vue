<template>
  <div class="h-screen flex overflow-hidden">
    <!-- Sidebar -->
    <aside class="w-64 bg-gray-800 text-white flex-none">
      <SideBar />
    </aside>

    <!-- Zone de droite : Header + contenu scrollable -->
    <div class="flex flex-col flex-1">
      <header class="bg-white shadow px-7">
        <DashboardHeader />
      </header>
      <main class="flex-1 overflow-y-auto p-4">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup>
import SideBar from '@/components/SideBar.vue'
import DashboardHeader from '@/components/DashboardHeader.vue'
</script>
