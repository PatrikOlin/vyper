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
  color: #2c3e50;
  margin-top: 60px;
}
</style>
