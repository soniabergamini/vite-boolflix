<script>
import { store } from '../data/store';

export default {
    name: "AppMain",
    data() {
        return {
            store,
            flags: ["en", "ja", "ko", "hi", "te", "cs", "hi", "te", "ja"]
        }
    },
    methods: {
        getFlag(lang) {
            console.log(lang)
            if (lang == "en") {
                return "fi fi-gb"
            } else if (this.flags.includes(lang) && lang != "en") {
                return "hidden"
            } else {
                return `fi fi-${lang}`
            }
        }
    }
}

</script>

<template>
    <!-- Search results -->
    <section v-if="store.AllMovies.length > 0 && !store.errorMsg && !this.store.loading">
        <!-- <pre class="text-xs">{{ store.AllMovies }}</pre> -->
        <ol v-for="item in store.AllMovies[0]" class="list-disc px-2 border border-pink-400">
            <li>
                <span class="text-xs"><strong class="text-sm">Title: </strong>{{ item.title }}</span>
            </li>
            <li>
                <span class="text-xs"><strong class="text-sm">Original Title: </strong>{{ item.original_title }}</span>
            </li>
            <li>
                <strong class="text-sm">Language: </strong>
                <span :class="getFlag(item.original_language)"></span>
                <!-- <span :class="`fi fi-${item.original_language}`"></span> -->
            </li>
            <li>
                <span class="text-xs"><strong class="text-sm">Vote: </strong>{{ item.vote_average }}</span>
            </li>
        </ol>
        <span class="fi fi-it"></span>
    </section>
</template>

<style lang="scss" scoped>
@use '../variables.scss' as *;
</style>