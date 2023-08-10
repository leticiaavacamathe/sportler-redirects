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

function toggleMode(val) {
  mode.value = val
}

async function login(email, password) {
  await signInWithEmailAndPassword(auth, email, password)
    .then((res) => {
      console.log(res)
    })
    .catch((err) => {
      console.log(err)
    })
}

async function register(email, password) {
  await createUserWithEmailAndPassword(auth, email, password)
    .then((res) => {
      console.log(res)
    })
    .catch((err) => {
      console.log(err)
    })
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
  await signOut(auth)
    .then((res) => {})
    .catch((err) => {
      console.log(err)
    })
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
  </div>
</template>
