<template>
    <div class="posts-view">
        <div class="view-head" v-if="postsSingleUserList.name !=''">
            <div>{{postsSingleUserList.name}} Posts </div>
        </div>

        <div class="posts-contain">
            <div class="post-card"
                v-for="(post,index) in postsSingleUserList.posts"
                :key="index">
                <div class="card-body">
                    <div class="post-title">{{post.title}}</div>
                </div>
                <div class="btn-group">
                    <button @click.prevent="changeToDetailMode(post.id)" class="detail">detail</button>
                    <button @click="getEditPost(post.id)" class="edit">edit</button>
                    <button @click.prevent="removePostFromState(post.id)" class="remove">remove</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex"
export default {
    name: "Index",
    data () {
        return {
            searchInput:'',
        }
    },

    methods: {
        async changeToDetailMode(id) {
            await this.$store.dispatch('getPostToShow',id)
            await this.$store.dispatch('setViewMode','detail')
        },

        async removePostFromState(id) {
            this.$swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                this.$store.dispatch('removePostFromState',id)
                if (result.isConfirmed) {
                    this.$swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                    )
                }
            })
        },

        getEditPost(id) {
            this.$store.dispatch('getEditPost',id)
        },
    },

    computed: {
        ...mapState(['postsSingleUserList','viewMode','postToView']),
    },
};
</script>
