<script>
import { store } from '../data/store';

export default {
    name: "AppErrorLoad",
    data() {
        return {
            store
        }
    }
}

</script>

<template>
    <!-- Error Loading Contents Section -->
    <section v-if="store.errorMsg">
        <div class="text-white p-3 h-[calc(100vh-80px)]">
            <h2 class="font-bold text-xl">🍿 No contents found </h2>
        </div>
    </section>
</template>

<style lang="scss" scoped>
@use '../style/variables.scss' as *;
@use '../style/mixin.scss' as *;

section>div {
    @include flex()
}
</style>