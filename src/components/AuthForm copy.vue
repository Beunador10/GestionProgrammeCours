<template>
  <form @submit.prevent="handleSubmit" class="space-y-4">
    <!-- Champs communs -->
    <div>
      <label class="block text-sm font-medium mb-2">Prénom</label>
      <input
        v-model="form.firstname"
        type="text"
        required
        class="w-full p-2 border rounded-lg"
      >
    </div>

    <div>
      <label class="block text-sm font-medium mb-2">Nom</label>
      <input
        v-model="form.lastname"
        type="text"
        required
        class="w-full p-2 border rounded-lg"
      >
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

    <div>
      <label class="block text-sm font-medium mb-2">Email</label>
      <input
        v-model="form.email"
        type="email"
        required
        class="w-full p-2 border rounded-lg"
      >
    </div>

    <!-- Champ spécifique à l'inscription -->
    <div v-if="isRegister" class="mb-4">
      <label class="block text-sm font-medium mb-2">Fonction/Grade</label>
      <input
        v-model="form.functionOrGrade"
        type="text"
        required
        class="w-full p-2 border rounded-lg"
        :placeholder="isAdmin ? 'Fonction (ex: Secretaire)' : 'Grade (ex: Docteur)'"
      >
    </div>

    <div>
      <label class="block text-sm font-medium mb-2">Mot de passe</label>
      <input
        v-model="form.password"
        type="password"
        required
        class="w-full p-2 border rounded-lg"
      >
    </div>

    <div>
      <label class="block text-sm font-medium mb-2">Confirmation mot de passe</label>
      <input
        v-model="form.password_confirmation"
        type="password"
        required
        class="w-full p-2 border rounded-lg"
        @input="validatePassword"
      >
      <p v-if="passwordError" class="text-red-500 text-sm mt-1">{{ passwordError }}</p>
    </div>

    <div class="flex items-center justify-between">
      <p class="text-sm">
        {{ compte }}
        <RouterLink :to="lien" class="text-blue-600 hover:underline">{{ lienVersPage }}</RouterLink>
      </p>
      <button
        type="submit"
        class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        {{ buttonText }}
      </button>
    </div>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import httpClient from '@/services/httpClient'
import { useAuthStore } from '@/stores/authStore'
import { useRouter } from 'vue-router'

const props = defineProps({
  isRegister: Boolean,
  buttonText: String,
  isAdmin: Boolean,
  compte: String,
  lien: String,
  lienVersPage: String
})

const emit = defineEmits(['submit'])
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

const validatePassword = () => {
  if (form.value.password !== form.value.password_confirmation) {
    passwordError.value = 'Les mots de passe ne correspondent pas'
    return false
  }
  passwordError.value = ''
  return true
}

const handleSubmit = async () => {
  if (!validatePassword()) return

  try {
    if (props.isRegister) {
      const endpoint = props.isAdmin
        ? '/api/register/administrator'
        : '/api/register/professor'

      const payload = {
        firstname: form.value.firstname,
        lastname: form.value.lastname,
        sex: form.value.sex,
        email: form.value.email,
        password: form.value.password,
        password_confirmation: form.value.password_confirmation
      }

      // Ajout du champ spécifique
      if (props.isAdmin) {
        payload.function = form.value.functionOrGrade
      } else {
        payload.grade = form.value.functionOrGrade
      }

      const response = await httpClient.post(endpoint, payload)

      if (response.data.data) {
        // Connexion automatique après inscription
        await authStore.login({
          email: form.value.email,
          password: form.value.password
        })
        router.push('/emploi-du-temps')
      }
    } else {
      const response = await httpClient.post('/api/login', {
        email: form.value.email,
        password: form.value.password
      })

      authStore.login({
        user: response.data.user,
        token: response.data.token
      })
      router.push('/emploi-du-temps')
    }
  } catch (error) {
    console.error('Erreur d\'authentification:', error)
    if (error.response?.data?.message) {
      passwordError.value = error.response.data.message
    }
  }
}
</script>
