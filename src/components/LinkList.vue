<script setup>
import { db } from '../firebase.js'
import { getDocs, collection, deleteDoc, doc } from 'firebase/firestore'
import { ref, onMounted } from 'vue'
import AddOrUpdate from './AddOrUpdate.vue'

const links = ref([])

const show = ref(false)

const data = ref({})

const isNew = ref(true)

onMounted(async () => {
  let linksCollection = await getDocs(collection(db, 'links'))
  linksCollection.forEach((link) => {
    links.value.push({ ...link.data(), id: link.id })
  })
})

function toggleComponent(docData = {}, isNewDoc = true) {
  data.value = docData
  isNew.value = isNewDoc
  show.value = !show.value
}

async function deleteRecord(id) {
  await deleteDoc(doc(db, 'links', id))
}
</script>

<template>
  <div>
    <div class="container my-4 text-center">
      <h1 class="display-4 text-primary font-weight-bold text-uppercase" style="font-size: 2.5rem">
        Sportler redirects
      </h1>
    </div>

    <div v-if="show" class="modal-overlay">
      <div class="modal-wrapper">
        <add-or-update @close="toggleComponent" :data="data" :isNew="isNew"></add-or-update>
      </div>
    </div>

    <button class="btn btn-primary mb-3" @click="toggleComponent()">Add New Link</button>
    <div
      v-for="link in links"
      :key="link.id"
      @click="toggleComponent(link, false)"
      class="card my-2"
    >
      <div class="card-body">
        <h5 class="card-title">{{ link.name }}</h5>
        <p class="card-text">{{ link.link }}</p>
        <button class="btn btn-danger" @click.stop="deleteRecord(link.id)">Delete</button>
      </div>
    </div>
  </div>
</template>
