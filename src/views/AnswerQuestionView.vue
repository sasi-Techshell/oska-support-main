<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="mb-8">
      <router-link to="/questions" class="text-primary-600 hover:text-primary-700 text-sm flex items-center space-x-1 mb-4">
        <ArrowLeftIcon class="w-4 h-4" />
        <span>Back to Questions</span>
      </router-link>
      <h1 class="text-2xl md:text-3xl font-bold text-gray-900">Answer Question</h1>
      <p class="text-gray-600 mt-1">Provide a detailed answer to help the community</p>
    </div>

    <!-- Question Details -->
    <div class="card p-6 mb-8">
      <div class="flex items-start justify-between mb-4">
        <div class="flex-1">
          <h2 class="text-xl font-semibold text-gray-900 mb-2">Question Title</h2>
          <p class="text-gray-600 mb-4">Question description will be loaded here...</p>
          <div class="flex items-center space-x-4 text-sm text-gray-500">
            <span>Asked by User</span>
            <span>2 hours ago</span>
            <div class="flex items-center space-x-1">
              <CurrencyDollarIcon class="w-4 h-4 text-primary-500" />
              <span class="text-primary-600 font-medium">25 tokens</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Answer Form -->
    <form @submit.prevent="handleSubmit" class="space-y-6">
      <div class="card p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Your Answer</h3>
        <textarea
          v-model="answerContent"
          rows="12"
          placeholder="Provide a detailed answer to help solve this problem..."
          class="input-field"
          required
        ></textarea>
        <p class="text-sm text-gray-500 mt-2">
          Include code examples, explanations, and step-by-step instructions when relevant
        </p>
      </div>

      <div class="flex items-center justify-between">
        <router-link to="/questions" class="btn-outline">
          Cancel
        </router-link>
        <button type="submit" class="btn-primary" :disabled="!answerContent.trim()">
          Submit Answer
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { ArrowLeftIcon, CurrencyDollarIcon } from '@heroicons/vue/24/outline';

const router = useRouter();
const route = useRoute();

const answerContent = ref('');

const handleSubmit = () => {
  // In a real app, this would submit the answer to the backend
  console.log('Submitting answer for question:', route.params.id);
  console.log('Answer content:', answerContent.value);
  
  // Redirect back to questions after submission
  router.push('/questions');
};
</script>