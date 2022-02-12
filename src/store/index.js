import { createStore } from 'vuex'
import userServices from "../services/userServices";

export default createStore({
  state: {
    postsUsersList: [],
    postsSingleUserList: {
      name: "",
      posts: [],
    },

    postToView: {},
    postToEdit: {},
    loading: false,
    viewMode: "view",
    userActiveId: 0,
  },

  mutations: {
    SET_USER_ACTIVE_ID(state, payload) {
      state.userActiveId = payload;
    },

    SET_USERS_LIST_POST(state, payload) {
      state.postsUsersList = payload;
    },

    SET_USER_POSTS(state, payload) {
      state.postsUsersList.find((x) => x.id === state.userActiveId).posts =
        payload;
      state.postsUsersList.find(
        (x) => x.id === state.userActiveId
      ).fetched = true;
    },

    SET_POSTS_TO_SHOW(state, id) {
      state.postsSingleUserList.posts = state.postsUsersList.find(
        (x) => x.id === id
      ).posts;
      state.postsSingleUserList.name = state.postsUsersList.find(
        (x) => x.id === id
      ).name;
    },

    SET_POST_TO_SHOW(state, id) {
      state.postToView = state.postsSingleUserList.posts.find(
        (x) => x.id === id
      );
    },

    SET_POST_TO_SHOW_FROM_UPDATE(state, payload) {
      state.postToView = payload;
    },

    SET_POST_TO_EDIT(state, payload) {
      state.postToEdit = payload;
    },

    REMOVE_POST_FROM_STATE(state, id) {
      var index = state.postsSingleUserList.posts.findIndex((x) => x.id === id);
      if (index !== -1) state.postsSingleUserList.posts.splice(index, 1);
    },

    SHOW_LOADER(state) {
      state.loading = true;
    },

    Hide_LOADER(state) {
      state.loading = false;
    },

    SET_VIEW_MODE(state, mode) {
      state.viewMode = mode;
    },
  },

  actions: {
    initialPostsUsersList({ commit }, userList) {
      var indexArray = [];
      if (Array.isArray(userList) && userList && userList.length > 0) {
        for (let i = 0; i < userList.length; i++) {
          var userObject = { id: "", posts: [], fetched: false, name: "" };
          userObject.id = userList[i].id;
          userObject.name = userList[i].name;
          indexArray[i] = userObject;
        }
      }

      commit("SET_USERS_LIST_POST", indexArray);
    },

    async fetchUsersPosts({ commit }, id) {
      commit("SET_VIEW_MODE", "view");
      if (this.state.postsUsersList.find((x) => x.id === id).fetched == false) {
        commit("SHOW_LOADER");
        commit("SET_USER_ACTIVE_ID", id);
        const response = await userServices.fetchUsersPosts(id);
        commit("SET_USER_POSTS", response.data);
        commit("SET_POSTS_TO_SHOW", id);
        setTimeout(() => {
          commit("Hide_LOADER");
        }, 500);
      } else {
        commit("SET_POSTS_TO_SHOW", id);
      }
    },

    getPostToShow({ commit }, id) {
      commit("SET_POST_TO_SHOW", id);
    },

    setViewMode({ commit }, mode) {
      commit("SET_VIEW_MODE", mode);
    },

    removePostFromState({ commit }, id) {
      commit("REMOVE_POST_FROM_STATE", id);
    },

    async getEditPost({ commit }, id) {
      commit("SET_VIEW_MODE", "edit");
      commit("SHOW_LOADER");
      const response = await userServices.fetchSinglePosts(id);
      setTimeout(() => {
        commit("Hide_LOADER");
      }, 500);
      commit("SET_POST_TO_EDIT", response.data);
    },

    async updatePost({ commit }, post) {
      commit("SHOW_LOADER");
      const response = await userServices.updatePost(post.id);
      setTimeout(() => {
        commit("Hide_LOADER");
      }, 500);
      commit("SET_VIEW_MODE", "detail");
      commit("SET_POST_TO_SHOW_FROM_UPDATE", post);
    },
  },

  modules: {},
});
