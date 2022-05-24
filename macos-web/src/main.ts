import { createApp } from 'vue'
import App from './App.vue'
import './assets/css/index.css'
import router from "@/router/index";

import '@purge-icons/generated';
createApp(App)
  .use(router)
  .mount('#app')
