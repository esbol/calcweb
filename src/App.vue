
<template>
  <HomeView />
</template>

<script setup lang="ts">
import HomeView from './views/HomeView.vue';

</script>

<style>

#app{
  display: grid;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
  overflow: hidden;
  box-sizing: border-box;
  font-family:Arial, Helvetica, sans-serif
}

*{
  box-sizing: border-box;
  font-size: small;
}
nav {
  padding: 0;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
