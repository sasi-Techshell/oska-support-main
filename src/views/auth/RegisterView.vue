<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div class="text-center">
        <div class="flex justify-center">
          <div class="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center mb-4">
            <span class="text-white font-bold text-xl">OS</span>
          </div>
        </div>
        <h2 class="text-3xl font-bold text-gray-900 mb-2">Create your account</h2>
        <p class="text-gray-600">Join the OSKA Support community today</p>
      </div>

      <form @submit.prevent="handleSubmit" class="mt-8 space-y-6">
        <div class="space-y-4">
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700 mb-1">
              Full name
            </label>
            <input
              id="name"
              v-model="form.name"
              type="text"
              required
              class="input-field"
              placeholder="Enter your full name"
              :disabled="authStore.isLoading"
            />
          </div>

          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-1">
              Email address
            </label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              required
              class="input-field"
              placeholder="Enter your email"
              :disabled="authStore.isLoading"
            />
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              id="password"
              v-model="form.password"
              type="password"
              required
              class="input-field"
              placeholder="Create a password"
              :disabled="authStore.isLoading"
            />
          </div>

          <div>
            <label for="confirmPassword" class="block text-sm font-medium text-gray-700 mb-1">
              Confirm password
            </label>
            <input
              id="confirmPassword"
              v-model="form.confirmPassword"
              type="password"
              required
              class="input-field"
              placeholder="Confirm your password"
              :disabled="authStore.isLoading"
            />
          </div>

          <div>
            <label for="role" class="block text-sm font-medium text-gray-700 mb-1">
              I want to join as
            </label>
            <select
              id="role"
              v-model="form.role"
              class="input-field"
              :disabled="authStore.isLoading"
            >
              <option value="end-user">End User - Ask questions, post tasks</option>
              <option value="architect">Architect - Solve problems, earn tokens</option>
            </select>
          </div>
        </div>

        <div class="flex items-center">
          <input
            id="terms"
            v-model="form.acceptTerms"
            type="checkbox"
            required
            class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            :disabled="authStore.isLoading"
          />
          <label for="terms" class="ml-2 block text-sm text-gray-700">
            I agree to the 
            <a href="#" class="text-primary-600 hover:text-primary-500 font-medium">Terms of Service</a>
            and 
            <a href="#" class="text-primary-600 hover:text-primary-500 font-medium">Privacy Policy</a>
          </label>
        </div>

        <div>
          <button
            type="submit"
            class="w-full btn-primary flex justify-center items-center"
            :disabled="authStore.isLoading || !isFormValid"
          >
            <div v-if="authStore.isLoading" class="flex items-center">
              <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Creating account...
            </div>
            <span v-else>Create account</span>
          </button>
        </div>

        <div class="text-center">
          <p class="text-sm text-gray-600">
            Already have an account?
            <router-link to="/login" class="text-primary-600 hover:text-primary-500 font-medium">
              Sign in
            </router-link>
          </p>
        </div>
      </form>

      <!-- Welcome bonus info -->
      <div class="bg-success-50 border border-success-200 rounded-lg p-4 mt-6">
        <div class="flex items-center">
          <div class="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mr-3">
            <span class="text-white text-xs font-bold">50</span>
          </div>
          <div>
            <h3 class="text-sm font-medium text-success-800">Welcome Bonus</h3>
            <p class="text-xs text-success-700">Get 50 tokens when you create your account!</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import type { UserRole } from '@/types';

const router = useRouter();
const authStore = useAuthStore();

const form = ref({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  role: 'end-user' as UserRole,
  acceptTerms: false
});

const isFormValid = computed(() => {
  return form.value.name &&
         form.value.email &&
         form.value.password &&
         form.value.confirmPassword &&
         form.value.password === form.value.confirmPassword &&
         form.value.acceptTerms;
});

const handleSubmit = async () => {
  if (!isFormValid.value) return;

  try {
    await authStore.register({
      name: form.value.name,
      email: form.value.email,
      password: form.value.password,
      role: form.value.role
    });
    router.push('/dashboard');
  } catch (error) {
    console.error('Registration failed:', error);
    // In a real app, show error message to user
  }
};
</script>