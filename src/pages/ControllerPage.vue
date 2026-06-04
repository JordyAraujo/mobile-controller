<script setup lang="ts">
import { computed } from 'vue'
import { store } from '../store'

const isMyTurn = computed(
  () => store.isMyTurn
)

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
    <section class="controller-card">

      <button
        class="dice"
        :disabled="!isMyTurn"
        @click="rollDice"
      >
        🎲 Jogar Dados
      </button>

      <div class="dpad">
        <button @click="move('up')">⬆️</button>

        <div class="middle-row">
          <button @click="move('left')">⬅️</button>

          <button
            class="ok"
            @click="confirm"
          >
            OK
          </button>

          <button @click="move('right')">➡️</button>
        </div>

        <button @click="move('down')">⬇️</button>
      </div>

    </section>
  </main>
</template>