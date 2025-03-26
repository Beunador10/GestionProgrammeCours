<template>
  <form @submit.prevent="handleSubmit" class="space-y-4">
    <!-- Champs d'inscription (affichés uniquement si isRegister est true) -->
    <template v-if="isRegister">
      <div>
        <label class="block text-sm font-medium mb-2">Prénom</label>
        <input
          v-model="form.firstname"
          type="text"
          required
          class="w-full p-2 border rounded-lg"
        />
      </div>
      <div>
        <label class="block text-sm font-medium mb-2">Nom</label>
        <input
          v-model="form.lastname"
          type="text"
          required
          class="w-full p-2 border rounded-lg"
        />
      </div>
      <div>
        <label class="block text-sm font-medium mb-2">Sexe</label>
        <select
          v-model="form.sex"
          class="w-full p-2 border rounded-lg"
          required
        >
          <option value="M">Masculin</option>
          <option value="F">Féminin</option>
        </select>
      </div>
      <div v-if="!hideRoleField" class="mb-4">
        <label class="block text-sm font-medium mb-2">
          {{ isAdmin ? 'Fonction' : 'Grade' }}
        </label>
        <input
          v-model="form.functionOrGrade"
          type="text"
          required
          class="w-full p-2 border rounded-lg"
          :placeholder="isAdmin ? 'Fonction (ex: Secrétaire)' : 'Grade (ex: Docteur)'"
        />
      </div>
    </template>

    <!-- Champs communs -->
    <div>
      <label class="block text-sm font-medium mb-2">Email</label>
      <input
        v-model="form.email"
        type="email"
        required
        class="w-full p-2 border rounded-lg"
      />
    </div>

    <div>
      <label class="block text-sm font-medium mb-2">Mot de passe</label>
      <input
        v-model="form.password"
        type="password"
        required
        class="w-full p-2 border rounded-lg"
      />
    </div>

    <!-- Confirmation du mot de passe pour l'inscription -->
    <div v-if="isRegister">
      <label class="block text-sm font-medium mb-2">Confirmation mot de passe</label>
      <input
        v-model="form.password_confirmation"
        type="password"
        required
        class="w-full p-2 border rounded-lg"
        @input="validatePassword"
      />
      <p v-if="passwordError" class="text-red-500 text-sm mt-1">{{ passwordError }}</p>
    </div>

    <div class="flex items-center justify-between">
      <p class="text-sm">
        {{ compte }}
        <RouterLink :to="lien" class="text-blue-600 hover:underline">
          {{ lienVersPage }}
        </RouterLink>
      </p>
      <button
        type="submit"
        :disabled="loading"
        class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 w-full"
      >
        <span v-if="loading">Chargement...</span>
        <span v-else>{{ buttonText }}</span>
      </button>
    </div>

    <!-- Affichage du message d'erreur en cas de problème de connexion -->
    <p v-if="passwordError && !isRegister" class="text-red-500 text-sm text-center">
      {{ passwordError }}
    </p>
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
>>>>>>> 7e4e5c091c8c3be331818e13a1195ba280330d55
  </form>
</template>

<script setup>
import { ref } from 'vue'
import httpClient from '@/services/httpClient'
import { useAuthStore } from '@/stores/authStore'
import { useRouter } from 'vue-router'

const props = defineProps({
  isRegister: { type: Boolean, default: false },
  buttonText: String,
  isAdmin: { type: Boolean, default: false },
  compte: String,
  lien: String,
  lienVersPage: String,
  hideRoleField: { type: Boolean, default: false }
})

const authStore = useAuthStore()
const router = useRouter()

const form = ref({
  firstname: '',
  lastname: '',
  sex: 'M',
  email: '',
  password: '',
  password_confirmation: '',
  functionOrGrade: ''
})

const passwordError = ref('')
const loading = ref(false)

const validatePassword = () => {
  if (form.value.password !== form.value.password_confirmation) {
    passwordError.value = 'Les mots de passe ne correspondent pas'
    return false
  }
  passwordError.value = ''
  return true
}

const handleSubmit = async () => {
  if (props.isRegister && !validatePassword()) return

  loading.value = true

  try {
    if (props.isRegister) {
      // Gestion de l'inscription
      const endpoint = props.isAdmin ? '/api/register/administrator' : '/api/register/professor'
      const payload = {
        firstname: form.value.firstname,
        lastname: form.value.lastname,
        sex: form.value.sex,
        email: form.value.email,
        password: form.value.password,
        password_confirmation: form.value.password_confirmation
      }
      if (props.hideRoleField) {
        if (props.isAdmin) {
          payload.function = "Coordonnateur"
        } else {
          payload.grade = "Maître Conférence"
        }
      } else {
        if (props.isAdmin) {
          payload.function = form.value.functionOrGrade
        } else {
          payload.grade = form.value.functionOrGrade
        }
      }
      const response = await httpClient.post(endpoint, payload)
      if (response.data.data) {
        // Connexion automatique après inscription
        await authStore.login({
          email: form.value.email,
          password: form.value.password
        })
      }
    } else {
      // Gestion de la connexion
      await authStore.login({
        email: form.value.email,
        password: form.value.password
      })
    }
  } catch (error) {
    console.error("Erreur d'authentification:", error)
    passwordError.value = error.message || 'Une erreur est survenue. Veuillez réessayer.'
  } finally {
    loading.value = false
  }
}
</script>
