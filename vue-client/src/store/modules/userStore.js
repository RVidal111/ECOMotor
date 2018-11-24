const state = {
    loadedUsers: [],
    loadedNotifications: [],
    loadedMessages: []
}

const getters = {
    getNotifications (state) {
        return state.loadedNotifications
    },
    getMessages (state) {
        return state.loadedMessages
    },
    getUsers (state) {
        return state.loadedUsers
    },
    findUser (state) {
        return userId => {
            return state.loadedUsers.find(user => {
                return user.id === userId
            })
        }
    }
}

const actions = {
    // registerUser ({ commit }, payload) {
    //     commit('setLoading', true)
    //     firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password).then(user => {
    //       const newUser = {
    //         email     : user.email,
    //         name      : payload.name,
    //         surnames  : payload.surnames,
    //         role      : 'CLIENT',
    //         picture   : payload.urlAvatarDefault,
    //         createdAt : firebase.firestore.FieldValue.serverTimestamp(),
    //         checked   : false
    //       }
    //       firestore.collection('users').doc(user.uid).set(newUser)
    //       .then(() => {
    //         commit('setLoading', false)
    //       })
    //       .catch(error => {
    //         commit('setLoading', false)
    //         if (error.code === 'auth/weak-password') {
    //           commit('setError', 'La contraseña debe tener al menos 6 caracteres')
    //         }
    //         if (error.code === 'auth/email-already-in-use') {
    //           commit('setError', 'El correo ya se encuentra registrado')
    //         }
    //       })
    //     })
    // },
    loadUsers ({ commit }) {
      firestore.collection('users').onSnapshot(querySnapshot => {
        const users = []
        querySnapshot.forEach(doc => {
          users.push(doc)
        })
        commit('setUsers', users)
      })
    },
    loadNotifications ({commit, getters}) {
      db.ref('notifications').once('value')
        .then((data) => {
          const noti = []
          const obj = data.val()
          for (let key in obj) {
            noti.push({
              name  : obj[key].name,
              user  : obj[key].user,
              type  : obj[key].type,
              site  : obj[key].site,
              isView: obj[key].isView
            })
          }
          commit('setNotifications', noti)
        })
        .catch(error => {
          console.log(error)
        })
    },
    cleanNotifications ({ commit }, payload) {
      commit('setNotifications', payload)
    }
}

const mutations = {
    setNotifications (state, payload) {
        state.loadedNotifications = payload
    },
    setUsers (state, payload) {
        state.loadedUsers = payload
    },
    setNotifications (state, payload) {
        state.loadedNotifications = payload
    },
    setMessages (state, payload) {
        state.loadedMessages = payload
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}