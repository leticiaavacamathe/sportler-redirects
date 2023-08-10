<script setup>
import { auth } from '@/firebase'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth'
import { ref } from 'vue'

const data = ref({
  email: '',
  password: ''
})

const mode = ref('login')

const user = ref(null)

const successMessage = ref('')

const errorMessage = ref('')

function clearMessages() {
  setTimeout(() => {
    successMessage.value = ''
    errorMessage.value = ''
  }, 5000)
}

function toggleMode(val) {
  mode.value = val
}

async function login(email, password) {
  try {
    await signInWithEmailAndPassword(auth, email, password)
    successMessage.value = 'Login successful'
    errorMessage.value = ''
    clearMessages()
  } catch (error) {
    errorMessage.value = 'Error logging in. Please check your credentials.'
    clearMessages()
  }
}

async function register(email, password) {
  try {
    await createUserWithEmailAndPassword(auth, email, password)
    successMessage.value = 'Registration successful'
    errorMessage.value = ''
    clearMessages()
  } catch (error) {
    errorMessage.value = 'Error registering. Please try again.'
    clearMessages()
  }
}

function submit() {
  let email = data.value.email
  let password = data.value.password
  if (mode.value === 'login') {
    login(email, password)
  } else {
    register(email, password)
  }
}

async function signout() {
  try {
    await signOut(auth)
    successMessage.value = 'Logout successful'
    errorMessage.value = ''
    clearMessages()
  } catch (error) {
    errorMessage.value = 'Error logging out. Please try again.'
    clearMessages()
  }
}

onAuthStateChanged(auth, (currentUser) => {
  user.value = currentUser
})
</script>
<template>
  <div>
    <div v-if="user">{{ user?.email }} <button @click="signout">Signout</button></div>
    <form @submit.prevent="submit">
      <div>
        <input type="email" placeholder="Enter email" v-model="data.email" />
      </div>
      <div>
        <input type="password" placeholder="Enter password" v-model="data.password" />
      </div>
      <button type="submit">{{ mode === 'login' ? 'Login' : 'Register' }}</button>
      <div @click="toggleMode(mode === 'login' ? 'register' : 'login')">
        {{ mode === 'login' ? 'Not a user? Register' : 'Already a user? Login' }}
      </div>
    </form>
    <div v-if="successMessage" class="success-message">
      {{ successMessage }}
    </div>
    <div v-if="errorMessage" class="error-message">
      {{ errorMessage }}
    </div>
  </div>
</template>

<style scoped>
.success-message {
  background-color: #4caf50;
  color: white;
  text-align: center;
  padding: 10px;
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 5px;
  z-index: 1000;
}

.error-message {
  background-color: #f44336;
  color: white;
  text-align: center;
  padding: 10px;
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 5px;
  z-index: 1000;
}
</style>
