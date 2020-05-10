<template>
    <el-container direction="vertical" v-loading="loading" element-loading-background="rgba(0, 0, 0, 0.8)">
      <Header></Header>
      <el-main>

          <el-row>

            <el-col v-if="error">
              <el-alert
                :title="error"
                type="error">
              </el-alert>
            </el-col>

            <el-col v-else>
              <h4>
                This is your Favorites Movies Collection
              </h4>

              <h5 v-if="favorites.length >0">
                You have {{favorites.length}} movies in your personal collection
              </h5>

              <h5 v-else>
                Your Movies Collection is empty, it's a good time to add your preferred movies.
              </h5>
            </el-col>

          </el-row>

          <el-row :gutter="20">
            <el-col :xs="24" :sm="8" :md="6" :lg="4" :xl="3"
                  v-for="(fav, index) in favorites" :key="`${fav.imdbID}${index}`">
              <Favorite :movieData="fav"></Favorite>
            </el-col>
          </el-row>

      </el-main>

      <el-footer>
        <div id="nav">
          <a href="#" type="danger" @click="goBack"> <i class="el-icon-d-arrow-left"></i> Take me Back </a>
        </div>
      </el-footer>

    </el-container>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'
import Favorite from '@/components/Favorite.vue'
import { GET_FAVORITES_MOVIES } from '@/store/actions-types'

export default {
  name: 'Favorites',
  components: {
    Header,
    Favorite
  },
  computed: {
    favorites () {
      return this.$store.state.favorites
    },
    error () {
      return this.$store.state.error
    },
    loading () {
      return this.$store.state.loading
    }
  },
  methods: {
    goBack () {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
    }
  },
  mounted () {
    this.$store.dispatch(GET_FAVORITES_MOVIES)
  }

}
</script>
<style lang="scss">

  .el-row {
    margin-bottom: 20px;
  }

</style>
