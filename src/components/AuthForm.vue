<template>
  <form @submit.prevent="submitForm">
    <!-- Erreur globale du formulaire -->
    <p v-if="formErrors" class="text-red-500 text-sm mb-4 bg-red-100 p-3 border border-red-400 rounded-md">{{ formErrors }}</p>
      <template v-if="isRegister">
          <InputField id="nom" label="Nom" v-model="form.nom" type="text" :error="errors.nom" @input="validateNom" />
          <InputField id="prenom" label="Prénom" v-model="form.prenom" type="text" :error="errors.prenom" @input="validatePrenom" />
          <div class="flex flex-col space-y-2">
              <label class="block text-gray-700 font-medium">Sexe</label>
              <select v-model="form.sexe" class="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-300" @change="validateSexe">
                  <option value="">Sélectionner</option>
                  <option value="Homme">Homme</option>
                  <option value="Femme">Femme</option>
                  <option value="Autre">Autre</option>
              </select>
              <p v-if="errors.sexe" class="text-red-500 text-sm">{{ errors.sexe }}</p>
          </div>
      </template>

      <InputField id="email" label="Email" v-model="form.email" type="email" :error="errors.email" @input="validateEmail" />
      <InputField id="password" label="Mot de passe" v-model="form.password" type="password" :error="errors.password" @input="validatePassword" />

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
    formErrors: null, // Erreur globale du formulaire
    form: {
      nom: "",
      prenom: "",
      sexe: "",
      email: "",
      password: "",
      confirmPassword: '',
    },
    errors: {}, // Erreurs spécifiques par champ
  };
},
methods: {
  // Validation individuelle des champs
  validateNom() {
    if (!this.form.nom) {
      this.errors.nom = "Le nom est requis.";
    } else {
      this.errors.nom = null;
    }
  },
  validatePrenom() {
    if (!this.form.prenom) {
      this.errors.prenom = "Le prénom est requis.";
    } else {
      this.errors.prenom = null;
    }
  },
  validateSexe() {
    if (!this.form.sexe) {
      this.errors.sexe = "Le sexe est requis.";
    } else {
      this.errors.sexe = null;
    }
  },
  validateEmail() {
    if (!this.form.email) {
      this.errors.email = "L'email est requis.";
    } else if (!/\S+@\S+\.\S+/.test(this.form.email)) {
      this.errors.email = "L'email est invalide.";
    } else {
      this.errors.email = null;
    }
  },
  validatePassword() {
    if (!this.form.password) {
      this.errors.password = "Le mot de passe est requis.";
    } else if (this.form.password.length < 6) {
      this.errors.password = "Le mot de passe doit contenir au moins 6 caractères.";
    } else {
      this.errors.password = null;
    } 
  },

  // Validation complète du formulaire avant la soumission
  validateForm() {
    let isValid = true;
    this.formErrors = null; // Réinitialiser l'erreur globale

    // Validation des champs
    this.validateNom();
    this.validatePrenom();
    this.validateSexe();
    this.validateEmail();
    this.validatePassword();

    // Vérifier s'il y a des erreurs en fonction du type de formulaire
    if (this.isRegister) {
      // Si on est en mode inscription, on vérifie toutes les erreurs
      for (let key in this.errors) {
        if (this.errors[key]) {
          isValid = false;
        }
      }
    } else {
      // Si c'est une connexion, on ne prend en compte que email et password
      if (this.errors.email || this.errors.password) {
        isValid = false;
      }
    }
      
    // 🔴 Ajoute cette ligne pour voir les erreurs dans la console
    console.log("Erreurs de validation :", this.errors)

    if (this.isRegister) {
      // Validation globale
      if (!this.form.nom || !this.form.prenom || !this.form.sexe || !this.form.email || !this.form.password) {
        this.formErrors = "Veuillez remplir tous les champs requis.";
        isValid = false;
      }
    } else {
      if (!this.form.email || !this.form.password) {
        this.formErrors = "Veuillez remplir tous les champs requis.";
        isValid = false;
      }
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
        // Vous pouvez ici ajouter une logique de validation du backend pour vérifier les identifiants
        // Par exemple :
        const mockEmail = "test@example.com";
        const mockPassword = "123456";


      if (this.form.email == mockEmail && this.form.password == mockPassword) {
        console.log("Connexion réussie :", this.form);
        this.$router.push("/programme_cours");
      } else {
        this.formErrors = "Email ou mot de passe incorrect"
      }

    }
  },
  register() {
    if (this.form.nom && this.form.prenom && this.form.sexe && this.form.email && this.form.password) {
      console.log("Inscription réussie :", this.form);
    }
  },

  handleForgotPassword() {
    console.log("Redirection vers la page de réinitialisation du mot de passe");
    this.$router.push("/reset-password");
  },
},
};
</script>
