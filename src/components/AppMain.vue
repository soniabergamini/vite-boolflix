<script>
import { store } from '../data/store';

export default {
    name: "AppMain",
    data() {
        return {
            store,
        }
    }
}

</script>

<template>
    <!-- Search results -->
    <section v-if="store.AllMovies.length > 0 && !store.errorMsg && !this.store.loading">
        <!-- <pre class="text-xs">{{ store.AllMovies }}</pre> -->
        <ol v-for="item in store.AllMovies[0]" class="list-decimal px-2">
            <li>
                <span class="text-xs"><strong class="text-sm">Title: </strong>{{ item.title }}</span>
            </li>
            <li>
                <span class="text-xs"><strong class="text-sm">Original Title: </strong>{{ item.original_title }}</span>
            </li>
            <li>
                <span class="text-xs"><strong class="text-sm">Language: </strong>{{ item.original_language }}</span>
            </li>
            <li>
                <span class="text-xs"><strong class="text-sm">Vote: </strong>{{ item.vote_average }}</span>
            </li>
        </ol>
    </section>
</template>

<style lang="scss" scoped>
@use '../variables.scss' as *;
</style>