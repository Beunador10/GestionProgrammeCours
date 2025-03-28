<template>
  <div class="grid grid-cols-3 gap-4">
    <div v-for="course in filteredCourses" :key="course.id" class="bg-white p-4 rounded-md shadow-lg">
      <h3 class="text-lg font-semibold">{{ course.subject_taught }}</h3>
      <p class="text-gray-600 text-sm">⏳ Durée: {{ course.duration }} heures</p>
      <p class="text-gray-600 text-sm">Description: {{ course.description }}</p>
      <router-link to="/emploi-du-temps" class="mt-2 block text-center bg-gray-200 p-2 rounded-md">
        Voir les sessions
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    courses: {
      type: Array,
      default: () => [],
    },
    searchQuery: {
      type: String,
      default: '',
    },
  },
  computed: {
    filteredCourses() {
      return this.courses.filter(course =>
        course.subject_taught
          .toLowerCase()
          .includes(this.searchQuery.toLowerCase())
      );
    },
  },
};
</script>
