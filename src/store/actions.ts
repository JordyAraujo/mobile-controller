import { state, type Player } from './state'

function generateClientId() {
  return Math.random()
    .toString(36)
    .substring(2, 8)
    .toUpperCase()
}

export const actions = {
  setSessionId(sessionId: string) {
    state.sessionId = sessionId
  },

  setSelf(player: Player) {
    player.clientId = generateClientId()
    state.self = player
  },


  clearSelf() {
    state.self = null
  },

  setPlayers(players: Player[]) {
    state.players = players
  },

  addPlayer(player: Player) {
    state.players.push(player)
  },

  removePlayer(clientId: string) {
    state.players = state.players.filter(
      player => player.clientId !== clientId
    )
  },

  startGame() {
    state.gameStarted = true
  },

  stopGame() {
    state.gameStarted = false
  },

  setCurrentTurn(clientId: string | null) {
    state.currentTurnClientId = clientId
  },

  resetLobby() {
    state.players = []

    state.gameStarted = false

    state.currentTurnClientId = null
  },

  reset() {
    state.sessionId = ''

    state.self = null

    state.players = []

    state.gameStarted = false

    state.currentTurnClientId = null
  }
}