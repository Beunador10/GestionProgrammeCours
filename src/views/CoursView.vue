<template>
  <div class="flex h-screen">
    <main class="flex-1 p-6">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-bold">Cours</h2>
        <div class="flex items-center space-x-2">
          <input type="text" v-model="searchQuery" placeholder="Rechercher..." class="border p-2 rounded-md" />
          <button @click="showForm = true" class="bg-blue-500 text-white px-4 py-2 rounded-md"> <b class="text-xl font-bold">+</b> Ajouter</button>
        </div>
      </div>

      <!-- Utilisation directe du store pour garantir la réactivité -->
      <CoursGrid :courses="coursStore.courses" :searchQuery="searchQuery" />
    </main>

    <CoursForm v-if="showForm" @close="showForm = false" @add-course="handleAddCourse" />
  </div>
</template>

<script>
import { onMounted, ref } from 'vue'
import { useCoursStore } from '@/stores/coursStore'
import CoursGrid from "@/components/CoursGrid.vue";
import CoursForm from "@/components/CoursForm.vue";

export default {
  components: { CoursGrid, CoursForm },
  setup() {
    const coursStore = useCoursStore() // Conservez l'objet complet du store
    const searchQuery = ref('')
    const showForm = ref(false)

    onMounted(() => {
      coursStore.fetchCourses()
    })

    const handleAddCourse = async (course) => {
      await coursStore.addCourse(course)
      showForm.value = false
    }

    return {
      coursStore,
      searchQuery,
      showForm,
      handleAddCourse,
    }
  },
}
</script>
