<template>
    <div class="posts-view">
        <div class="view-head" v-if="postToView">
            <div>post {{postToView.id}} details</div>
        </div>

        <div class="posts-contain edit-contain">
            <div><strong>Title</strong> : {{postToView.title}}</div>
            <div><strong>Body</strong> :{{postToView.body}}</div>
        </div>

        <div class="edit-bottom">
            <button @click="$store.dispatch('setViewMode','view')">Edit</button>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex"
export default {
    name: "Detail",
    computed: {
        ...mapState(['postToView']),
    },
};
</script>