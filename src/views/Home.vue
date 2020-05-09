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
            :current-page="currentPage"
            hide-on-single-page
            layout="total, prev, pager, next"
            @current-change="queryCurrentPage"
            :total="total">
          </el-pagination>
        </el-row>

        <el-row :gutter="20">
          <el-col :xs="24" :sm="8" :md="6" :lg="4" :xl="3"
                  v-for="(movie, index) in movies" :key="`${movie.imdbID}${index}`">
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
            :current-page="currentPage"
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
import { SEARCH_MOVIES_BY_TERM, SEARCH_MOVIES_BY_PAGE } from '@/store/actions-types'

export default {
  name: 'Home',
  components: {
    Header,
    Movie
  },
  data () {
    return {
      term: this.$store.state.searchTerm
    }
  },
  computed: {
    total () {
      return this.$store.state.total
    },
    error () {
      return this.$store.state.error
    },
    movies () {
      return this.$store.state.searchResult
    },
    currentPage () {
      return this.$store.state.currentPage
    }
  },
  methods: {
    getMovies () {
      this.$store.dispatch(SEARCH_MOVIES_BY_TERM, { term: this.term })
    },
    queryCurrentPage (page) {
      this.$store.dispatch(SEARCH_MOVIES_BY_PAGE, { term: this.term, page: page })
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
