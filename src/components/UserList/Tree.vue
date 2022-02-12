<template>
    <div class="tree">
        <ul class="tree-list">
            <node-tree v-for="(item,index) in treeData" :key="index" :node="item"></node-tree>
        </ul>
    </div>
</template>

<script>
import NodeTree from "./NodeTree";

export default {
    props: ['treeData'],
    components: {
        NodeTree
    },
};
</script>

<style lang="scss" scoped>
.tree{
    max-height: calc(100% - 50px);
    overflow-y: auto;
    padding: 1rem;
    &::-webkit-scrollbar {
        width: 6px;
    }

    &::-webkit-scrollbar-track {
        box-shadow: inset 0 0 6px rgba(#000, 0.5);
    }

    &::-webkit-scrollbar-thumb {
        background: #9c344c;
    }
}
</style>