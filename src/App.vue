<template>
  <div id="app">
    <Typer />
  </div>
</template>

<script>
import Typer from "./components/Typer.vue";

export default {
  name: "app",
  components: {
    Typer
  }
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

html,
body {
  background-color: var(--bg);
}

:root {
  --bg: #222831;
  --dark-bg: #1a1d24;
  --pink: #f59bac;
  --text-color: #f9ffee;
  --typed-text: #fee6c0;
  --yellow: #efbb35;
  --hot-pink: #e84279;
}
</style>
