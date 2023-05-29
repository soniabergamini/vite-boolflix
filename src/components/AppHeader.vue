<script>

export default {
    name: "AppHeader",
    data() {
        return {
            newSearch: ""
        }
    }
}

</script>

<template>
    <!-- Nav Menu -->
    <nav class="flex justify-between items-center">

        <!-- Netflix Logo -->
        <div class="w-1/12">
            <a href="#">
                <img src="/netflix-logo.png" alt="netflix-logo">
            </a>
        </div>

        <!-- Search Bar -->
        <div>
            <form action="#">
                <input class="text-gray-500 pl-9 pr-2 py-1" v-model="newSearch" type="search"
                    placeholder="Movies, TV series" @keyup="$emit('chatSearch', this.newSearch)">
                <button @click="$emit('chatSearch', this.newSearch)" class="border mx-2 px-2 py-1">Search</button>
            </form>
        </div>

    </nav>
</template>

<style lang="scss" scoped>
@use '../style/variables.scss' as *;
@use '../style/mixin.scss' as *;

input {
    background: white url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' class='bi bi-search' viewBox='0 0 16 16'%3E%3Cpath d='M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z'%3E%3C/path%3E%3C/svg%3E") no-repeat 13px center;
}
</style>