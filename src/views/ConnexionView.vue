<template>
  <div class="flex items-center justify-center min-h-screen bg-green-100">
    <div class="flex bg-white shadow-lg rounded-lg overflow-hidden w-3/4 max-w-4xl">
      <!-- Section Gauche -->
      <div class="w-1/2 bg-black text-white p-8 flex flex-col justify-center">
        <h2 class="text-3xl font-bold mb-4">Accédez à votre emploi du temps.</h2>
      </div>
      <!-- Section Droite (Formulaire et liens) -->
      <div class="w-1/2 p-8">
        <h2 class="text-2xl font-semibold text-center mb-6">Connexion</h2>
        <AuthForm class="w-full" buttonText="Se connecter" :isRegister="false" />
        <!-- Liens d'inscription -->
        <div class="mt-4 text-center">
          <p>Vous n'avez pas de compte ?</p>
          <div class="flex justify-center space-x-4 mt-2">
            <RouterLink to="/inscription-prof" class="text-blue-600 hover:underline">
              S'inscrire en tant que professeur
            </RouterLink>
            <RouterLink to="/inscription-admin" class="text-blue-600 hover:underline">
              S'inscrire en tant qu'administrateur
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AuthForm from "@/components/AuthForm.vue"

export default {
  name: 'ConnexionView',
  components: { AuthForm },
}
</script>
