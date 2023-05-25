import { reactive } from 'vue'

export const store = reactive({
    loading: true,
    errorMsg: false,
    APIkey: '0bf37c03732d535d0cb540cf8b23e0f1',
    APIMovies: 'https://api.themoviedb.org/3/search/movie?api_key=0bf37c03732d535d0cb540cf8b23e0f1',
    APISeries: 'https://api.themoviedb.org/3/search/tv?api_key=0bf37c03732d535d0cb540cf8b23e0f1',
    AllMovies: [],
    AllSeries: []
});