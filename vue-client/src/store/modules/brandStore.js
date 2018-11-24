import userStore from './userStore'
import 'jspdf-autotable/dist/jspdf.plugin.autotable.min.js'
import PDF from 'jspdf/dist/jspdf.min.js'

const state = {
    loadedBrands: [],
    brandsPDF: [],
    brandExists: false
}

const getters = {
    getOrderBrands (state) {
        return state.loadedBrands
    },
    brandExists (state) {
        return state.brandExists
    }
}

const actions = {
    loadBrands ({ commit }) {
        commit('setLoading', true)
        firestore.collection('brands').orderBy('brand', 'asc').onSnapshot(querySnapshot => {
          const files = []  
          querySnapshot.forEach(doc => {
            files.push(doc.data())
          })
          files.forEach((data, i) => {
            let createdUser = userStore.state.loadedUsers.find(user => {
              return user.id === data.createdFor
            })
            files[i].createdFor = createdUser.data().name + ' ' + createdUser.data().surnames
            files[i].idCreatedFor = createdUser.id
            if (data.updatedFor) {
              let updatedUser = userStore.state.loadedUsers.find(user => {
                return user.id === data.updatedFor
              })
              files[i].updatedFor = updatedUser.data().name + ' ' + updatedUser.data().surnames
              files[i].idUpdatedFor = updatedUser.id
            }
          })
          commit('setBrands', files)
          commit('setLoading', false)
        })
      },
      addBrand ({commit, state}, payload) {
        commit('setLoading', true)
        const brandS = payload.brand.split(" ");
        for (let i = 0; i < brandS.length; i++) {
          var j = brandS[i].charAt(0).toUpperCase();
          brandS[i] = j + brandS[i].substr(1).toLowerCase();
        }
        const capitalizeBrand = brandS.join(" ");
        const brand = {
          brand       : capitalizeBrand,
          web         : payload.web,
          checked     : payload.checked,
          createdFor  : payload.createdFor,
          deleted     : payload.deleted,
          picture     : payload.picture,
          createdAt   : firebase.firestore.FieldValue.serverTimestamp()
        }
        firestore.collection('brands').where('brand', '==', capitalizeBrand)
        .get().then(querySnapshot => {
          if (querySnapshot.size > 0) {
            commit('setBrandExists', true)
            commit('setLoading', false)
          } else {
            firestore.collection('brands').add(brand).then(docRef => {
              brand.id = docRef.id
              firestore.collection('brands').doc(docRef.id).update({
                id: docRef.id
              })
              if (payload.logo) {
                const file = payload.logo
                const url = docRef + '.png'
                brandsImagesRef.child(url).put(file).then(snapshot => {
                  brand.picture = snapshot.downloadURL
                  firestore.collection('brands').doc(docRef.id).update({
                    picture: snapshot.downloadURL
                  })
                })
              }
              if (!payload.checked) {
                const user = userStore.state.loadedUsers.find(user => {
                  return user.id === payload.createdFor
                })
                const users = userStore.state.loadedUsers
                users.forEach(doc => {
                  if (doc.data().role === 'ADMIN') {
                    db.ref(doc.id + '/' + docRef.id).set({
                      title: 'Nueva Marca Registrada',
                      content: 'Chequear Marca ' + payload.brand + ' agregado por ' + user.data().name + ' ' + user.data().surnames
                    })
                  }
                })
              }
              commit('addBrand', brand)
              commit('setBrandExists', false)
              commit('setLoading', false)
          })
        }
      })
    },
    updatedBrand ({ commit }, payload) {
      const brand = payload.brand.split(' ')
      for (let i = 0; i < brand.length; i++) {
          var j = brand[i].charAt(0).toUpperCase()
          brand[i] = j + brand[i].substr(1).toLowerCase()
      }
      const capitalizeBrand = brand.join(' ')
      firestore.collection('brands').where('brand'.toLowerCase(), '==', capitalizeBrand)
        .get().then(querySnapshot => {
          if (querySnapshot.size > 0) {
            console.log('existe')
          } else {
            if (payload.checked){
              firestore.collection('brands').doc(payload.id).update({
                'brand'       : capitalizeBrand,
                'web'         : payload.web,  
                'updatedFor'  : payload.updatedFor,
                'updatedAt'   : firebase.firestore.FieldValue.serverTimestamp()
              }).then(() => {
                console.log('actualizado')
              })
            } else {
              firestore.collection('brands').doc(payload.id).update({
                'editBrand'     : capitalizeBrand,
                'checked'       : false,
                'editWeb'       : payload.web,
                'updatedFor'    : payload.updatedFor,
                'updatedAt'     : firebase.firestore.FieldValue.serverTimestamp()
              })
              .then(() => {
                if (!payload.checked) {
                  const user = userStore.getters.getUsers.find(user => {
                    return user.id === payload.updatedFor
                  })
                  const users = userStore.getters.getUsers
                  users.forEach(doc => {
                    if (doc.data().role === 'ADMIN') {
                      db.ref(doc.id + '/' + payload.id).set({
                        title: 'Marca Modificada',
                        content: 'Chequear Marca ' + payload.brand + ' Modificada por ' + user.data().name + ' ' + user.data().surnames
                      })
                    }
                  })
                }
                console.log('actualizado')
            })
          }
        }
      })
    },
    checkBrand ({commit, state}, payload) {
      if (!payload.updatedFor && !payload.checked) {
        const brandRef = firestore.collection('brands').doc(payload.id)
          brandRef.update({
            checked: true
          })
          .then(() => {
            const users = userStore.state.loadedUsers
            users.forEach(doc => {
              if (doc.data().role === 'ADMIN') {
                db.ref(doc.id + '/' + payload.id).remove()
              }
            })
          })
        } else {
          const brand = {
            id            : payload.id,
            brand         : payload.editBrand,
            web           : payload.editWeb,
            checked       : true,
            createdAt     : payload.createdAt,
            createdFor    : payload.idCreatedFor,
            deleted       : payload.deleted,
            picture       : payload.picture,
            updatedAt     : payload.updatedAt,
            updatedFor    : payload.idUpdatedFor,
          }
          const brandRef = firestore.collection('brands').doc(payload.id)
          brandRef.set(brand).then(() =>{
            const users = userStore.state.loadedUsers
            users.forEach(doc => {
              if (doc.data().role === 'ADMIN') {
                db.ref(doc.id + '/' + payload.id).remove()
              }
            })  
          })
        }
    },
    clearBrandExists ({commit}) {
      commit('setBrandExists', false)
    },
    loadBrandsPDF ({commit}) {
      firestore.collection('brands').orderBy('brand', 'asc').onSnapshot(querySnapshot => {
        const datos = []
        querySnapshot.forEach(doc => {
          datos.push(doc.data())
        })
        commit('setBrandsPDF', datos)
      })
    },
    exportDataPDF ({ commit, state }, payload) {
      var imgData = "data:image/png;base64,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";
      var doc = new PDF("landscape")

      doc.setFontSize(15)
      doc.addImage(imgData, "JPEG", 105, 10, 90, 25)
      doc.text(230, 45, "Fecha  :  ")
      let fecha = new Date()
      let day = fecha.getDate()
      let month = fecha.getMonth()
      let year = fecha.getFullYear() 
      let fullFecha = String(day + '/' + month + '/' + year)
      doc.text(250, 45, fullFecha)
      doc.setFontSize(30)
      doc.text(110, 60, "Listado de Marcas")
      doc.setFontSize(15)
      doc.text(230, 55, "Total    :  ")
      const datos = state.brandsPDF
      if (datos.length > 0) {
        let t = datos.length
      let total = t.toString()
      doc.text(250, 55, total)
        // tabla
      datos.forEach((doc, i) => {
        let createdUser = userStore.state.loadedUsers.find(user => {
          return user.id === doc.createdFor
        })
        datos[i].createdFor = createdUser.data().name + ' ' + createdUser.data().surnames
        if (doc.updatedFor) {
          let updatedUser = userStore.state.loadedUsers.find(user => {
            return user.id === doc.updatedFor
          })
          datos[i].updatedFor = updatedUser.data().name + ' ' + updatedUser.data().surnames
        }
        if (!doc.web) {
          datos[i].web = ''
        }
        if (doc.checked) {
          datos[i].checked = 'V'
        } else {
          datos[i].checked = 'X'
        }
        if (doc.deleted) {
          datos[i].deleted = 'V'
        } else {
          datos[i].deleted = 'X'
        }
        if (doc.picture === 'https://firebasestorage.googleapis.com/v0/b/eco-moto-network-dc652.appspot.com/o/images%2Fno-image.png?alt=media&token=8f3f2026-18ce-4f09-8fc5-acc44dc85f70') {
          datos[i].picture = 'X'
        } else {
          datos[i].picture = 'V'
        }
        let createdDay = doc.createdAt.getDate()
        let createdMonth = doc.createdAt.getMonth()
        let createdYear = doc.createdAt.getFullYear()
        datos[i].createdAt = String(createdDay + '/' + createdMonth + '/' + createdYear)
        if (doc.updatedAt) {
          let updatedDay = doc.updatedAt.getDate();
          let updatedMonth = doc.updatedAt.getMonth();
          let updatedYear = doc.updatedAt.getFullYear();
          datos[i].updatedAt = String(updatedDay + '/' + updatedMonth + '/' + updatedYear)
        }
      })
      const columns = [
        { title: 'Marca', dataKey: 'brand' },
        { title: 'Web', dataKey: 'web' },
        { title: 'Creador', dataKey: 'createdFor' },
        { title: 'Fecha', dataKey: 'createdAt' },
        { title: 'Verificado', dataKey: 'checked' },
        { title: 'Eliminado', dataKey: 'deleted' },
        { title: 'Foto', dataKey: 'picture' },
        { title: 'Actualizador', dataKey: 'updatedFor' },
        { title: 'Fecha', dataKey: 'updatedAt' }
      ]
      doc.setFontSize('10')
      doc.autoTable(columns, datos, {
        margin: {top: 70}
      })
      doc.setProperties({
	      title: 'Listado de Marcas',
	      subject: 'marcas de motos',		
	      author: 'Ecomotor',
	      keywords: 'generado con VueJS',
	      creator: 'Ecomotor'
      })
      window.open(doc.output('bloburl'), '_blank')
      }
    },
    deletedBrand ({commit}, payload) {
      commit('setLoading', true)
      if (!payload.deleted) {
        firestore.collection('brands').doc(payload.id).update({
          deleted: true
        }).then(() => {
          commit('setLoading', false)
        })
      } 
    }
}

const mutations = {
    setBrands (state, payload) {
        state.loadedBrands = payload
    },
    setBrandExists (state, payload) {
        state.brandExists = payload
    },
    addBrand (state, payload) {
        state.loadedBrands.push(payload)
    },
    setBrandsPDF (state, payload) {
      state.brandsPDF = payload
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}