<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

import { store } from '../store'

import { websocketService } from '../services/websocket'

const router = useRouter()

const name = ref('')
const selectedColor = ref('#ef4444')

const colors = [
  '#ef4444',
  '#22c55e',
  '#facc15',
  '#3b82f6'
]

onMounted(() => {
  const params = new URLSearchParams(window.location.search)

  store.setSessionId(params.get('id') ?? '')
})

function join() {
  if (!name.value.trim()) return

store.setSelf({
  name: name.value,
  color: selectedColor.value
})

websocketService.joinSession()

  router.push('/lobby')
}
</script>

<template>
  <main class="page">
    <section class="card">
      <h1>🎲 Ludomigos</h1>

      <p>Escolha seu nome e sua cor</p>

      <input
        v-model="name"
        placeholder="Seu nome"
      />

      <div class="colors">
        <button
          v-for="color in colors"
          :key="color"
          :style="{ backgroundColor: color }"
          :class="{ selected: color === selectedColor }"
          @click="selectedColor = color"
        />
      </div>

      <button class="primary" @click="join">
        Entrar
      </button>
    </section>
  </main>
</template>