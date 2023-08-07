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
  name: '',
  description: ''
})

async function addOrUpdate() {
  if (props.isNew) {
    await addDoc(collection(db, 'links'), link.value).then((res) => {
      emits('close')
    })
  } else {
    await updateDoc(doc(db, 'links', props.data.id), link.value).then((res) => {
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
            <h2 class="mb-4">{{ isNew ? 'Add New Task' : 'Edit Task' }}</h2>
            <div class="mb-3">
              <label for="name" class="form-label">Name</label>
              <input type="text" id="name" class="form-control" v-model="link.name" required />
            </div>
            <div class="mb-3">
              <label for="description" class="form-label">Link</label>
              <textarea
                id="description"
                class="form-control"
                v-model="link.link"
                required
              ></textarea>
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
