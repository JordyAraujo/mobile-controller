<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { store } from '../store'
import { Direction, websocketService } from '../services/websocket'

const router = useRouter()

onMounted(() => {
  console.log('Self client ID:', store.state.self?.clientId)
  if (!store.state.gameStarted) {
    router.replace({ name: 'NotFound' })
    return
  }
})

function rollDice() {
  websocketService.rollDice()
}

function move(direction: Direction) {
  websocketService.move(direction)
}

function confirm() {
  websocketService.confirm()
}
</script>

<template>
  <main class="page">
    <section v-if="store.isMyTurn" class="controller-card">
      <button class="dice" @click="rollDice">
        🎲 Jogar Dado
      </button>
      <div class="dpad">
        <button @click="move('up')">⬆️</button>
        <div class="middle-row">
          <button @click="move('left')">⬅️</button>
          <button class="ok" @click="confirm">
            OK
          </button>
          <button @click="move('right')">➡️</button>
        </div>
        <button @click="move('down')">⬇️</button>
      </div>
    </section>
    <section v-else class="card">
      <h1>🎲 Aguarde a sua vez</h1>
      <span class="controller-player-color" :class="store.currentPlayer.value?.color || 'white'" /><span>{{
        store.currentPlayer.value?.playerName }} está jogando!</span>
    </section>
  </main>
</template>