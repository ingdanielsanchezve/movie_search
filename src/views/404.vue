<template>
  <el-container>
    <Header></Header>
    <el-main>
      <el-row>
        <el-col>
          <div class="d-flex justify-content-center align-items-center" id="main">
            <h1 class="mr-3 pr-3 align-top border-right inline-block align-content-center">404</h1>
            <div class="inline-block align-middle">
              <h2 class="font-weight-normal lead" id="desc">The page you requested was not found.</h2>
            </div>
          </div>
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

export default {
  name: 'NotFound404',
  components: {
    Header
  },
  methods: {
    goBack () {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
    }
  }

}
</script>
