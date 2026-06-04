import { handleMessage } from './handlers'

import { store } from '../../store'

import type {
    Direction
} from './messages'

class WebSocketService {
    private socket?: WebSocket

    connect() {
        if (
            this.socket?.readyState ===
            WebSocket.OPEN
        ) {
            return
        }

        const url =
            import.meta.env.VITE_WS_URL ??
            'ws://localhost:3001'

        this.socket = new WebSocket(url)

        this.socket.onopen = () => {
            console.log(
                'websocket connected'
            )
        }

        this.socket.onclose = () => {
            console.log(
                'websocket disconnected'
            )
        }

        this.socket.onmessage = event => {
            const message =
                JSON.parse(event.data)

            handleMessage(message)
        }
    }

    private send(
        message: unknown
    ) {
        if (!this.socket) {
            return
        }

        if (
            this.socket.readyState !==
            WebSocket.OPEN
        ) {
            return
        }

        this.socket.send(
            JSON.stringify(message)
        )
    }

    joinSession() {
        if (!store.state.self) {
            return
        }

        this.send({
            type: 'join_session',

            payload: {
                sessionId:
                    store.state.sessionId,

                clientId:
                    store.state.self.clientId,

                playerName:
                    store.state.self.name,

                color:
                    store.state.self.color
            }
        })
    }

    startGame() {
        this.send({
            type: 'start_game'
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