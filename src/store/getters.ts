import { computed } from 'vue'

import { state } from './state'

export const getters = {
  playerCount: computed(
    () => state.players.length
  ),

  canStartGame: computed(
    () =>
      state.players.length > 1 &&
      state.players.length % 2 === 0
  ),

  isMyTurn: computed(
    () => state.self?.clientId === state.currentTurnClientId
  ),

  currentPlayer: computed(
    () => state.currentTurnClientId ? state.players.find(
          player =>
            player.clientId ===
            state.currentTurnClientId
        ) ?? null
        : null
  )
}