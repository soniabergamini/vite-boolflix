<script>
import AppHeader from './components/AppHeader.vue'
import AppMain from './components/AppMain.vue'
import AppSpinner from './components/AppSpinner.vue'
import AppErrorLoad from './components/AppErrorLoad.vue'

import { store } from './data/store';
import axios from 'axios';

export default {
  name: "App",
  components: {
    AppHeader,
    AppSpinner,
    AppErrorLoad,
    AppMain
  },
  data() {
    return {
      store,
    }
  },
  methods: {
    // Call method that returns data from API, to render Contents Searched on page
    chatSearch(newSearch) {
      if (newSearch.trim()) {
        newSearch = encodeURIComponent(newSearch)
        console.log("User searched: ", newSearch)
        this.getAllData(`${this.store.APIMovies}&query=${newSearch}`, "movie");
        this.getAllData(`${this.store.APISeries}&query=${newSearch}`, "series");
      } else {
        this.getAllData(this.store.APIPopularMovies, "movie");
        this.getAllData(this.store.APIPopularSeries, "series");
      }
    },
    // Return movies and TV series data, from API call
    getAllData(url, array) {
      axios.get(url).then(response => {
        this.store.loading = true;
        array == "movie" ? this.store.AllMovies = [] : this.store.AllSeries = [];
        array == "movie" ? this.store.AllMovies.push(response.data.results) : this.store.AllSeries.push(response.data.results);
        this.store.errorMsg = false;
        this.store.loading = false;
      }).catch(error => {
        console.error(`🫤 Something went wrong with the Search ${array} API call: `, error);
        setTimeout(() => {
          this.store.loading = false;
          this.store.errorMsg = true;
        }, 1 * 5000);
      })
    },
    // Call method that returns data from API, to render Movie/TvSerie Cast on single card hover
    getCast(id, content, array) {
      let url = `${this.store.APIUrl}/${content}/${id}/credits?api_key=${this.store.APIkey}`
      this.getCastData(url, array)
    },
    // Return single movie or TV serie cast data, from API call
    getCastData(url, array) {
      array == "movie" ? this.store.MovieCast = [] : this.store.SerieCast = [];
      // API Call
      axios.get(url).then(response => {
        if (response.data.cast.length < 5) {
          // If the number of actors is less than 5 
          response.data.cast.forEach(element => array == "movie" ? this.store.MovieCast.push(element) : this.store.SerieCast.push(element));
        } else {
          // if the number of actors in the cast is greater than or equal to 5
          for (let i = 0; i < 5; i++) {
            array == "movie" ? this.store.MovieCast.push(response.data.cast[i]) : this.store.SerieCast.push(response.data.cast[i]);
          }
        }
      }).catch(error => console.error(`🫤 Something went wrong with the Search ${array} Cast API call: `, error))
    }
  },
  created() {
    // Call method that returns data from API, to render Popular Content on page
    this.getAllData(this.store.APIPopularMovies, "movie");
    this.getAllData(this.store.APIPopularSeries, "series")
  }
}
</script>

<template>
  <header class="text-white h-20 p-3">
    <AppHeader @chatSearch="chatSearch" />
  </header>
  <main class="text-white p-3">
    <AppSpinner />
    <AppErrorLoad />
    <AppMain @getCast="getCast" />
  </main>
</template>

<style lang="scss" scoped>
header {
  background: rgb(20, 20, 20);
  background: linear-gradient(0deg, rgba(20, 20, 20, 1) 1%, rgba(6, 6, 6, 1) 99%);
}
</style>
