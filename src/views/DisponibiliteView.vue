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

    <!-- Afficher les données pour voir si les données s'affichent -->
    <!-- <div class="mb-4 p-4 bg-gray-100 rounded-lg">
      <h3 class="font-bold mb-2">Debug Info (professor.availabilities):</h3>
      <pre>{{ JSON.stringify(professor.availabilities, null, 2) }}</pre>
    </div> -->

    <div class="grid grid-cols-1 gap-6">
      <div
        v-for="availability in professor.availabilities"
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
          {{ availability.course }}
          <span class="text-sm text-gray-500">
            ({{ formatDate(availability.startDateTime) }})
          </span>
        </h3>
        <p class="text-gray-600">
          {{ availability.firstName }} {{ availability.lastName }}<br>
          {{ availability.email }}
        </p>
        <p class="mt-2 text-sm text-gray-500">
          {{ formatTimeRange(availability.startDateTime, availability.endDateTime) }}
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
import { ref, reactive } from 'vue'
import AddAvailabilityModal from '@/components/AddAvailabilityModal.vue'
import { v4 as uuidv4 } from 'uuid'

const isModalOpen = ref(false)
const selectedAvailability = ref(null)

// Données du professeur avec des disponibilités initiales
const professor = reactive({
  availabilities: [
    {
      id: uuidv4(),
      course: 'Mathématiques',
      firstName: 'Martin',
      lastName: 'Dubois',
      email: 'martin.dubois@example.com',
      startDateTime: '2024-03-25T08:00',
      endDateTime: '2024-03-25T10:00'
    }
  ]
})

function formatDate(dateString) {
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }
  return new Date(dateString).toLocaleDateString('fr-FR', options)
}

function formatTimeRange(start, end) {
  return `${new Date(start).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })} -
          ${new Date(end).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}`
}

function openAddModal() {
  isModalOpen.value = true
}

function openEditModal(availability) {
  // Cloner l'objet et formater les dates pour l'input datetime-local
  selectedAvailability.value = {
    ...availability,
    startDateTime: availability.startDateTime.slice(0, 16),
    endDateTime: availability.endDateTime.slice(0, 16)
  }
  isModalOpen.value = true
}

function closeModal() {
  isModalOpen.value = false
  selectedAvailability.value = null
}

function handleSubmit(availabilityData) {
  if (availabilityData.id) {
    // Modification
    const index = professor.availabilities.findIndex(a => a.id === availabilityData.id)
    professor.availabilities.splice(index, 1, {
      ...availabilityData,
      startDateTime: new Date(availabilityData.startDateTime).toISOString(),
      endDateTime: new Date(availabilityData.endDateTime).toISOString()
    })
  } else {
    // Ajout
    professor.availabilities.push({
      ...availabilityData,
      id: uuidv4(),
      startDateTime: new Date(availabilityData.startDateTime).toISOString(),
      endDateTime: new Date(availabilityData.endDateTime).toISOString()
    })
  }
  closeModal()
}

function deleteAvailability(id) {
  professor.availabilities = professor.availabilities.filter(a => a.id !== id)
}
</script>
