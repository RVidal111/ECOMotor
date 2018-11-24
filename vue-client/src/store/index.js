import Vue          from 'vue'
import Vuex         from 'vuex'

import globalStore          from './modules/globalStore'
import signInStore          from './modules/signInStore'
import userStore            from './modules/userStore'
import currencyStore        from './modules/currencyStore'
import countryStore         from './modules/countryStore'
import brandStore           from './modules/brandStore'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    modules: {
        globalStore,
        signInStore,
        userStore,
        currencyStore,
        countryStore,
        brandStore
    },
    strict: false
})