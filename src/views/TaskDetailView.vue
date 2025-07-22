<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="mb-8">
      <router-link to="/tasks" class="text-primary-600 hover:text-primary-700 text-sm flex items-center space-x-1 mb-4">
        <ArrowLeftIcon class="w-4 h-4" />
        <span>Back to Tasks</span>
      </router-link>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Main Content -->
      <div class="lg:col-span-2">
        <!-- Task Details -->
        <div class="card p-8 mb-8">
          <div class="flex items-start justify-between mb-6">
            <div class="flex-1">
              <div class="flex items-center space-x-3 mb-4">
                <h1 class="text-2xl md:text-3xl font-bold text-gray-900">
                  {{ task?.title || 'Loading...' }}
                </h1>
                <div 
                  v-if="task"
                  class="badge"
                  :class="{
                    'badge-error': task.priority === 'urgent',
                    'badge-warning': task.priority === 'high',
                    'badge-primary': task.priority === 'medium',
                    'badge-secondary': task.priority === 'low'
                  }"
                >
                  {{ task.priority }}
                </div>
                <div 
                  v-if="task"
                  class="badge"
                  :class="{
                    'badge-warning': task.status === 'pending',
                    'badge-primary': task.status === 'assigned',
                    'badge-secondary': task.status === 'in-progress',
                    'badge-success': task.status === 'completed'
                  }"
                >
                  {{ task.status.replace('-', ' ') }}
                </div>
              </div>
              
              <div class="flex items-center space-x-6 text-sm text-gray-500 mb-6">
                <div class="flex items-center space-x-2">
                  <img 
                    :src="task?.author.profileImage || 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&dpr=2'" 
                    :alt="task?.author.name"
                    class="w-8 h-8 rounded-full"
                  >
                  <div>
                    <router-link 
                      :to="`/portfolio/${task?.author.id}`"
                      class="font-medium text-gray-900 hover:text-primary-600"
                    >
                      {{ task?.author.name }}
                    </router-link>
                    <p class="text-xs text-gray-500">{{ task?.author.role.replace('-', ' ') }}</p>
                  </div>
                </div>
                <span>Posted {{ formatTimeAgo(task?.createdAt) }}</span>
                <div class="flex items-center space-x-1">
                  <CalendarIcon class="w-4 h-4" />
                  <span>Due {{ formatDate(task?.deadline) }}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div class="prose max-w-none mb-8">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Project Description</h3>
            <div class="text-gray-700 leading-relaxed whitespace-pre-wrap">{{ task?.description }}</div>
          </div>

          <!-- Requirements -->
          <div class="mb-8">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Requirements</h3>
            <ul class="space-y-2">
              <li 
                v-for="requirement in task?.requirements" 
                :key="requirement"
                class="flex items-start space-x-2"
              >
                <CheckIcon class="w-5 h-5 text-success-600 mt-0.5 flex-shrink-0" />
                <span class="text-gray-700">{{ requirement }}</span>
              </li>
            </ul>
          </div>

          <!-- Deliverables -->
          <div class="mb-8">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Expected Deliverables</h3>
            <ul class="space-y-2">
              <li 
                v-for="deliverable in task?.deliverables" 
                :key="deliverable"
                class="flex items-start space-x-2"
              >
                <DocumentIcon class="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
                <span class="text-gray-700">{{ deliverable }}</span>
              </li>
            </ul>
          </div>
        </div>

        <!-- Quotes Section -->
        <div class="card p-8">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-xl font-semibold text-gray-900">
              Quotes ({{ mockQuotes.length }})
            </h2>
            <button 
              v-if="authStore.isArchitect && task?.status === 'pending'"
              @click="showQuoteModal = true"
              class="btn-primary"
            >
              Submit Quote
            </button>
          </div>

          <!-- Quote List -->
          <div class="space-y-6">
            <div 
              v-for="quote in mockQuotes" 
              :key="quote.id"
              class="border border-gray-200 rounded-lg p-6"
            >
              <div class="flex items-start justify-between mb-4">
                <div class="flex items-center space-x-4">
                  <img 
                    :src="quote.architect.profileImage" 
                    :alt="quote.architect.name"
                    class="w-12 h-12 rounded-full object-cover"
                  >
                  <div>
                    <router-link 
                      :to="`/portfolio/${quote.architect.id}`"
                      class="font-semibold text-gray-900 hover:text-primary-600"
                    >
                      {{ quote.architect.name }}
                    </router-link>
                    <p class="text-sm text-gray-500">{{ quote.architect.role.replace('-', ' ') }}</p>
                    <div class="flex items-center space-x-2 mt-1">
                      <div class="flex items-center">
                        <StarIcon class="w-4 h-4 text-yellow-400 fill-current" />
                        <span class="text-sm text-gray-600 ml-1">{{ quote.architect.rating }}</span>
                      </div>
                      <span class="text-gray-300">•</span>
                      <span class="text-sm text-gray-600">{{ quote.architect.completedTasks }} tasks completed</span>
                    </div>
                  </div>
                </div>
                <div class="text-right">
                  <div class="text-2xl font-bold text-success-600">${{ quote.amount * 0.1 }}</div>
                  <div class="text-sm text-gray-500">{{ quote.amount }} tokens</div>
                  <div class="text-sm text-gray-500 mt-1">{{ quote.timeline }}</div>
                </div>
              </div>
              
              <div class="mb-4">
                <p class="text-gray-700 leading-relaxed">{{ quote.proposal }}</p>
              </div>
              
              <div v-if="quote.portfolio" class="mb-4 p-3 bg-gray-50 rounded-lg">
                <h4 class="text-sm font-medium text-gray-900 mb-2">Portfolio & Examples:</h4>
                <p class="text-sm text-gray-600">{{ quote.portfolio }}</p>
              </div>
              
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-500">Submitted {{ formatTimeAgo(quote.submittedAt) }}</span>
                <div class="flex items-center space-x-2">
                  <button 
                    v-if="authStore.user?.id === task?.authorId && task?.status === 'pending'"
                    class="btn-primary text-sm"
                    @click="acceptQuote(quote)"
                  >
                    Accept Quote
                  </button>
                  <router-link 
                    :to="`/portfolio/${quote.architect.id}`"
                    class="btn-outline text-sm"
                  >
                    View Profile
                  </router-link>
                </div>
              </div>
            </div>
          </div>

          <!-- No Quotes State -->
          <div v-if="mockQuotes.length === 0" class="text-center py-12">
            <UsersIcon class="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 class="text-lg font-medium text-gray-900 mb-2">No quotes yet</h3>
            <p class="text-gray-600 mb-6">Be the first to submit a quote for this project!</p>
            <button 
              v-if="authStore.isArchitect"
              @click="showQuoteModal = true"
              class="btn-primary"
            >
              Submit First Quote
            </button>
          </div>
        </div>
      </div>

      <!-- Sidebar -->
      <div class="lg:col-span-1 space-y-6">
        <!-- Project Budget -->
        <div class="card p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Project Budget</h3>
          <div class="text-center">
            <div class="text-3xl font-bold text-success-600 mb-2">
              ${{ task ? (task.tokenValue * 0.1).toFixed(0) : '0' }}
            </div>
            <div class="text-sm text-gray-500">{{ task?.tokenValue || 0 }} tokens</div>
          </div>
        </div>

        <!-- Project Stats -->
        <div class="card p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Project Stats</h3>
          <div class="space-y-3">
            <div class="flex justify-between text-sm">
              <span class="text-gray-600">Posted</span>
              <span class="font-medium">{{ formatDate(task?.createdAt) }}</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-gray-600">Deadline</span>
              <span class="font-medium">{{ formatDate(task?.deadline) }}</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-gray-600">Quotes</span>
              <span class="font-medium">{{ mockQuotes.length }}</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-gray-600">Priority</span>
              <span class="font-medium capitalize">{{ task?.priority }}</span>
            </div>
          </div>
        </div>

        <!-- Client Info -->
        <div v-if="task" class="card p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">About the Client</h3>
          <div class="flex items-center space-x-3 mb-4">
            <img 
              :src="task.author.profileImage || 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&dpr=2'" 
              :alt="task.author.name"
              class="w-12 h-12 rounded-full object-cover"
            >
            <div>
              <router-link 
                :to="`/portfolio/${task.author.id}`"
                class="font-semibold text-gray-900 hover:text-primary-600"
              >
                {{ task.author.name }}
              </router-link>
              <p class="text-sm text-gray-500 capitalize">{{ task.author.role.replace('-', ' ') }}</p>
            </div>
          </div>
          <div class="space-y-2 text-sm">
            <div class="flex justify-between">
              <span class="text-gray-600">Member since</span>
              <span class="font-medium">{{ formatDate(task.author.joinedAt) }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Total tokens</span>
              <span class="font-medium">{{ task.author.tokens }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Verified</span>
              <span class="font-medium">{{ task.author.isVerified ? 'Yes' : 'No' }}</span>
            </div>
          </div>
        </div>

        <!-- Similar Tasks -->
        <div class="card p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Similar Tasks</h3>
          <div class="space-y-4">
            <div v-for="similarTask in similarTasks" :key="similarTask.id" class="border-b border-gray-100 pb-3 last:border-b-0">
              <router-link 
                :to="`/tasks/${similarTask.id}`"
                class="text-sm font-medium text-gray-900 hover:text-primary-600 line-clamp-2 mb-1"
              >
                {{ similarTask.title }}
              </router-link>
              <div class="flex items-center justify-between text-xs text-gray-500">
                <span>${{ similarTask.budget }}</span>
                <span>{{ similarTask.quotes }} quotes</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Quote Modal -->
    <div v-if="showQuoteModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-xl font-semibold text-gray-900">Submit Quote</h3>
          <button @click="showQuoteModal = false" class="text-gray-400 hover:text-gray-600">
            <XMarkIcon class="w-6 h-6" />
          </button>
        </div>

        <div v-if="task" class="mb-6 p-4 bg-gray-50 rounded-lg">
          <h4 class="font-medium text-gray-900 mb-2">{{ task.title }}</h4>
          <p class="text-sm text-gray-600">Budget: ${{ task.tokenValue * 0.1 }} ({{ task.tokenValue }} tokens)</p>
        </div>

        <form @submit.prevent="submitQuote" class="space-y-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Your Quote Amount</label>
            <div class="flex items-center space-x-2">
              <input
                v-model.number="quoteForm.amount"
                type="number"
                min="1"
                :max="task?.tokenValue"
                class="input-field flex-1"
                placeholder="Enter your quote in tokens"
                required
              />
              <span class="text-sm text-gray-500">tokens (${{ (quoteForm.amount * 0.1).toFixed(2) }})</span>
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Proposal</label>
            <textarea
              v-model="quoteForm.proposal"
              rows="6"
              class="input-field"
              placeholder="Explain your approach, timeline, and why you're the best fit for this project..."
              required
            ></textarea>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Estimated Timeline</label>
            <input
              v-model="quoteForm.timeline"
              type="text"
              class="input-field"
              placeholder="e.g., 2 weeks, 10 days"
              required
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Portfolio/Examples (Optional)</label>
            <textarea
              v-model="quoteForm.portfolio"
              rows="3"
              class="input-field"
              placeholder="Share links to relevant work or describe similar projects you've completed..."
            ></textarea>
          </div>

          <div class="flex items-center justify-end space-x-3">
            <button type="button" @click="showQuoteModal = false" class="btn-outline">
              Cancel
            </button>
            <button type="submit" class="btn-primary">
              Submit Quote
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { useAppStore } from '@/stores/app';
import type { Task } from '@/types';
import {
  ArrowLeftIcon,
  CalendarIcon,
  CheckIcon,
  DocumentIcon,
  UsersIcon,
  StarIcon,
  XMarkIcon
} from '@heroicons/vue/24/outline';

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();
const appStore = useAppStore();

const task = ref<Task | null>(null);
const showQuoteModal = ref(false);

const quoteForm = ref({
  amount: 0,
  proposal: '',
  timeline: '',
  portfolio: ''
});

// Mock quotes data
const mockQuotes = ref([
  {
    id: '1',
    taskId: '1',
    architect: {
      id: '2',
      name: 'Sarah Wilson',
      profileImage: 'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&dpr=2',
      role: 'architect',
      rating: 4.9,
      completedTasks: 24
    },
    amount: 180,
    proposal: 'I have extensive experience building React applications with Node.js backends. I can deliver a fully functional todo app with all the requested features including real-time updates and JWT authentication. My approach will focus on clean, maintainable code and excellent user experience.',
    timeline: '5-7 days',
    portfolio: 'Recently completed similar projects: TaskMaster Pro (React/Node.js), CollabTodo (real-time features), SecureNotes (JWT auth). Portfolio: https://sarahwilson.dev',
    submittedAt: new Date(Date.now() - 2 * 60 * 60 * 1000)
  },
  {
    id: '2',
    taskId: '1',
    architect: {
      id: '3',
      name: 'Mike Chen',
      profileImage: 'https://images.pexels.com/photos/3778876/pexels-photo-3778876.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&dpr=2',
      role: 'architect',
      rating: 4.7,
      completedTasks: 18
    },
    amount: 200,
    proposal: 'I specialize in full-stack JavaScript development with a focus on modern React patterns and scalable Node.js architectures. I can implement all requirements with additional features like offline support and progressive web app capabilities.',
    timeline: '7-10 days',
    portfolio: 'Check out my recent work at https://mikechen.dev - specializing in React, Node.js, and real-time applications.',
    submittedAt: new Date(Date.now() - 4 * 60 * 60 * 1000)
  }
]);

// Mock similar tasks
const similarTasks = ref([
  { id: '2', title: 'E-commerce API Integration', budget: 350, quotes: 8 },
  { id: '3', title: 'React Native Fitness App', budget: 450, quotes: 12 },
  { id: '4', title: 'DevOps Pipeline Setup', budget: 500, quotes: 6 }
]);

const submitQuote = () => {
  if (!task.value || !authStore.user) return;
  
  // Create new quote
  const newQuote = {
    id: Date.now().toString(),
    taskId: task.value.id,
    architect: {
      id: authStore.user.id,
      name: authStore.user.name,
      profileImage: authStore.user.profileImage || 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&dpr=2',
      role: authStore.user.role,
      rating: 4.8,
      completedTasks: 15
    },
    amount: quoteForm.value.amount,
    proposal: quoteForm.value.proposal,
    timeline: quoteForm.value.timeline,
    portfolio: quoteForm.value.portfolio,
    submittedAt: new Date()
  };
  
  mockQuotes.value.unshift(newQuote);
  showQuoteModal.value = false;
  
  // Reset form
  quoteForm.value = {
    amount: 0,
    proposal: '',
    timeline: '',
    portfolio: ''
  };
  
  alert('Quote submitted successfully!');
};

const acceptQuote = (quote: any) => {
  if (!task.value) return;
  
  // In real app, this would update task status and assign architect
  console.log('Accepting quote:', quote);
  alert(`Quote from ${quote.architect.name} accepted!`);
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
  // Find task by ID from route params
  const taskId = route.params.id as string;
  task.value = appStore.tasks.find(t => t.id === taskId) || null;
  
  if (task.value && authStore.isArchitect) {
    quoteForm.value.amount = Math.floor(task.value.tokenValue * 0.8);
  }
});
</script>