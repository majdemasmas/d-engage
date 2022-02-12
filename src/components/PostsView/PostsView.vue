<template>
    <!-- if the mode view == view -->
    <Index v-if="viewMode == 'view'"/>
    <!-- if the mode view == detail -->
    <Detail v-else-if="viewMode == 'detail'"/>
    <!-- if the mode view == edit -->
    <Edit v-else-if="viewMode == 'edit'"/>
</template>

<script>
import { mapState } from "vuex"
import Index from "./Index";
import Detail from "./Detail";
import Edit from "./Edit";
export default {
    name: "PostsView",
    components: {
        Index,Detail,Edit
    },

    computed: {
        ...mapState(['viewMode']),
    },
};
</script>
