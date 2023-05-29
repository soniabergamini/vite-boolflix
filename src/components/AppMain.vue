<script>
import { store } from '../data/store';

export default {
    name: "AppMain",
    data() {
        return {
            store,
            flags: ["yo", "sw", "ha", "gn", "ff", "ee", "ay", "ar", "zh", "cn", null, undefined],
            currentMovie: null,
            currentSerie: null
        }
    },
    methods: {
        // Return classes to show language flag
        getFlag(lang) {
            // console.log("Content lang: ", lang)
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
    <section id="mainContents">

        <!-- Movies -->
        <section class="contentSec" v-if="store.AllMovies.length > 0 && !store.errorMsg && !this.store.loading">
            <h2 class="font-bold">MOVIES:</h2>
            <div>
                <div v-for="(item, i) in store.AllMovies[0]" class="text-xs p-2 relative" @mouseenter="currentMovie = i"
                    @mouseleave="currentMovie = null">
                    <!-- <pre class="text-xs">{{ store.AllMovies[0] }}</pre> -->
                    <div class="w-[185px]">
                        <img :src="`${store.ImgPath}w185${item.poster_path}`" alt="movie-poster">
                    </div>
                    <div v-show="currentMovie === i" class="cardInfo bg-secondaryBgDark p-3">
                        <h3 class="text-lg w-full text-center font-bold mb-3">{{ item.title.toUpperCase() }} </h3>
                        <p v-if="item.original_title != item.title">
                            <strong>Original Title: </strong>
                            <span>{{ item.original_title }}</span>
                        </p>
                        <p v-show="!flags.includes(item.original_language)">
                            <strong>Language: </strong>
                            <span :class="getFlag(item.original_language)"></span>
                        </p>
                        <p>
                            <strong>Vote: </strong>
                            <span v-for="item in getVoteStars(item.vote_average)">
                                <font-awesome-icon :icon="['fas', 'star']" size="lg" class="inline mx-1 text-yellow-500" />
                            </span>
                            <span v-for="item in getEmptyStars(item.vote_average)">
                                <font-awesome-icon :icon="['far', 'star']" size="lg" class="inline mx-1 text-yellow-500" />
                            </span>
                        </p>
                        <p v-if="item.overview">
                            <strong>Overview: </strong>
                            <span>{{ item.overview }}</span>
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <!-- TV Series -->
        <section class="contentSec" v-if="store.AllSeries.length > 0 && !store.errorMsg && !this.store.loading">
            <h2 class="font-bold">TV SERIES:</h2>
            <div>
                <div v-for="(item, i) in store.AllSeries[0]" class="text-xs p-2 relative" @mouseenter="currentSerie = i"
                    @mouseleave="currentSerie = null">
                    <!-- <pre class="text-xs">{{ store.AllMovies[0] }}</pre> -->
                    <div class="w-[185px]">
                        <img :src="`${store.ImgPath}w185${item.poster_path}`" alt="tvserie-poster">
                    </div>
                    <div v-show="currentSerie === i" class="cardInfo bg-secondaryBgDark p-3">
                        <h3 class="text-lg w-full text-center font-bold mb-3">{{ item.name.toUpperCase() }} </h3>
                        <p v-if="item.original_name != item.name">
                            <strong>Original Title: </strong>
                            <span>{{ item.original_name }}</span>
                        </p>
                        <p v-show="!flags.includes(item.original_language)">
                            <strong>Language: </strong>
                            <span :class="getFlag(item.original_language)"></span>
                        </p>
                        <p>
                            <strong>Vote: </strong>
                            <span v-for="item in getVoteStars(item.vote_average)">
                                <font-awesome-icon :icon="['fas', 'star']" size="lg" class="inline mx-1 text-yellow-500" />
                            </span>
                            <span v-for="item in getEmptyStars(item.vote_average)">
                                <font-awesome-icon :icon="['far', 'star']" size="lg" class="inline mx-1 text-yellow-500" />
                            </span>
                        </p>
                        <p v-if="item.overview">
                            <strong>Overview: </strong>
                            <span>{{ item.overview }}</span>
                        </p>
                    </div>
                </div>
            </div>
        </section>

    </section>
</template>

<style lang="scss" scoped>
@use '../style/variables.scss' as *;
@use '../style/mixin.scss' as *;

#mainContents {
    @include flex(center, center, column, 3rem);

    .contentSec>div {
        overflow-x: scroll;
        max-width: 93.75rem;
        @include flex(flex-start, stretch, row, .2rem);

        div.cardInfo {
            position: absolute;
            top: 0;
            left: 0;
            z-index: 2;
            width: 100%;
            height: 100%;
            @include flex(center, flex-start, column, .2rem);

            p {
                margin: .2rem 0;
            }

            p:last-child {
                overflow: hidden;
                display: -webkit-box;
                -webkit-line-clamp: 5;
                -webkit-box-orient: vertical;
                font-size: .625rem;
            }
        }
    }
}
</style>