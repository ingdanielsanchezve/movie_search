<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home <i class="el-icon-s-home"></i></router-link> |
      <router-link to="/favorites">Favorites <i class="el-icon-star-off"></i></router-link>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
body{
  background-image: url('./assets/background.jpeg');
}
h1, h2, h3, h4, h5, h6, p.rating, td, th{
  color: white;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.el-main {
    margin: 20px;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: white;
    text-decoration: none;

    &.router-link-exact-active {
      color: #e84444;
    }
  }
}
</style>
