<template>
  <div class="flex h-screen">
    <main class="flex-1 p-6">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-bold">Cours</h2>
        <div class="flex items-center space-x-2">
          <input type="text" v-model="searchQuery" placeholder="Rechercher..." class="border p-2 rounded-md" />
          <button @click="showForm = true" class="bg-blue-500 text-white px-4 py-2 rounded-md">+ Ajouter</button>
        </div>
      </div>
      
      <CoursGrid :courses="courses" :searchQuery="searchQuery" />
    </main>
    
    <CoursForm v-if="showForm" @close="showForm = false" @add-course="addCourse" />
  </div>
</template>

<script>
import CoursGrid from "@/components/CoursGrid.vue";
import CoursForm from "@/components/CoursForm.vue";

export default {
  components: { CoursGrid, CoursForm },
  data() {
    return {
      showForm: false,
      searchQuery: '',
      courses: [
        { name: "Algèbre linéaire", sessions: 2, professors: 2 },
        { name: "Mécanique quantique", sessions: 1, professors: 1 },
        { name: "Programmation orientée objet", sessions: 1, professors: 1 },
        { name: "Chimie organique", sessions: 4, professors: 3 },
        { name: "Biologie cellulaire", sessions: 2, professors: 2 },
        { name: "Calcul différentiel", sessions: 2, professors: 2 },
        { name: "Thermodynamique", sessions: 1, professors: 2 },
        { name: "Structures de données", sessions: 2, professors: 2 },
      ],
    };
  },
  methods: {
    addCourse(course) {
      this.courses.push(course);
      this.showForm = false;
    },
  },
};
</script>