import { store } from '../../store'

export function handleMessage(
    message: any
) {
    switch (message.type) {
        case 'players_updated':
            store.setPlayers(
                message.payload.players
            )
            break

        case 'game_started':
            store.startGame()
            break

        case 'turn_changed':
            store.setCurrentTurn(
                message.payload.clientId
            )
            break

        default:
            console.warn(
                'unknown websocket message',
                message
            )
    }
}