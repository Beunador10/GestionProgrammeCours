<template>
    <div class="flex items-center justify-center min-h-screen bg-gray-900">
      <div class="bg-white shadow-lg rounded-lg p-8 w-96">
        <h2 class="text-2xl font-semibold text-center mb-6">Inscription</h2>
        <form @submit.prevent="register">
          <div class="mb-4">
            <label class="block text-gray-700">Nom :</label>
            <input v-model="name" type="text" class="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500" />
          </div>
          <div class="mb-4">
            <label class="block text-gray-700">Email :</label>
            <input v-model="email" type="email" class="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500" />
          </div>
          <div class="mb-4">
            <label class="block text-gray-700">Mot de passe :</label>
            <input v-model="password" type="password" class="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500" />
          </div>
          <button class="w-full bg-black text-white py-3 rounded-lg hover:bg-green-700">S'inscrire</button>
        </form>
        <p class="text-center text-sm mt-4">Déjà un compte ? <router-link to="/login" class="text-blue-500 hover:underline">Se connecter</router-link></p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        name: '',
        email: '',
        password: ''
      };
    },
    methods: {
      register() {
        if (this.name && this.email && this.password) {
          console.log('Inscription réussie');
        } else {
          alert('Veuillez remplir tous les champs');
        }
      }
    }
  };
  </script>