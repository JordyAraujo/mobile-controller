export type Direction =
    | 'up'
    | 'down'
    | 'left'
    | 'right'

export interface JoinSessionMessage {
    type: 'join_session'

    payload: {
        sessionId: string

        clientId: string

        playerName: string

        color: string
    }
}

export interface StartGameMessage {
    type: 'start_game'
}

export interface RollDiceMessage {
    type: 'roll_dice'
}

export interface ConfirmMessage {
    type: 'confirm'
}

export interface MoveMessage {
    type: 'move'

    payload: {
        direction: Direction
    }
}