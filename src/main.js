import { createApp } from 'vue'
import App from './App.vue'
import i18n from './i18n'

// BASE
import './styles/global.css'

// UI compartida
import './styles/ui/panels.css'
import './styles/ui/buttons.css'
import './styles/ui/sections.css'

// 👇 SOLO ESTE ARCHIVO DE THEMES
import './styles/themes.css'

createApp(App).use(i18n).mount('#app')