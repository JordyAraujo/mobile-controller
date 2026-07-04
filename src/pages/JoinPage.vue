<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { store } from '../store'
import { websocketService } from '../services/websocket'

const router = useRouter()
const playerName = ref('')

onMounted(() => {
  const params = new URLSearchParams(window.location.search)
  if (!params.has('id') || params.get('id') === '') {
    router.replace({ name: 'NotFound'})
    return
  }
})

function join() {
  if (!playerName.value.trim()) return
  store.setSelf(playerName.value)
  const params = new URLSearchParams(window.location.search)
  websocketService.joinSession(params.get('id') ?? '', playerName.value)
}
</script>

<template>
  <main class="page">
    <section class="card">
      <h1>🎲 Ludomigos</h1>
      <p>Escolha seu nome e sua cor</p>
      <input v-model="playerName" placeholder="Seu nome" />
      <button class="primary" @click="join">
        Entrar
      </button>
    </section>
  </main>
</template>