<script>
import { store } from '../data/store';

export default {
    name: "AppMain",
    data() {
        return {
            store,
            flags: ["yo", "sw", "ha", "gn", "ff", "ee", "ay", "ar", "zh", "cn", null, undefined]
        }
    },
    methods: {
        // Return classes to show language flag
        getFlag(lang) {
            return `fi fi-${this.store.langCountry[lang]}`
        },
        // Return vote rounded (integer from 1 to 5)
        getVoteStars(vote) {
            return Math.round(vote / 2)
        },
        // Return number of empty stars to render on page
        getEmptyStars(vote) {
            return 5 - Math.round(vote / 2)
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
            <!-- <pre class="text-xs">{{ store.AllMovies }}</pre> -->
            <h2>MOVIES</h2>
            <ol v-for="item in store.AllMovies[0]" class="list-disc px-2 border border-pink-400">
                <li>
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
                    <span class="text-xs">
                        <strong class="text-sm">Vote: </strong>
                        <span v-for="item in getVoteStars(item.vote_average)">
                            <font-awesome-icon :icon="['fas', 'star']" size="lg" class="inline mx-1 text-yellow-500" />
                        </span>
                        <span v-for="item in getEmptyStars(item.vote_average)">
                            <font-awesome-icon :icon="['far', 'star']" size="lg" class="inline mx-1 text-yellow-500" />
                        </span>
                    </span>
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
                    <span class="text-xs">
                        <strong class="text-sm">Vote: </strong>
                        <span v-for="item in getVoteStars(item.vote_average)">
                            <font-awesome-icon :icon="['fas', 'star']" size="lg" class="inline mx-1 text-yellow-500" />
                        </span>
                        <span v-for="item in getEmptyStars(item.vote_average)">
                            <font-awesome-icon :icon="['far', 'star']" size="lg" class="inline mx-1 text-yellow-500" />
                        </span>
                    </span>
                </li>
            </ol>
        </section>

    </section>
</template>

<style lang="scss" scoped>
@use '../variables.scss' as *;
</style>