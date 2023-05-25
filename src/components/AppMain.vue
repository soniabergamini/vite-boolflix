<script>
import { store } from '../data/store';

export default {
    name: "AppMain",
    data() {
        return {
            store,
            flags: ["ko", "hi", "te", "cs", "hi", "te", "ja"]
        }
    },
    methods: {
        // Return classes to show language flag
        getFlag(lang) {
            console.log(lang)
            if (lang == "en") {
                return "fi fi-gb"
            } else {
                return `fi fi-${lang}`
            }
            // ALTERNATIVE: add "fi fi-eu" where the flag is missing, or a custom icon
        }
    }
}

</script>

<template>
    <!-- Search Results -->
    <section>

        <!-- Movies -->
        <section class="border border-violet-400"
            v-if="store.AllMovies.length > 0 && !store.errorMsg && !this.store.loading">
            <pre class="text-xs">{{ store.AllMovies }}</pre>
            <h2>MOVIES</h2>
            <ol v-for="item in store.AllMovies[0]" class="list-disc px-2 border border-pink-400">
                <li></li>
                <img :src="`${store.ImgPath}w92${item.poster_path}`" alt="movie-poster">
                </li>
                <li>
                    <span class="text-xs"><strong class="text-sm">Title: </strong>{{ item.title }}</span>
                </li>
                <li>
                    <span class="text-xs"><strong class="text-sm">Original Title: </strong>{{ item.original_title }}</span>
                </li>
                <li v-show="!flags.includes(item.original_language)">
                    <strong class="text-sm">Language: </strong>
                    <span :class="getFlag(item.original_language)"></span>
                </li>
                <li>
                    <span class="text-xs"><strong class="text-sm">Vote: </strong>{{ item.vote_average }}</span>
                </li>
            </ol>
        </section>

        <!-- TV Series -->
        <section class="border border-lime-400" v-if="store.AllSeries.length > 0 && !store.errorMsg && !this.store.loading">
            <!-- <pre class="text-xs">{{ store.AllSeries[0] }}</pre> -->
            <h2>TV SERIES</h2>
            <ol v-for="item in store.AllSeries[0]" class="list-disc px-2 border border-pink-400">
                <li>
                    <img :src="`${store.ImgPath}w92${item.poster_path}`" alt="tvserie-poster">
                </li>
                <li>
                    <span class="text-xs"><strong class="text-sm">Title: </strong>{{ item.name }}</span>
                </li>
                <li>
                    <span class="text-xs"><strong class="text-sm">Original Title: </strong>{{ item.original_name }}</span>
                </li>
                <li v-show="!flags.includes(item.original_language)">
                    <strong class="text-sm">Language: </strong>
                    <span :class="getFlag(item.original_language)"></span>
                </li>
                <li>
                    <span class="text-xs"><strong class="text-sm">Vote: </strong>{{ item.vote_average }}</span>
                </li>
            </ol>
        </section>

    </section>
</template>

<style lang="scss" scoped>
@use '../variables.scss' as *;
</style>