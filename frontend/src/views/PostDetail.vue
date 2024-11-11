<template>
  <div class="container mt-5">
    <h1 class="text-center mb-4">Post Details</h1>

    <!-- Show loading message if post is not fetched -->
    <div v-if="!post">
      <p>Loading post...</p>
    </div>

    <!-- Display the post details if available -->
    <div v-else>
      <div class="card mb-4">
        <div class="card-body">
          <h5 class="card-title">{{ post.title }}</h5>
          <p class="card-text">{{ post.content }}</p>
        </div>
      </div>

      <!-- Comments Section -->
      <div v-if="post.comments && post.comments.length > 0">
        <h5 class="mb-3">Comments</h5>
        <div v-for="(comment, index) in post.comments" :key="index" class="comment-box">
          <p class="mb-1"><strong>Comment #{{ index + 1 }}:</strong></p>
          <p>{{ comment.text }}</p>
        </div>
      </div>

      <!-- If no comments, show a message -->
      <div v-else>
        <p>No comments yet. Be the first to comment!</p>
      </div>

      <!-- Back button to navigate to the previous page -->
      <button class="btn btn-secondary mt-4" @click="goBack">Back</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import apiClient from '@/plugins/axiosConfig';  // Import the Axios instance
import { useRoute, useRouter } from 'vue-router';  // Use Vue Router to access route params and router methods

interface Comment {
  text: string;
  // If you have an author for comments, you could also include:
  // author: string;
}

interface Post {
  id: number;
  title: string;
  content: string;
  comments: Comment[];  // Include comments array
}

export default defineComponent({
  name: 'PostDetail',
  setup() {
    const post = ref<Post | null>(null); // Store post details
    const route = useRoute();  // Access the current route
    const router = useRouter();  // Access the router instance
    const postId = route.params.id as string;  // Get the post ID from route params

    // Fetch post details based on post ID
    const fetchPostDetails = async () => {
      try {
        const response = await apiClient.get(`/post/${postId}`);
        post.value = response.data;  // Store fetched post details
      } catch (error) {
        console.error('Error fetching post details:', error);
      }
    };

    // Function to go back to the previous page
    const goBack = () => {
      router.back();  // Navigate back to the previous page
    };

    // Call fetchPostDetails when the component is mounted
    onMounted(fetchPostDetails);

    return { post, goBack };
  },
});
</script>

<style scoped>
/* Styling for the post detail page */
.card {
  border: 1px solid #ddd;
  border-radius: 5px;
}

.card-body {
  padding: 1.5rem;
}

.card-title {
  font-size: 1.5rem;
  font-weight: bold;
}

.card-text {
  font-size: 1.2rem;
  color: #555;
}

/* Comments section */
.comment-box {
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
  padding: 10px;
  margin-bottom: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.comment-box p {
  margin: 0;
}

/* Styling for the "Back" button */
button {
  padding: 8px 15px;
  font-size: 1rem;
  text-align: center;
  margin-top: 20px;
}

button:hover {
  cursor: pointer;
}
</style>