<template>
  <div class="min-h-screen">
    <!-- Hero Section -->
    <section class="relative bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-600 text-white overflow-hidden">
      <div class="absolute inset-0 bg-black opacity-20"></div>
      <div class="absolute inset-0">
        <div class="absolute top-1/4 left-1/4 w-72 h-72 bg-primary-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse-slow"></div>
        <div class="absolute top-1/3 right-1/4 w-72 h-72 bg-secondary-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse-slow animation-delay-1000"></div>
        <div class="absolute bottom-1/4 left-1/3 w-72 h-72 bg-accent-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse-slow animation-delay-2000"></div>
      </div>
      
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div class="text-center">
          <h1 class="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Welcome to 
            <span class="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
              OSKA Support
            </span>
          </h1>
          <p class="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
            Your open community platform for solving problems, learning skills, and earning tokens through expert collaboration
          </p>
          <div class="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <router-link to="/register" class="bg-white text-primary-600 font-semibold px-8 py-4 rounded-lg hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              Join Community
            </router-link>
            <router-link to="/questions" class="border-2 border-white text-white font-semibold px-8 py-4 rounded-lg hover:bg-white hover:text-primary-600 transition-all duration-200">
              Browse Questions
            </router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="py-16 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          <div class="p-6">
            <div class="text-3xl font-bold text-primary-600 mb-2">2.5K+</div>
            <div class="text-gray-600">Active Users</div>
          </div>
          <div class="p-6">
            <div class="text-3xl font-bold text-secondary-600 mb-2">15K+</div>
            <div class="text-gray-600">Questions Solved</div>
          </div>
          <div class="p-6">
            <div class="text-3xl font-bold text-accent-600 mb-2">8.2K+</div>
            <div class="text-gray-600">Tasks Completed</div>
          </div>
          <div class="p-6">
            <div class="text-3xl font-bold text-success-600 mb-2">125K+</div>
            <div class="text-gray-600">Tokens Earned</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Recent Questions and Tasks -->
    <section class="py-20 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Latest Community Activity
          </h2>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore the most recent questions and tasks from our vibrant community
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- Recent Questions -->
          <div class="card">
            <div class="p-6 border-b border-gray-100">
              <div class="flex items-center justify-between">
                <h3 class="text-lg font-semibold text-gray-900">Recent Questions</h3>
                <router-link to="/questions" class="text-sm text-primary-600 hover:text-primary-700">
                  View all
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
                    <h4 class="text-sm font-medium text-gray-900 mb-2">{{ question.title }}</h4>
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

          <!-- Recent Tasks -->
          <div class="card">
            <div class="p-6 border-b border-gray-100">
              <div class="flex items-center justify-between">
                <h3 class="text-lg font-semibold text-gray-900">Recent Tasks</h3>
                <router-link to="/tasks" class="text-sm text-primary-600 hover:text-primary-700">
                  View all
                </router-link>
              </div>
            </div>
            <div class="divide-y divide-gray-100">
              <div 
                v-for="task in appStore.tasks.slice(0, 3)" 
                :key="task.id"
                class="p-6 hover:bg-gray-50 transition-colors"
              >
                <div class="flex items-start justify-between">
                  <div class="flex-1">
                    <h4 class="text-sm font-medium text-gray-900 mb-2">{{ task.title }}</h4>
                    <p class="text-xs text-gray-600 line-clamp-2 mb-3">{{ task.description }}</p>
                    <div class="flex items-center space-x-4 text-xs text-gray-500">
                      <div class="flex items-center space-x-1">
                        <img 
                          :src="task.author.profileImage || 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&dpr=2'" 
                          :alt="task.author.name"
                          class="w-4 h-4 rounded-full"
                        >
                        <span>{{ task.author.name }}</span>
                      </div>
                      <span>{{ formatTimeAgo(task.createdAt) }}</span>
                      <div class="flex items-center space-x-1">
                        <CurrencyDollarIcon class="w-3 h-3 text-success-500" />
                        <span class="text-success-600 font-medium">{{ task.tokenValue }}</span>
                      </div>
                    </div>
                  </div>
                  <div class="ml-4 flex-shrink-0">
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl md:text-4xl font-bold mb-6">
          Ready to Join Our Community?
        </h2>
        <p class="text-xl text-blue-100 mb-8 leading-relaxed">
          Start your journey today and become part of a thriving ecosystem of learners, experts, and innovators.
        </p>
        <div class="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
          <router-link to="/register" class="bg-white text-primary-600 font-semibold px-8 py-4 rounded-lg hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
            Create Free Account
          </router-link>
          <router-link to="/login" class="border-2 border-white text-white font-semibold px-8 py-4 rounded-lg hover:bg-white hover:text-primary-600 transition-all duration-200">
            Sign In
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useAppStore } from '@/stores/app';
import { CurrencyDollarIcon } from '@heroicons/vue/24/outline';

const appStore = useAppStore();

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