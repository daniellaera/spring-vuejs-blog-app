<template>
  <div class="container mt-5">
    <h1 class="text-center mb-4">Posts</h1>

    <!-- If no posts, display an alert -->
    <div v-if="posts.length === 0" class="alert alert-info">
      No posts available.
    </div>

    <!-- Post cards -->
    <div class="row justify-content-center">
      <div
          v-for="post in posts"
          :key="post.id"
          class="col-md-4 mb-4"
      >
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
                <i class="bi bi-chat-dots me-1"></i> <!-- Bootstrap Icons chat icon -->
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
import apiClient from '@/plugins/axiosConfig'; // Import the Axios instance

interface Comment {
  text: string;
}

interface Post {
  id: number;
  title: string;
  content: string;
  comments: Comment[];  // Include the comments array
}

export default defineComponent({
  name: 'PostList',
  setup() {
    const posts = ref<Post[]>([]); // Array to store posts

    // Fetch posts using Axios instance
    const fetchPosts = async () => {
      try {
        const response = await apiClient.get('/post');  // Update if needed for your API endpoint
        posts.value = response.data;  // Store fetched posts
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    // Call fetchPosts when the component is mounted
    onMounted(fetchPosts);

    return { posts };
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

/* Margin between button and badge */
.me-2 {
  margin-right: 0.5rem;
}

.me-1 {
  margin-right: 0.25rem;
}
</style>