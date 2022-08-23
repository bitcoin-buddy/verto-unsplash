import './bootstrap';





import { createApp } from 'vue'
import app from './components/app.vue'
import router from './roter';

// createApp(app).mount("#app")

createApp(app).use(router).mount('#app')



