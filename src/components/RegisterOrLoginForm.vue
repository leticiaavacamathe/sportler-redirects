<script setup>
import { auth } from '@/firebase'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth'
import { ref } from 'vue'
import router from '../router/router.js'

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
    router.push('/links')
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
  <div class="login-container">
    <div class="card my-4 transparent-card p-4">
      <div v-if="user">{{ user?.email }} <button @click="signout">Signout</button></div>
      <form @submit.prevent="submit">
        <div class="mb-3">
          <input type="email" class="form-control" placeholder="Enter email" v-model="data.email" />
        </div>
        <div class="mb-3">
          <input
            type="password"
            class="form-control"
            placeholder="Enter password"
            v-model="data.password"
          />
        </div>
        <button type="submit" class="btn btn-primary btn-block">
          {{ mode === 'login' ? 'Login' : 'Register' }}
        </button>
        <div
          @click="toggleMode(mode === 'login' ? 'register' : 'login')"
          class="mt-3 cursor-pointer text-center"
        >
          {{ mode === 'login' ? 'Not a user? Register' : 'Already a user? Login' }}
        </div>
      </form>
    </div>
    <div class="feedback-message">
      <div v-if="successMessage" class="alert alert-success mt-4">
        {{ successMessage }}
      </div>
      <div v-if="errorMessage" class="alert alert-danger mt-4">
        {{ errorMessage }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-container {
  padding: 50px;
  background-image: url('/dolomites.webp');
  background-size: cover;
  background-repeat: no-repeat;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
}

.feedback-message {
  position: absolute;
  bottom: 100px;
}

.transparent-card {
  background-color: rgba(240, 240, 240, 0.8);
  border: none;
  border-radius: 10px;
}

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
