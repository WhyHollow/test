import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VuePlyr from 'vue-plyr'
import 'vue-plyr/dist/vue-plyr.css'
Vue.use(VuePlyr, {
  plyr: {},
})
import VueAudio from 'vue-audio-better'

Vue.use(VueAudio)
Vue.config.productionTip = false
Vue.config.devtools = true

require('@/store/subscriber')

axios.defaults.baseURL = process.env.VUE_APP_baseURL

store.dispatch('auth/attempt', localStorage.getItem('Token')).then(() => {
  Vue.use(require('vue-pusher'), {
    api_key: 'app-key',
    options: {
      wsHost: '46.101.147.144',
      wsPort: 6001,
      forceTLS: false,
      encrypted: false,
      disableStats: true,
      enabledTransports: ['ws', 'wss'],
      authEndpoint: 'http://api-waffle.mariposa.in.ua/broadcasting/auth',
      auth: {
        headers: {
          Authorization: `Bearer ${store.state.auth.token}`,
        },
      },
    },
  })

  new Vue({
    router,
    store,
    render: (h) => h(App),
  }).$mount('#app')
})
