<template>
  <form @submit.prevent="handleSubmit" class="space-y-4">
    <!-- Champs d'inscription -->
    <template v-if="isRegister">
      <div>
        <label class="block text-sm font-medium mb-2">Prénom</label>
        <input
          v-model="form.firstname"
          type="text"
          required
          class="w-full p-2 border rounded-lg"
          @input="validateName('firstname')"
        />
        <p v-if="errors.firstname" class="text-red-500 text-sm mt-1">{{ errors.firstname }}</p>
      </div>

      <div>
        <label class="block text-sm font-medium mb-2">Nom</label>
        <input
          v-model="form.lastname"
          type="text"
          required
          class="w-full p-2 border rounded-lg"
          @input="validateName('lastname')"
        />
        <p v-if="errors.lastname" class="text-red-500 text-sm mt-1">{{ errors.lastname }}</p>
      </div>

      <div>
        <label class="block text-sm font-medium mb-2">Sexe</label>
        <select
          v-model="form.sex"
          class="w-full p-2 border rounded-lg"
          required
          @change="validateSex"
        >
          <option value="M">Masculin</option>
          <option value="F">Féminin</option>
        </select>
        <p v-if="errors.sex" class="text-red-500 text-sm mt-1">{{ errors.sex }}</p>
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
          @input="validateRoleField"
        />
        <p v-if="errors.functionOrGrade" class="text-red-500 text-sm mt-1">{{ errors.functionOrGrade }}</p>
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
        @input="validateEmail"
      />
      <p v-if="errors.email" class="text-red-500 text-sm mt-1">{{ errors.email }}</p>
    </div>

    <div>
      <label class="block text-sm font-medium mb-2">Mot de passe</label>
      <input
        v-model="form.password"
        type="password"
        required
        class="w-full p-2 border rounded-lg"
        @input="validatePasswordLength"
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
        @input="validatePasswordConfirmation"
      />
      <p v-if="errors.password" class="text-red-500 text-sm mt-1">{{ errors.password }}</p>
    </div>

    <!-- Message d'erreur général -->
    <div v-if="formErrors" class="text-red-500 text-sm bg-red-100 p-3 rounded-md">
      {{ formErrors }}
    </div>

    <button
      type="submit"
      :disabled="loading"
      class="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
    >
      {{ loading ? 'Chargement...' : buttonText }}
    </button>

    <p class="text-center text-sm mt-4">
      {{ compte }}
      <RouterLink :to="lien" class="text-blue-500 hover:underline font-medium">
        {{ lienVersPage }}
      </RouterLink>
    </p>
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

const errors = ref({
  firstname: '',
  lastname: '',
  sex: '',
  email: '',
  password: '',
  functionOrGrade: '',
  general: ''
})

const formErrors = ref('')
const loading = ref(false)

// Validations
const validateName = (field) => {
  const value = form.value[field]
  if (!value || value.length < 2) {
    errors.value[field] = 'Ce champ doit contenir au moins 2 caractères'
    return false
  }
  errors.value[field] = ''
  return true
}

const validateSex = () => {
  if (!['M', 'F'].includes(form.value.sex)) {
    errors.value.sex = 'Veuillez sélectionner un sexe valide'
    return false
  }
  errors.value.sex = ''
  return true
}

const validateEmail = () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(form.value.email)) {
    errors.value.email = 'Adresse email invalide'
    return false
  }
  errors.value.email = ''
  return true
}

/**
 * Vérifie uniquement la longueur minimale du mot de passe.
 */
const validatePasswordLength = () => {
  if (form.value.password.length < 6) {
    errors.value.password = 'Le mot de passe doit contenir au moins 6 caractères'
    return false
  }
  errors.value.password = ''
  return true
}

/**
 * Vérifie uniquement si le mot de passe et sa confirmation correspondent.
 * Appelée lors de la saisie dans le champ de confirmation.
 */
const validatePasswordConfirmation = () => {
  if (props.isRegister && form.value.password !== form.value.password_confirmation) {
    errors.value.password = 'Les mots de passe ne correspondent pas'
    return false
  }
  errors.value.password = ''
  return true
}

const validateRoleField = () => {
  if (!form.value.functionOrGrade) {
    errors.value.functionOrGrade = 'Ce champ est obligatoire'
    return false
  }
  errors.value.functionOrGrade = ''
  return true
}

/**
 * Valide l'ensemble du formulaire au moment de la soumission.
 */
const validateForm = () => {
  let isValid = true

  // Si c'est une inscription, valider les champs spécifiques
  if (props.isRegister) {
    isValid = validateName('firstname') && isValid
    isValid = validateName('lastname') && isValid
    isValid = validateSex() && isValid

    if (!props.hideRoleField) {
      isValid = validateRoleField() && isValid
    }
  }

  // Validation de l'email
  isValid = validateEmail() && isValid

  // Validation de la longueur du mot de passe
  isValid = validatePasswordLength() && isValid

  // Validation de la confirmation (uniquement si isRegister)
  if (props.isRegister) {
    isValid = validatePasswordConfirmation() && isValid
  }

  return isValid
}

const handleSubmit = async () => {
  // Validation globale avant soumission
  if (!validateForm()) return

  loading.value = true
  formErrors.value = ''

  try {
    if (props.isRegister) {
      // Construction du payload
      const payload = {
        firstname: form.value.firstname,
        lastname: form.value.lastname,
        sex: form.value.sex,
        email: form.value.email,
        password: form.value.password,
        password_confirmation: form.value.password_confirmation
      }

      // Ajout du champ spécifique (fonction ou grade)
      if (props.hideRoleField) {
        payload[props.isAdmin ? 'function' : 'grade'] = props.isAdmin
          ? 'Coordonnateur'
          : 'Maître Conférence'
      } else {
        payload[props.isAdmin ? 'function' : 'grade'] = form.value.functionOrGrade
      }

      // Appel API
      const response = await httpClient.post(
        props.isAdmin ? '/api/register/administrator' : '/api/register/professor',
        payload
      )

      // Connexion automatique après inscription
      if (response.data.data) {
        await authStore.login({
          email: form.value.email,
          password: form.value.password
        })
        router.push('/emploi-du-temps')
      }
    } else {
      // Connexion normale
      await authStore.login({
        email: form.value.email,
        password: form.value.password
      })
      router.push('/emploi-du-temps')
    }
  } catch (error) {
    console.error('Erreur:', error)
    formErrors.value =
      error.response?.data?.message ||
      error.message ||
      'Une erreur est survenue. Veuillez réessayer.'
  } finally {
    loading.value = false
  }
}
</script>
