<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div class="text-center">
        <div class="flex justify-center">
          <div class="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center mb-4">
            <span class="text-white font-bold text-xl">OS</span>
          </div>
        </div>
        <h2 class="text-3xl font-bold text-gray-900 mb-2">Welcome back</h2>
        <p class="text-gray-600">Sign in to your OSKA Support account</p>
      </div>

      <form @submit.prevent="handleSubmit" class="mt-8 space-y-6">
        <div class="space-y-4">
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
              placeholder="Enter your password"
              :disabled="authStore.isLoading"
            />
          </div>

          <div>
            <label for="role" class="block text-sm font-medium text-gray-700 mb-1">
              Login as
            </label>
            <select
              id="role"
              v-model="form.role"
              class="input-field"
              :disabled="authStore.isLoading"
            >
              <option value="end-user">End User</option>
              <option value="architect">Architect</option>
              <option value="super-admin">Super Admin</option>
            </select>
          </div>
        </div>

        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <input
              id="remember-me"
              v-model="form.remember"
              type="checkbox"
              class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              :disabled="authStore.isLoading"
            />
            <label for="remember-me" class="ml-2 block text-sm text-gray-700">
              Remember me
            </label>
          </div>

          <div class="text-sm">
            <a href="#" class="text-primary-600 hover:text-primary-500 font-medium">
              Forgot your password?
            </a>
          </div>
        </div>

        <div>
          <button
            type="submit"
            class="w-full btn-primary flex justify-center items-center"
            :disabled="authStore.isLoading"
          >
            <div v-if="authStore.isLoading" class="flex items-center">
              <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Signing in...
            </div>
            <span v-else>Sign in</span>
          </button>
        </div>

        <div class="text-center">
          <p class="text-sm text-gray-600">
            Don't have an account?
            <router-link to="/register" class="text-primary-600 hover:text-primary-500 font-medium">
              Create one now
            </router-link>
          </p>
        </div>
      </form>

      <!-- Demo accounts info -->
      <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
        <h3 class="text-sm font-medium text-blue-800 mb-2">Demo Accounts</h3>
        <div class="text-xs text-blue-700 space-y-1">
          <p><strong>End User:</strong> Any email with "end-user" role</p>
          <p><strong>Architect:</strong> Any email with "architect" role</p>
          <p><strong>Super Admin:</strong> Any email with "super-admin" role</p>
          <p class="text-blue-600 mt-2">Use any password to sign in with demo data.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import type { UserRole } from '@/types';

const router = useRouter();
const authStore = useAuthStore();

const form = ref({
  email: '',
  password: '',
  role: 'end-user' as UserRole,
  remember: false
});

const handleSubmit = async () => {
  try {
    await authStore.login(form.value.email, form.value.password, form.value.role);
    
    // Redirect based on role
    if (form.value.role === 'super-admin') {
      router.push('/admin');
    } else {
      router.push('/dashboard');
    }
  } catch (error) {
    console.error('Login failed:', error);
    // In a real app, show error message to user
  }
};
</script>