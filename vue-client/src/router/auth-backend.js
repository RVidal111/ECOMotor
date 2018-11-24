import store from '../store/index'

export default (to, from, next) => {
  if (store.getters.user) {
    const user = store.getters.user
    if (user.role === 'MASTER_ADMIN' || user.role === 'ADMIN' || user.role === 'UPDATER' || user.role === 'COMMERCIAL') {
      next()
    }
  } else {
    next('/')
  }
}