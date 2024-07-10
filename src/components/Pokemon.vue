<template>
  <b-container class="py-5" id="main-container">
    <div class="text-center" v-if="loading">
      <h1 class="text-center">Espere por favor...</h1>
      <div class="wrapper">
        <div class="pokeball"></div>
      </div>
      <div class="wrapper">
        <div class="pokeball"></div>
      </div>
      <div class="wrapper">
        <div class="pokeball"></div>
      </div>
      <div class="wrapper">
        <div class="pokeball"></div>
      </div>
      <div class="wrapper">
        <div class="pokeball"></div>
      </div>
    </div>
    <b-row v-else>
      <b-col cols="12">
        <h1 class="text-center">Quien es ese Pokemón?</h1>
      </b-col>
      <b-col cols="4"></b-col>
      <b-col cols="4">
        <div class="image-container py-4">
          <div class="image-wrapper">
            <img
              :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`"
              alt="Pokemon"
              class="pokemon"
              :class="hidden ? 'hidden' : ''"
            />
          </div>
        </div>
        <div class="button-container">
          <div
            class="py-2"
            v-for="(item, index) in pokemons"
            v-bind:key="index"
          >
            <b-button
              variant="secondary"
              block
              :disabled="showMessage"
              v-on:click="submitAnswer(item.id)"
              >{{ item.name }}</b-button
            >
          </div>
        </div>
      </b-col>
      <b-col cols="4">
        <div v-if="!hidden && answer" class="text-center">
          <img
            :src="require('../assets/ash-ketchum.png')"
            alt="Ash Ketchum"
            width="250"
          />
        </div>
      </b-col>
      <b-col class="py-5" sm="4" offset-sm="4">
        <b-alert
          :variant="answer ? 'success' : 'danger'"
          :show="showMessage"
          class="text-center"
          >{{ this.message }}</b-alert
        >
      </b-col>
      <b-col v-if="!hidden" cols="12">
        <div class="button-container">
          <b-button variant="info" block v-on:click="reset"
            >Juego Nuevo</b-button
          >
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import axios from "axios";

export default {
  name: "PokemonGame",
  data() {
    return {
      numPokemons: 0,
      arrayPokemon: [],
      pokemons: [],
      hidden: true,
      id: 0,
      answer: false,
      message: "",
      showMessage: false,
      loading: false,
    };
  },
  mounted() {
    this.loading = true;
    setTimeout(async () => {
      try {
        const resp = await axios.get("pokemon");
        this.numPokemons = resp.data.count;
        await this.randomPokemon();
        await this.getPokemon();
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    }, 500);
  },
  methods: {
    async getPokemon() {
      try {
        for (let index = 0; index < this.arrayPokemon.length; index++) {
          const resp = await axios.get(`pokemon/${this.arrayPokemon[index]}`);
          this.pokemons.push(resp.data);
        }

        let option = Math.floor(Math.random() * 4);
        this.id = this.pokemons[option].id;
      } catch (error) {
        console.error(error);
      }
    },
    randomPokemon() {
      for (let index = 0; this.arrayPokemon.length < 4; index++) {
        let number = Math.floor(Math.random() * 649) + 1;
        if (!this.arrayPokemon.includes(number)) {
          this.arrayPokemon.push(number);
        }
      }
    },
    submitAnswer(id) {
      let pokemonA = this.pokemons.find((item) => item.id === this.id);
      console.log(pokemonA);
      if (this.id === id) {
        this.message = `Correcto, es ${pokemonA.name}. \nEres un maestro pokemon!!!`;
        this.answer = true;
      } else {
        this.message = `Ohh no, opps. Era ${pokemonA.name}.`;
      }
      this.showMessage = true;
      this.hidden = false;
    },
    reset() {
      location.reload();
    },
  },
};
</script>

<style>
#main-containera {
  background-image: url(../assets/quien-es-ese-pokemon.jpg);
  background-size: contain;
  background-repeat: no-repeat;
  background-position: 50% 50%;
  height: 100vh;
}

h1 {
  font-size: 60px !important;
  color: #f4c200 !important;
  text-shadow: 2px 2px 10px blue;
  -moz-text-shadow: 2px 2px 10px blue;
  -webkit-text-shadow: 2px 2px 10px blue;
}

.image-wrapper {
  background: rgb(54, 67, 255);
  background: radial-gradient(
    circle,
    rgba(54, 67, 255, 1) 0%,
    rgba(54, 67, 255, 0.007462359943977592) 100%
  );
  width: 300px;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  box-shadow: 10px 5px 5px rgba(54, 67, 255, 0.007462359943977592);
}
.pokemon {
  height: 200px;
  width: 100wh;
  margin: 0 auto;
}

.pokemon.hidden {
  filter: brightness(0);
}

.image-wrapper,
.image-container,
.button-container {
  text-align: center;
  width: 400px;
  margin: 0 auto;
}

.button-container div button {
  width: 100%;
  text-transform: capitalize;
}

.wrapper {
  display: inline-block;
  margin-top: 2rem;
  padding-left: 10px;
}

.pokeball {
  position: relative;
  height: 60px;
  width: 60px;
  background: linear-gradient(to bottom, rgb(254, 0, 1) 50%, white 50%);
  border-radius: 50%;
  border: 4px solid black;
  animation: spin 1s linear infinite;
}

.pokeball::before {
  content: "";
  position: absolute;
  height: 4px;
  width: 60px;
  background: black;
  top: 26px;
  left: -4px;
  transform: translatey(-50%);
}

.pokeball::after {
  content: "";
  position: absolute;
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background: white;
  top: 26px;
  left: 26px;
  transform: translate(-50%, -50%);
  box-shadow: inset 0 0 0 4px black, inset 0 0 0 10px white,
    inset 0 0 0 12px black;
}

/* Spin Animation */
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
