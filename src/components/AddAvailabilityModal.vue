<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div class="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-bold">
          {{ editMode ? 'Modifier' : 'Ajouter' }} une disponibilité
        </h2>
        <button @click="closeModal" class="text-gray-400 hover:text-gray-600">
          ✕
        </button>
      </div>

      <form @submit.prevent="handleSubmit" class="space-y-6">
        <div class="space-y-4">
          <!-- Champ Date -->
          <div>
            <label class="block text-sm font-medium mb-2">Date</label>
            <input
              v-model="formData.startDate"
              type="date"
              required
              class="w-full p-2 border rounded-lg"
            >
          </div>

          <!-- Champ Heure de début -->
          <div>
            <label class="block text-sm font-medium mb-2">Heure de début</label>
            <input
              v-model="formData.startTime"
              type="time"
              required
              class="w-full p-2 border rounded-lg"
            >
          </div>

          <!-- Champ Heure de fin -->
          <div>
            <label class="block text-sm font-medium mb-2">Heure de fin</label>
            <input
              v-model="formData.endTime"
              type="time"
              required
              class="w-full p-2 border rounded-lg"
            >
          </div>
        </div>

        <div class="flex justify-end space-x-3">
          <button
            type="button"
            @click="closeModal"
            class="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Annuler
          </button>
          <button
            type="submit"
            class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            {{ editMode ? 'Modifier' : 'Enregistrer' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, watch } from 'vue'

const emit = defineEmits(['close', 'submit'])
const props = defineProps({
  availabilityToEdit: Object
})

const editMode = ref(false)

const formData = reactive({
  id: null,
  startDate: '',
  startTime: '',
  endTime: ''
})

// Si on reçoit une disponibilité (mode édition), on décompose les valeurs
watch(
  () => props.availabilityToEdit,
  (newVal) => {
    if (newVal) {
      editMode.value = true
      formData.id = newVal.id || null
      // On attend que newVal.startDate existe (remplacé par day dans notre API)
      if (newVal.startDate) {
        formData.startDate = newVal.startDate
      } else if (newVal.startDate === '' && newVal.startDate !== undefined) {
        formData.startDate = newVal.startDate
      } else if (newVal.startDate === undefined && newVal.startDate === null) {
        // Si ce champ n'existe pas, on tente de récupérer depuis newVal.day
        formData.startDate = newVal.day
      }
      if (newVal.startTime) {
        formData.startTime = newVal.startTime
      }
      if (newVal.endTime) {
        formData.endTime = newVal.endTime
      }
    } else {
      editMode.value = false
      resetForm()
    }
  },
  { immediate: true }
)

// On s'assure que la fin n'est jamais antérieure au début
watch(
  () => [formData.startDate, formData.startTime, formData.endTime],
  () => {
    if (!formData.startDate || !formData.startTime || !formData.endTime) return
    const start = new Date(`${formData.startDate}T${formData.startTime}`)
    const end = new Date(`${formData.startDate}T${formData.endTime}`)
    if (end < start) {
      formData.endTime = formData.startTime
    }
  }
)

function handleSubmit() {
  emit('submit', { ...formData })
  closeModal()
}

function closeModal() {
  emit('close')
  resetForm()
}

function resetForm() {
  formData.id = null
  formData.startDate = ''
  formData.startTime = ''
  formData.endTime = ''
}
</script>
