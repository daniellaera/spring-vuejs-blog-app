<template>
  <div class="card add-post-card mb-4">
    <div class="card-body">
      <h5 class="card-title">Create a New Post</h5>
      <input
          v-model="title"
          placeholder="Enter post title"
          class="form-control title-input mb-3"
      />
      <textarea
          v-model="content"
          placeholder="Enter post content"
          class="form-control content-textarea mb-3"
      ></textarea>
      <button class="btn btn-success w-100" @click="submitPost">Add Post</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import apiClient from '@/plugins/axiosConfig';

export default defineComponent({
  name: 'AddPost',
  emits: ['postAdded'],
  setup(_, { emit }) {
    const title = ref('');
    const content = ref('');

    const submitPost = async () => {
      if (title.value && content.value) {
        try {
          await apiClient.post('/post', { title: title.value, content: content.value });
          emit('postAdded'); // Emit event after successful POST
          title.value = '';
          content.value = '';
        } catch (error) {
          console.error('Error adding post:', error);
        }
      }
    };

    return { title, content, submitPost };
  },
});
</script>

<style scoped>
.add-post-card {
  max-width: 600px;
  margin: 0 auto;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  transition: box-shadow 0.3s ease;
}

.add-post-card:hover {
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
}

.card-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #4a4a4a;
}

.title-input,
.content-textarea {
  border: 1px solid #ced4da;
  border-radius: 5px;
  font-size: 1rem;
  padding: 0.75rem;
}

.title-input {
  font-weight: 500;
  color: #333;
}

.content-textarea {
  min-height: 150px;
  resize: vertical;
}

.content-textarea:focus,
.title-input:focus {
  border-color: #66afe9;
  outline: none;
  box-shadow: 0 0 8px rgba(102, 175, 233, 0.6);
}

.btn-success {
  font-weight: 500;
  padding: 0.75rem;
}

.btn-success:hover {
  background-color: #218838;
}

.w-100 {
  width: 100%;
}
</style>