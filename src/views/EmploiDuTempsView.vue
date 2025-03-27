<template>
  <section class="flex flex-col h-full">
    <!-- En-tête et sélecteurs de promotion/filière -->
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-xl font-bold">Emploi du temps</h2>
      <div class="flex items-center space-x-2">
        <div class="flex items-center bg-gray-100 rounded-xl p-2 gap-4 w-2/3">
          <select v-model="selectedPromotion" class="bg-white border border-gray-300 rounded-md px-3 py-1 w-1/2">
            <option v-for="promotion in promotions" :key="promotion.name" :value="promotion.name">
              {{ promotion.name }}
            </option>
          </select>
          <select v-model="selectedFiliere" class="bg-white border border-gray-300 rounded-md px-3 py-1 w-1/2">
            <option v-for="filiere in filieres" :key="filiere.name" :value="filiere.name">
              {{ filiere.name }}
            </option>
          </select>
        </div>
        <button @click="showToday" class="px-4 py-2 border rounded hover:bg-gray-100">Aujourd'hui</button>
        <button @click="showPreviousWeek" class="px-3 py-2 border rounded hover:bg-gray-100">←</button>
        <button @click="showNextWeek" class="px-3 py-2 border rounded hover:bg-gray-100">→</button>
      </div>
    </div>

    <!-- Libellé mois / semaine -->
    <div class="text-center mb-2">
      <p class="text-xl font-semibold">{{ monthLabel }}</p>
      <p class="text-sm text-gray-500">{{ dateRangeLabel }}</p>
    </div>

    <!-- Grille de l'emploi du temps -->
    <div class="overflow-x-auto">
      <div class="grid border border-gray-200" :style="gridStyle">
        <!-- Case vide en haut à gauche -->
        <div class="bg-white border border-gray-200"></div>
        <!-- En-têtes jours -->
        <div
          v-for="(day, dayIndex) in days"
          :key="'header_' + dayIndex"
          class="text-center font-semibold bg-gray-100 border border-gray-200 p-2"
        >
          {{ day.label }}
        </div>
        <!-- Lignes d'heures et cases -->
        <div
          v-for="(hour, hourIndex) in hours"
          :key="'hourRow_' + hourIndex"
          class="contents"
        >
          <!-- Affichage de l'heure -->
          <div class="text-center bg-gray-100 border border-gray-200 p-2 font-semibold">
            {{ hour }}:00
          </div>
          <!-- Cases pour chaque jour -->
          <div
            v-for="(day) in days"
            :key="day.value + '_' + hour"
            class="border border-gray-200 p-2 relative min-h-[4rem]"
            :class="{
              'hover:bg-gray-50 cursor-pointer': authStore.user?.role === 'administrator',
              'cursor-default': !(authStore.user?.role === 'administrator')
            }"
            @click="authStore.user?.role === 'administrator' ? openModal(day, hour) : null"
          >
            <!-- Affichage des événements -->
            <div
              v-for="event in weeklyScheduleFiltered(day.value, hour)"
              :key="event.id"
              class="absolute top-0 left-0 right-0 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded shadow"
              :style="{
                height: `${getEventDuration(event) * 100}%`,
                zIndex: 1
              }"
            >
              <div class="flex flex-col items-center justify-center">
                <span class="font-medium">{{ event.course.subject_taught }}</span>
                <span>{{ event.professor.firstname }} {{ event.professor.lastname }}</span>
                <span class="text-xs opacity-75">
                  {{ event.hour_Start }} - {{ event.hour_End }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal pour ajouter/modifier un événement -->
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

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { format, startOfWeek, addDays, addWeeks } from 'date-fns'
import { fr } from 'date-fns/locale'
import AddEventModal from '../components/AddEventModal.vue'
import { useAuthStore } from '@/stores/authStore'
import { useScheduleStore } from '@/stores/scheduleStore'

const authStore = useAuthStore()
const scheduleStore = useScheduleStore()

onMounted(async () => {
  await scheduleStore.fetchLevels()
  await scheduleStore.fetchDepartments()
  await scheduleStore.fetchProfessors()
  await scheduleStore.fetchAvailableTeachers()
  await scheduleStore.fetchCourses()
  await scheduleStore.fetchWeeklySchedule()
})

const promotions = computed(() => scheduleStore.levels)
const filieres = computed(() => scheduleStore.departments)

const currentWeek = ref(new Date())
const days = ref(getWeekDays(currentWeek.value))
const hours = ref([8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19])

const isModalOpen = ref(false)
const selectedDay = ref(null)
const selectedHour = ref(null)
const selectedEvent = ref(null)
const selectedPromotion = ref('')
const selectedFiliere = ref('')

watch(promotions, (newPromotions) => {
  if (newPromotions.length > 0 && !selectedPromotion.value) {
    selectedPromotion.value = newPromotions[0].name
  }
})
watch(filieres, (newFilieres) => {
  if (newFilieres.length > 0 && !selectedFiliere.value) {
    selectedFiliere.value = newFilieres[0].name
  }
})

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

const getEventDuration = (event) => {
  const start = parseInt(event.hour_Start.split(':')[0])
  const end = parseInt(event.hour_End.split(':')[0])
  return end - start
}

function weeklyScheduleFiltered(dayValue, hour) {
  const levelSelected = scheduleStore.levels.find(l => l.name === selectedPromotion.value)
  const departmentSelected = scheduleStore.departments.find(d => d.name === selectedFiliere.value)

  return scheduleStore.weeklySchedule.filter(event => {
    const eventDay = event.day || event.date || ''
    const eventStartHour = parseInt(event.hour_Start.split(':')[0])
    const matchesLevel = levelSelected ? (event.level_education_id == levelSelected.id) : true
    const matchesDept = departmentSelected ? (event.department_id == departmentSelected.id) : true

    return (
      eventDay === dayValue &&
      eventStartHour === hour &&
      matchesLevel &&
      matchesDept
    )
  })
}

function openModal(day, hour) {
  if (!(authStore.user?.role === 'administrator')) return

  const existingEvent = scheduleStore.weeklySchedule.find(e => {
    const eventDay = e.day || e.date || ''
    return eventDay === day.value &&
      e.hour_Start && e.hour_End &&
      hour >= parseInt(e.hour_Start.split(':')[0]) &&
      hour <= parseInt(e.hour_End.split(':')[0])
  })

  selectedEvent.value = existingEvent || null
  selectedDay.value = day
  selectedHour.value = existingEvent
    ? parseInt(existingEvent.hour_Start.split(':')[0])
    : hour
  isModalOpen.value = true
}

function closeModal() {
  isModalOpen.value = false
  selectedDay.value = null
  selectedHour.value = null
  selectedEvent.value = null
}

async function handleFormSubmit(formData) {
  const startHour = formData.startTime
  const endHour = formData.endTime

  const levelSelected = scheduleStore.levels.find(l => l.name === selectedPromotion.value)
  const departmentSelected = scheduleStore.departments.find(d => d.name === selectedFiliere.value)

  const user_id = formData.professeur || 1
  const courseId = formData.courseId

  const payload = {
    day: formData.day.value,
    hour_start: startHour,
    hour_end: endHour,
    user_id: user_id.toString(),
    level_education_id: levelSelected?.id.toString() || '',
    department_id: departmentSelected?.id.toString() || ''
  }

  try {
    await scheduleStore.scheduleCourse(courseId, payload)
    await scheduleStore.fetchWeeklySchedule()
  } catch (error) {
    if (error.response?.data?.message === "Le professeur n'est pas disponible à cette heure.") {
      alert("Le professeur n'est pas disponible à cette heure.")
    } else {
      console.error('Erreur lors de la programmation du cours :', error)
      alert("Le professeur n'est pas disponible à cette heure.")
    }
  } finally {
    closeModal()
  }
}
</script>
