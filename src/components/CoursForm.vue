<template>
  <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div class="bg-white p-6 rounded-md w-96 shadow-lg">
      <h2 class="text-xl font-bold mb-4">Ajouter un cours</h2>
      <input type="text" v-model="course.name" placeholder="Nom du cours" class="border p-2 w-full rounded-md mb-3" />
      <input type="number" v-model="course.professors" placeholder="Nombre de professeurs" class="border p-2 w-full rounded-md mb-3" />
      <div class="flex justify-end space-x-2">
        <button @click="$emit('close')" class="px-4 py-2 border rounded-md">Annuler</button>
        <button @click="submit" class="px-4 py-2 bg-blue-500 text-white rounded-md">Enregistrer</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      course: { name: '', professors: 0 },
    };
  },
  methods: {
    submit() {
      if (this.course.name && this.course.professors > 0) {
        this.$emit('add-course', { ...this.course });
        this.course = { name: '', professors: 0 };
      }
    },
  },
};
</script>