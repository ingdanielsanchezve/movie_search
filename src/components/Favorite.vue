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
            <el-button type="danger" plain size="small" @click="removeFavorite"><i class="el-icon-circle-close"></i></el-button>
          </div>
          <small class="text-muted">{{movie.Year}}</small>
        </div>
      </div>
    </div>
</template>

<script>
import { REMOVE_FAVORITE_MOVIE } from '@/store/actions-types'

export default {
  name: 'Favorite',
  props: ['movieData'],
  data () {
    return {
      movie: this.movieData
    }
  },
  methods: {
    showDetail (id) {
      this.$router.push(`/movie/${id}`)
    },
    removeFavorite () {
      this.$confirm(`This will permanently delete ${this.movie.Title} from favorites list. Continue?`, 'Warning', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch(REMOVE_FAVORITE_MOVIE, this.movie.id)
        this.$message({
          duration: 1500,
          showClose: true,
          type: 'success',
          message: 'Movie deleted from your collection'
        })
      }).catch(() => {
        this.$message({
          duration: 1500,
          showClose: true,
          type: 'info',
          message: 'Delete canceled'
        })
      })
    }
  }
}
</script>

<style lang="scss">

  .poster{
    cursor: pointer;
    height: 250px;
    width: auto;
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
