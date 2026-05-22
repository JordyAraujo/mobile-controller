declare global {
  interface ImportMetaEnv {
    readonly VITE_WEBSOCKET_URL: string
  }

  interface ImportMeta {
    readonly env: ImportMetaEnv
  }
}

const ws = new WebSocket(import.meta.env.VITE_WEBSOCKET_URL)

const app = document.getElementById('app')!

const input = document.createElement('input')

input.placeholder = 'SESSION ID'

const connectButton = document.createElement('button')

connectButton.innerText = 'CONNECT'

connectButton.onclick = () => {
  const sessionText = document.createElement('h1')

  sessionText.innerText = 'clicou ' + input.value
  app.appendChild(sessionText)
  ws.send(
    JSON.stringify({
      type: 'join_session',
      payload: {
        sessionId: input.value
      }
    })
  )
}

app.appendChild(input)
app.appendChild(connectButton)

ws.onopen = () => {
    console.log('connected')
}

const rollDiceButton = document.createElement('button')
rollDiceButton.innerText = 'Jogar dado'
app.appendChild(rollDiceButton)

rollDiceButton.addEventListener('click', function (event) {
        console.log(`Button ${this.id} clicked!`);
        ws.send(
            JSON.stringify({
                type: 'input',
                payload: {
                    button: this.id
                }
            })
        )
    });

export {}
