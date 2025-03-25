<template>
    <div class="grid grid-cols-3 gap-4">
      <div v-for="course in filteredCourses" :key="course.name" class="bg-white p-4 rounded-md shadow-lg">
        <h3 class="text-lg font-semibold">{{ course.name }}</h3>
        <p class="text-gray-600 text-sm">👨‍🏫 {{ course.professors }} professeur(s)</p>
        <router-link to="/emploi-du-temps" class="mt-2 block text-center bg-gray-200 p-2 rounded-md">Voir les sessions</router-link>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      courses: Array,
      searchQuery: String,
    },
    computed: {
      filteredCourses() {
        return this.courses.filter(course => 
          course.name.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      },
    },
  };
  </script>