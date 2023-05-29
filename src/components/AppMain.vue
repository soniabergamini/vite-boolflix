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
        // Return src url for cover images
        getCover(imgPath) {
            const img = imgPath ? `${this.store.ImgPath}w342${imgPath}` : this.store.ImgEmpty
            return img
        },
        // Return classes to show language flag
        getFlag(lang) {
            return `fi fi-${this.store.langCountry[lang]}`
        },
        // Return star icon vote
        getStars(n, vote) {
            const iconClass = n <= Math.round(vote / 2) ? "fa-star fa-solid" : "fa-star fa-regular";
            return iconClass;
        }
    }
}

</script>

<template>
    <!-- Search Results -->
    <section id="mainContents">

        <!-- Movies -->
        <section class="contentSec" v-if="!store.errorMsg && !this.store.loading">

            <!-- Section Title -->
            <h2 class="font-bold">MOVIES:</h2>

            <!-- All Contents Cards -->
            <h3 v-if="store.AllMovies[0].length === 0" class="mt-4 w-full">🔎 No Movies Found</h3>
            <div v-else>
                <div v-for="(item, i) in store.AllMovies[0]" class="text-xs p-2 relative"
                    @mouseenter="currentMovie = i, $emit('getCast', item.id, 'movie', 'movie')"
                    @mouseleave="currentMovie = null">
                    <!-- <pre class="text-xs">{{ store.AllMovies[0] }}</pre> -->

                    <!-- Movie Cover Image -->
                    <div class="w-[342px]">
                        <img :src="getCover(item.poster_path)" alt="movie-poster">
                    </div>

                    <!-- Movie info -->
                    <div v-show="currentMovie === i" class="cardInfo bg-secondaryBgDark p-4">
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
                            <template v-for="n in 5">
                                <font-awesome-icon :icon="getStars(n, item.vote_average)"
                                    class="inline mx-1 text-yellow-500" size="lg" />
                            </template>
                        </p>
                        <p v-show="store.MovieCast.length > 0">
                            <strong>CAST: </strong>
                            <span v-for="actor in store.MovieCast">{{ actor.name }}. </span>
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

            <!-- Section Title -->
            <h2 class="font-bold">TV SERIES:</h2>

            <!-- All Contents Cards -->
            <h3 v-if="store.AllSeries[0].length === 0" class="mt-5 w-full">🔎 No TV Series Found</h3>
            <div v-else>
                <div v-for="(item, i) in store.AllSeries[0]" class="text-xs p-2 relative"
                    @mouseenter="currentSerie = i, $emit('getCast', item.id, 'tv', 'serie')"
                    @mouseleave="currentSerie = null">
                    <!-- <pre class="text-xs">{{ store.AllSeries[0] }}</pre> -->

                    <!-- TV Serie Cover Image -->
                    <div class="w-[342px]">
                        <img :src="getCover(item.poster_path)" alt="tvserie-poster">
                    </div>

                    <!-- TV Serie info -->
                    <div v-show="currentSerie === i" class="cardInfo bg-secondaryBgDark p-4">
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
                            <template v-for="n in 5">
                                <font-awesome-icon :icon="getStars(n, item.vote_average)"
                                    class="inline mx-1 text-yellow-500" size="lg" />
                            </template>
                        </p>
                        <p v-show="store.SerieCast.length > 0">
                            <strong>CAST: </strong>
                            <span v-for="actor in store.SerieCast">{{ actor.name }}. </span>
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