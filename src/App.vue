<script setup>
import { ref, onMounted } from 'vue'

const browserLanguage = ref('')

function detectBrowserLanguage() {
  browserLanguage.value = navigator.language
}

onMounted(detectBrowserLanguage)
</script>

<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
.app-container {
  padding: 30px;
  background-image: url('/dolomites.webp');
  background-size: cover;
  background-repeat: no-repeat;
  min-height: 100vh;
}
</style>
