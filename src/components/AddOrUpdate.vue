<!-- eslint-disable no-unused-vars -->
<script setup>
import { db } from '../firebase.js'
import { collection, addDoc, doc, updateDoc } from 'firebase/firestore'
import { defineComponent, ref, onMounted } from 'vue'

const props = defineProps({
  data: Object,
  isNew: Boolean
})

defineComponent({
  name: 'AddOrUpdate'
})

const emits = defineEmits(['close'])

onMounted(() => {
  link.value = { ...link.value, ...props.data }
})

const link = ref({
  slug: '',
  url_de: '',
  url_it: ''
})

async function addOrUpdate() {
  if (props.isNew) {
    await addDoc(collection(db, 'redirections'), link.value).then((res) => {
      emits('close')
    })
  } else {
    await updateDoc(doc(db, 'redirections', props.data.id), link.value).then((res) => {
      emits('close')
    })
  }
}
</script>

<template>
  <transition name="modal">
    <div class="modal-overlay">
      <div class="modal-wrapper">
        <div class="modal-container">
          <form @submit.prevent="addOrUpdate" class="p-4">
            <h2 class="mb-4">{{ isNew ? 'Add New Redirection' : 'Edit Redirection' }}</h2>
            <div class="mb-3">
              <label for="slug" class="form-label">Slug</label>
              <input type="text" id="slug" class="form-control" v-model="link.slug" required />
            </div>
            <div class="mb-3">
              <label for="url_de" class="form-label">URL (German)</label>
              <input type="text" id="url_de" class="form-control" v-model="link.url_de" required />
            </div>
            <div class="mb-3">
              <label for="url_it" class="form-label">URL (Italian)</label>
              <input type="text" id="url_it" class="form-control" v-model="link.url_it" required />
            </div>
            <div class="d-flex justify-content-end">
              <button @click="emits('close')" type="button" class="btn btn-secondary me-2">
                Close
              </button>
              <button type="submit" class="btn btn-primary">{{ isNew ? 'Add' : 'Update' }}</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </transition>
</template>
