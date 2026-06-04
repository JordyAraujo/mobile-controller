import { reactive } from 'vue'

export interface Player {
  clientId: string
  name: string
  color: string
}

export interface StoreState {
  sessionId: string

  self: Player | null

  players: Player[]

  gameStarted: boolean

  currentTurnClientId: string | null
}

export const state = reactive<StoreState>({
  sessionId: '',

  self: null,

  players: [],

  gameStarted: false,

  currentTurnClientId: null
})