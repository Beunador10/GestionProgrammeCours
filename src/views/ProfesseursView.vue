<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-4xl font-bold text-center mb-10">Liste des Professeurs Disponibles</h1>

    <!-- Boucle sur les professeurs -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="prof in professors"
        :key="prof.id"
        class="bg-white rounded-lg shadow-md p-6 flex flex-col"
      >
        <!-- Informations du professeur -->
        <div class="mb-4 border-b pb-2">
          <h2 class="text-2xl font-semibold text-gray-800">
            {{ prof.firstname }} {{ prof.lastname }}
          </h2>
          <p class="text-gray-600">{{ prof.email }}</p>
        </div>

        <!-- Disponibilités -->
        <div class="flex-1">
          <h3 class="text-lg font-bold text-gray-700 mb-2">Disponibilités</h3>
          <div v-if="prof.availabilities && prof.availabilities.length > 0">
            <ul class="space-y-3">
              <li
                v-for="availability in prof.availabilities"
                :key="availability.id"
                class="bg-gray-50 p-3 rounded-md shadow-sm border"
              >
                <p class="text-gray-600">
                  <span class="font-semibold">Date :</span> {{ formatDate(availability.day) }}
                </p>
                <p class="text-gray-600">
                  <span class="font-semibold">Heure :</span>
                  {{ availability.hour_Start.slice(0,5) }} - {{ availability.hour_End.slice(0,5) }}
                </p>
              </li>
            </ul>
          </div>
          <div v-else>
            <p class="text-gray-500 italic">Aucune disponibilité renseignée</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Message en cas d'absence de données -->
    <div v-if="!professors.length" class="text-center text-gray-600 mt-10">
      Aucun professeur disponible.
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import httpClient from '@/services/httpClient'

const professors = ref([])

// Fonction de récupération des professeurs disponibles
async function fetchAvailableTeachers() {
  try {
    const response = await httpClient.get('/api/available-teachers')
    // On suppose que la réponse renvoie un objet avec une propriété "professors"
    professors.value = response.data.professors
  } catch (error) {
    console.error("Erreur lors du chargement des professeurs :", error)
  }
}

onMounted(() => {
  fetchAvailableTeachers()
})

// Formatage de la date (par exemple : "lundi 27 mars 2025")
function formatDate(dateString) {
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(dateString).toLocaleDateString('fr-FR', options)
}
</script>
