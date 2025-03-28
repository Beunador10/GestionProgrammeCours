<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
      <h2 class="text-xl font-bold mb-2">{{ event ? 'Modifier' : 'Ajouter' }} le programme</h2>
      <p class="text-sm text-gray-600 mb-4">
        {{ day?.label }}
      </p>

      <form @submit.prevent="onSubmit" class="space-y-4">
        <!-- Sélection du professeur -->
        <div>
          <label class="block text-sm font-medium text-gray-700">Professeur</label>
          <select
            v-model="professeur"
            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
          >
            <option value="">Sélectionner un professeur</option>
            <option
              v-for="prof in scheduleStore.professors"
              :key="prof.id"
              :value="prof.id"
            >
              {{ prof.firstname }} {{ prof.lastname }}
            </option>
          </select>
        </div>

        <!-- Sélection du cours -->
        <div>
          <label class="block text-sm font-medium text-gray-700">Cours</label>
          <select
            v-model="courseId"
            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
          >
            <option value="">Sélectionner un cours</option>
            <option
              v-for="course in scheduleStore.courses"
              :key="course.id"
              :value="course.id"
            >
              {{ course.subject_taught }}
            </option>
          </select>
        </div>

        <!-- Sélection des heures -->
        <div class="flex space-x-4">
          <div class="flex-1">
            <label class="block text-sm font-medium text-gray-700">Heure de début</label>
            <select
              v-model="startTime"
              class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
            >
              <option v-for="h in possibleHours" :key="h" :value="h">{{ h }}</option>
            </select>
          </div>
          <div class="flex-1">
            <label class="block text-sm font-medium text-gray-700">Heure de fin</label>
            <select
              v-model="endTime"
              class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
            >
              <option v-for="h in possibleEndHours" :key="h" :value="h">{{ h }}</option>
            </select>
          </div>
        </div>

        <div class="flex justify-end space-x-2 pt-4">
          <button type="button" @click="onClose" class="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400">
            Annuler
          </button>
          <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            {{ event ? 'Modifier' : 'Enregistrer' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useScheduleStore } from '@/stores/scheduleStore'

const props = defineProps({
  day: Object,
  hour: Number,
  event: Object
})

const emit = defineEmits(['close', 'submit'])
const scheduleStore = useScheduleStore()

const professeur = ref('')
const courseId = ref('')
const startTime = ref('08:00')
const endTime = ref('09:00')

const possibleHours = [
  '08:00', '09:00', '10:00', '11:00', '12:00',
  '13:00', '14:00', '15:00', '16:00', '17:00',
  '18:00', '19:00'
]

const possibleEndHours = computed(() => {
  const start = parseInt(startTime.value.split(':')[0])
  return possibleHours.filter(h => parseInt(h.split(':')[0]) >= start)
})

// Préremplir si un event est passé en props
watch(() => props.event, (newEvent) => {
  if (newEvent) {
    professeur.value = newEvent.professeur || ''
    courseId.value = newEvent.courseId || ''
    startTime.value = newEvent.startTime || '08:00'
    endTime.value = newEvent.endTime || '09:00'
  } else {
    resetForm()
  }
}, { immediate: true })

function resetForm() {
  professeur.value = ''
  courseId.value = ''
  startTime.value = '08:00'
  endTime.value = '09:00'
}

function onClose() {
  emit('close')
}

function onSubmit() {
  const formData = {
    day: props.day,
    hour: props.hour,
    professeur: professeur.value,
    courseId: courseId.value,
    startTime: startTime.value,
    endTime: endTime.value
  }
  emit('submit', formData)
}
</script>
