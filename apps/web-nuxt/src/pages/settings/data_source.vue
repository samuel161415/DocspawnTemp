<template>
    <div class="w-full h-full ml-4 bg-white overflow-scroll no-scrollbar">
        <div class="px-8 py-8 rounded-lg">
            <div id="lists">
                <List />
            </div>
            <div id="integration">
                <Integration />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, watch } from "vue";
import List from "~/components/settings/list/list.vue";
import Integration from "~/components/settings/integration/Integration.vue";

</script>

<style scoped>
.highlight {
    background-color: yellow;
    color: black;
}
</style>
