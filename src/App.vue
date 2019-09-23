<template>
  <div id="app">
    <div>
      <nav class="navbar navbar-toggleable-md navbar-light">
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link to="/" class="nav-link">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/stats" class="nav-link">Stats</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/keyboards" class="nav-link">Keyboards</router-link>
            </li>
          </ul>
        </div>
      </nav>
      <router-view class="view"></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "app",
  components: {}
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: var(--text-color);
  background-color: var(--bg);
  margin-top: 60px;
}

.nav-link {
  color: var(--text-color);
}
</style>
