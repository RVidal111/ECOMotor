import store from '../store/index'

export default (to, from, next) => {
  if (store.getters.user) {
    const user = store.getters.user
    if (user.role === 'CLIENT' || user.role === 'BUSINESS' || user.role === 'PROFESSIONAL') {
      next()
    }
  } else {
    next('/')
  }
}