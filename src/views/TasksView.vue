<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- Header Section -->
    <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
      <div>
        <h1 class="text-2xl md:text-3xl font-bold text-gray-900">Available Tasks</h1>
        <p class="text-gray-600 mt-1">Browse and quote on projects posted by clients</p>
      </div>
      <div class="mt-4 md:mt-0 flex items-center space-x-4">
        <router-link 
          v-if="authStore.isEndUser"
          to="/tasks/new" 
          class="btn-primary flex items-center space-x-2"
        >
          <PlusIcon class="w-4 h-4" />
          <span>Post Task</span>
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
            placeholder="Search tasks..."
            class="input-field"
          />
        </div>
        <select v-model="selectedCategory" class="input-field md:w-auto">
          <option value="">All Categories</option>
          <option value="web-development">Web Development</option>
          <option value="mobile-development">Mobile Development</option>
          <option value="design">Design</option>
          <option value="data-science">Data Science</option>
          <option value="devops">DevOps</option>
        </select>
        <select v-model="selectedBudget" class="input-field md:w-auto">
          <option value="">All Budgets</option>
          <option value="0-100">$0 - $100</option>
          <option value="100-500">$100 - $500</option>
          <option value="500-1000">$500 - $1000</option>
          <option value="1000+">$1000+</option>
        </select>
        <select v-model="sortBy" class="input-field md:w-auto">
          <option value="newest">Newest First</option>
          <option value="budget-high">Highest Budget</option>
          <option value="budget-low">Lowest Budget</option>
          <option value="deadline">Deadline</option>
        </select>
      </div>
    </div>

    <!-- Tasks Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div 
        v-for="task in filteredTasks" 
        :key="task.id"
        class="card p-6 hover:shadow-lg transition-shadow cursor-pointer"
        @click="$router.push(`/tasks/${task.id}`)"
      >
        <div class="flex items-start justify-between mb-4">
          <div class="flex-1">
            <div class="flex items-center space-x-3 mb-2">
              <h3 class="text-lg font-semibold text-gray-900 hover:text-primary-600 transition-colors">
                {{ task.title }}
              </h3>
              <div 
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
            </div>
            
            <p class="text-gray-600 mb-4 line-clamp-3">{{ task.description }}</p>
            
            <div class="flex items-center justify-between mb-4">
              <div class="flex items-center space-x-4 text-sm text-gray-500">
                <div class="flex items-center space-x-2">
                  <img 
                    :src="task.author.profileImage || 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&dpr=2'" 
                    :alt="task.author.name"
                    class="w-6 h-6 rounded-full"
                  >
                  <span>{{ task.author.name }}</span>
                </div>
                <span>{{ formatTimeAgo(task.createdAt) }}</span>
                <div class="flex items-center space-x-1">
                  <CalendarIcon class="w-4 h-4" />
                  <span>Due {{ formatDate(task.deadline) }}</span>
                </div>
              </div>
            </div>

            <!-- Requirements Preview -->
            <div class="mb-4">
              <h4 class="text-sm font-medium text-gray-900 mb-2">Key Requirements:</h4>
              <div class="flex flex-wrap gap-1">
                <span 
                  v-for="req in task.requirements.slice(0, 3)" 
                  :key="req"
                  class="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full"
                >
                  {{ req }}
                </span>
                <span v-if="task.requirements.length > 3" class="text-xs text-gray-500">
                  +{{ task.requirements.length - 3 }} more
                </span>
              </div>
            </div>

            <!-- Budget and Quotes -->
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-1">
                <CurrencyDollarIcon class="w-5 h-5 text-success-600" />
                <span class="text-lg font-bold text-success-700">${{ task.tokenValue * 0.1 }}</span>
                <span class="text-sm text-gray-500">({{ task.tokenValue }} tokens)</span>
              </div>
              <div class="flex items-center space-x-4 text-sm text-gray-500">
                <div class="flex items-center space-x-1">
                  <UsersIcon class="w-4 h-4" />
                  <span>{{ getQuoteCount(task.id) }} quotes</span>
                </div>
                <div 
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
            </div>
          </div>
        </div>

        <!-- Quick Quote Button -->
        <div class="flex items-center justify-between pt-4 border-t border-gray-100">
          <button 
            v-if="authStore.isArchitect && task.status === 'pending'"
            @click.stop="openQuoteModal(task)"
            class="btn-primary text-sm"
          >
            Submit Quote
          </button>
          <button 
            v-else-if="!authStore.isAuthenticated"
            @click.stop="$router.push('/login')"
            class="btn-outline text-sm"
          >
            Login to Quote
          </button>
          <router-link 
            :to="`/tasks/${task.id}`"
            class="btn-outline text-sm"
            @click.stop
          >
            View Details
          </router-link>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="filteredTasks.length === 0" class="text-center py-12">
      <ClipboardDocumentListIcon class="w-16 h-16 text-gray-300 mx-auto mb-4" />
      <h3 class="text-lg font-medium text-gray-900 mb-2">No tasks found</h3>
      <p class="text-gray-600 mb-6">No tasks match your current filters.</p>
      <router-link 
        v-if="authStore.isEndUser"
        to="/tasks/new" 
        class="btn-primary"
      >
        Post the First Task
      </router-link>
    </div>

    <!-- Quote Modal -->
    <div v-if="showQuoteModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-xl font-semibold text-gray-900">Submit Quote</h3>
          <button @click="closeQuoteModal" class="text-gray-400 hover:text-gray-600">
            <XMarkIcon class="w-6 h-6" />
          </button>
        </div>

        <div v-if="selectedTask" class="mb-6 p-4 bg-gray-50 rounded-lg">
          <h4 class="font-medium text-gray-900 mb-2">{{ selectedTask.title }}</h4>
          <p class="text-sm text-gray-600">Budget: ${{ selectedTask.tokenValue * 0.1 }} ({{ selectedTask.tokenValue }} tokens)</p>
        </div>

        <form @submit.prevent="submitQuote" class="space-y-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Your Quote Amount</label>
            <div class="flex items-center space-x-2">
              <input
                v-model.number="quoteForm.amount"
                type="number"
                min="1"
                :max="selectedTask?.tokenValue"
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
            <button type="button" @click="closeQuoteModal" class="btn-outline">
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
import { ref, computed } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useAppStore } from '@/stores/app';
import type { Task } from '@/types';
import {
  PlusIcon,
  CalendarIcon,
  CurrencyDollarIcon,
  UsersIcon,
  ClipboardDocumentListIcon,
  XMarkIcon
} from '@heroicons/vue/24/outline';

const authStore = useAuthStore();
const appStore = useAppStore();

const searchQuery = ref('');
const selectedCategory = ref('');
const selectedBudget = ref('');
const sortBy = ref('newest');
const showQuoteModal = ref(false);
const selectedTask = ref<Task | null>(null);

const quoteForm = ref({
  amount: 0,
  proposal: '',
  timeline: '',
  portfolio: ''
});

// Mock quotes data
const mockQuotes = ref<Record<string, number>>({
  '1': 5,
  '2': 3,
  '3': 8,
  '4': 2,
  '5': 6,
  '6': 4
});

const filteredTasks = computed(() => {
  let tasks = [...appStore.tasks];
  
  // Filter by search query
  if (searchQuery.value) {
    tasks = tasks.filter(t => 
      t.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      t.description.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  }
  
  // Filter by budget
  if (selectedBudget.value) {
    const [min, max] = selectedBudget.value.split('-').map(v => v === '+' ? Infinity : parseInt(v));
    tasks = tasks.filter(t => {
      const budget = t.tokenValue * 0.1;
      return budget >= min && (max === undefined || budget <= max);
    });
  }
  
  // Sort tasks
  switch (sortBy.value) {
    case 'budget-high':
      tasks.sort((a, b) => b.tokenValue - a.tokenValue);
      break;
    case 'budget-low':
      tasks.sort((a, b) => a.tokenValue - b.tokenValue);
      break;
    case 'deadline':
      tasks.sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime());
      break;
    default: // newest
      tasks.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }
  
  return tasks;
});

const getQuoteCount = (taskId: string) => {
  return mockQuotes.value[taskId] || 0;
};

const openQuoteModal = (task: Task) => {
  selectedTask.value = task;
  quoteForm.value = {
    amount: Math.floor(task.tokenValue * 0.8), // Default to 80% of budget
    proposal: '',
    timeline: '',
    portfolio: ''
  };
  showQuoteModal.value = true;
};

const closeQuoteModal = () => {
  showQuoteModal.value = false;
  selectedTask.value = null;
  quoteForm.value = {
    amount: 0,
    proposal: '',
    timeline: '',
    portfolio: ''
  };
};

const submitQuote = () => {
  if (!selectedTask.value || !authStore.user) return;
  
  // In real app, this would submit to API
  console.log('Submitting quote:', {
    taskId: selectedTask.value.id,
    userId: authStore.user.id,
    ...quoteForm.value
  });
  
  // Increment quote count
  const taskId = selectedTask.value.id;
  mockQuotes.value[taskId] = (mockQuotes.value[taskId] || 0) + 1;
  
  closeQuoteModal();
  
  // Show success message (in real app, use toast notification)
  alert('Quote submitted successfully!');
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

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('en-US', { 
    month: 'short', 
    day: 'numeric'
  }).format(new Date(date));
};
</script>