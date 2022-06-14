import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'
import vue3videoPlay from 'vue3-video-play'
import 'vue3-video-play/dist/style.css'
import "./style/element-rewrite.scss";
import VueLazyloadNext from 'vue-lazyload-next'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ElementPlus)
app.use(vue3videoPlay)
app.use(VueLazyloadNext)
app.mount('#app')
