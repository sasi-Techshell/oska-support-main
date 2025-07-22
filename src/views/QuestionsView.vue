<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- Header Section -->
    <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
      <div>
        <h1 class="text-2xl md:text-3xl font-bold text-gray-900">Questions</h1>
        <p class="text-gray-600 mt-1">Browse and answer community questions</p>
      </div>
      <div class="mt-4 md:mt-0 flex items-center space-x-4">
        <router-link 
          v-if="authStore.isAuthenticated"
          to="/questions/new" 
          class="btn-primary flex items-center space-x-2"
        >
          <PlusIcon class="w-4 h-4" />
          <span>Ask Question</span>
        </router-link>
        <router-link 
          v-else
          to="/login" 
          class="btn-primary flex items-center space-x-2"
        >
          <PlusIcon class="w-4 h-4" />
          <span>Login to Ask</span>
        </router-link>
      </div>
    </div>

    <!-- Filters and Search -->
    <div class="card p-6 mb-8">
      <div class="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
        <div class="flex-1">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search questions..."
            class="input-field"
          />
        </div>
        <select v-model="selectedTag" class="input-field md:w-auto">
          <option value="">All Tags</option>
          <option value="javascript">JavaScript</option>
          <option value="vue.js">Vue.js</option>
          <option value="react">React</option>
          <option value="python">Python</option>
          <option value="node.js">Node.js</option>
        </select>
        <select v-model="sortBy" class="input-field md:w-auto">
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="bounty">Highest Bounty</option>
          <option value="views">Most Views</option>
          <option value="votes">Most Voted</option>
        </select>
      </div>
    </div>

    <!-- Questions List -->
    <div class="space-y-6">
      <div 
        v-for="question in filteredQuestions" 
        :key="question.id"
        class="card p-6 hover:shadow-lg transition-shadow cursor-pointer"
        @click="$router.push(`/questions/${question.id}`)"
      >
        <div class="flex items-start justify-between">
          <div class="flex-1">
            <div class="flex items-center space-x-3 mb-3">
              <h3 class="text-lg font-semibold text-gray-900 hover:text-primary-600 transition-colors">
                {{ question.title }}
              </h3>
              <div v-if="question.bounty > 0" class="flex items-center space-x-1 bg-yellow-50 px-2 py-1 rounded-full">
                <svg class="w-4 h-4 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                  <circle cx="10" cy="10" r="8" stroke="currentColor" stroke-width="2" fill="none"/>
                  <text x="10" y="14" text-anchor="middle" class="text-xs font-bold">₹</text>
                </svg>
                <span class="text-sm font-medium text-yellow-700">{{ question.bounty }}</span>
              </div>
              <div v-if="question.isPrivate" class="badge badge-secondary text-xs">
                Private
              </div>
            </div>
            
            <p class="text-gray-600 mb-4 line-clamp-2">{{ question.description }}</p>
            
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-4 text-sm text-gray-500">
                <div class="flex items-center space-x-2">
                  <img 
                    :src="question.author.profileImage" 
                    :alt="question.author.name"
                    class="w-6 h-6 rounded-full"
                  >
                  <span>{{ question.author.name }}</span>
                </div>
                <span>{{ formatTimeAgo(question.createdAt) }}</span>
                <div class="flex items-center space-x-1">
                  <EyeIcon class="w-4 h-4" />
                  <span>{{ question.views }}</span>
                </div>
                <div class="flex items-center space-x-1">
                  <ChatBubbleLeftIcon class="w-4 h-4" />
                  <span>{{ question.answers.length }}</span>
                </div>
                <div class="flex items-center space-x-1">
                  <ChevronUpIcon class="w-4 h-4 text-success-600" />
                  <span class="text-success-600">{{ question.totalVotes }}</span>
                </div>
              </div>
              
              <div class="flex flex-wrap gap-2">
                <span 
                  v-for="tag in question.tags.slice(0, 3)" 
                  :key="tag"
                  class="bg-primary-100 text-primary-800 text-xs px-2 py-1 rounded-full"
                >
                  {{ tag }}
                </span>
                <span v-if="question.tags.length > 3" class="text-xs text-gray-500">
                  +{{ question.tags.length - 3 }} more
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="filteredQuestions.length === 0" class="text-center py-12">
      <QuestionMarkCircleIcon class="w-16 h-16 text-gray-300 mx-auto mb-4" />
      <h3 class="text-lg font-medium text-gray-900 mb-2">No questions found</h3>
      <p class="text-gray-600 mb-6">Be the first to ask a question in the community!</p>
      <router-link 
        v-if="authStore.isAuthenticated"
        to="/questions/new" 
        class="btn-primary"
      >
        Ask Your First Question
      </router-link>
      <router-link v-else to="/login" class="btn-primary">
        Login to Ask Questions
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useAppStore } from '@/stores/app';
import {
  PlusIcon,
  EyeIcon,
  ChatBubbleLeftIcon,
  QuestionMarkCircleIcon,
  ChevronUpIcon
} from '@heroicons/vue/24/outline';

const authStore = useAuthStore();
const appStore = useAppStore();

const searchQuery = ref('');
const selectedTag = ref('');
const sortBy = ref('newest');

const filteredQuestions = computed(() => {
  let questions = [...appStore.questions];
  
  // Filter by search query
  if (searchQuery.value) {
    questions = questions.filter(q => 
      q.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      q.description.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  }
  
  // Filter by tag
  if (selectedTag.value) {
    questions = questions.filter(q => q.tags.includes(selectedTag.value));
  }
  
  // Sort questions
  switch (sortBy.value) {
    case 'oldest':
      questions.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
      break;
    case 'bounty':
      questions.sort((a, b) => b.bounty - a.bounty);
      break;
    case 'views':
      questions.sort((a, b) => b.views - a.views);
      break;
    case 'votes':
      questions.sort((a, b) => b.totalVotes - a.totalVotes);
      break;
    default: // newest
      questions.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }
  
  return questions;
});

const formatTimeAgo = (date: Date) => {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return `${days}d ago`;
};
</script>