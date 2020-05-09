import config from '@/services/config'
import Api from '@/services/Api'

export default {
  getMovies (params) {
    return Api().get(`?s=${params.term}&type=movie&plot=${config.plot}&apikey=${config.apikey}`)
  },
  getMoviesById (params) {
    return Api().get(`?i=${params.movieId}&type=movie&plot=${config.plot}&apikey=${config.apikey}`)
  },
  getMoviesByPage (params) {
    return Api().get(`?s=${params.term}&page=${params.page}&type=movie&plot=${config.plot}&apikey=${config.apikey}`)
  }
}
