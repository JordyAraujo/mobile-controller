import { handleMessage } from './handlers'

import { store } from '../../store'

import type {
    Direction
} from './messages'

class WebSocketService {
    private socket?: WebSocket

    connect() {
        if (this.socket?.readyState === WebSocket.OPEN) return

        this.socket = new WebSocket(import.meta.env.VITE_WEBSOCKET_URL ?? 'ws://localhost:3001')

        this.socket.onopen = () => {
            console.log('websocket connected')
        }

        this.socket.onclose = () => {
            console.log('websocket disconnected')
        }

        this.socket.onmessage = event => {
            handleMessage(JSON.parse(event.data))
        }
    }

    private send(
        message: unknown
    ) {
        if (!this.socket || (this.socket.readyState !== WebSocket.OPEN)) return

        this.socket.send(
            JSON.stringify(message)
        )
    }

    joinSession(sessionId: string, playerName: string) {
        if (!store.state.self || sessionId === '') {
            return
        }

        this.send({
            type: 'join_session',
            payload: {
                sessionId: sessionId,
                clientId: store.state.self.clientId,
                playerName: playerName,
                color: null
            }
        })
    }

    startGame(sessionId: string) {
        this.send({
            type: 'start_game',
            payload: {
                sessionId: sessionId
            }
        })
    }

    rollDice() {
        this.send({
            type: 'roll_dice'
        })
    }

    move(
        direction: Direction
    ) {
        this.send({
            type: 'move',
            payload: {
                direction
            }
        })
    }

    confirm() {
        this.send({
            type: 'confirm'
        })
    }
}

export const websocketService =
    new WebSocketService()