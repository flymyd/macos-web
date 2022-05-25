import {createApp} from 'vue'
import App from './App.vue'
import './assets/css/index.css'
import router from "@/router/index";
import {createPinia} from 'pinia'

const pinia = createPinia()
import '@purge-icons/generated';

const app = createApp(App);
// app.config.globalProperties.$store = useStore;
app.use(router)
  .use(pinia)
  .mount('#app')
