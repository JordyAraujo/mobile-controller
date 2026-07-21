import { reactive } from 'vue'

export interface Player {
  clientId: string
  playerName: string
  color: string | null
}

export interface StoreState {
  sessionId: string
  self: Player | null
  players: Player[]
  gameStarted: boolean
  currentTurnClientId: string | null
  isMyTurn: boolean
}

export const state = reactive<StoreState>({
  sessionId: '',
  self: null,
  players: [],
  gameStarted: false,
  currentTurnClientId: null,
  isMyTurn: false
})