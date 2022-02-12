import axios from "axios";

const apiClient = axios.create({
  withCredentials: false,
  baseURL: "https://jsonplaceholder.typicode.com",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },

  timeout: 50000,
});

export default {
  fetchUsersPosts(id) {
    return apiClient.get(`/posts?userId=${id}`);
  },

  fetchSinglePosts(id) {
    return apiClient.get(`/posts/${id}`);
  },

  updatePost(id) {
    return apiClient.put(`/posts/${id}`);
  },
};
