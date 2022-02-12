<template>
  <div>
    <Navbar/>
    <div class="app-contain">
      <UserList/>
      <PostsView/>
      <clip-loader :loading="loading" :color="color" :size="size"></clip-loader>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex"
import ClipLoader from 'vue-spinner/src/ClipLoader.vue'
import UserList from './components/UserList/UserList'
import PostsView from './components/PostsView/PostsView'
import Navbar from './components/Navbar'

export default {
  name: 'App',
  components: {
    UserList,Navbar,PostsView,ClipLoader
  },
  data () {
    return {
      color:"#9c344c",
      size:"150px"
    }
  },
  computed: {
    ...mapState(['loading']),
  },
  mounted() {
    var toggler = document.getElementById('navToggler')
    var list = document.getElementById('userList')
    toggler.addEventListener('click',()=>{
      list.classList.toggle('list-mobile')
    }) 
  }
}
</script>

<style lang="scss">
@import "@/assets/scss/style.scss";
</style>
