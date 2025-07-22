<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Hero Section -->
    <section class="bg-gradient-to-br from-primary-600 to-secondary-600 text-white py-16">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
          <img 
            :src="user?.profileImage || 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2'" 
            :alt="user?.name"
            class="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
          >
          <div class="text-center md:text-left">
            <h1 class="text-3xl md:text-4xl font-bold mb-2">{{ user?.name || 'Loading...' }}</h1>
            <p class="text-xl text-blue-100 mb-4 capitalize">{{ user?.role.replace('-', ' ') }}</p>
            <div class="flex items-center justify-center md:justify-start space-x-4 text-sm">
              <div class="flex items-center space-x-1">
                <MapPinIcon class="w-4 h-4" />
                <span>{{ user?.location || 'Location not specified' }}</span>
              </div>
              <div class="flex items-center space-x-1">
                <CalendarIcon class="w-4 h-4" />
                <span>Joined {{ formatDate(user?.joinedAt) }}</span>
              </div>
            </div>
            
            <!-- Edit Button for Own Portfolio -->
            <div v-if="isOwnPortfolio" class="mt-4">
              <router-link 
                :to="`/portfolio/${user?.id}/edit`"
                class="bg-white text-primary-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors"
              >
                Edit Portfolio
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Portfolio Content -->
    <section class="py-16">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Main Content -->
          <div class="lg:col-span-2 space-y-8">
            <!-- About Section -->
            <div class="card p-8">
              <h2 class="text-2xl font-bold text-gray-900 mb-6">About</h2>
              <p class="text-gray-700 leading-relaxed">
                {{ user?.bio || 'No bio available yet.' }}
              </p>
            </div>

            <!-- Skills Section -->
            <div class="card p-8">
              <h2 class="text-2xl font-bold text-gray-900 mb-6">Skills & Expertise</h2>
              <div class="flex flex-wrap gap-3">
                <span 
                  v-for="skill in user?.skills || []" 
                  :key="skill"
                  class="bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm font-medium"
                >
                  {{ skill }}
                </span>
                <div v-if="!user?.skills?.length" class="text-gray-500">
                  No skills listed yet.
                </div>
              </div>
            </div>

            <!-- Experience Section -->
            <div class="card p-8">
              <h2 class="text-2xl font-bold text-gray-900 mb-6">Experience</h2>
              <div class="prose max-w-none">
                <p class="text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {{ user?.experience || 'No experience information available yet.' }}
                </p>
              </div>
            </div>

            <!-- Education Section -->
            <div class="card p-8">
              <h2 class="text-2xl font-bold text-gray-900 mb-6">Education</h2>
              <div class="prose max-w-none">
                <p class="text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {{ user?.education || 'No education information available yet.' }}
                </p>
              </div>
            </div>
          </div>

          <!-- Sidebar -->
          <div class="lg:col-span-1 space-y-6">
            <!-- Stats Card -->
            <div class="card p-6">
              <h3 class="text-lg font-semibold text-gray-900 mb-4">Community Stats</h3>
              <div class="space-y-4">
                <div class="flex items-center justify-between">
                  <span class="text-gray-600">Tokens Earned</span>
                  <div class="flex items-center space-x-1">
                    <svg class="w-4 h-4 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                      <circle cx="10" cy="10" r="8" stroke="currentColor" stroke-width="2" fill="none"/>
                      <text x="10" y="14" text-anchor="middle" class="text-xs font-bold">₹</text>
                    </svg>
                    <span class="font-semibold text-gray-900">{{ user?.tokens || 0 }}</span>
                  </div>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-gray-600">Questions Answered</span>
                  <span class="font-semibold text-gray-900">{{ mockStats.questionsAnswered }}</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-gray-600">Tasks Completed</span>
                  <span class="font-semibold text-gray-900">{{ mockStats.tasksCompleted }}</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-gray-600">Reputation Score</span>
                  <span class="font-semibold text-gray-900">{{ mockStats.reputation }}</span>
                </div>
              </div>
            </div>

            <!-- Contact Info -->
            <div class="card p-6">
              <h3 class="text-lg font-semibold text-gray-900 mb-4">Contact</h3>
              <div class="space-y-3">
                <div class="flex items-center space-x-3">
                  <EnvelopeIcon class="w-5 h-5 text-gray-400" />
                  <span class="text-gray-700">{{ user?.email }}</span>
                </div>
                <div v-if="user?.mobile" class="flex items-center space-x-3">
                  <PhoneIcon class="w-5 h-5 text-gray-400" />
                  <span class="text-gray-700">{{ user.mobile }}</span>
                </div>
                <div v-if="user?.website" class="flex items-center space-x-3">
                  <GlobeAltIcon class="w-5 h-5 text-gray-400" />
                  <a :href="user.website" target="_blank" class="text-primary-600 hover:text-primary-700">
                    {{ user.website }}
                  </a>
                </div>
              </div>
            </div>

            <!-- Social Links -->
            <div v-if="user?.socialAccounts" class="card p-6">
              <h3 class="text-lg font-semibold text-gray-900 mb-4">Social Links</h3>
              <div class="space-y-3">
                <a 
                  v-if="user.socialAccounts.linkedin"
                  :href="user.socialAccounts.linkedin" 
                  target="_blank"
                  class="flex items-center space-x-3 text-gray-700 hover:text-primary-600 transition-colors"
                >
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clip-rule="evenodd" />
                  </svg>
                  <span>LinkedIn</span>
                </a>
                <a 
                  v-if="user.socialAccounts.github"
                  :href="user.socialAccounts.github" 
                  target="_blank"
                  class="flex items-center space-x-3 text-gray-700 hover:text-primary-600 transition-colors"
                >
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clip-rule="evenodd" />
                  </svg>
                  <span>GitHub</span>
                </a>
                <a 
                  v-if="user.socialAccounts.twitter"
                  :href="user.socialAccounts.twitter" 
                  target="_blank"
                  class="flex items-center space-x-3 text-gray-700 hover:text-primary-600 transition-colors"
                >
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                  <span>Twitter</span>
                </a>
              </div>
            </div>

            <!-- Share Portfolio -->
            <div class="card p-6">
              <h3 class="text-lg font-semibold text-gray-900 mb-4">Share Portfolio</h3>
              <div class="flex items-center space-x-2">
                <input 
                  :value="portfolioUrl"
                  readonly
                  class="input-field flex-1 text-sm"
                >
                <button 
                  @click="copyToClipboard"
                  class="btn-primary text-sm"
                >
                  Copy
                </button>
              </div>
              <p v-if="copied" class="text-success-600 text-sm mt-2">Link copied to clipboard!</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import type { User } from '@/types';
import {
  MapPinIcon,
  CalendarIcon,
  EnvelopeIcon,
  PhoneIcon,
  GlobeAltIcon
} from '@heroicons/vue/24/outline';

const route = useRoute();
const authStore = useAuthStore();

const user = ref<User | null>(null);
const copied = ref(false);

// Mock stats
const mockStats = ref({
  questionsAnswered: 24,
  tasksCompleted: 8,
  reputation: 1250
});

const isOwnPortfolio = computed(() => {
  return authStore.user?.id === route.params.userId;
});

const portfolioUrl = computed(() => {
  return `${window.location.origin}/portfolio/${route.params.userId}`;
});

const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(portfolioUrl.value);
    copied.value = true;
    setTimeout(() => {
      copied.value = false;
    }, 2000);
  } catch (err) {
    console.error('Failed to copy: ', err);
  }
};

const formatDate = (date?: Date) => {
  if (!date) return 'Unknown';
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    year: 'numeric'
  }).format(new Date(date));
};

onMounted(() => {
  // In real app, fetch user data by ID
  // For now, use mock data or current user if viewing own portfolio
  if (isOwnPortfolio.value) {
    user.value = authStore.user;
  } else {
    // Mock user data for other portfolios
    user.value = {
      id: route.params.userId as string,
      name: 'Sarah Wilson',
      email: 'sarah@example.com',
      role: 'architect',
      tokens: 850,
      profileCompletion: 95,
      joinedAt: new Date('2023-08-10'),
      isVerified: true,
      profileImage: 'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2',
      location: 'San Francisco, CA',
      bio: 'Experienced full-stack developer with 8+ years in web development. Passionate about creating scalable applications and mentoring junior developers. Specialized in React, Node.js, and cloud architecture.',
      skills: ['JavaScript', 'TypeScript', 'React', 'Vue.js', 'Node.js', 'Python', 'AWS', 'Docker', 'PostgreSQL', 'MongoDB'],
      experience: `Senior Full Stack Developer at TechCorp (2020-Present)
• Lead development of microservices architecture serving 1M+ users
• Mentored team of 5 junior developers
• Reduced application load time by 40% through optimization

Full Stack Developer at StartupXYZ (2018-2020)
• Built MVP from scratch using React and Node.js
• Implemented CI/CD pipeline reducing deployment time by 60%
• Collaborated with design team to create responsive user interfaces`,
      education: `Master of Science in Computer Science
Stanford University (2016-2018)

Bachelor of Science in Software Engineering  
UC Berkeley (2012-2016)`,
      website: 'https://sarahwilson.dev',
      socialAccounts: {
        linkedin: 'https://linkedin.com/in/sarahwilson',
        github: 'https://github.com/sarahwilson',
        twitter: 'https://twitter.com/sarahwilson'
      },
      portfolioPublic: true
    };
  }
});
</script>