import Vue from 'vue'
import App from '@/App'
import router from './router'
import store from './store'

// avue
import Avue from '@smallwei/avue'
import '@smallwei/avue/lib/index.css'

// ui
import '@/assets/scss/app.scss'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(Element)
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
Vue.use(mavonEditor)

Vue.use(Avue)
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
