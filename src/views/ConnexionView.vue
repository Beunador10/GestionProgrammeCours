<template>
    <div class="flex items-center justify-center min-h-screen bg-green-100">
        <div class="flex bg-white shadow-lg rounded-lg overflow-hidden w-3/4 max-w-4xl">
        <!-- Section Gauche -->
        <div class="w-1/2 bg-black text-white p-8 flex flex-col justify-center">
            <h2 class="text-3xl font-bold mb-4">Accédez à votre emploi du temps.</h2>
        </div>

        <!-- Section Droite (Formulaire) -->
        <div class="w-1/2 p-8">
            <h2 class="text-2xl font-semibold text-center mb-6">Connexion</h2>
            <AuthForm compte="Pas encore de compte ? " lien="/inscription" lienVersPage="S'inscrire" buttonText="Se connecter" />  
        </div>
        </div>
    </div>
</template>

<script>
import AuthForm from "@/components/AuthForm.vue";

export default {
    components: { AuthForm },
};
</script>
  