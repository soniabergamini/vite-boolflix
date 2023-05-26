<script>
import AppHeader from './components/AppHeader.vue'
import AppMain from './components/AppMain.vue'
import AppFooter from './components/AppFooter.vue'

import { store } from './data/store';
import axios from 'axios';

export default {
  name: "App",
  components: {
    AppHeader,
    AppMain,
    AppFooter
  },
  data() {
    return {
      store,
    }
  },
  methods: {
    // Call method that returns data from API
    chatSearch(newSearch) {
      this.getAllData(`${this.store.APIMovies}&query=${newSearch}`, "movie");
      this.getAllData(`${this.store.APISeries}&query=${newSearch}`, "series");
    },
    // Return movies and TV series data, from API call
    getAllData(url, array) {
      axios.get(url).then(response => {
        array == "movie" ? this.store.AllMovies = [] : this.store.AllSeries = [];
        array == "movie" ? this.store.AllMovies.push(response.data.results) : this.store.AllSeries.push(response.data.results);
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
  beforeMount() {
    // Call API to render popular content on page
    this.getAllData(this.store.APIPopularMovies, "movie");
    this.getAllData(this.store.APIPopularSeries, "series")
  }
}
</script>

<template>
  <header class="text-white border border-red-300 h-20 p-3">
    <AppHeader @chatSearch="chatSearch" />
  </header>
  <main class="text-white h-[calc(100vh-120px)] border border-yellow-200 p-3">
    <AppMain />
  </main>
  <footer class="h-10 border text-slate-600 border-blue-400 p-3">
    <AppFooter />
  </footer>
</template>

<style lang="scss" scoped>
header {
  background: rgb(20, 20, 20);
  background: linear-gradient(0deg, rgba(20, 20, 20, 1) 1%, rgba(6, 6, 6, 1) 99%);
}
</style>
