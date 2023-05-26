<script>
import { store } from '../data/store';

export default {
    name: "AppMain",
    data() {
        return {
            store,
            flags: ["yo", "sw", "ha", "gn", "ff", "ee", "ay", "ar", "zh", "cn", null, undefined],
            currentContent: null
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
        },
        cardHoverIn(i) {
            this.currentContent = i
        },
        cardHoverOut() {
            this.currentContent = null
        }
    }
}

</script>

<template>
    <!-- Search Results -->
    <section>

        <!-- Movies -->
        <section id="moviesSec" v-if="store.AllMovies.length > 0 && !store.errorMsg && !this.store.loading">
            <h2>MOVIES</h2>
            <div>
                <div v-for="(item, i) in store.AllMovies[0]" class="text-xs p-2 relative">
                    <!-- <pre class="text-xs">{{ store.AllMovies[0] }}</pre> -->
                    <div class="w-[185px]" @mouseenter="cardHoverIn(i)">
                        <img :src="`${store.ImgPath}w185${item.poster_path}`" alt="movie-poster">
                    </div>
                    <div v-show="currentContent === i" class="cardInfo bg-secondaryBgDark p-3">
                        <p>
                            <strong>Title: </strong>
                            <span>{{ item.title }}</span>
                        </p>
                        <p>
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
                    </div>
                </div>
            </div>
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

#moviesSec>div {

    display: flex;
    overflow-x: scroll;
    width: 87.5rem;
    gap: .5rem;

    div.cardInfo {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 2;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;

        p {
            margin: .2rem 0;
        }
    }
}
</style>