<template>
  <div class="container mt-5">
    <h1 class="text-center mb-4">Posts</h1>

    <!-- AddPost component for creating new posts -->
    <AddPost @postAdded="refreshPosts" />

    <!-- Loading message with spinner -->
    <div v-if="loading" class="text-center my-4">
      <p>The backend is in hybrid mode and is waking up for the first request, please be patient...</p>
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>

    <!-- No posts message -->
    <div v-else-if="posts.length === 0" class="alert alert-info">
      No posts available.
    </div>

    <!-- Post cards -->
    <div class="row justify-content-center" v-else>
      <div v-for="post in posts" :key="post.id" class="col-md-4 mb-4">
        <div class="card h-100">
          <div class="card-body">
            <h5 class="card-title">{{ post.title }}</h5>
            <p class="card-text">{{ post.content }}</p>

            <!-- Router link to view post details -->
            <div class="d-flex align-items-center justify-content-between">
              <router-link :to="{ name: 'PostDetail', params: { id: post.id } }">
                <button class="btn btn-primary btn-sm">View Details</button>
              </router-link>

              <!-- Display comment count badge with comment icon -->
              <span v-if="post.comments && post.comments.length > 0" class="badge bg-info d-flex align-items-center">
                <i class="bi bi-chat-dots me-1"></i>
                {{ post.comments.length }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import apiClient from '@/plugins/axiosConfig';

import type { Post } from '@/types/post';
import AddPost from './AddPost.vue';

export default defineComponent({
  name: 'PostList',
  components: { AddPost },
  setup() {
    const posts = ref<Post[]>([]);
    const loading = ref<boolean>(true);

    // Fetch posts from the server
    const fetchPosts = async () => {
      loading.value = true; // Set loading to true while fetching data
      try {
        const response = await apiClient.get('/post');
        posts.value = response.data;
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        loading.value = false;
      }
    };

    // Called when a new post is added in AddPost
    const refreshPosts = () => {
      fetchPosts();
    };

    onMounted(fetchPosts);

    return { posts, loading, refreshPosts };
  },
});
</script>

<style scoped>
/* Styling for the cards */
.card {
  border: 1px solid #ddd;
  border-radius: 5px;
  transition: all 0.3s ease;
}

.card:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.card-title {
  font-size: 1.2rem;
  font-weight: bold;
}

.card-text {
  font-size: 1rem;
  color: #555;
}

/* Ensure the container is wide enough */
.container {
  max-width: 1200px;
}

/* Flex styling for the row and centering items */
.row {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.row.justify-content-center {
  justify-content: center;
}

.col-md-4 {
  padding: 0 15px;
}

/* Style for the comment count badge */
.badge {
  font-size: 0.9rem;
  padding: 0.4rem 0.7rem;
  display: inline-flex;
  align-items: center;
}

/* Center spinner and message */
.text-center {
  text-align: center;
}

.my-4 {
  margin: 1.5rem 0;
}

.spinner-border {
  width: 3rem;
  height: 3rem;
  margin-top: 1rem;
}
</style>