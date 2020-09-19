import Vue from 'vue'
import App from './App.vue'
import store from './store'
import styles from './styles/index.scss'

Vue.config.productionTip = false

new Vue({
  styles,
  store,
  render: h => h(App),
}).$mount('#app')
