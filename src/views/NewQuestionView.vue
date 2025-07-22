<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="mb-8">
      <h1 class="text-2xl md:text-3xl font-bold text-gray-900">Ask a Question</h1>
      <p class="text-gray-600 mt-1">Get help from the community by asking a detailed question</p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
      <!-- Main Form -->
      <div class="lg:col-span-3">
        <form @submit.prevent="handleSubmit" class="space-y-8">
          <!-- Question Title -->
          <div class="card p-6">
            <h2 class="text-lg font-semibold text-gray-900 mb-4">Question Title</h2>
            <input
              v-model="form.title"
              type="text"
              placeholder="What's your programming question? Be specific."
              class="input-field"
              required
            />
            <p class="text-sm text-gray-500 mt-2">
              Make your title clear and specific to get better answers
            </p>
          </div>

          <!-- Question Description -->
          <div class="card p-6">
            <h2 class="text-lg font-semibold text-gray-900 mb-4">Question Details</h2>
            <textarea
              v-model="form.description"
              rows="12"
              placeholder="Describe your problem in detail. Include what you've tried, error messages, and expected behavior. Use code blocks for code examples."
              class="input-field"
              required
            ></textarea>
            <p class="text-sm text-gray-500 mt-2">
              Include code snippets, error messages, and what you've already tried. Use markdown formatting for better readability.
            </p>
          </div>

          <!-- Tags -->
          <div class="card p-6">
            <h2 class="text-lg font-semibold text-gray-900 mb-4">Tags</h2>
            <input
              v-model="tagInput"
              type="text"
              placeholder="Add tags (e.g., javascript, react, vue)"
              class="input-field"
              @keydown.enter.prevent="addTag"
              @keydown.comma.prevent="addTag"
            />
            <div class="flex flex-wrap gap-2 mt-3">
              <span 
                v-for="tag in form.tags" 
                :key="tag"
                class="bg-primary-100 text-primary-800 text-sm px-3 py-1 rounded-full flex items-center space-x-2"
              >
                <span>{{ tag }}</span>
                <button type="button" @click="removeTag(tag)" class="text-primary-600 hover:text-primary-800">
                  <XMarkIcon class="w-4 h-4" />
                </button>
              </span>
            </div>
            <p class="text-sm text-gray-500 mt-2">
              Press Enter or comma to add tags. Use relevant technologies and topics.
            </p>
          </div>

          <!-- Bounty -->
          <div class="card p-6">
            <div class="flex items-center justify-between mb-4">
              <h2 class="text-lg font-semibold text-gray-900">Add Bounty (Optional)</h2>
              <div class="flex items-center space-x-2 text-sm text-gray-600">
                <div class="w-4 h-4 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center">
                  <span class="text-white text-xs font-bold">₹</span>
                </div>
                <span>Available: {{ authStore.user?.tokens || 0 }} tokens</span>
              </div>
            </div>
            
            <div class="flex items-center space-x-4">
              <input
                v-model.number="form.bounty"
                type="number"
                min="0"
                :max="authStore.user?.tokens || 0"
                placeholder="0"
                class="input-field w-32"
              />
              <span class="text-gray-600">tokens</span>
            </div>
            
            <p class="text-sm text-gray-500 mt-2">
              Adding a bounty increases the chances of getting quality answers quickly
            </p>
          </div>

          <!-- Privacy -->
          <div class="card p-6">
            <h2 class="text-lg font-semibold text-gray-900 mb-4">Privacy</h2>
            <div class="flex items-center space-x-3">
              <input
                id="isPrivate"
                v-model="form.isPrivate"
                type="checkbox"
                class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label for="isPrivate" class="text-sm text-gray-700">
                Make this question private (only visible to assigned architects)
              </label>
            </div>
          </div>

          <!-- Submit -->
          <div class="flex items-center justify-between">
            <router-link to="/questions" class="btn-outline">
              Cancel
            </router-link>
            <button type="submit" class="btn-primary" :disabled="!isFormValid">
              Post Question
            </button>
          </div>
        </form>
      </div>

      <!-- Sidebar -->
      <div class="lg:col-span-1 space-y-6">
        <!-- Tips -->
        <div class="card p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">💡 Tips for Great Questions</h3>
          <div class="space-y-4 text-sm">
            <div>
              <h4 class="font-medium text-gray-900 mb-1">Be Specific</h4>
              <p class="text-gray-600">Include exact error messages, expected vs actual behavior, and relevant code.</p>
            </div>
            <div>
              <h4 class="font-medium text-gray-900 mb-1">Show Your Work</h4>
              <p class="text-gray-600">Explain what you've already tried and what research you've done.</p>
            </div>
            <div>
              <h4 class="font-medium text-gray-900 mb-1">Format Code</h4>
              <p class="text-gray-600">Use backticks (`) for inline code and triple backticks (```) for code blocks.</p>
            </div>
            <div>
              <h4 class="font-medium text-gray-900 mb-1">Tag Appropriately</h4>
              <p class="text-gray-600">Use relevant tags to help the right experts find your question.</p>
            </div>
          </div>
        </div>

        <!-- Bounty Info -->
        <div class="card p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">🎯 About Bounties</h3>
          <div class="space-y-3 text-sm">
            <p class="text-gray-600">
              Bounties help attract expert attention to your question and show that you value quality answers.
            </p>
            <div class="bg-yellow-50 p-3 rounded-lg">
              <h4 class="font-medium text-yellow-800 mb-1">How it works:</h4>
              <ul class="text-yellow-700 space-y-1">
                <li>• Set a token amount as bounty</li>
                <li>• Best answer gets the bounty</li>
                <li>• You choose which answer wins</li>
                <li>• Unused bounties are refunded</li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Community Guidelines -->
        <div class="card p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">📋 Community Guidelines</h3>
          <div class="space-y-2 text-sm text-gray-600">
            <p>• Be respectful and professional</p>
            <p>• Don't ask for homework solutions</p>
            <p>• Search before asking duplicates</p>
            <p>• Accept helpful answers</p>
          </div>
          <router-link to="/community-guidelines" class="text-primary-600 hover:text-primary-700 text-sm font-medium mt-3 inline-block">
            Read full guidelines →
          </router-link>
        </div>

        <!-- Popular Tags -->
        <div class="card p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">🏷️ Popular Tags</h3>
          <div class="flex flex-wrap gap-2">
            <button 
              v-for="tag in popularTags" 
              :key="tag"
              @click="addPopularTag(tag)"
              class="bg-gray-100 hover:bg-primary-100 text-gray-700 hover:text-primary-800 text-xs px-2 py-1 rounded-full transition-colors"
            >
              {{ tag }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { useAppStore } from '@/stores/app';
import { XMarkIcon } from '@heroicons/vue/24/outline';

const router = useRouter();
const authStore = useAuthStore();
const appStore = useAppStore();

const form = ref({
  title: '',
  description: '',
  tags: [] as string[],
  bounty: 0,
  isPrivate: false
});

const tagInput = ref('');

const popularTags = ref([
  'javascript', 'python', 'react', 'vue.js', 'node.js', 'typescript', 
  'css', 'html', 'java', 'php', 'sql', 'mongodb', 'express', 'api'
]);

const isFormValid = computed(() => {
  return form.value.title.trim() && 
         form.value.description.trim() && 
         form.value.tags.length > 0 &&
         form.value.bounty <= (authStore.user?.tokens || 0);
});

const addTag = () => {
  const tag = tagInput.value.trim().toLowerCase();
  if (tag && !form.value.tags.includes(tag)) {
    form.value.tags.push(tag);
    tagInput.value = '';
  }
};

const addPopularTag = (tag: string) => {
  if (!form.value.tags.includes(tag)) {
    form.value.tags.push(tag);
  }
};

const removeTag = (tag: string) => {
  form.value.tags = form.value.tags.filter(t => t !== tag);
};

const handleSubmit = () => {
  if (!isFormValid.value || !authStore.user) return;

  const newQuestion = appStore.addQuestion({
    title: form.value.title,
    description: form.value.description,
    authorId: authStore.user.id,
    author: authStore.user,
    bounty: form.value.bounty,
    tags: form.value.tags,
    isPrivate: form.value.isPrivate
  });

  // Deduct bounty tokens if any
  if (form.value.bounty > 0) {
    authStore.updateProfile({
      tokens: (authStore.user.tokens || 0) - form.value.bounty
    });
  }

  router.push('/questions');
};
</script>