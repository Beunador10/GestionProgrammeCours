// coursStore.js
import { defineStore } from 'pinia'
import { ref } from 'vue'
import httpClient from '@/services/httpClient'

export const useCoursStore = defineStore('cours', () => {
  // État : liste des cours
  const courses = ref([])

  // Récupérer les cours depuis l'API
  const fetchCourses = async () => {
    try {
      const response = await httpClient.get('/api/courses')
      courses.value = response.data
    } catch (error) {
      console.error("Erreur lors de la récupération des cours :", error)
    }
  }

  // Ajouter un nouveau cours via l'API
  const addCourse = async (course) => {
    try {
      const response = await httpClient.post('/api/courses', course)
      // On ajoute le cours retourné par l'API à la liste locale
      courses.value.push(response.data)
    } catch (error) {
      console.error("Erreur lors de l'ajout du cours :", error)
    }
  }

  return { courses, fetchCourses, addCourse }
})
