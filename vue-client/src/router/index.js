import Vue          from 'vue'
import VueRouter    from 'vue-router'

import Backend      from '../components/backend/Index.vue'
import Frontend     from '../components/frontend/Index.vue'
import Login        from '../components/login/Index.vue'

import AuthBackend  from './auth-backend'
import AuthFrontend from './auth-frontend'

Vue.use(VueRouter)

const routes = [
    {path: '/'          , component: Login      , name: 'login'},
    {path: '/frontend'  , component: Frontend   , name: 'frontend', beforeEnter: AuthFrontend},
    {path: '/backend'   , component: Backend    , name: 'backend',  beforeEnter: AuthBackend}
]

export default new VueRouter({
    mode: 'history',
    routes
})