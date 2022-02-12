<template>
    <li class="node-tree">
        <span class="open-record" v-if="node.children.length>0" @click.stop="active=!active">
            <span v-if="active">-</span>
            <span v-else>+</span>
        </span>
        <span class="label" @click="getUserPosts(node.id)">{{ node.name }}</span>

        <ul v-if="node.children && node.children.length" :class="active?'d-block':'d-none'">
            <node v-for="(child,index) in node.children" :key="index" :node="child"></node>
        </ul>
    </li>
</template>

<script>
export default {
    name: "node",
    props: {
        node: Object
    },

    data () {
        return{
            active:false,
        }
    },
    methods: {
        getUserPosts(id) {
            this.$store.dispatch('fetchUsersPosts',id)
        }
    },
};
</script>

<style lang="scss" scoped>
.d-block{
    display: block;
}

.d-none{
    display: none;
}

.node-tree{
    cursor: pointer;
    .label{
        margin-bottom: 0.5rem;
    }

    .open-record{
        margin-right: 0.5rem;
        margin-bottom: 0.2rem;
        cursor: pointer;
        width: 20px;
        height: 20px;
        background-color: #4d4d4e;
        color: white;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        font-size: 1.2rem;
        &:focus{
            outline: none;
        }
    }

    ul{
        width: 100%;
        margin-bottom: 0.5rem;
        padding-left: 16px;
    }
}
</style>