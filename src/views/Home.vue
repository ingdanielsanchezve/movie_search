<template>
  <div class="home">

    <el-container direction="vertical">

      <Header></Header>
      <el-main>
        <h4>
          Movies Data Search
        </h4>
        <el-row>
          <el-col>
            <el-input placeholder="Please type to Search a Movie or TV show" v-model="term" @change="getMovies">
              <i slot="prefix" class="el-input__icon el-icon-search"></i>
              <el-button type="primary" plain slot="append" @click="getMovies">Search</el-button>
            </el-input>
          </el-col>
        </el-row>

        <el-row>
          <el-pagination
            v-if="total > 0"
            :pager-count="15"
            hide-on-single-page
            layout="total, prev, pager, next"
            @current-change="queryCurrentPage"
            :total="total">
          </el-pagination>
        </el-row>

        <el-row :gutter="20">
          <el-col :xs="24" :sm="8" :md="6" :lg="4" :xl="3"
                  v-for="movie in movies" :key="movie.imdbID">
            <Movie :movieData="movie"></Movie>
          </el-col>
          <el-alert
            v-if="error"
            :title="error"
            type="error">
          </el-alert>
        </el-row>

        <el-row>
          <el-pagination
            v-if="total > 0"
            :pager-count="15"
            hide-on-single-page
            layout="total, prev, pager, next"
            @current-change="queryCurrentPage"
            :total="total">
          </el-pagination>
        </el-row>

      </el-main>

    </el-container>

  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'
import Movie from '@/components/Movie.vue'
import MoviesService from '@/services/MoviesService'

export default {
  name: 'Home',
  components: {
    Header,
    Movie
  },
  data () {
    return {
      term: this.$store.state.searchTerm,
      error: ''
    }
  },
  computed: {
    total () {
      return this.$store.state.total
    },
    movies () {
      return this.$store.state.searchResult
    }
  },
  methods: {
    async getMovies () {
      try {
        this.$store.commit('setSearchTerm', this.term)
        const response = await MoviesService.getMovies({ term: this.term })
        this.$store.commit('setSearchResults', response.data.Search)
        this.$store.commit('setResultTotal', parseInt(response.data.totalResults))

        this.error = ('Error' in response.data) ? response.data.Error : ''
      } catch (error) {
        this.error = error.response.data.message
      }
    },
    async queryCurrentPage (val) {
      try {
        this.$store.commit('setSearchTerm', this.term)

        const response = await MoviesService.getMoviesByPage({ term: this.term, page: val })
        this.$store.commit('setSearchResults', response.data.Search)
        this.$store.commit('setResultTotal', parseInt(response.data.totalResults))

        this.error = ('Error' in response.data) ? response.data.Error : ''
      } catch (error) {
        this.error = error.response.data.message
      }
    }
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
  #result-stats {
    position: absolute;
    top: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    -webkit-transition: all 220ms ease-in-out;
    color: #70757a;
    height: 50px;
    text-align: center;
    width: 100%;
  }

</style>
