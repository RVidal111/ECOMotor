import i18next from 'i18next'

const state = {
    // signInType: false,
    user: null,
    userConfig: null,
    errorLoginEmail: false,
    errorLoginPassword: false,
    modal: '',
}

const getters = {
    user (state) {
        return state.user
    },
    userConfig (state) {
        return state.userConfig
    },
    errorLoginEmail (state) {
        return state.errorLoginEmail
    },
    errorLoginPassword (state) {
        return state.errorLoginPassword
    },
    getModal (state) {
        return state.modal
    }
}

const actions = {
    singIn ({ commit, dispatch }, payload) {
      commit('setErrorLoginPassword', false)
      commit('setErrorLoginEmail', false)
      commit('setLoading', true)
      auth.setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then(function() {
        auth.signInWithEmailAndPassword(payload.email, payload.password)
        .then(user => {
          dispatch('createNewUser', { user })
          // dispatch('checkUser', { user, msg : true })
        })
        .catch(error => {
          commit('setLoading', false)
          if (error.code === 'auth/wrong-password') {
            commit('setErrorLoginPassword', true)
          } else if (error.code === 'auth/user-not-found') {
            commit('setErrorLoginEmail', true)
          }
        })
      })
    },
    // checkUser ({ commit, dispatch }, { user, msg }) {
    //   // let sessionRef = firestore.collection('activeSessions').doc(user.uid)
    //   // sessionRef.get().then(doc => {
    //     // if (msg === true) {
    //     //   commit('setSignInTypeTrue')
    //     //   if (doc.data().active === true) {
    //     //     auth.signOut()
    //     //     commit('setModal', 'ActiveSessionModal')
    //     //     commit('setLoading', false)
    //     //   } else {
    //     //     // sessionRef.update({active : true})
    //     //     dispatch('createNewUser', { user, msg, sessionRef })
    //     //   }
    //     // } else if (msg === false && state.signInType === false) {
    //     //   dispatch('createNewUser', { user, msg, sessionRef })
    //     // }
    //   // })
    // },
    createNewUser({ commit }, { user, msg, sessionRef }) {
      let userRef       = firestore.collection('users').doc(user.uid)
      let userConfigRef = firestore.collection('usersConfig').doc(user.uid)
      userRef.get().then(doc => {
        const newUser = {
          id        : user.uid,
          fullName  : doc.data().name + ' ' + doc.data().surnames,  
          role      : doc.data().role         
        }
        if (doc.data().picture) {
          newUser.photo = doc.data().picture
        } else {
          newUser.picture = imagesRef.child('no-avatar.png').getMetadata().then(metadata => {
            newUser.photo = metadata.downloadURl[0]
          })
        }
        userConfigRef.get().then(doc => {
          const newUserConfig = {
            language : ''        
          }
          if (doc.data().language === 'de') {
            newUserConfig.language = 'de'
          }
          if (doc.data().language === 'es') {
            newUserConfig.language = 'es'
          }
          if (doc.data().language === 'fr') {
            newUserConfig.language = 'fr'
          }
          if (doc.data().language === 'gb') {
            newUserConfig.language = 'gb'
          }
          if (doc.data().language === 'it') {
            newUserConfig.language = 'it'
          }
          if (doc.data().language === 'pt') {
            newUserConfig.language = 'pt'
          }
          i18next.changeLanguage(newUserConfig.language, () => {
            console.log('lenguaje cambiado')
            checkStatusUser()
          })
        })
        const checkStatusUser = () => {
          // if (msg == true) {
          if (doc.data().emailVerified === true) {
            if (doc.data().checked === true) {
              commit('setUser', newUser)
              commit('setUserConfig', newUserConfig)
              commit('setLoading', false)
            } else {
              // sessionRef.update({active : false})
              auth.signOut()
              setTimeout(function () {
                commit('setModal', 'CheckedAccountModal')
                commit('setLoading', false)
              }, 1100)
              // commit('setModal', 'CheckedAccountModal')
              // commit('setLoading', false)
            }
          } else {
            // sessionRef.update({active : false})
            auth.signOut()
            setTimeout(function () {
              commit('setModal', 'VerifiedEmailModal')
              commit('setLoading', false)
            }, 1100)
            // commit('setModal', 'VerifiedEmailModal')
            // commit('setLoading', false)
          }
        // } else if (msg == false) {
        //   commit('setUser', newUser)
        //   commit('setUserConfig', newUserConfig)
        //   commit('setLoading', false)
        // }  
        }        
      })
    },
    autoLoginUser ({commit, dispatch}, user) {
      commit('setLoading', true)
      dispatch('createNewUser', { user })
      // dispatch('checkUser', { user, msg : false })
    },
    exitModal ({ commit }, modal) {
        commit(modal, false)
    }
}

const mutations = {
    // setSignInTypeTrue (state) {
    //     state.signInType = true
    // },
    setUser (state, payload) {
        state.user =  payload
    },
    setUserConfig (state, payload) {
      state.userConfig =  payload
    },
    setErrorLoginEmail (state, payload) {
        state.errorLoginEmail = payload
    },
    setErrorLoginPassword (state, payload) {
        state.errorLoginPassword = payload
    },
    setModal (state, payload) {
        state.modal = payload
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}