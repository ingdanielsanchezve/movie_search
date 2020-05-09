import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    favorites: [],
    searchResult: [],
    searchTerm: '',
    total: 0
  },
  mutations: {
    setSearchResults (state, result) {
      state.searchResult = result
    },
    setSearchTerm (state, term) {
      state.searchTerm = term
    },
    setResultTotal (state, total) {
      state.total = total
    },
    addFavorite (state, fav) {
      state.favorites.push(fav)
    },
    removeFavorite (state, fav) {
      const idx = state.favorites.indexOf(fav)
      if (idx > -1) {
        state.favorites.splice(idx, 1)
      }
    }
  },
  actions: {
  },
  modules: {
  }
})
