<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'

import { store } from '../store'

const router = useRouter()

const canStart = computed(() =>
  store.state.players.length > 1 &&
  store.state.players.length % 2 === 0
)

function startGame() {
    websocketService.startGame()
    router.push('/controller')
}
</script>

<template>
  <main class="page">
    <section class="card">
      <h1>🎉 Sala {{ store.state.sessionId }}</h1>

      <ul class="players">
        <li
          v-for="player in store.state.players"
          :key="player.clientId"
        >
          <span
            class="player-color"
            :style="{ backgroundColor: player.color }"
          />

          {{ player.name }}
        </li>
      </ul>

      <button
        class="primary"
        :disabled="!canStart"
        @click="startGame"
      >
        Iniciar jogo
      </button>
    </section>
  </main>
</template>