<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div class="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-bold">{{ editMode ? 'Modifier' : 'Ajouter' }} une disponibilité</h2>
        <button @click="closeModal" class="text-gray-400 hover:text-gray-600">
          ✕
        </button>
      </div>

      <form @submit.prevent="handleSubmit" class="space-y-6">
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium mb-2">Cours à enseigner</label>
            <input
              v-model="formData.course"
              type="text"
              required
              class="w-full p-2 border rounded-lg"
              placeholder="Mathématiques"
            >
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium mb-2">Prénom</label>
              <input
                v-model="formData.firstName"
                type="text"
                required
                class="w-full p-2 border rounded-lg"
              >
            </div>
            <div>
              <label class="block text-sm font-medium mb-2">Nom</label>
              <input
                v-model="formData.lastName"
                type="text"
                required
                class="w-full p-2 border rounded-lg"
              >
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium mb-2">Email</label>
            <input
              v-model="formData.email"
              type="email"
              required
              class="w-full p-2 border rounded-lg"
            >
          </div>

          <div>
            <label class="block text-sm font-medium mb-2">Date et heure de début</label>
            <input
              v-model="formData.startDateTime"
              type="datetime-local"
              required
              class="w-full p-2 border rounded-lg"
            >
          </div>

          <div>
            <label class="block text-sm font-medium mb-2">Date et heure de fin</label>
            <input
              v-model="formData.endDateTime"
              type="datetime-local"
              required
              class="w-full p-2 border rounded-lg"
              :min="formData.startDateTime"
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
import { ref, watch, reactive } from 'vue'

const emit = defineEmits(['close', 'submit'])
const props = defineProps({
  availabilityToEdit: Object
})

const editMode = ref(false)
const formData = reactive({
  id: null,
  course: '',
  firstName: '',
  lastName: '',
  email: '',
  startDateTime: '',
  endDateTime: ''
})

watch(() => props.availabilityToEdit, (newVal) => {
  if (newVal) {
    editMode.value = true
    Object.assign(formData, newVal)
  } else {
    editMode.value = false
  }
}, { immediate: true })

watch(() => formData.startDateTime, (newVal) => {
  if (newVal > formData.endDateTime) {
    formData.endDateTime = newVal
  }
})

function handleSubmit() {
  emit('submit', { ...formData })
  closeModal()
}

function closeModal() {
  emit('close')
  resetForm()
}

function resetForm() {
  Object.assign(formData, {
    id: null,
    course: '',
    firstName: '',
    lastName: '',
    email: '',
    startDateTime: '',
    endDateTime: ''
  })
}
</script>
