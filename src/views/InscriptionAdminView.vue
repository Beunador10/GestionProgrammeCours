<template>
  <div class="flex items-center justify-center min-h-screen bg-green-100">
    <div class="bg-white shadow-lg rounded-lg p-8 w-96">
      <h2 class="text-2xl font-semibold text-center mb-6">Inscription Administrateur</h2>
      <AuthForm
        compte="Déjà un compte ? "
        lien="/connexion"
        lienVersPage="Se connecter"
        buttonText="S'inscrire"
        :isRegister="true"
        :isAdmin="true"
        :hideRoleField="true"
      />
    </div>
  </div>
</template>

<script>
import AuthForm from "@/components/AuthForm.vue"

export default {
  name: 'InscriptionAdminView',
  components: { AuthForm },
}
</script>
