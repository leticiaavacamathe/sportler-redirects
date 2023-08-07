<script setup>
import { db } from '../firebase.js'
import { collection, doc, deleteDoc, onSnapshot } from 'firebase/firestore'
import { ref, onMounted } from 'vue'
import AddOrUpdate from './AddOrUpdate.vue'

const links = ref([])
const show = ref(false)
const data = ref({})
const isNew = ref(true)

onMounted(async () => {
  const linksCollection = collection(db, 'links')
  onSnapshot(linksCollection, (snapshot) => {
    links.value = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
  })
})

function toggleComponent(linkData = {}, isNewLink = true) {
  data.value = linkData
  isNew.value = isNewLink
  show.value = !show.value
}

async function deleteLink(id) {
  await deleteDoc(doc(db, 'links', id))
}
</script>

<template>
  <div>
    <h1 class="text-center text-primary mb-4">Sportler Redirects</h1>
    <div v-if="show" class="modal-overlay">
      <div class="modal-wrapper">
        <add-or-update @close="toggleComponent" :data="data" :isNew="isNew"></add-or-update>
      </div>
    </div>

    <button class="btn btn-primary mb-3" @click="toggleComponent()">Add New</button>
    <div
      v-for="link in links"
      :key="link.id"
      @click="toggleComponent(link, false)"
      class="card my-2"
    >
      <div class="card-body">
        <h5 class="card-title">{{ link.name }}</h5>
        <p class="card-text">{{ link.link }}</p>
        <button class="btn btn-danger" @click.stop="deleteLink(link.id)">Delete</button>
      </div>
    </div>
  </div>
</template>
