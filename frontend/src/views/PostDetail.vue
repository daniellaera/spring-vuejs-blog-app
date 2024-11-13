<template>
  <div class="container mt-5">
    <h1 class="text-center mb-4">Post Details</h1>

    <!-- Show loading message if post is not fetched -->
    <div v-if="!post">
      <p>Loading post...</p>
    </div>

    <!-- Display the post details or the edit form based on editMode -->
    <div v-else>
      <div v-if="!editMode" class="card mb-4">
        <div class="card-body">
          <h5 class="card-title">{{ post.title }}</h5>
          <p class="card-text">{{ post.content }}</p>
          <button class="btn btn-primary mt-4" @click="editMode = true">Edit Post</button>
        </div>
      </div>

      <!-- Edit Form -->
      <div v-else class="card mb-4">
        <div class="card-body">
          <input v-model="editedPost.title" placeholder="Edit title" class="form-control mb-2" />
          <textarea v-model="editedPost.content" placeholder="Edit content" class="form-control mb-2"></textarea>
          <button class="btn btn-success mt-2" @click="updatePost">Save Changes</button>
          <button class="btn btn-secondary mt-2" @click="cancelEdit">Cancel</button>
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
import apiClient from '@/plugins/axiosConfig';
import { useRoute, useRouter } from 'vue-router';
import type {Post} from "@/types/post";

export default defineComponent({
  name: 'PostDetail',
  setup() {
    const post = ref<Post | null>(null);
    const editMode = ref(false);
    const editedPost = ref({ title: '', content: '' });
    const route = useRoute();
    const router = useRouter();
    const postId = route.params.id as string;

    const fetchPostDetails = async () => {
      try {
        const response = await apiClient.get(`/post/${postId}`);
        post.value = response.data;
      } catch (error) {
        console.error('Error fetching post details:', error);
      }
    };

    const updatePost = async () => {
      if (post.value) {
        try {
          const response = await apiClient.put(`/post/${postId}`, {
            title: editedPost.value.title,
            content: editedPost.value.content,
          });
          post.value = response.data;
          editMode.value = false;
        } catch (error) {
          console.error('Error updating post:', error);
        }
      }
    };

    const cancelEdit = () => {
      if (post.value) {
        editedPost.value.title = post.value.title;
        editedPost.value.content = post.value.content;
        editMode.value = false;
      }
    };

    const goBack = () => {
      router.back();
    };

    onMounted(() => {
      fetchPostDetails().then(() => {
        if (post.value) {
          editedPost.value.title = post.value.title;
          editedPost.value.content = post.value.content;
        }
      });
    });

    return { post, editMode, editedPost, goBack, updatePost, cancelEdit };
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

.comment-box {
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
  padding: 10px;
  margin-bottom: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

button {
  padding: 8px 15px;
  font-size: 1rem;
}

button:hover {
  cursor: pointer;
}
</style>