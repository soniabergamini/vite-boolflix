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
    // Return all movies data from API call
    getMoviesData() {
      console.log("Load movies")
    },
    // Return all TV series data from API call
    getSeriesData() {
      console.log("Load TV series")
    }
  },
  beforeMount() {
    this.getMoviesData();
    this.getSeriesData()
  }
}
</script>

<template>
  <header class="text-white border border-red-300 h-20 p-3">
    <AppHeader />
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
