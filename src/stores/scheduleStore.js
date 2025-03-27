import { defineStore } from 'pinia'
import httpClient from '@/services/httpClient'

export const useScheduleStore = defineStore('schedule', {
  state: () => ({
    professors: [],
    levels: [],        // Correspond à "level-educations"
    departments: [],   // Correspond à "departments"
    availableTeachers: [],
    courses: [],       // Liste des cours
    weeklySchedule: [] // Emploi du temps hebdomadaire
  }),
  actions: {
    async fetchProfessors() {
      try {
        const response = await httpClient.get('/api/professors')
        this.professors = response.data.data
      } catch (error) {
        console.error("Erreur lors du chargement des professeurs", error)
      }
    },

    async fetchLevels() {
      try {
        const response = await httpClient.get('/api/level-educations')
        this.levels = response.data.data
      } catch (error) {
        console.error("Erreur lors du chargement des niveaux", error)
      }
    },

    async fetchDepartments() {
      try {
        const response = await httpClient.get('/api/departments')
        this.departments = response.data.data
      } catch (error) {
        console.error("Erreur lors du chargement des départements", error)
      }
    },

    async fetchAvailableTeachers() {
      try {
        const response = await httpClient.get('/api/professors')
        this.availableTeachers = response.data.data
      } catch (error) {
        console.error("Erreur lors du chargement des enseignants disponibles", error)
      }
    },

    async fetchCourses() {
      try {
        const response = await httpClient.get('/api/courses')
        this.courses = response.data
      } catch (error) {
        console.error("Erreur lors du chargement des cours", error)
      }
    },

    async scheduleCourse(courseId, payload) {
      try {
        const response = await httpClient.post(`/api/courses/${courseId}/schedule`, payload)
        return response.data
      } catch (error) {
        console.error("Erreur lors de la programmation du cours", error)
        throw error
      }
    },

    async fetchWeeklySchedule() {
      try {
        const response = await httpClient.get('/api/weekly-schedule')
        console.log("Emploi du temps récupéré :", response.data)
        this.weeklySchedule = response.data
      } catch (error) {
        console.error("Erreur lors du chargement de l'emploi du temps hebdomadaire", error)
      }
    }
  }
})
