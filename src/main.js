import { createApp } from 'vue'
import App from './App.vue'
import i18n from './i18n'
import router from './router'

import './styles/global.css'
import './styles/ui/panels.css'
import './styles/ui/buttons.css'
import './styles/ui/sections.css'
import './styles/themes.css'

createApp(App)
  .use(i18n)
  .use(router)
  .mount('#app')