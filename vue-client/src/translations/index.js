import Vue          from 'vue'
import i18next      from 'i18next'
import VueI18Next   from '@panter/vue-i18next'

import de from './lang/de'
import es from './lang/es'
import fr from './lang/fr'
import gb from './lang/gb'
import it from './lang/it'
import pt from './lang/pt'

Vue.use(VueI18Next)
  
i18next.init({
    lng: 'es',
    fallbackLng: 'es',
    resources: {
        de: { translation: de },
        es: { translation: es },
        fr: { translation: fr },
        gb: { translation: gb },
        it: { translation: it },
        pt: { translation: pt }
    },
})
  
export default new VueI18Next(
    i18next
)