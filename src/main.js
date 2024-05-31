// Import Vue and the main App component
import { createApp } from "vue";
import App from './App.vue'

// Import vue-toastification for toast notifications
import Toast from 'vue-toastification'
// Import the CSS for vue-toastification or use your own custom CSS
import 'vue-toastification/dist/index.css'

// Import your custom global styles
import './assets/style.css'

// Create the Vue application instance
const app = createApp(App)
app.use(Toast)
app.mount('#app')
