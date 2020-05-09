<template>
    <div class="card mb-4 shadow-sm">
      <el-image :src="movie.Poster" lazy @click="showDetail(movie.imdbID)" class="poster">
        <div slot="error" class="image-slot">
          <img src="../assets/no-poster-available.jpg" alt="Not Available">
        </div>
      </el-image>
      <div class="card-body">
        <p class="card-text">{{movie.Title}}</p>
        <div class="d-flex justify-content-between align-items-center">
          <div class="btn-group">
            <el-button type="primary" plain size="small" @click="showDetail(movie.imdbID)"><i class="el-icon-film"></i></el-button>
            <el-button type="warning" plain size="small" @click="addToFavorites(movie)"><i class="el-icon-star-off"></i></el-button>
          </div>
          <small class="text-muted">{{movie.Year}}</small>
        </div>
      </div>
    </div>
</template>

<script>
import { ADD_FAVORITE_MOVIE } from '@/store/actions-types'

export default {
  name: 'Movie',
  props: ['movieData'],
  data () {
    return {
      movie: this.movieData
    }
  },
  computed: {
    favorites () {
      return this.$store.state.favorites
    }
  },
  methods: {
    showDetail (id) {
      this.$router.push(`/movie/${id}`)
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
    }
  }
}
</script>

<style lang="scss">

  img{
    max-height: 300px;
  }

  .poster{
    cursor: pointer;
  }

  .card-text{
    font-size: 14px;
    text-align: left;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }

  .clearfix:after {
      clear: both
  }
</style>
