import '@/utils/mock'

//引入样式
import './assets/globle.css'
import setElementPlus from './plugins/element-plus'

import { createApp } from 'vue'
import App from './App.vue'
//路由
import router from './router'




const app = createApp(App)
app.use(router)
setElementPlus(app)


app.mount('#app')
