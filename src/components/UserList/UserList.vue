<template>
  <div class="user-list" id="userList">
    <h4 class="head">user list</h4>
    <tree :tree-data="userList"></tree>
  </div>
</template>

<script>
import users from '../../../users.json'
import Tree from "./Tree";
export default {
  name: 'UserList',
  components: {
    Tree
  },
  data (){
    return{
      userList:users
    }
  },

  methods:{
    list_to_tree(list) {
      list.forEach(object => {
        object.children = [];
      });
      var map = {}, node, roots = [], i;
      
      for (i = 0; i < list.length; i += 1) {
        map[list[i].id] = i;
      }
      
      for (i = 0; i < list.length; i += 1) {
        node = list[i];
        if (node.parentId) {
          list[map[node.parentId]].children.push(node);
        } else {
          roots.push(node);
        }
      }
      return roots;
    }
  },

  created() {
    this.$store.dispatch('initialPostsUsersList',this.userList)
    this.userList = this.list_to_tree(this.userList)
  }
}
</script>