<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="mb-8">
      <router-link to="/tasks" class="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center space-x-1 mb-4">
        <ArrowLeftIcon class="w-4 h-4" />
        <span>Back to Tasks</span>
      </router-link>
      <h1 class="text-2xl md:text-3xl font-bold text-gray-900">Apply for Task</h1>
      <p class="text-gray-600 mt-1">Submit your application to work on this project</p>
    </div>

    <!-- Task Details -->
    <div class="card p-6 mb-8">
      <h2 class="text-lg font-semibold text-gray-900 mb-4">Task Details</h2>
      <div class="bg-gray-50 p-4 rounded-lg">
        <h3 class="font-medium text-gray-900 mb-2">Build a Todo App with React and Node.js</h3>
        <p class="text-gray-600 text-sm mb-3">Create a full-stack todo application with user authentication, CRUD operations, and real-time updates.</p>
        <div class="flex items-center space-x-4 text-sm text-gray-500">
          <div class="flex items-center space-x-1">
            <CurrencyDollarIcon class="w-4 h-4 text-success-600" />
            <span class="font-medium text-success-700">200 tokens</span>
          </div>
          <div class="flex items-center space-x-1">
            <CalendarIcon class="w-4 h-4" />
            <span>Due in 7 days</span>
          </div>
          <div class="flex items-center space-x-1">
            <ClockIcon class="w-4 h-4" />
            <span>High Priority</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Application Form -->
    <form @submit.prevent="handleSubmit" class="space-y-8">
      <!-- Cover Letter -->
      <div class="card p-6">
        <h2 class="text-lg font-semibold text-gray-900 mb-4">Cover Letter</h2>
        <textarea
          v-model="form.coverLetter"
          rows="6"
          placeholder="Explain why you're the right person for this task. Include your relevant experience and approach to completing this project."
          class="input-field"
          required
        ></textarea>
        <p class="text-sm text-gray-500 mt-2">
          Describe your experience with the required technologies and your approach to this project
        </p>
      </div>

      <!-- Timeline -->
      <div class="card p-6">
        <h2 class="text-lg font-semibold text-gray-900 mb-4">Proposed Timeline</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Estimated Start Date</label>
            <input
              v-model="form.startDate"
              type="date"
              :min="minDate"
              class="input-field"
              required
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Estimated Completion Date</label>
            <input
              v-model="form.completionDate"
              type="date"
              :min="form.startDate"
              class="input-field"
              required
            />
          </div>
        </div>
      </div>

      <!-- Portfolio/Examples -->
      <div class="card p-6">
        <h2 class="text-lg font-semibold text-gray-900 mb-4">Portfolio & Examples</h2>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Portfolio URL</label>
            <input
              v-model="form.portfolioUrl"
              type="url"
              placeholder="https://your-portfolio.com"
              class="input-field"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Relevant Project Examples</label>
            <textarea
              v-model="form.examples"
              rows="4"
              placeholder="Share links or descriptions of similar projects you've completed"
              class="input-field"
            ></textarea>
          </div>
        </div>
      </div>

      <!-- Questions for Client -->
      <div class="card p-6">
        <h2 class="text-lg font-semibold text-gray-900 mb-4">Questions for Client (Optional)</h2>
        <textarea
          v-model="form.questions"
          rows="4"
          placeholder="Any questions about the requirements, scope, or expectations?"
          class="input-field"
        ></textarea>
      </div>

      <!-- Submit -->
      <div class="flex items-center justify-between">
        <router-link to="/tasks" class="btn-outline">
          Cancel
        </router-link>
        <button type="submit" class="btn-primary" :disabled="!isFormValid">
          Submit Application
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { 
  ArrowLeftIcon, 
  CurrencyDollarIcon, 
  CalendarIcon, 
  ClockIcon 
} from '@heroicons/vue/24/outline';

const router = useRouter();
const authStore = useAuthStore();

const form = ref({
  coverLetter: '',
  startDate: '',
  completionDate: '',
  portfolioUrl: '',
  examples: '',
  questions: ''
});

const minDate = computed(() => {
  const today = new Date();
  return today.toISOString().split('T')[0];
});

const isFormValid = computed(() => {
  return form.value.coverLetter.trim() && 
         form.value.startDate && 
         form.value.completionDate &&
         new Date(form.value.completionDate) > new Date(form.value.startDate);
});

const handleSubmit = () => {
  if (!isFormValid.value) return;

  // In a real app, this would submit the application to the backend
  console.log('Submitting application:', form.value);
  
  // Redirect back to tasks with success message
  router.push('/tasks');
};
</script>