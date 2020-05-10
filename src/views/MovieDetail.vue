<template>
    <el-container direction="vertical" v-loading="loading" element-loading-background="rgba(0, 0, 0, 0.8)">
      <Header></Header>
      <el-main>

        <el-row>
          <el-col :xs="{span: 16, offset: 4}" :sm="{span: 16, offset: 4}" :md="{span: 16, offset: 4}" :lg="{span: 16, offset: 4}" :xl="{span: 16, offset: 4}">
            <h3 class="text-danger">
              {{movieDetails.Title}}
            </h3>
            <h6 class="text-justify">
              {{movieDetails.Plot}}
            </h6>
          </el-col>
        </el-row>

        <el-row>
          <el-col :xs="{span: 8, offset: 8}" :sm="{span: 8, offset: 8}" :md="{span: 8, offset: 8}" :lg="{span: 4, offset: 4}" :xl="{span: 4, offset: 4}">
            <div class="card mb-4 shadow-sm">
              <el-image :src="(typeof movieDetails.Poster !== 'undefined') ? movieDetails.Poster : ''">
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

              <p class="text-left rating" v-for="rating in movieDetails.Ratings" :key="rating.source">
                  <strong>{{rating.Source}}</strong>: {{rating.Value}}
              </p>

          </el-col>

          <el-col :xs="{span: 8, offset: 6}" :sm="{span: 8, offset: 8}" :md="{span: 8, offset: 1}" :lg="15" :xl="15">
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
              <tr>
                <th>Awards: </th>
                <td>{{movieDetails.Awards}}</td>
              </tr>
            </table>
          </el-col>

        </el-row>

      </el-main>

      <el-footer>
        <div id="nav">
          <a href="#" type="danger" @click="goBack"><i class="el-icon-d-arrow-left"></i> Take me Back </a>
        </div>
      </el-footer>

    </el-container>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'
import { GET_MOVIE_INFO, ADD_FAVORITE_MOVIE } from '@/store/actions-types'

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
    loading () {
      return this.$store.state.loading
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

      this.$store.dispatch(ADD_FAVORITE_MOVIE, movie)

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

  .el-row {
    margin-bottom: 20px;
  }
  th, td{
    text-align: left;
  }

</style>
