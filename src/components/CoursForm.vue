<template>
  <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div class="bg-white p-6 rounded-md w-96 shadow-lg">
      <h2 class="text-xl font-bold mb-4">Ajouter un cours</h2>
      <!-- Nom du cours -->
      <input type="text" v-model="course.subject_taught" placeholder="Nom du cours" class="border p-2 w-full rounded-md mb-3" />
      <!-- Durée du cours -->
      <input type="number" v-model="course.duration" placeholder="Durée totale" class="border p-2 w-full rounded-md mb-3" />
      <!-- Description -->
      <textarea v-model="course.description" placeholder="Description" class="border p-2 w-full rounded-md mb-3"></textarea>
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
      course: {
        subject_taught: '',
        duration: '',
        description: '',
      },
    };
  },
  methods: {
    submit() {
      if (
        this.course.subject_taught &&
        this.course.duration > 0 &&
        this.course.description
      ) {
        // Émission de l'événement avec le nouveau cours
        this.$emit('add-course', { ...this.course })
        // Réinitialisation du formulaire
        this.course = {
          subject_taught: '',
          duration: 0,
          description: '',
        }
      }
    },
  },
};
</script>
