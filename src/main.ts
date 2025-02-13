import './assets/css/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import i18n from './locales'
import theme from './theme'

const app = createApp(App)

app.use(i18n)
app.use(theme)

app.mount('#app')
