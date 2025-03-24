<template>
    <form @submit.prevent="submitForm">
        <template v-if="isRegister">
            <InputField id="nom" label="Nom" v-model="form.nom" type="text" :error="errors.nom" @input="validateForm" />
            <InputField id="prenom" label="Prénom" v-model="form.prenom" type="text" :error="errors.prenom" @input="validateForm" />
            <div class="flex flex-col space-y-2">
                <label class="block text-gray-700 font-medium">Sexe</label>
                <select v-model="form.sexe" class="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-300" @change="validateForm">
                    <option value="">Sélectionner</option>
                    <option value="Homme">Homme</option>
                    <option value="Femme">Femme</option>
                    <option value="Autre">Autre</option>
                </select>
                <p v-if="errors.sexe" class="text-red-500 text-sm">{{ errors.sexe }}</p>
            </div>
        </template>

        <InputField id="email" label="Email" v-model="form.email" type="email" :error="errors.email" @input="validateForm" />
        <InputField id="password" label="Mot de passe" v-model="form.password" type="password" :error="errors.password" @input="validateForm" />
        
        <div v-if="!isRegister" class="mb-4 text-right">
            <a href="#" class="text-black text-sm hover:underline" @click.prevent="handleForgotPassword">Mot de passe oublié ?</a>
        </div>

        <button type="submit" class="w-full bg-black text-white py-3 rounded-lg hover:bg-green-700">{{ buttonText }}</button>
        <p class="text-center text-sm mt-4">{{ compte }}<router-link :to="lien" class="text-blue-500 hover:underline">{{ lienVersPage }}</router-link></p>
    </form>
</template>

<script>
import InputField from "@/components/InputField.vue";

export default {
  components: { InputField },
  props: {
    buttonText: String,
    isRegister: Boolean,
    compte: String,
    lien: String,
    lienVersPage: String,
  },
  data() {
    return {
      form: {
        nom: "",
        prenom: "",
        sexe: "",
        email: "",
        password: "",
      },
      errors: {},
    };
  },
  methods: {
    // Validation du formulaire
    validateForm() {
      this.errors = {};  // Réinitialiser les erreurs à chaque appel
      let isValid = true;

      if (this.isRegister) {
        // Validation pour le nom
        if (this.form.nom === "") {
          this.errors.nom = "Le nom est requis.";
          isValid = false;
        }
        // Validation pour le prénom
        if (this.form.prenom === "") {
          this.errors.prenom = "Le prénom est requis.";
          isValid = false;
        }
        // Validation pour le sexe
        if (this.form.sexe === "") {
          this.errors.sexe = "Le sexe est requis.";
          isValid = false;
        }
      }

      // Validation pour l'email
      if (this.form.email === "") {
        this.errors.email = "L'email est requis.";
        isValid = false;
      } else if (!/\S+@\S+\.\S+/.test(this.form.email)) {
        this.errors.email = "L'email est invalide.";
        isValid = false;
      }

      // Validation pour le mot de passe
      if (this.form.password === "") {
        this.errors.password = "Le mot de passe est requis.";
        isValid = false;
      } else if (this.form.password.length < 6) {
        this.errors.password = "Le mot de passe doit contenir au moins 6 caractères.";
        isValid = false;
      }

      return isValid;
    },

    submitForm() {
      if (!this.validateForm()) {
        return console.log("trou noir");
      }

      if (this.isRegister) {
        this.register();
      } else {
        this.login();
      }
    },
    login() {
      if (this.form.email && this.form.password) {
        console.log("Connexion réussie :", this.form);
        this.$router.push("/programme_cours");
      } else {
        alert("Veuillez remplir tous les champs");
      }
    },
    register() {
      if (this.form.nom && this.form.prenom && this.form.sexe && this.form.email && this.form.password) {
        console.log("Inscription réussie :", this.form);
      } else {
        alert("Veuillez remplir tous les champs");
      }
    },

    handleForgotPassword() {
      console.log("Redirection vers la page de réinitialisation du mot de passe");
      this.$router.push("/reset-password");
    },
  },
};
</script>
