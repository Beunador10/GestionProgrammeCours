<template>
  <component :is="layout">
    
  </component>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import AuthLayout from '@/layouts/AuthLayout.vue'
import DashboardLayout from '@/layouts/DashboardLayout.vue'

const route = useRoute()

const layout = computed(() => {
  // On utilise le layout défini dans meta, par défaut 'dashboard'
  return route.meta.layout === 'auth' ? AuthLayout : DashboardLayout
})
</script>
