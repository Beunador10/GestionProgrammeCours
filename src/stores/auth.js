import { reactive } from 'vue'

export const auth = reactive({
  isLoggedIn: false,
  // role peut être 'guest', 'professeur' ou 'admin'
  role: 'guest',
  // informations de l'utilisateur une fois connecté
  user: {
    nom: '',
    prenom: '',
    photo: '' // URL de la photo de profil
  },
  // Méthodes pour se connecter et se déconnecter
  login(userData) {
    this.isLoggedIn = true
    this.role = userData.role // 'professeur' ou 'admin'
    this.user.nom = userData.nom
    this.user.prenom = userData.prenom
    this.user.photo = userData.photo || ''
  },
  logout() {
    this.isLoggedIn = false
    this.role = 'guest'
    this.user.nom = ''
    this.user.prenom = ''
    this.user.photo = ''
  }
})
