import Vue from 'vue'
import vSelect from 'vue-select'
import App from './App.vue'
import router from './router'
import SectionHeader from './components/SectionHeader'
import TopBar from './components/TopBar'
import NavBar from './components/NavBar'
import Head from './components/Head'
import SectionTitle from './components/SectionTitle'
import Multiselect from 'vue-multiselect'
import store from './store';
import axios from 'axios';
import VueCryptojs from 'vue-cryptojs'
import fullscreen from 'vue-fullscreen'



axios.defaults.withCredentials = false

Vue.use(VueCryptojs)
Vue.use(fullscreen)

Vue.config.productionTip = false

Vue.component('top-bar', TopBar)
Vue.component('section-header-component', SectionHeader)
Vue.component('navbar-component', NavBar)
Vue.component('head-component', Head)
Vue.component('section-title-component', SectionTitle)
Vue.component('multi-select', Multiselect)
Vue.component('v-select', vSelect)

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')