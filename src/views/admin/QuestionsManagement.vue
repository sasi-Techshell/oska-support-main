<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="mb-8">
      <h1 class="text-2xl md:text-3xl font-bold text-gray-900">Questions Management</h1>
      <p class="text-gray-600 mt-1">Monitor and manage community questions</p>
    </div>

    <!-- Filters -->
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
        <select v-model="selectedStatus" class="input-field md:w-auto">
          <option value="">All Status</option>
          <option value="open">Open</option>
          <option value="in-progress">In Progress</option>
          <option value="answered">Answered</option>
          <option value="escalated">Escalated</option>
        </select>
        <select v-model="selectedType" class="input-field md:w-auto">
          <option value="">All Types</option>
          <option value="bounty">Bounty Questions</option>
          <option value="free">Free Questions</option>
          <option value="private">Private Questions</option>
        </select>
      </div>
    </div>

    <!-- Questions List -->
    <div class="space-y-6">
      <div 
        v-for="question in filteredQuestions" 
        :key="question.id"
        class="card p-6"
      >
        <div class="flex items-start justify-between mb-4">
          <div class="flex-1">
            <div class="flex items-center space-x-3 mb-2">
              <h3 class="text-lg font-semibold text-gray-900">{{ question.title }}</h3>
              <div 
                class="badge"
                :class="{
                  'badge-success': question.status === 'answered',
                  'badge-warning': question.status === 'in-progress',
                  'badge-primary': question.status === 'open',
                  'badge-error': question.status === 'escalated'
                }"
              >
                {{ question.status.replace('-', ' ') }}
              </div>
              <div v-if="question.bounty > 0" class="flex items-center space-x-1 bg-primary-50 px-2 py-1 rounded-full">
                <CurrencyDollarIcon class="w-4 h-4 text-primary-600" />
                <span class="text-sm font-medium text-primary-700">{{ question.bounty }}</span>
              </div>
              <div v-if="question.isPrivate" class="badge badge-secondary">
                Private
              </div>
            </div>
            
            <p class="text-gray-600 mb-4">{{ question.description }}</p>
            
            <div class="flex items-center space-x-6 text-sm text-gray-500">
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
                <span>{{ question.views }} views</span>
              </div>
              <div class="flex items-center space-x-1">
                <ChatBubbleLeftIcon class="w-4 h-4" />
                <span>{{ question.answers.length }} answers</span>
              </div>
            </div>
            
            <div class="flex flex-wrap gap-2 mt-3">
              <span 
                v-for="tag in question.tags" 
                :key="tag"
                class="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full"
              >
                {{ tag }}
              </span>
            </div>
          </div>
          
          <div class="flex items-center space-x-2 ml-4">
            <button 
              v-if="question.status === 'open'"
              class="btn-primary text-sm"
              @click="escalateQuestion(question.id)"
            >
              Escalate
            </button>
            <button 
              v-if="question.status === 'escalated'"
              class="btn-secondary text-sm"
              @click="resolveQuestion(question.id)"
            >
              Resolve
            </button>
            <button class="btn-outline text-sm">
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="filteredQuestions.length === 0" class="text-center py-12">
      <QuestionMarkCircleIcon class="w-16 h-16 text-gray-300 mx-auto mb-4" />
      <h3 class="text-lg font-medium text-gray-900 mb-2">No questions found</h3>
      <p class="text-gray-600">No questions match your current filters.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useAppStore } from '@/stores/app';
import {
  CurrencyDollarIcon,
  EyeIcon,
  ChatBubbleLeftIcon,
  QuestionMarkCircleIcon
} from '@heroicons/vue/24/outline';

const appStore = useAppStore();

const searchQuery = ref('');
const selectedStatus = ref('');
const selectedType = ref('');

const filteredQuestions = computed(() => {
  let questions = [...appStore.questions];
  
  if (searchQuery.value) {
    questions = questions.filter(q => 
      q.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      q.description.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  }
  
  if (selectedStatus.value) {
    questions = questions.filter(q => q.status === selectedStatus.value);
  }
  
  if (selectedType.value) {
    switch (selectedType.value) {
      case 'bounty':
        questions = questions.filter(q => q.bounty > 0);
        break;
      case 'free':
        questions = questions.filter(q => q.bounty === 0);
        break;
      case 'private':
        questions = questions.filter(q => q.isPrivate);
        break;
    }
  }
  
  return questions;
});

const escalateQuestion = (questionId: string) => {
  console.log('Escalating question:', questionId);
};

const resolveQuestion = (questionId: string) => {
  console.log('Resolving question:', questionId);
};

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