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
    <AppMain />
  </main>
</template>

<style lang="scss" scoped>
header {
  background: rgb(20, 20, 20);
  background: linear-gradient(0deg, rgba(20, 20, 20, 1) 1%, rgba(6, 6, 6, 1) 99%);
}
</style>
