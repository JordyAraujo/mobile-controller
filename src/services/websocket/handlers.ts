import router from '../../router'
import { store } from '../../store'

export function handleMessage(
    message: any
) {
    switch (message.type) {
        case 'players_updated':
            if(message.payload.players.some((player: { clientId: string }) => player.clientId === store.state.self?.clientId)) {
                store.setPlayers(
                    message.payload.players
                )
                store.setSessionId(
                    message.payload.sessionId
                )
                router.push('/lobby')
            }
            break

        case 'game_started':
            store.startGame()
            router.push('/controller')
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