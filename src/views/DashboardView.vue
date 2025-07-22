<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- Welcome Section -->
    <div class="mb-8">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 class="text-2xl md:text-3xl font-bold text-gray-900">
            Welcome back, {{ authStore.user?.name }}!
          </h1>
          <p class="text-gray-600 mt-1">
            <span class="capitalize">{{ authStore.user?.role.replace('-', ' ') }}</span> • 
            Member since {{ formatDate(authStore.user?.joinedAt) }}
          </p>
        </div>
        <div class="mt-4 md:mt-0 flex items-center space-x-4">
          <div class="bg-gradient-to-r from-primary-50 to-secondary-50 px-4 py-2 rounded-lg">
            <div class="flex items-center space-x-2">
              <div class="w-6 h-6 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                <CurrencyDollarIcon class="w-4 h-4 text-white" />
              </div>
              <span class="font-semibold text-gray-900">{{ authStore.user?.tokens || 0 }} Tokens</span>
            </div>
          </div>
          <router-link 
            to="/questions/new"
            class="btn-primary flex items-center space-x-2"
          >
            <PlusIcon class="w-4 h-4" />
            <span>Ask Question</span>
          </router-link>
        </div>
      </div>
    </div>

    <!-- Stats Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <!-- Profile Completion -->
      <div class="card p-6">
        <div class="flex items-center justify-between mb-4">
          <div>
            <p class="text-sm text-gray-600">Profile Completion</p>
            <p class="text-2xl font-bold text-gray-900">{{ authStore.user?.profileCompletion || 0 }}%</p>
          </div>
          <div class="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
            <UserIcon class="w-6 h-6 text-primary-600" />
          </div>
        </div>
        <div class="w-full bg-gray-200 rounded-full h-2">
          <div 
            class="bg-gradient-to-r from-primary-500 to-secondary-500 h-2 rounded-full transition-all duration-500"
            :style="{ width: `${authStore.user?.profileCompletion || 0}%` }"
          ></div>
        </div>
        <router-link to="/profile" class="text-xs text-primary-600 hover:text-primary-700 mt-2 inline-block">
          Complete Profile
        </router-link>
      </div>

      <!-- Questions Asked -->
      <div class="card p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600">Questions Asked</p>
            <p class="text-2xl font-bold text-gray-900">{{ userStats.questionsAsked }}</p>
          </div>
          <div class="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center">
            <QuestionMarkCircleIcon class="w-6 h-6 text-secondary-600" />
          </div>
        </div>
        <p class="text-xs text-gray-500 mt-2">{{ userStats.questionsAnswered }} answered</p>
      </div>

      <!-- Tasks -->
      <div class="card p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600">Tasks {{ authStore.isArchitect ? 'Completed' : 'Posted' }}</p>
            <p class="text-2xl font-bold text-gray-900">{{ userStats.tasksCompleted }}</p>
          </div>
          <div class="w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center">
            <ClipboardDocumentCheckIcon class="w-6 h-6 text-accent-600" />
          </div>
        </div>
        <p class="text-xs text-gray-500 mt-2">{{ userStats.tasksPending }} pending</p>
      </div>

      <!-- Tokens Earned -->
      <div class="card p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600">Tokens Earned</p>
            <p class="text-2xl font-bold text-gray-900">{{ userStats.tokensEarned }}</p>
          </div>
          <div class="w-12 h-12 bg-success-100 rounded-lg flex items-center justify-center">
            <CurrencyDollarIcon class="w-6 h-6 text-success-600" />
          </div>
        </div>
        <p class="text-xs text-gray-500 mt-2">This month</p>
      </div>
    </div>

    <!-- Quick Actions and Recent Activity -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
      <!-- Quick Actions -->
      <div class="card">
        <div class="p-6 border-b border-gray-100">
          <h2 class="text-lg font-semibold text-gray-900">Quick Actions</h2>
        </div>
        <div class="p-6">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <router-link 
              to="/questions/new"
              class="flex items-center space-x-3 p-4 bg-primary-50 hover:bg-primary-100 rounded-lg transition-colors group"
            >
              <div class="w-10 h-10 bg-primary-100 group-hover:bg-primary-200 rounded-lg flex items-center justify-center">
                <QuestionMarkCircleIcon class="w-5 h-5 text-primary-600" />
              </div>
              <div>
                <p class="font-medium text-gray-900">Ask Question</p>
                <p class="text-xs text-gray-600">Get expert help</p>
              </div>
            </router-link>

            <router-link 
              to="/tasks/new"
              v-if="authStore.isEndUser"
              class="flex items-center space-x-3 p-4 bg-secondary-50 hover:bg-secondary-100 rounded-lg transition-colors group"
            >
              <div class="w-10 h-10 bg-secondary-100 group-hover:bg-secondary-200 rounded-lg flex items-center justify-center">
                <ClipboardDocumentListIcon class="w-5 h-5 text-secondary-600" />
              </div>
              <div>
                <p class="font-medium text-gray-900">Post Task</p>
                <p class="text-xs text-gray-600">Hire an architect</p>
              </div>
            </router-link>

            <router-link 
              to="/tasks"
              v-if="authStore.isArchitect"
              class="flex items-center space-x-3 p-4 bg-secondary-50 hover:bg-secondary-100 rounded-lg transition-colors group"
            >
              <div class="w-10 h-10 bg-secondary-100 group-hover:bg-secondary-200 rounded-lg flex items-center justify-center">
                <ClipboardDocumentCheckIcon class="w-5 h-5 text-secondary-600" />
              </div>
              <div>
                <p class="font-medium text-gray-900">Browse Tasks</p>
                <p class="text-xs text-gray-600">Find new projects</p>
              </div>
            </router-link>

            <router-link 
              to="/dashboard/tasks"
              class="flex items-center space-x-3 p-4 bg-accent-50 hover:bg-accent-100 rounded-lg transition-colors group"
            >
              <div class="w-10 h-10 bg-accent-100 group-hover:bg-accent-200 rounded-lg flex items-center justify-center">
                <ClipboardDocumentListIcon class="w-5 h-5 text-accent-600" />
              </div>
              <div>
                <p class="font-medium text-gray-900">My Tasks</p>
                <p class="text-xs text-gray-600">View progress</p>
              </div>
            </router-link>

            <router-link 
              to="/tokens"
              class="flex items-center space-x-3 p-4 bg-success-50 hover:bg-success-100 rounded-lg transition-colors group"
            >
              <div class="w-10 h-10 bg-success-100 group-hover:bg-success-200 rounded-lg flex items-center justify-center">
                <CurrencyDollarIcon class="w-5 h-5 text-success-600" />
              </div>
              <div>
                <p class="font-medium text-gray-900">Token Wallet</p>
                <p class="text-xs text-gray-600">Manage tokens</p>
              </div>
            </router-link>
          </div>
        </div>
      </div>

      <!-- Recent Activity -->
      <div class="card">
        <div class="p-6 border-b border-gray-100">
          <div class="flex items-center justify-between">
            <h2 class="text-lg font-semibold text-gray-900">Recent Activity</h2>
            <router-link to="/dashboard/tasks" class="text-sm text-primary-600 hover:text-primary-700">
              View all
            </router-link>
          </div>
        </div>
        <div class="p-6">
          <div class="space-y-4">
            <div v-for="activity in recentActivities" :key="activity.id" class="flex items-start space-x-3">
              <div class="flex-shrink-0">
                <div 
                  class="w-8 h-8 rounded-full flex items-center justify-center"
                  :class="getActivityIconClass(activity.type)"
                >
                  <component :is="getActivityIcon(activity.type)" class="w-4 h-4" />
                </div>
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-sm text-gray-900">{{ activity.description }}</p>
                <p class="text-xs text-gray-500">{{ formatTimeAgo(activity.timestamp) }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Trending Questions -->
    <div class="card">
      <div class="p-6 border-b border-gray-100">
        <div class="flex items-center justify-between">
          <h2 class="text-lg font-semibold text-gray-900">Trending Questions</h2>
          <router-link to="/questions" class="text-sm text-primary-600 hover:text-primary-700">
            View all questions
          </router-link>
        </div>
      </div>
      <div class="divide-y divide-gray-100">
        <div 
          v-for="question in appStore.questions.slice(0, 3)" 
          :key="question.id"
          class="p-6 hover:bg-gray-50 transition-colors"
        >
          <div class="flex items-start justify-between">
            <div class="flex-1">
              <router-link 
                :to="`/questions/${question.id}`"
                class="text-sm font-medium text-gray-900 hover:text-primary-600 mb-2 block"
              >
                {{ question.title }}
              </router-link>
              <p class="text-xs text-gray-600 line-clamp-2 mb-3">{{ question.description }}</p>
              <div class="flex items-center space-x-4 text-xs text-gray-500">
                <div class="flex items-center space-x-1">
                  <img 
                    :src="question.author.profileImage" 
                    :alt="question.author.name"
                    class="w-4 h-4 rounded-full"
                  >
                  <span>{{ question.author.name }}</span>
                </div>
                <span>{{ formatTimeAgo(question.createdAt) }}</span>
                <span>{{ question.views }} views</span>
                <div class="flex items-center space-x-1" v-if="question.bounty > 0">
                  <CurrencyDollarIcon class="w-3 h-3 text-primary-500" />
                  <span class="text-primary-600 font-medium">{{ question.bounty }}</span>
                </div>
              </div>
            </div>
            <div class="ml-4 flex-shrink-0">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useAppStore } from '@/stores/app';
import {
  CurrencyDollarIcon,
  PlusIcon,
  UserIcon,
  QuestionMarkCircleIcon,
  ClipboardDocumentCheckIcon,
  ClipboardDocumentListIcon,
  CheckIcon,
  ClockIcon,
  ExclamationTriangleIcon
} from '@heroicons/vue/24/outline';

const authStore = useAuthStore();
const appStore = useAppStore();

// Mock user stats
const userStats = ref({
  questionsAsked: 8,
  questionsAnswered: 15,
  tasksCompleted: authStore.isArchitect ? 12 : 5,
  tasksPending: authStore.isArchitect ? 3 : 2,
  tokensEarned: 245
});

// Mock recent activities
const recentActivities = ref([
  {
    id: '1',
    type: 'question-answered',
    description: 'Your question "JWT authentication in Vue.js" was answered',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000) // 2 hours ago
  },
  {
    id: '2',
    type: 'tokens-earned',
    description: 'You earned 25 tokens for answering a bounty question',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000) // 4 hours ago
  },
  {
    id: '3',
    type: 'task-assigned',
    description: 'New task assigned: "Build a Todo App with React"',
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) // 1 day ago
  }
]);

const getActivityIcon = (type: string) => {
  switch (type) {
    case 'question-answered':
      return CheckIcon;
    case 'tokens-earned':
      return CurrencyDollarIcon;
    case 'task-assigned':
      return ClipboardDocumentCheckIcon;
    default:
      return ClockIcon;
  }
};

const getActivityIconClass = (type: string) => {
  switch (type) {
    case 'question-answered':
      return 'bg-success-100 text-success-600';
    case 'tokens-earned':
      return 'bg-primary-100 text-primary-600';
    case 'task-assigned':
      return 'bg-secondary-100 text-secondary-600';
    default:
      return 'bg-gray-100 text-gray-600';
  }
};

const formatDate = (date: Date | undefined) => {
  if (!date) return 'N/A';
  return new Intl.DateTimeFormat('en-US', { 
    year: 'numeric', 
    month: 'long' 
  }).format(new Date(date));
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