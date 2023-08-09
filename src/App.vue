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
    <LinkList />
  </main>
</template>
