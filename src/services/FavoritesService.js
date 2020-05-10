// const fb = require('../firebaseConfig.js')
import fb from '../firebaseConfig.js'

export default {
  getFavoritesMovies () {
    return fb.favoritesCollection.get()
  },
  addFavoritesMovies (movie) {
    return fb.favoritesCollection.add(movie)
  },
  removeFavoritesMovies (movieId) {
    return fb.favoritesCollection.doc(movieId).delete()
  }
}
