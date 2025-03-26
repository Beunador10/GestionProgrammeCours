<script setup>
import { ref, computed } from 'vue'
import AddEventModal from '../components/AddEventModal.vue'
import { useAuthStore } from '@/stores/authStore'
import {
  format,
  startOfWeek,
  addDays,
  addWeeks
} from 'date-fns'
import { fr } from 'date-fns/locale'

const authStore = useAuthStore()

const currentWeek = ref(new Date())
const days = ref(getWeekDays(currentWeek.value))
const hours = ref([8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19])
const events = ref([])
const isModalOpen = ref(false)
const selectedDay = ref(null)
const selectedHour = ref(null)
const selectedEvent = ref(null)

const promotions = ["Licence 1", "Licence 2", "Licence 3", "Master 1", "Master 2"]
const filieres = ["Génie Logiciel", "Sécurité Informatique", "Intelligence Artificielle", "Système d'Information et Réseau Informatique"]

const selectedPromotion = ref(promotions[0])
const selectedFiliere = ref(filieres[0])

function getWeekDays(date) {
  const start = startOfWeek(date, { weekStartsOn: 1, locale: fr })
  return Array.from({ length: 6 }, (_, i) => {
    const day = addDays(start, i)
    return {
      label: format(day, 'EEEE dd/MM', { locale: fr }),
      value: format(day, 'yyyy-MM-dd')
    }
  })
}

const gridStyle = computed(() => {
  return `grid-template-columns: 100px repeat(${days.value.length}, 1fr);`
})

function showToday() {
  currentWeek.value = new Date()
  days.value = getWeekDays(currentWeek.value)
}

function showPreviousWeek() {
  currentWeek.value = addWeeks(currentWeek.value, -1)
  days.value = getWeekDays(currentWeek.value)
}

function showNextWeek() {
  currentWeek.value = addWeeks(currentWeek.value, 1)
  days.value = getWeekDays(currentWeek.value)
}

const monthLabel = computed(() => {
  return format(currentWeek.value, 'MMMM yyyy', { locale: fr })
})

const dateRangeLabel = computed(() => {
  if (days.value.length === 0) return ''
  const first = days.value[0]
  const last = days.value[days.value.length - 1]
  return `Semaine du ${first.label} au ${last.label}`
})

function openModal(day, hour) {
  if (authStore.user?.role !== 'administrator') return

  const existingEvent = events.value.find(e =>
    e.day === day.value &&
    hour >= e.startHour &&
    hour <= e.endHour
  )

  selectedEvent.value = existingEvent || null
  selectedDay.value = day
  selectedHour.value = existingEvent ? existingEvent.startHour : hour
  isModalOpen.value = true
}

function closeModal() {
  isModalOpen.value = false
  selectedDay.value = null
  selectedHour.value = null
  selectedEvent.value = null
}

function handleFormSubmit(formData) {
  const startHour = parseInt(formData.startTime.split(':')[0])
  const endHour = parseInt(formData.endTime.split(':')[0])

  const newEvent = {
    day: formData.day.value,
    startHour,
    endHour,
    professeur: formData.professeur,
    cours: formData.cours,
    title: formData.title,
    status: formData.status,
    startTime: formData.startTime,
    endTime: formData.endTime,
  }

  if (selectedEvent.value) {
    const index = events.value.findIndex(e => e === selectedEvent.value)
    events.value.splice(index, 1, newEvent)
  } else {
    events.value.push(newEvent)
  }

  closeModal()
}
</script>

<template>
  <section class="flex flex-col h-full">
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-xl font-bold">Emploi du temps</h2>
      <div class="flex items-center space-x-2">
        <div class="flex items-center bg-gray-100 rounded-xl p-2 gap-4 w-2/3">
          <select v-model="selectedPromotion" class="bg-white border border-gray-300 rounded-md px-3 py-1 w-1/2">
            <option v-for="promotion in promotions" :key="promotion" :value="promotion">
              {{ promotion }}
            </option>
          </select>

          <select v-model="selectedFiliere" class="bg-white border border-gray-300 rounded-md px-3 py-1 w-1/2">
            <option v-for="filiere in filieres" :key="filiere" :value="filiere">
              {{ filiere }}
            </option>
          </select>
        </div>

        <button @click="showToday" class="px-4 py-2 border rounded hover:bg-gray-100">
          Aujourd'hui
        </button>
        <button @click="showPreviousWeek" class="px-3 py-2 border rounded hover:bg-gray-100">
          ←
        </button>
        <button @click="showNextWeek" class="px-3 py-2 border rounded hover:bg-gray-100">
          →
        </button>
      </div>
    </div>

    <div class="text-center mb-2">
      <p class="text-xl font-semibold">{{ monthLabel }}</p>
      <p class="text-sm text-gray-500">{{ dateRangeLabel }}</p>
    </div>

    <div class="overflow-x-auto">
      <div class="grid border border-gray-200" :style="gridStyle">
        <div class="bg-white border border-gray-200"></div>

        <div
          v-for="(day, dayIndex) in days"
          :key="'header_' + dayIndex"
          class="text-center font-semibold bg-gray-100 border border-gray-200 p-2"
        >
          {{ day.label }}
        </div>

        <div
          v-for="(hour, hourIndex) in hours"
          :key="'hourRow_' + hourIndex"
          class="contents"
        >
          <div class="text-center bg-gray-100 border border-gray-200 p-2 font-semibold">
            {{ hour }}:00
          </div>

          <div
            v-for="(day,) in days"
            :key="day.value + '_' + hour"
            class="border border-gray-200 p-2 relative"
            :class="{
              'hover:bg-gray-50 cursor-pointer': authStore.user?.role === 'administrator',
              'cursor-default': authStore.user?.role !== 'administrator'
            }"
            @click="authStore.user?.role === 'administrator' ? openModal(day, hour) : null"
          >
            <div
              v-for="event in events.filter(e => e.day === day.value && hour >= e.startHour && hour <= e.endHour)"
              :key="event.day + '_' + event.startHour"
              class="mt-1 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded shadow"
            >
              {{ event.professeur }} - {{ event.cours }}
              <br />
              ({{ event.startTime }} - {{ event.endTime }})
            </div>
          </div>
        </div>
      </div>
    </div>

    <AddEventModal
      v-if="isModalOpen"
      :day="selectedDay"
      :hour="selectedHour"
      :event="selectedEvent"
      @close="closeModal"
      @submit="handleFormSubmit"
    />
  </section>
</template>
