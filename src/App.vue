<template>
  <div id="app">
    <header>
      <b-navbar toggleable="lg" type="dark" variant="danger">
        <b-container>
          <b-navbar-brand href="#" class="nav-title">Pokedex</b-navbar-brand>
        </b-container>
      </b-navbar>
    </header>
    <main>
      <Pokemon />
    </main>
  </div>
</template>

<script>
import Pokemon from "./components/Pokemon.vue";

export default {
  name: "App",
  components: {
    Pokemon,
  },
};
</script>

<style>
h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: "Pokemon Solid", sans-serif;
}

#app {
  background: rgb(250, 134, 53);
  background: radial-gradient(
    circle,
    rgba(250, 134, 53, 1) 0%,
    rgba(255, 0, 0, 1) 100%
  );
  height: 100vh;
}

.nav-title {
  font-family: "Pokemon Solid", sans-serif;
  font-size: 36px !important;
  color: #f4c200 !important;
  text-shadow: 2px 2px 10px blue; /* horizontal-offset vertical-offset 'blur' colour */
  -moz-text-shadow: 2px 2px 10px blue;
  -webkit-text-shadow: 2px 2px 10px blue;
}
</style>
