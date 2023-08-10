<script setup>
import { db } from '../firebase.js'
import { collection, doc, deleteDoc, onSnapshot } from 'firebase/firestore'
import { ref, onMounted } from 'vue'
import { auth } from '@/firebase'
import { signOut } from 'firebase/auth'
import router from '../router/router.js'
import AddOrUpdate from './AddOrUpdate.vue'

const redirections = ref([])
const show = ref(false)
const data = ref({})
const isNew = ref(true)
const successMessage = ref('')
const errorMessage = ref('')

onMounted(async () => {
  const redirectionsCollection = collection(db, 'redirections')
  onSnapshot(redirectionsCollection, (snapshot) => {
    redirections.value = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
  })
})

function clearMessages() {
  setTimeout(() => {
    successMessage.value = ''
    errorMessage.value = ''
  }, 5000)
}

function toggleComponent(redirectionData = {}, isNewRedirection = true) {
  data.value = redirectionData
  isNew.value = isNewRedirection
  show.value = !show.value
  clearMessages()
}

async function deleteRedirection(id) {
  try {
    await deleteDoc(doc(db, 'redirections', id))
    successMessage.value = 'Redirection link deleted successfully'
  } catch (error) {
    errorMessage.value = 'Error deleting redirection link'
  }
}

const signout = async () => {
  try {
    await signOut(auth)
    router.push('/')
  } catch (error) {
    console.error('Error signing out:', error)
  }
}
</script>

<template>
  <div class="list-container">
    <button @click="signout" class="btn btn-danger logout-button">Logout</button>
    <h1 class="text-center text-primary text-white mb-4">Sportler Redirects List</h1>
    <div v-if="show" class="modal-overlay">
      <div class="modal-wrapper">
        <add-or-update @close="toggleComponent" :data="data" :isNew="isNew"></add-or-update>
      </div>
    </div>

    <button class="btn btn-primary mb-3" @click="toggleComponent()">Add New</button>
    <div v-for="link in redirections" :key="link.id" class="card my-2 transparent-card">
      <div class="card-body">
        <h5 class="card-title">{{ link.slug }}</h5>
        <p class="card-text">{{ link.url_de }}</p>
        <p class="card-text">{{ link.url_it }}</p>
        <div class="mt-3">
          <button @click.stop="toggleComponent(link, false)" class="btn btn-secondary me-2">
            Edit
          </button>
          <button @click.stop="deleteRedirection(link.id)" class="btn btn-danger">Delete</button>
        </div>
      </div>
    </div>
    <div v-if="successMessage" class="alert alert-success mt-4">
      {{ successMessage }}
    </div>
    <div v-if="errorMessage" class="alert alert-danger mt-4">
      {{ errorMessage }}
    </div>
  </div>
</template>

<style scoped>
.logout-button {
  position: absolute;
  top: 30px;
  right: 50px;
  cursor: pointer;
}
.list-container {
  padding: 50px;
  background-image: url('/dolomites.webp');
  background-size: cover;
  background-repeat: no-repeat;
  min-height: 100vh;
}

.transparent-card {
  background-color: rgba(240, 240, 240, 0.8);
}
</style>
