<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { store } from '../store'
import { websocketService } from '../services/websocket'

const router = useRouter()

onMounted(() => {
  if (!store.state.sessionId) {
    router.replace({ name: 'NotFound' })
    return
  }
})

const canStart = computed(() =>
  store.state.players.length > 1 &&
  store.state.players.length % 2 === 0
)

function startGame() {
  websocketService.startGame(store.state.sessionId)
}
</script>

<template>
  <main class="page">
    <section class="card">
      <h1>🎉 Sala {{ store.state.sessionId }}</h1>
      <ul class="players">
        <li v-for="player in store.state.players" :key="player.clientId">
          <span class="player-color" :class="player.color || 'white'" />
          {{ player.playerName }}
        </li>
      </ul>
      <button v-if="canStart" class="primary" @click="startGame">
        Iniciar jogo
      </button>
      <button v-else class="primary" disabled>
        Aguardando jogadores...
      </button>
    </section>
  </main>
</template>