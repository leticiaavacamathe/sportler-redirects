<script setup>
import LinkList from './components/LinkList.vue'
import { ref, onMounted } from 'vue'

const browserLanguage = ref('')

function detectBrowserLanguage() {
  browserLanguage.value = navigator.language
}

onMounted(detectBrowserLanguage)
</script>

<template>
  <main>
    <p class="text-dark">
      Detected browser language:
      <span class="text-success fs-5">{{ browserLanguage.toUpperCase() }}</span>
    </p>
    <LinkList />
  </main>
</template>

<style>
.text-dark {
  color: #000;
}

.text-success {
  color: #28a745;
}
</style>
