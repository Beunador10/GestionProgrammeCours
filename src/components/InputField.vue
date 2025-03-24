<template>
    <div class="mb-4">
        <label :for="id" class="block text-gray-700 font-medium">{{ label }}</label>
        <input
            :id="id"
            :v-model="modelValue"
            :type="type"
            @input="$emit('update:modelValue', $event.target.value)"
            class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-100"
        />
        <p v-if="error" class="text-red-500 text-sm">{{ error }}</p>
    </div>
</template>

<script>
export default {
  props: {
    id: String,
    label: String,
    type: {
      type: String,
      default: "text",
    },
    modelValue: String,  // v-model prop
    error: String, // Prop pour afficher les messages d'erreurs
  },

  emits: ["update:modelValue"], // Ajout des événements émis pour éviter le warning
};
</script>