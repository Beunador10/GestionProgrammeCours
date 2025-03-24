<template>
    <div class="flex items-center justify-center min-h-screen bg-green-100">
      <div class="flex bg-white shadow-lg rounded-lg overflow-hidden w-3/4 max-w-4xl">
        <!-- Section Gauche -->
        <div class="w-1/2 bg-black text-white p-8 flex flex-col justify-center">
          <h2 class="text-3xl font-bold mb-4">Bienvenue sur la plateforme</h2>
          <p class="text-lg">Accédez à votre emploi du temps et vérifiez la disponibilité des professeurs.</p>
        </div>
  
        <!-- Section Droite (Formulaire) -->
        <div class="w-1/2 p-8">
          <h2 class="text-2xl font-semibold text-center mb-6">Connexion</h2>
          <form @submit.prevent="login">
            <div class="mb-4">
              <label for="email" class="block text-gray-700 font-medium">Email :</label>
              <input
                id="email"
                v-model="email"
                type="email"
                class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-100"
              />
            </div>
            <div class="mb-4">
              <label for="password" class="block text-gray-700 font-medium">Mot de passe :</label>
              <input
                id="password"
                v-model="password"
                type="password"
                class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-200"
              />
            </div>
            <div class="mb-4 text-right">
              <a href="#" class="text-black text-sm hover:underline">Mot de passe oublié ?</a>
            </div>
            <button
              type="submit"
              class="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-green-200 hover:text-black transition"
            >
              Se connecter
            </button>
            <p class="text-center text-sm mt-4">Pas encore de compte ? <a href="#" @click.prevent="isLogin = false" class="text-blue-500 hover:underline">S'inscrire</a></p>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        email: '',
        password: ''
      };
    },
    methods: {
      login() {
        if (this.email && this.password) {
          console.log('Connexion réussie');
          this.$router.push('/cours'); // Redirection après connexion
        } else {
          alert('Veuillez remplir tous les champs');
        }
      }
    }
  };
  </script>
  