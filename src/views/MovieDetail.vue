<template>
    <el-container direction="vertical">
      <Header></Header>
      <el-main>

        <el-row>
          <el-col :offset="4" :xs="16" :sm="16" :md="16" :lg="16" :xl="16">
            <h3 class="text-danger">
              {{movieDetails.Title}}
            </h3>
            <h6 class="text-justify">
              {{movieDetails.Plot}}
            </h6>
          </el-col>
        </el-row>

        <el-row>
          <el-col :offset="4" :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
            <div class="card mb-4 shadow-sm">
              <el-image :src="movieDetails.Poster" lazy>
                <div slot="error" class="image-slot">
                  <img src="../assets/no-poster-available.jpg" alt="Not Available">
                </div>
              </el-image>
              <div class="card-body">
                <div class="d-flex justify-content-between align-items-center">
                  <div class="btn-group">
                    <el-button type="warning" plain size="small" @click="addToFavorites(movieDetails)"><i class="el-icon-star-off"></i></el-button>
                  </div>
                </div>
              </div>
            </div>

              <p class="text-left" v-for="rating in movieDetails.Ratings" :key="rating.source">
                  <strong>{{rating.Source}}</strong>: {{rating.Value}}
              </p>

          </el-col>

          <el-col :offset="1" :xs="15" :sm="15" :md="15" :lg="15" :xl="15">
            <table class="table table-borderless">
              <tr>
                <th>Year: </th>
                <td>{{movieDetails.Year}}</td>
              </tr>
              <tr>
                <th>Rated: </th>
                <td>{{movieDetails.Rated}}</td>
              </tr>
              <tr>
                <th>Released: </th>
                <td>{{movieDetails.Released}}</td>
              </tr>
              <tr>
                <th>Duration: </th>
                <td>{{movieDetails.Runtime}}</td>
              </tr>
              <tr>
                <th>Genre: </th>
                <td>{{movieDetails.Genre}}</td>
              </tr>
              <tr>
                <th>Director: </th>
                <td>{{movieDetails.Director}}</td>
              </tr>
              <tr>
                <th>Writer: </th>
                <td>{{movieDetails.Writer}}</td>
              </tr>
              <tr>
                <th>Actors: </th>
                <td>{{movieDetails.Actors}}</td>
              </tr>
              <tr>
                <th>Original Language: </th>
                <td>{{movieDetails.Language}}</td>
              </tr>
              <tr>
                <th>Country: </th>
                <td>{{movieDetails.Country}}</td>
              </tr>
            </table>
          </el-col>

        </el-row>

      </el-main>

      <el-footer>
        <div id="nav">
          <a href="#" @click="goBack">Take me Back </a>
        </div>
      </el-footer>

    </el-container>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'
import { GET_MOVIE_INFO } from '@/store/actions-types'

export default {
  name: 'MovieDetail',
  components: {
    Header
  },
  data () {
    return {
      movieId: this.$route.params.id
    }
  },
  computed: {
    favorites () {
      return this.$store.state.favorites
    },
    movieDetails () {
      return this.$store.state.movieDetails
    }
  },
  methods: {
    async getMovieDetails () {
      this.$store.dispatch(GET_MOVIE_INFO, { movieId: this.movieId })
    },
    addToFavorites (movie) {
      const exist = this.favorites.some(el => el.imdbID === movie.imdbID)
      if (exist) {
        this.$message({
          duration: 1500,
          showClose: true,
          message: 'This Movie has been already added to your favorite collection.',
          type: 'warning'
        })
        return
      }

      this.$store.commit('addFavorite', movie)
      this.$message({
        duration: 1500,
        showClose: true,
        message: 'Movie added to your favorite collection.',
        type: 'success'
      })
    },
    goBack () {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
    }
  },
  mounted () {
    this.getMovieDetails()
  }
}
</script>
<style lang="scss">
  .logo{
    width: 200px;
  }
  .el-row {
    margin-bottom: 20px;
  }
  th, td{
    text-align: left;
  }

</style>
