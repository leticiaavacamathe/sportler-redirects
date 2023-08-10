<script setup>
import { db } from '../firebase.js'
import { collection, doc, deleteDoc, onSnapshot } from 'firebase/firestore'
import { ref, onMounted } from 'vue'

const redirections = ref([])
const show = ref(false)
const data = ref({})
const isNew = ref(true)

onMounted(async () => {
  const redirectionsCollection = collection(db, 'redirections')
  onSnapshot(redirectionsCollection, (snapshot) => {
    redirections.value = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
  })
})

function toggleComponent(redirectionData = {}, isNewRedirection = true) {
  data.value = redirectionData
  isNew.value = isNewRedirection
  show.value = !show.value
}

async function deleteRedirection(id) {
  await deleteDoc(doc(db, 'redirections', id))
}
</script>

<template>
  <div>
    <h1 class="text-center text-primary text-white mb-4">Sportler Redirects List</h1>
    <div v-if="show" class="modal-overlay">
      <div class="modal-wrapper">
        <add-or-update @close="toggleComponent" :data="data" :isNew="isNew"></add-or-update>
      </div>
    </div>

    <button class="btn btn-primary mb-3" @click="toggleComponent()">Add New</button>
    <div
      v-for="redirection in redirections"
      :key="redirection.id"
      class="card my-2 transparent-card"
    >
      <div class="card-body">
        <h5 class="card-title">{{ redirection.slug }}</h5>
        <p class="card-text">{{ redirection.url_de }}</p>
        <p class="card-text">{{ redirection.url_it }}</p>
        <div class="mt-3">
          <button @click.stop="toggleComponent(redirection, false)" class="btn btn-secondary me-2">
            Edit
          </button>
          <button @click.stop="deleteRedirection(redirection.id)" class="btn btn-danger">
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.transparent-card {
  background-color: rgba(240, 240, 240, 0.8);
}
</style>
