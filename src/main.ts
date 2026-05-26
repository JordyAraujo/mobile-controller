const ws = new WebSocket(import.meta.env.VITE_WEBSOCKET_URL)

const app = document.getElementById('app')!

const input = document.createElement('input')

input.placeholder = 'SESSION ID'

const connectButton = document.createElement('button')

connectButton.innerText = 'CONNECT'

function generateClientId() {
  return Math.random()
    .toString(36)
    .substring(2, 8)
    .toUpperCase()
}

connectButton.onclick = () => {
  ws.send(
    JSON.stringify({
      type: 'join_session',
      payload: {
        sessionId: input.value,
        clientId: generateClientId()
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
        button: 'roll_dice'
      }
    })
  )
});

ws.onmessage = (event) => {
  const message = JSON.parse(event.data)
  if (message.type === 'player_joined') {
    const sessionText = document.createElement('h1')
    sessionText.innerText = `Jogador entrou na sessão: ${message.payload.sessionId}`
    console.log(sessionText.innerText)
    app.appendChild(sessionText)
  }
}