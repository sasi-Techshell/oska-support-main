<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="mb-8">
      <h1 class="text-2xl md:text-3xl font-bold text-gray-900">My Tasks</h1>
      <p class="text-gray-600 mt-1">
        {{ authStore.isArchitect ? 'Tasks you\'ve quoted on and been assigned' : 'Tasks you\'ve posted and their progress' }}
      </p>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div class="card p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600">{{ authStore.isArchitect ? 'Quotes Submitted' : 'Tasks Posted' }}</p>
            <p class="text-2xl font-bold text-gray-900">{{ stats.total }}</p>
          </div>
          <div class="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
            <ClipboardDocumentListIcon class="w-6 h-6 text-primary-600" />
          </div>
        </div>
      </div>

      <div class="card p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600">{{ authStore.isArchitect ? 'Accepted' : 'In Progress' }}</p>
            <p class="text-2xl font-bold text-secondary-600">{{ stats.active }}</p>
          </div>
          <div class="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center">
            <PlayIcon class="w-6 h-6 text-secondary-600" />
          </div>
        </div>
      </div>

      <div class="card p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600">Completed</p>
            <p class="text-2xl font-bold text-success-600">{{ stats.completed }}</p>
          </div>
          <div class="w-12 h-12 bg-success-100 rounded-lg flex items-center justify-center">
            <CheckCircleIcon class="w-6 h-6 text-success-600" />
          </div>
        </div>
      </div>

      <div class="card p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600">{{ authStore.isArchitect ? 'Earnings' : 'Total Spent' }}</p>
            <p class="text-2xl font-bold text-accent-600">${{ stats.earnings }}</p>
          </div>
          <div class="w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center">
            <CurrencyDollarIcon class="w-6 h-6 text-accent-600" />
          </div>
        </div>
      </div>
    </div>

    <!-- Filters -->
    <div class="card p-6 mb-8">
      <div class="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
        <select v-model="selectedStatus" class="input-field md:w-auto">
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="assigned">Assigned</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
          <option value="approved">Approved</option>
        </select>
        <select v-model="sortBy" class="input-field md:w-auto">
          <option value="newest">Newest First</option>
          <option value="deadline">By Deadline</option>
          <option value="budget">By Budget</option>
          <option value="status">By Status</option>
        </select>
      </div>
    </div>

    <!-- Tasks List -->
    <div class="space-y-6">
      <div 
        v-for="taskItem in filteredTasks" 
        :key="taskItem.id"
        class="card p-6"
      >
        <div class="flex items-start justify-between mb-4">
          <div class="flex-1">
            <div class="flex items-center space-x-3 mb-2">
              <router-link 
                :to="`/tasks/${taskItem.task.id}`"
                class="text-lg font-semibold text-gray-900 hover:text-primary-600 transition-colors"
              >
                {{ taskItem.task.title }}
              </router-link>
              <div 
                class="badge"
                :class="{
                  'badge-warning': taskItem.status === 'pending',
                  'badge-primary': taskItem.status === 'assigned',
                  'badge-secondary': taskItem.status === 'in-progress',
                  'badge-success': taskItem.status === 'completed' || taskItem.status === 'approved'
                }"
              >
                {{ taskItem.status.replace('-', ' ') }}
              </div>
              <div 
                v-if="taskItem.task.priority !== 'medium'"
                class="badge"
                :class="{
                  'badge-error': taskItem.task.priority === 'urgent',
                  'badge-warning': taskItem.task.priority === 'high',
                  'badge-secondary': taskItem.task.priority === 'low'
                }"
              >
                {{ taskItem.task.priority }}
              </div>
            </div>
            
            <p class="text-gray-600 mb-4 line-clamp-2">{{ taskItem.task.description }}</p>
            
            <div class="flex items-center space-x-6 text-sm text-gray-500 mb-4">
              <div class="flex items-center space-x-2">
                <img 
                  :src="taskItem.task.author.profileImage || 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&dpr=2'" 
                  :alt="taskItem.task.author.name"
                  class="w-6 h-6 rounded-full"
                >
                <span>{{ authStore.isArchitect ? 'Client: ' : '' }}{{ taskItem.task.author.name }}</span>
              </div>
              <span>{{ formatTimeAgo(taskItem.task.createdAt) }}</span>
              <div class="flex items-center space-x-1">
                <CalendarIcon class="w-4 h-4" />
                <span>Due {{ formatDate(taskItem.task.deadline) }}</span>
              </div>
            </div>

            <!-- Quote/Assignment Details -->
            <div v-if="authStore.isArchitect && taskItem.quote" class="bg-gray-50 p-4 rounded-lg mb-4">
              <div class="flex items-center justify-between mb-2">
                <span class="text-sm font-medium text-gray-900">Your Quote</span>
                <span class="text-lg font-bold text-success-600">${{ taskItem.quote.amount * 0.1 }}</span>
              </div>
              <p class="text-sm text-gray-600 mb-2">{{ taskItem.quote.proposal }}</p>
              <div class="flex items-center justify-between text-xs text-gray-500">
                <span>Timeline: {{ taskItem.quote.timeline }}</span>
                <span>Submitted {{ formatTimeAgo(taskItem.quote.submittedAt) }}</span>
              </div>
            </div>

            <!-- Progress for assigned tasks -->
            <div v-if="taskItem.status === 'in-progress'" class="mb-4">
              <div class="flex items-center justify-between text-sm mb-2">
                <span class="font-medium text-gray-900">Progress</span>
                <span class="text-gray-600">{{ taskItem.progress || 0 }}%</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2">
                <div 
                  class="bg-primary-600 h-2 rounded-full transition-all duration-300"
                  :style="{ width: `${taskItem.progress || 0}%` }"
                ></div>
              </div>
            </div>
          </div>
          
          <div class="ml-6 flex flex-col items-end space-y-2">
            <div class="text-right">
              <div class="text-xl font-bold text-success-600">
                ${{ taskItem.task.tokenValue * 0.1 }}
              </div>
              <div class="text-sm text-gray-500">{{ taskItem.task.tokenValue }} tokens</div>
            </div>
            
            <div class="flex items-center space-x-2">
              <router-link 
                :to="`/tasks/${taskItem.task.id}`"
                class="btn-outline text-sm"
              >
                View Details
              </router-link>
              
              <button 
                v-if="taskItem.status === 'assigned' && authStore.isArchitect"
                @click="startWork(taskItem)"
                class="btn-primary text-sm"
              >
                Start Work
              </button>
              
              <button 
                v-if="taskItem.status === 'in-progress' && authStore.isArchitect"
                @click="submitWork(taskItem)"
                class="btn-secondary text-sm"
              >
                Submit Work
              </button>
              
              <button 
                v-if="taskItem.status === 'completed' && !authStore.isArchitect"
                @click="approveWork(taskItem)"
                class="btn-success text-sm"
              >
                Approve
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="filteredTasks.length === 0" class="text-center py-12">
      <ClipboardDocumentListIcon class="w-16 h-16 text-gray-300 mx-auto mb-4" />
      <h3 class="text-lg font-medium text-gray-900 mb-2">
        {{ authStore.isArchitect ? 'No quotes submitted yet' : 'No tasks posted yet' }}
      </h3>
      <p class="text-gray-600 mb-6">
        {{ authStore.isArchitect ? 'Start browsing available tasks and submit your first quote!' : 'Post your first task to get started.' }}
      </p>
      <router-link 
        :to="authStore.isArchitect ? '/tasks' : '/tasks/new'"
        class="btn-primary"
      >
        {{ authStore.isArchitect ? 'Browse Tasks' : 'Post Task' }}
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useAppStore } from '@/stores/app';
import type { Task } from '@/types';
import {
  ClipboardDocumentListIcon,
  PlayIcon,
  CheckCircleIcon,
  CurrencyDollarIcon,
  CalendarIcon
} from '@heroicons/vue/24/outline';

const authStore = useAuthStore();
const appStore = useAppStore();

const selectedStatus = ref('');
const sortBy = ref('newest');

// Mock user task data
const mockUserTasks = ref([
  {
    id: '1',
    task: appStore.tasks[0], // Reference to actual task
    status: 'in-progress',
    progress: 65,
    quote: authStore.isArchitect ? {
      amount: 180,
      proposal: 'I can deliver this project with high quality and on time.',
      timeline: '5-7 days',
      submittedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
    } : null
  },
  {
    id: '2',
    task: appStore.tasks[1],
    status: 'completed',
    progress: 100,
    quote: authStore.isArchitect ? {
      amount: 320,
      proposal: 'Expert in payment gateway integrations with 5+ years experience.',
      timeline: '10-14 days',
      submittedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
    } : null
  },
  {
    id: '3',
    task: appStore.tasks[2],
    status: 'pending',
    progress: 0,
    quote: authStore.isArchitect ? {
      amount: 400,
      proposal: 'Specialized in React Native development with proven track record.',
      timeline: '3 weeks',
      submittedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
    } : null
  }
]);

const stats = computed(() => {
  const tasks = mockUserTasks.value;
  return {
    total: tasks.length,
    active: tasks.filter(t => ['assigned', 'in-progress'].includes(t.status)).length,
    completed: tasks.filter(t => ['completed', 'approved'].includes(t.status)).length,
    earnings: tasks
      .filter(t => ['completed', 'approved'].includes(t.status))
      .reduce((sum, t) => sum + (t.quote?.amount || t.task.tokenValue) * 0.1, 0)
      .toFixed(0)
  };
});

const filteredTasks = computed(() => {
  let tasks = [...mockUserTasks.value];
  
  if (selectedStatus.value) {
    tasks = tasks.filter(t => t.status === selectedStatus.value);
  }
  
  switch (sortBy.value) {
    case 'deadline':
      tasks.sort((a, b) => new Date(a.task.deadline).getTime() - new Date(b.task.deadline).getTime());
      break;
    case 'budget':
      tasks.sort((a, b) => b.task.tokenValue - a.task.tokenValue);
      break;
    case 'status':
      tasks.sort((a, b) => a.status.localeCompare(b.status));
      break;
    default: // newest
      tasks.sort((a, b) => new Date(b.task.createdAt).getTime() - new Date(a.task.createdAt).getTime());
  }
  
  return tasks;
});

const startWork = (taskItem: any) => {
  taskItem.status = 'in-progress';
  taskItem.progress = 10;
  console.log('Starting work on task:', taskItem.task.title);
};

const submitWork = (taskItem: any) => {
  taskItem.status = 'completed';
  taskItem.progress = 100;
  console.log('Submitting work for task:', taskItem.task.title);
};

const approveWork = (taskItem: any) => {
  taskItem.status = 'approved';
  console.log('Approving work for task:', taskItem.task.title);
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