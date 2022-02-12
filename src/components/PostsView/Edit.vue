<template>
    <div class="posts-view">
        <div class="view-head" v-if="postToEdit">
            <div>post {{postToEdit.id}} Edit</div>
        </div>

        <div class="posts-contain edit-contain">
            <input type="text" v-model="postToEdit.title">
            <textarea type="text" v-model="postToEdit.body"></textarea>
        </div>

        <div class="edit-bottom">
            <button @click.prevent="removePostFromState(postToEdit.id)" class="remove">remove</button>
            <button @click="updatePost(postToEdit)">save</button>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex"
export default {
    name: "Edit",
    
    methods: {
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
                if (result.isConfirmed) {
                    this.$store.dispatch('setViewMode','view')
                    this.$store.dispatch('removePostFromState',id)
                    this.$swal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                    )
                }
            })
        },

        updatePost(post) {
            this.$store.dispatch('updatePost',post)
        }
    },

    computed: {
        ...mapState(['postToEdit']),
    },
};
</script>