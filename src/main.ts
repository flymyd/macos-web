import {createApp} from 'vue'
import App from './App.vue'
import './assets/css/index.css'
import router from "@/router/index";
import {createPinia} from 'pinia'

const pinia = createPinia()
import '@purge-icons/generated';
import Vue3DraggableResizable from 'vue3-draggable-resizable'
import 'vue3-draggable-resizable/dist/Vue3DraggableResizable.css'

const app = createApp(App);
// app.config.globalProperties.$store = useStore;
app.use(router)
  .use(pinia)
  .use(Vue3DraggableResizable)
  .mount('#app')
