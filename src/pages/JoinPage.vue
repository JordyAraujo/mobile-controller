<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { store } from '../store'
import { websocketService } from '../services/websocket'

const router = useRouter()
const name = ref('')
const initialColor = ref('#ef4444')

onMounted(() => {
  const params = new URLSearchParams(window.location.search)
  if (!params.has('id')) {
    router.replace({ name: 'NotFound'})
    return
  }
  store.setSessionId(params.get('id') ?? '')
})

function join() {
  if (!name.value.trim()) return
  store.setSelf(name.value, initialColor.value)
  websocketService.joinSession()
  router.push('/lobby')
}
</script>

<template>
  <main class="page">
    <section class="card">
      <h1>🎲 Ludomigos</h1>
      <p>Escolha seu nome e sua cor</p>
      <input v-model="name" placeholder="Seu nome" />
      <button class="primary" @click="join">
        Entrar
      </button>
    </section>
  </main>
</template>