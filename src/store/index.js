import Vue from 'vue'
import Vuex from 'vuex'
import MoviesService from '@/services/MoviesService'
import { SET_SEARCH_RESULTS, SET_SEARCH_TERM, SET_SEARCH_CURRENT_PAGE, SET_MOVIE_DETAILS, SET_RESULT_ERROR, SET_RESULT_TOTAL, ADD_FAVORITE, REMOVE_FAVORITE } from './mutation-types'
import { GET_MOVIE_INFO, SEARCH_MOVIES_BY_TERM, SEARCH_MOVIES_BY_PAGE } from './actions-types'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    favorites: [],
    searchResult: [],
    searchTerm: '',
    total: 0,
    error: '',
    movieDetails: {},
    currentPage: 1
  },
  mutations: {
    [SET_SEARCH_RESULTS] (state, result) {
      state.searchResult = result
    },
    [SET_SEARCH_TERM] (state, term) {
      state.searchTerm = term
    },
    [SET_SEARCH_CURRENT_PAGE] (state, page) {
      state.currentPage = page
    },
    [SET_MOVIE_DETAILS] (state, movie) {
      state.movieDetails = movie
    },
    [SET_RESULT_ERROR] (state, error) {
      state.error = error
    },
    [SET_RESULT_TOTAL] (state, total) {
      state.total = total
    },
    [ADD_FAVORITE] (state, fav) {
      state.favorites.push(fav)
    },
    [REMOVE_FAVORITE] (state, fav) {
      const idx = state.favorites.indexOf(fav)
      if (idx > -1) {
        state.favorites.splice(idx, 1)
      }
    }
  },
  actions: {
    async [GET_MOVIE_INFO] (context, payload) {
      try {
        context.commit(SET_MOVIE_DETAILS, {})
        const response = await MoviesService.getMoviesById({ movieId: payload.movieId })
        context.commit(SET_MOVIE_DETAILS, response.data)
      } catch (error) {
        context.commit(SET_RESULT_ERROR, error.response.data.message)
      }
    },
    async [SEARCH_MOVIES_BY_TERM] (context, payload) {
      try {
        context.commit(SET_SEARCH_TERM, payload.term)
        const response = await MoviesService.getMovies({ term: payload.term })
        context.commit(SET_SEARCH_RESULTS, response.data.Search)
        context.commit(SET_RESULT_TOTAL, parseInt(response.data.totalResults))
        context.commit(SET_RESULT_ERROR, ('Error' in response.data) ? response.data.Error : '')
      } catch (error) {
        context.commit(SET_RESULT_ERROR, error.response.data.message)
      }
    },
    async [SEARCH_MOVIES_BY_PAGE] (context, payload) {
      try {
        context.commit(SET_SEARCH_TERM, payload.term)
        context.commit(SET_SEARCH_CURRENT_PAGE, payload.page)
        const response = await MoviesService.getMoviesByPage({ term: payload.term, page: payload.page })
        context.commit(SET_SEARCH_RESULTS, response.data.Search)
        context.commit(SET_RESULT_TOTAL, parseInt(response.data.totalResults))
        context.commit(SET_RESULT_ERROR, ('Error' in response.data) ? response.data.Error : '')
      } catch (error) {
        context.commit(SET_RESULT_ERROR, error.response.data.message)
      }
    }
  },
  modules: {
  }
})
