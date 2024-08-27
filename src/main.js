import { createApp } from 'vue'
import App from './App.vue'
import router from './routes'
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min.js';
createApp(App).use(router).mount('#app')
