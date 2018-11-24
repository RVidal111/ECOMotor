import Vue          from 'vue'
import VueBar       from 'vuebar'

import router from './router/index'
import store  from './store/index'
import i18n   from './translations/index'

import App    from './App.vue'

Vue.component('app', App)
Vue.use(require('vue-moment'))
Vue.use(VueBar)

var vm = new Vue({
  router,
  store,
  i18n,
  created () {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch('autoLoginUser', user)
      }
    })
  }
}).$mount('#app')

global.vm = vm