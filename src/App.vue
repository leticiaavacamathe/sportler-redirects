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
  <main class="app-container">
    <LinkList />
  </main>
</template>
<style>
.app-container {
  padding: 30px;
  background-image: url('/dolomites.webp');
  background-size: cover;
  background-repeat: no-repeat;
  min-height: 100vh;
}
</style>
