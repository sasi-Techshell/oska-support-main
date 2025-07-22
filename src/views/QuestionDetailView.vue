<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="mb-8">
      <router-link to="/questions" class="text-primary-600 hover:text-primary-700 text-sm flex items-center space-x-1 mb-4">
        <ArrowLeftIcon class="w-4 h-4" />
        <span>Back to Questions</span>
      </router-link>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
      <!-- Main Content -->
      <div class="lg:col-span-3">
        <!-- Question Details -->
        <div class="card p-8 mb-8">
          <div class="flex items-start space-x-6">
            <!-- Voting Section -->
            <div class="flex flex-col items-center space-y-3 flex-shrink-0">
              <button 
                @click="voteQuestion('up')"
                :disabled="!authStore.isAuthenticated || hasVoted"
                class="p-2 rounded-lg transition-colors"
                :class="userVote === 'up' ? 'bg-success-100 text-success-700' : 'hover:bg-gray-100 text-gray-600'"
              >
                <ChevronUpIcon class="w-6 h-6" />
              </button>
              
              <div class="text-2xl font-bold text-gray-900">
                {{ question?.totalVotes || 0 }}
              </div>
              
              <button 
                @click="voteQuestion('down')"
                :disabled="!authStore.isAuthenticated || hasVoted"
                class="p-2 rounded-lg transition-colors"
                :class="userVote === 'down' ? 'bg-error-100 text-error-700' : 'hover:bg-gray-100 text-gray-600'"
              >
                <ChevronDownIcon class="w-6 h-6" />
              </button>
              
              <div v-if="question?.bounty && question.bounty > 0" class="flex flex-col items-center space-y-1 bg-yellow-50 px-3 py-2 rounded-lg">
                <div class="w-6 h-6 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center">
                  <span class="text-white text-xs font-bold">₹</span>
                </div>
                <span class="text-sm font-medium text-yellow-700">{{ question?.bounty }}</span>
                <span class="text-xs text-yellow-600">bounty</span>
              </div>
            </div>

            <!-- Question Content -->
            <div class="flex-1">
              <h1 class="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                {{ question?.title || 'Loading...' }}
              </h1>
              
              <div class="flex items-center space-x-6 text-sm text-gray-500 mb-6">
                <div class="flex items-center space-x-2">
                  <img 
                    :src="question?.author.profileImage" 
                    :alt="question?.author.name"
                    class="w-8 h-8 rounded-full"
                  >
                  <div>
                    <router-link 
                      :to="`/portfolio/${question?.author.id}`"
                      class="font-medium text-gray-900 hover:text-primary-600"
                    >
                      {{ question?.author.name }}
                    </router-link>
                    <p class="text-xs text-gray-500">{{ question?.author.role.replace('-', ' ') }}</p>
                  </div>
                </div>
                <span>{{ formatTimeAgo(question?.createdAt) }}</span>
                <div class="flex items-center space-x-1">
                  <EyeIcon class="w-4 h-4" />
                  <span>{{ question?.views }} views</span>
                </div>
              </div>
              
              <div class="prose max-w-none mb-6">
                <div class="text-gray-700 leading-relaxed whitespace-pre-wrap">{{ question?.description }}</div>
              </div>
              
              <div class="flex flex-wrap gap-2 mb-6">
                <span 
                  v-for="tag in question?.tags" 
                  :key="tag"
                  class="bg-primary-100 text-primary-800 text-sm px-3 py-1 rounded-full"
                >
                  {{ tag }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Answers Section -->
        <div class="card p-8">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-xl font-semibold text-gray-900">
              {{ sortedAnswers.length }} {{ sortedAnswers.length === 1 ? 'Answer' : 'Answers' }}
            </h2>
            <select v-model="sortBy" class="input-field w-auto">
              <option value="votes">Most Voted</option>
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
            </select>
          </div>

          <!-- Answer List -->
          <div class="space-y-8">
            <div 
              v-for="answer in sortedAnswers" 
              :key="answer.id"
              class="border-b border-gray-200 pb-8 last:border-b-0"
            >
              <div class="flex space-x-4">
                <!-- Answer Voting -->
                <div class="flex flex-col items-center space-y-2 flex-shrink-0">
                  <button 
                    @click="voteAnswer(answer.id, 'up')"
                    :disabled="!authStore.isAuthenticated || hasVotedAnswer(answer.id)"
                    class="p-1 rounded-lg transition-colors"
                    :class="getUserAnswerVote(answer.id) === 'up' ? 'bg-success-100 text-success-700' : 'hover:bg-gray-100 text-gray-600'"
                  >
                    <ChevronUpIcon class="w-5 h-5" />
                  </button>
                  
                  <span class="text-lg font-bold text-gray-900">{{ answer.totalVotes }}</span>
                  
                  <button 
                    @click="voteAnswer(answer.id, 'down')"
                    :disabled="!authStore.isAuthenticated || hasVotedAnswer(answer.id)"
                    class="p-1 rounded-lg transition-colors"
                    :class="getUserAnswerVote(answer.id) === 'down' ? 'bg-error-100 text-error-700' : 'hover:bg-gray-100 text-gray-600'"
                  >
                    <ChevronDownIcon class="w-5 h-5" />
                  </button>
                  
                  <div v-if="answer.isAccepted" class="text-success-600">
                    <CheckIcon class="w-5 h-5" />
                  </div>
                </div>

                <!-- Answer Content -->
                <div class="flex-1">
                  <div class="prose max-w-none mb-4">
                    <div class="text-gray-700 leading-relaxed whitespace-pre-wrap">{{ answer.content }}</div>
                  </div>
                  
                  <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-4 text-sm text-gray-500">
                      <div class="flex items-center space-x-2">
                        <img 
                          :src="answer.author.profileImage" 
                          :alt="answer.author.name"
                          class="w-6 h-6 rounded-full"
                        >
                        <router-link 
                          :to="`/portfolio/${answer.author.id}`"
                          class="font-medium text-gray-900 hover:text-primary-600"
                        >
                          {{ answer.author.name }}
                        </router-link>
                      </div>
                      <span>{{ formatTimeAgo(answer.createdAt) }}</span>
                    </div>
                    
                    <div v-if="answer.isAccepted" class="flex items-center space-x-1 text-success-600">
                      <CheckIcon class="w-4 h-4" />
                      <span class="text-sm font-medium">Accepted Answer</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- No Answers State -->
          <div v-if="sortedAnswers.length === 0" class="text-center py-12">
            <ChatBubbleLeftIcon class="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 class="text-lg font-medium text-gray-900 mb-2">No answers yet</h3>
            <p class="text-gray-600 mb-6">Be the first to help solve this problem!</p>
          </div>

          <!-- Answer Form for Authenticated Users -->
          <div v-if="authStore.isAuthenticated" class="mt-8 pt-8 border-t border-gray-200">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Your Answer</h3>
            <form @submit.prevent="submitAnswer" class="space-y-4">
              <textarea
                v-model="newAnswer"
                rows="8"
                placeholder="Write your answer here. Include code examples, explanations, and step-by-step instructions when relevant."
                class="input-field"
                required
              ></textarea>
              <div class="flex justify-end">
                <button type="submit" class="btn-primary" :disabled="!newAnswer.trim()">
                  Post Answer
                </button>
              </div>
            </form>
          </div>

          <!-- Login prompt for unauthenticated users -->
          <div v-else class="mt-8 pt-8 border-t border-gray-200 text-center">
            <p class="text-gray-600 mb-4">Want to answer this question?</p>
            <router-link to="/login" class="btn-primary">
              Login to Answer
            </router-link>
          </div>
        </div>
      </div>

      <!-- Sidebar -->
      <div class="lg:col-span-1 space-y-6">
        <!-- Related Questions -->
        <div class="card p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Related Questions</h3>
          <div class="space-y-4">
            <div v-for="relatedQ in relatedQuestions" :key="relatedQ.id" class="border-b border-gray-100 pb-3 last:border-b-0">
              <router-link 
                :to="`/questions/${relatedQ.id}`"
                class="text-sm font-medium text-gray-900 hover:text-primary-600 line-clamp-2 mb-1"
              >
                {{ relatedQ.title }}
              </router-link>
              <div class="flex items-center space-x-2 text-xs text-gray-500">
                <span>{{ relatedQ.totalVotes }} votes</span>
                <span>{{ relatedQ.answers.length }} answers</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Hot Questions -->
        <div class="card p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">🔥 Hot Questions</h3>
          <div class="space-y-4">
            <div v-for="hotQ in hotQuestions" :key="hotQ.id" class="border-b border-gray-100 pb-3 last:border-b-0">
              <router-link 
                :to="`/questions/${hotQ.id}`"
                class="text-sm font-medium text-gray-900 hover:text-primary-600 line-clamp-2 mb-1"
              >
                {{ hotQ.title }}
              </router-link>
              <div class="flex items-center space-x-2 text-xs text-gray-500">
                <span>{{ hotQ.views }} views</span>
                <span v-if="hotQ.bounty > 0" class="text-yellow-600 font-medium">{{ hotQ.bounty }} bounty</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Question Stats -->
        <div class="card p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Question Stats</h3>
          <div class="space-y-3">
            <div class="flex justify-between text-sm">
              <span class="text-gray-600">Asked</span>
              <span class="font-medium">{{ formatDate(question?.createdAt) }}</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-gray-600">Viewed</span>
              <span class="font-medium">{{ question?.views }} times</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-gray-600">Active</span>
              <span class="font-medium">{{ formatTimeAgo(question?.updatedAt) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { useAppStore } from '@/stores/app';
import type { Question, Answer, QuestionVote, AnswerVote } from '@/types';
import {
  ArrowLeftIcon,
  EyeIcon,
  ChevronUpIcon,
  ChevronDownIcon,
  CheckIcon,
  ChatBubbleLeftIcon
} from '@heroicons/vue/24/outline';

const route = useRoute();
const authStore = useAuthStore();
const appStore = useAppStore();

const question = ref<Question | null>(null);
const newAnswer = ref('');
const sortBy = ref('votes');

// Mock data - in real app, this would come from API
const mockQuestion: Question = {
  id: '1',
  title: 'How to implement JWT authentication in Vue.js?',
  description: `I'm building a Vue.js application and need to implement JWT authentication. I want to understand:

1. How to store JWT tokens securely
2. How to handle token refresh
3. How to protect routes that require authentication
4. Best practices for handling authentication state

I've tried using localStorage but I'm concerned about security. What's the recommended approach?

Here's what I have so far:

\`\`\`javascript
// auth.js
export const login = async (credentials) => {
  const response = await fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials)
  });
  const data = await response.json();
  localStorage.setItem('token', data.token);
};
\`\`\`

Any help would be appreciated!`,
  authorId: '1',
  author: {
    id: '1',
    name: 'Alex Johnson',
    email: 'alex@example.com',
    role: 'end-user',
    tokens: 120,
    profileCompletion: 80,
    joinedAt: new Date(),
    isVerified: true,
    profileImage: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&dpr=2'
  },
  bounty: 25,
  tags: ['vue.js', 'authentication', 'jwt', 'security'],
  createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
  updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
  answers: [
    {
      id: '1',
      questionId: '1',
      authorId: '2',
      author: {
        id: '2',
        name: 'Sarah Wilson',
        email: 'sarah@example.com',
        role: 'architect',
        tokens: 850,
        profileCompletion: 95,
        joinedAt: new Date(),
        isVerified: true,
        profileImage: 'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&dpr=2'
      },
      content: `Great question! Here's a comprehensive approach to JWT authentication in Vue.js:

## 1. Secure Token Storage

Instead of localStorage, use httpOnly cookies for better security:

\`\`\`javascript
// Set cookie on server side
res.cookie('token', jwt, { 
  httpOnly: true, 
  secure: true, 
  sameSite: 'strict' 
});
\`\`\`

## 2. Pinia Store for Auth State

\`\`\`javascript
// stores/auth.js
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    isAuthenticated: false
  }),
  
  actions: {
    async login(credentials) {
      const response = await fetch('/api/login', {
        method: 'POST',
        credentials: 'include', // Include cookies
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      });
      
      if (response.ok) {
        this.user = await response.json();
        this.isAuthenticated = true;
      }
    }
  }
})
\`\`\`

## 3. Route Protection

\`\`\`javascript
// router/index.js
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/login');
  } else {
    next();
  }
});
\`\`\`

This approach is much more secure than localStorage and follows modern best practices.`,
      isAccepted: true,
      votes: [
        { id: '1', answerId: '1', userId: '1', voteType: 'up', createdAt: new Date() },
        { id: '2', answerId: '1', userId: '3', voteType: 'up', createdAt: new Date() },
        { id: '3', answerId: '1', userId: '4', voteType: 'up', createdAt: new Date() }
      ],
      totalVotes: 3,
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
    }
  ],
  views: 45,
  isPrivate: false,
  isDraft: false,
  votes: [
    { id: '1', questionId: '1', userId: '2', voteType: 'up', createdAt: new Date() },
    { id: '2', questionId: '1', userId: '3', voteType: 'up', createdAt: new Date() }
  ],
  totalVotes: 2,
  status: 'answered'
};

// Mock related and hot questions
const relatedQuestions = ref([
  { id: '2', title: 'Vue 3 Composition API authentication patterns', totalVotes: 5, answers: [1, 2] },
  { id: '3', title: 'Securing Vue.js applications with OAuth 2.0', totalVotes: 8, answers: [1] },
  { id: '4', title: 'JWT token refresh strategies in SPA', totalVotes: 12, answers: [1, 2, 3] }
]);

const hotQuestions = ref([
  { id: '5', title: 'React vs Vue performance comparison 2024', views: 1250, bounty: 50 },
  { id: '6', title: 'Best practices for TypeScript in large projects', views: 890, bounty: 0 },
  { id: '7', title: 'Optimizing database queries for high traffic', views: 2100, bounty: 100 }
]);

const sortedAnswers = computed(() => {
  if (!question.value?.answers) return [];
  
  const answers = [...question.value.answers];
  
  switch (sortBy.value) {
    case 'votes':
      return answers.sort((a, b) => {
        // Accepted answers first, then by votes
        if (a.isAccepted && !b.isAccepted) return -1;
        if (!a.isAccepted && b.isAccepted) return 1;
        return b.totalVotes - a.totalVotes;
      });
    case 'newest':
      return answers.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    case 'oldest':
      return answers.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    default:
      return answers;
  }
});

const userVote = computed(() => {
  if (!authStore.user || !question.value) return null;
  const vote = question.value.votes.find(v => v.userId === authStore.user?.id);
  return vote?.voteType || null;
});

const hasVoted = computed(() => {
  return userVote.value !== null;
});

const hasVotedAnswer = (answerId: string) => {
  if (!authStore.user) return false;
  const answer = question.value?.answers.find(a => a.id === answerId);
  return answer?.votes.some(v => v.userId === authStore.user?.id) || false;
};

const getUserAnswerVote = (answerId: string) => {
  if (!authStore.user) return null;
  const answer = question.value?.answers.find(a => a.id === answerId);
  const vote = answer?.votes.find(v => v.userId === authStore.user?.id);
  return vote?.voteType || null;
};

const voteQuestion = (voteType: 'up' | 'down') => {
  if (!authStore.isAuthenticated || !question.value) return;
  
  // In real app, this would make API call
  console.log(`Voting ${voteType} on question ${question.value.id}`);
  
  // Mock implementation
  if (!hasVoted.value) {
    const newVote: QuestionVote = {
      id: Date.now().toString(),
      questionId: question.value.id,
      userId: authStore.user!.id,
      voteType,
      createdAt: new Date()
    };
    
    question.value.votes.push(newVote);
    question.value.totalVotes += voteType === 'up' ? 1 : -1;
  }
};

const voteAnswer = (answerId: string, voteType: 'up' | 'down') => {
  if (!authStore.isAuthenticated || !question.value) return;
  
  const answer = question.value.answers.find(a => a.id === answerId);
  if (!answer || hasVotedAnswer(answerId)) return;
  
  // In real app, this would make API call
  console.log(`Voting ${voteType} on answer ${answerId}`);
  
  // Mock implementation
  const newVote: AnswerVote = {
    id: Date.now().toString(),
    answerId,
    userId: authStore.user!.id,
    voteType,
    createdAt: new Date()
  };
  
  answer.votes.push(newVote);
  answer.totalVotes += voteType === 'up' ? 1 : -1;
};

const submitAnswer = () => {
  if (!authStore.user || !question.value || !newAnswer.value.trim()) return;
  
  // In real app, this would make API call
  const answer: Answer = {
    id: Date.now().toString(),
    questionId: question.value.id,
    authorId: authStore.user.id,
    author: authStore.user,
    content: newAnswer.value,
    isAccepted: false,
    votes: [],
    totalVotes: 0,
    createdAt: new Date(),
    updatedAt: new Date()
  };
  
  question.value.answers.push(answer);
  newAnswer.value = '';
};

const formatTimeAgo = (date?: Date) => {
  if (!date) return '';
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return `${days}d ago`;
};

const formatDate = (date?: Date) => {
  if (!date) return '';
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  }).format(new Date(date));
};

onMounted(() => {
  // In real app, fetch question by ID from route params
  question.value = mockQuestion;
  
  // Increment view count
  if (question.value) {
    question.value.views++;
  }
});
</script>