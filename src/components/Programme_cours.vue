<template>
  <div class="flex h-screen">
    <!-- Sidebar -->
    <aside class="w-64 bg-gray-900 text-white p-4">
      <h2 class="text-lg font-bold mb-4">ProgrammeCours</h2>
      <ul>
        <li class="p-2 bg-gray-800 rounded mb-2">Emploi du temps</li>
        <li class="p-2 hover:bg-gray-700 rounded cursor-pointer">Professeurs</li>
        <li class="p-2 hover:bg-gray-700 rounded cursor-pointer">Cours</li>
        <li class="p-2 hover:bg-gray-700 rounded cursor-pointer">Disponibilité</li>
      </ul>
    </aside>
    
    <!-- Main Content -->
    <div class="flex-1 p-6 bg-gray-100">
      <h1 class="text-2xl font-bold">Emploi du temps</h1>
      <div class="flex justify-between items-center my-4">
        <span class="text-lg">Semaine du {{ startDate }} au {{ endDate }}</span>
        <button @click="resetToCurrentWeek" class="bg-blue-500 text-white px-4 py-2 rounded">Aujourd'hui</button>
      </div>
      
      <!-- Timetable -->
      <div class="bg-white shadow rounded p-4 overflow-x-auto">
        <table class="w-full border-collapse">
          <thead>
            <tr>
              <th class="border p-2">Heure</th>
              <th v-for="day in weekDays" :key="day.date" class="border p-2">{{ day.label }} <br> {{ day.date }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="hour in hours" :key="hour">
              <td class="border p-2">{{ hour }}</td>
              <td v-for="day in weekDays" :key="day.date + hour" class="border p-4 bg-green-100"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentWeekOffset: 0,
      hours: ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00"],
    };
  },
  computed: {
    startDate() {
      return this.getFormattedDate(0);
    },
    endDate() {
      return this.getFormattedDate(5);
    },
    weekDays() {
      return ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"].map((day, index) => {
        return { label: day, date: this.getFormattedDate(index) };
      });
    },
  },
  methods: {
    getFormattedDate(dayOffset) {
      let date = new Date();
      date.setDate(date.getDate() - date.getDay() + 1 + dayOffset + this.currentWeekOffset * 7);
      return date.toISOString().split("T")[0];
    },
    resetToCurrentWeek() {
      this.currentWeekOffset = 0;
    },
  },
};
</script>

<style>
th, td {  
  text-align: center;
}
</style>
