<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="mb-8">
      <h1 class="text-2xl md:text-3xl font-bold text-gray-900">Task Management</h1>
      <p class="text-gray-600 mt-1">Review, assign, and manage platform tasks</p>
    </div>

    <!-- Filters -->
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
        <select v-model="selectedStatus" class="input-field md:w-auto">
          <option value="">All Status</option>
          <option value="pending">Pending Review</option>
          <option value="assigned">Assigned</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
          <option value="approved">Approved</option>
        </select>
        <select v-model="selectedPriority" class="input-field md:w-auto">
          <option value="">All Priority</option>
          <option value="urgent">Urgent</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </div>
    </div>

    <!-- Tasks List -->
    <div class="space-y-6">
      <div 
        v-for="task in filteredTasks" 
        :key="task.id"
        class="card p-6"
      >
        <div class="flex items-start justify-between mb-4">
          <div class="flex-1">
            <div class="flex items-center space-x-3 mb-2">
              <h3 class="text-lg font-semibold text-gray-900">{{ task.title }}</h3>
              <div 
                class="badge"
                :class="{
                  'badge-warning': task.status === 'pending',
                  'badge-primary': task.status === 'assigned',
                  'badge-secondary': task.status === 'in-progress',
                  'badge-success': task.status === 'completed' || task.status === 'approved'
                }"
              >
                {{ task.status.replace('-', ' ') }}
              </div>
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
            
            <p class="text-gray-600 mb-4">{{ task.description }}</p>
            
            <div class="flex items-center space-x-6 text-sm text-gray-500">
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
              <div class="flex items-center space-x-1">
                <CurrencyDollarIcon class="w-4 h-4 text-success-600" />
                <span class="font-medium text-success-700">{{ task.tokenValue }}</span>
              </div>
            </div>
          </div>
          
          <div class="flex items-center space-x-2 ml-4">
            <button 
              v-if="task.status === 'pending'"
              class="btn-primary text-sm"
              @click="assignTask(task.id)"
            >
              Assign
            </button>
            <button 
              v-if="task.status === 'completed'"
              class="btn-secondary text-sm"
              @click="approveTask(task.id)"
            >
              Approve
            </button>
            <button class="btn-outline text-sm">
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="filteredTasks.length === 0" class="text-center py-12">
      <ClipboardDocumentListIcon class="w-16 h-16 text-gray-300 mx-auto mb-4" />
      <h3 class="text-lg font-medium text-gray-900 mb-2">No tasks found</h3>
      <p class="text-gray-600">No tasks match your current filters.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useAppStore } from '@/stores/app';
import {
  CalendarIcon,
  CurrencyDollarIcon,
  ClipboardDocumentListIcon
} from '@heroicons/vue/24/outline';

const appStore = useAppStore();

const searchQuery = ref('');
const selectedStatus = ref('');
const selectedPriority = ref('');

const filteredTasks = computed(() => {
  let tasks = [...appStore.tasks];
  
  if (searchQuery.value) {
    tasks = tasks.filter(t => 
      t.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      t.description.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  }
  
  if (selectedStatus.value) {
    tasks = tasks.filter(t => t.status === selectedStatus.value);
  }
  
  if (selectedPriority.value) {
    tasks = tasks.filter(t => t.priority === selectedPriority.value);
  }
  
  return tasks;
});

const assignTask = (taskId: string) => {
  // In a real app, this would open a modal to select an architect
  console.log('Assigning task:', taskId);
};

const approveTask = (taskId: string) => {
  // In a real app, this would approve the task and transfer tokens
  console.log('Approving task:', taskId);
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
    day: 'numeric',
    year: 'numeric'
  }).format(new Date(date));
};
</script>