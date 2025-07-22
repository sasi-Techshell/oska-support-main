<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="mb-8">
      <h1 class="text-2xl md:text-3xl font-bold text-gray-900">Post a Task</h1>
      <p class="text-gray-600 mt-1">Hire an architect to complete your project</p>
    </div>

    <form @submit.prevent="handleSubmit" class="space-y-8">
      <!-- Task Title -->
      <div class="card p-6">
        <h2 class="text-lg font-semibold text-gray-900 mb-4">Task Title</h2>
        <input
          v-model="form.title"
          type="text"
          placeholder="What do you need built? Be specific and clear."
          class="input-field"
          required
        />
      </div>

      <!-- Task Description -->
      <div class="card p-6">
        <h2 class="text-lg font-semibold text-gray-900 mb-4">Project Description</h2>
        <textarea
          v-model="form.description"
          rows="6"
          placeholder="Describe your project in detail. What problem does it solve? What features do you need?"
          class="input-field"
          required
        ></textarea>
      </div>

      <!-- Requirements -->
      <div class="card p-6">
        <h2 class="text-lg font-semibold text-gray-900 mb-4">Technical Requirements</h2>
        <div class="space-y-3">
          <div v-for="(requirement, index) in form.requirements" :key="index" class="flex items-center space-x-2">
            <input
              v-model="form.requirements[index]"
              type="text"
              placeholder="Enter a technical requirement"
              class="input-field flex-1"
            />
            <button 
              type="button" 
              @click="removeRequirement(index)"
              class="text-red-600 hover:text-red-800"
            >
              <XMarkIcon class="w-5 h-5" />
            </button>
          </div>
          <button 
            type="button" 
            @click="addRequirement"
            class="text-primary-600 hover:text-primary-800 text-sm flex items-center space-x-1"
          >
            <PlusIcon class="w-4 h-4" />
            <span>Add Requirement</span>
          </button>
        </div>
      </div>

      <!-- Deliverables -->
      <div class="card p-6">
        <h2 class="text-lg font-semibold text-gray-900 mb-4">Expected Deliverables</h2>
        <div class="space-y-3">
          <div v-for="(deliverable, index) in form.deliverables" :key="index" class="flex items-center space-x-2">
            <input
              v-model="form.deliverables[index]"
              type="text"
              placeholder="What should be delivered?"
              class="input-field flex-1"
            />
            <button 
              type="button" 
              @click="removeDeliverable(index)"
              class="text-red-600 hover:text-red-800"
            >
              <XMarkIcon class="w-5 h-5" />
            </button>
          </div>
          <button 
            type="button" 
            @click="addDeliverable"
            class="text-primary-600 hover:text-primary-800 text-sm flex items-center space-x-1"
          >
            <PlusIcon class="w-4 h-4" />
            <span>Add Deliverable</span>
          </button>
        </div>
      </div>

      <!-- Timeline and Priority -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="card p-6">
          <h2 class="text-lg font-semibold text-gray-900 mb-4">Deadline</h2>
          <input
            v-model="form.deadline"
            type="date"
            :min="minDate"
            class="input-field"
            required
          />
        </div>

        <div class="card p-6">
          <h2 class="text-lg font-semibold text-gray-900 mb-4">Priority</h2>
          <select v-model="form.priority" class="input-field" required>
            <option value="low">Low - No rush</option>
            <option value="medium">Medium - Standard timeline</option>
            <option value="high">High - Important project</option>
            <option value="urgent">Urgent - ASAP</option>
          </select>
        </div>
      </div>

      <!-- Token Budget -->
      <div class="card p-6">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-lg font-semibold text-gray-900">Token Budget</h2>
          <div class="flex items-center space-x-2 text-sm text-gray-600">
            <CurrencyDollarIcon class="w-4 h-4" />
            <span>Available: {{ authStore.user?.tokens || 0 }} tokens</span>
          </div>
        </div>
        
        <div class="flex items-center space-x-4">
          <input
            v-model.number="form.tokenValue"
            type="number"
            min="1"
            :max="authStore.user?.tokens || 0"
            placeholder="100"
            class="input-field w-32"
            required
          />
          <span class="text-gray-600">tokens</span>
        </div>
        
        <p class="text-sm text-gray-500 mt-2">
          Higher token budgets attract more experienced architects
        </p>
      </div>

      <!-- Submit -->
      <div class="flex items-center justify-between">
        <router-link to="/tasks" class="btn-outline">
          Cancel
        </router-link>
        <button type="submit" class="btn-primary" :disabled="!isFormValid">
          Post Task
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { useAppStore } from '@/stores/app';
import { CurrencyDollarIcon, XMarkIcon, PlusIcon } from '@heroicons/vue/24/outline';
import type { TaskPriority } from '@/types';

const router = useRouter();
const authStore = useAuthStore();
const appStore = useAppStore();

const form = ref({
  title: '',
  description: '',
  requirements: [''],
  deliverables: [''],
  deadline: '',
  priority: 'medium' as TaskPriority,
  tokenValue: 0
});

const minDate = computed(() => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow.toISOString().split('T')[0];
});

const isFormValid = computed(() => {
  return form.value.title.trim() && 
         form.value.description.trim() && 
         form.value.requirements.some(r => r.trim()) &&
         form.value.deliverables.some(d => d.trim()) &&
         form.value.deadline &&
         form.value.tokenValue > 0 &&
         form.value.tokenValue <= (authStore.user?.tokens || 0);
});

const addRequirement = () => {
  form.value.requirements.push('');
};

const removeRequirement = (index: number) => {
  if (form.value.requirements.length > 1) {
    form.value.requirements.splice(index, 1);
  }
};

const addDeliverable = () => {
  form.value.deliverables.push('');
};

const removeDeliverable = (index: number) => {
  if (form.value.deliverables.length > 1) {
    form.value.deliverables.splice(index, 1);
  }
};

const handleSubmit = () => {
  if (!isFormValid.value || !authStore.user) return;

  const newTask = appStore.addTask({
    title: form.value.title,
    description: form.value.description,
    requirements: form.value.requirements.filter(r => r.trim()),
    authorId: authStore.user.id,
    author: authStore.user,
    tokenValue: form.value.tokenValue,
    status: 'pending',
    priority: form.value.priority,
    deadline: new Date(form.value.deadline),
    deliverables: form.value.deliverables.filter(d => d.trim())
  });

  // Deduct tokens
  authStore.updateProfile({
    tokens: (authStore.user.tokens || 0) - form.value.tokenValue
  });

  router.push('/tasks');
};
</script>