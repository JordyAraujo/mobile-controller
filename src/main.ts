import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './styles/variables.css'
import './styles/global.css'

import { websocketService } from './services/websocket'

websocketService.connect()

createApp(App)
  .use(router)
  .mount('#app')