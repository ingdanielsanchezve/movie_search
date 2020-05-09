<template>
    <el-container direction="vertical">
      <Header></Header>
      <el-main>
          <h4>
            This is your Favorites Movies Collection
          </h4>

          <h5 v-if="favorites.length >0">
            You have {{favorites.length}} movies in your personal collection
          </h5>

          <h5 v-else>
            Your Movies Collection is empty, it's a good time to add your preferred movies.
          </h5>

          <el-row :gutter="20">
            <el-col :xs="24" :sm="8" :md="6" :lg="4" :xl="3"
                  v-for="fav in favorites" :key="fav.imdbID">
              <Favorite :movieData="fav"></Favorite>
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
import Favorite from '@/components/Favorite.vue'

export default {
  name: 'Favorites',
  components: {
    Header,
    Favorite
  },
  computed: {
    favorites () {
      return this.$store.state.favorites
    }
  },
  methods: {
    goBack () {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
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

</style>
