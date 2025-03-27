<template>
  <div class="container mx-auto px-4 py-8">
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-3xl font-bold">Mes disponibilités</h1>
      <button
        @click="openAddModal"
        class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
      >
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
        </svg>
        Ajouter une disponibilité
      </button>
    </div>

    <div class="grid grid-cols-2 gap-6">
      <div
        v-for="availability in availabilities"
        :key="availability.id"
        class="border rounded-lg p-6 bg-white shadow-sm relative"
      >
        <div class="absolute top-4 right-4 flex space-x-2">
          <button
            @click="openEditModal(availability)"
            class="text-blue-600 hover:text-blue-800"
          >
            ✏️
          </button>
          <button
            @click="deleteAvailability(availability.id)"
            class="text-red-600 hover:text-red-800"
          >
            🗑️
          </button>
        </div>

        <h3 class="text-lg font-semibold mb-2">
          Disponibilité
          <span class="text-sm text-gray-500">
            ({{ formatDate(availability.day) }})
          </span>
        </h3>
        <p class="text-gray-600">
          {{ authStore.user.firstname }} {{ authStore.user.lastname }}
        </p>
        <p class="mt-2 text-sm text-gray-500">
          {{ availability.hour_Start.slice(0,5) }} - {{ availability.hour_End.slice(0,5) }}
        </p>
      </div>
    </div>

    <AddAvailabilityModal
      v-if="isModalOpen"
      :availabilityToEdit="selectedAvailability"
      @close="closeModal"
      @submit="handleSubmit"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import AddAvailabilityModal from '@/components/AddAvailabilityModal.vue'
import httpClient from '@/services/httpClient'
import { useAuthStore } from '@/stores/authStore'

const authStore = useAuthStore()

const isModalOpen = ref(false)
const selectedAvailability = ref(null)
const availabilities = ref([])

// Charge les disponibilités du professeur via l'endpoint /api/professors/{id}
async function fetchAvailabilities() {
  try {
    const response = await httpClient.get(`/api/professors/${authStore.user.id}`)
    // On suppose que la réponse renvoie l'objet professeur dans response.data.data
    // et que les disponibilités se trouvent dans la propriété "availabilities"
    availabilities.value = response.data.data.availabilities
  } catch (error) {
    console.error("Erreur lors du chargement des disponibilités :", error)
  }
}

onMounted(() => {
  fetchAvailabilities()
})

// Formatage de la date pour l'affichage
function formatDate(dateString) {
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(dateString).toLocaleDateString('fr-FR', options)
}

function openAddModal() {
  selectedAvailability.value = null
  isModalOpen.value = true
}

function openEditModal(availability) {
  // Pour l'édition, nous transformons l'objet de l'API pour alimenter le formulaire.
  // On crée des champs : startDate, startTime et endTime à partir de day, hour_Start et hour_End
  selectedAvailability.value = {
    id: availability.id,
    startDate: availability.day,                          // format YYYY-MM-DD
    startTime: availability.hour_Start.slice(0,5),          // format HH:mm
    endTime: availability.hour_End.slice(0,5)
  }
  isModalOpen.value = true
}

function closeModal() {
  isModalOpen.value = false
  selectedAvailability.value = null
}

async function handleSubmit(availabilityData) {
  // Construction du payload attendu par l'API
  const payload = {
    day: availabilityData.startDate,         // Format : YYYY-MM-DD
    hour_start: availabilityData.startTime,    // Format : HH:mm
    hour_end: availabilityData.endTime,        // Format : HH:mm
    user_id: authStore.user.id                 // ID du professeur connecté
  }

  try {
    if (availabilityData.id) {
      // Modification via PUT sur /api/availability/{id}
      await httpClient.put(`/api/availability/${availabilityData.id}`, payload)
    } else {
      // Ajout via POST sur /api/availability
      await httpClient.post('/api/availability', payload)
    }
    // Recharge les disponibilités après ajout/modification
    await fetchAvailabilities()
  } catch (error) {
    console.error("Erreur lors de la sauvegarde de la disponibilité :", error)
  } finally {
    closeModal()
  }
}

async function deleteAvailability(id) {
  try {
    await httpClient.delete(`/api/availability/${id}`)
    await fetchAvailabilities()
  } catch (error) {
    console.error("Erreur lors de la suppression de la disponibilité :", error)
  }
}
</script>
