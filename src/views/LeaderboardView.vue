<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Hero Section -->
    <section class="bg-gradient-to-br from-primary-600 to-secondary-600 text-white py-20">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div class="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-6">
          <TrophyIcon class="w-10 h-10 text-white" />
        </div>
        <h1 class="text-4xl md:text-5xl font-bold mb-6">Leaderboard</h1>
        <p class="text-xl text-blue-100 leading-relaxed">
          Celebrating our top contributors and token earners in the community
        </p>
      </div>
    </section>

    <!-- Filters -->
    <section class="py-8 bg-white border-b border-gray-200">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div class="flex items-center space-x-4">
            <select v-model="selectedPeriod" class="input-field w-auto">
              <option value="all-time">All Time</option>
              <option value="this-month">This Month</option>
              <option value="this-week">This Week</option>
            </select>
            <select v-model="selectedCategory" class="input-field w-auto">
              <option value="tokens">Top Token Earners</option>
              <option value="questions">Top Question Answerers</option>
              <option value="tasks">Top Task Completers</option>
              <option value="reputation">Top Reputation</option>
            </select>
          </div>
          <div class="text-sm text-gray-600">
            Updated every hour • {{ leaderboardData.length }} active contributors
          </div>
        </div>
      </div>
    </section>

    <!-- Top 3 Podium -->
    <section class="py-16 bg-white">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-center items-end space-x-8 mb-16">
          <!-- 2nd Place -->
          <div class="text-center">
            <div class="relative">
              <img 
                :src="leaderboardData[1]?.profileImage" 
                :alt="leaderboardData[1]?.name"
                class="w-20 h-20 rounded-full mx-auto mb-4 object-cover border-4 border-gray-300"
              >
              <div class="absolute -top-2 -right-2 w-8 h-8 bg-gray-400 text-white rounded-full flex items-center justify-center font-bold text-sm">
                2
              </div>
            </div>
            <h3 class="font-semibold text-gray-900">{{ leaderboardData[1]?.name }}</h3>
            <p class="text-sm text-gray-600 capitalize">{{ leaderboardData[1]?.role.replace('-', ' ') }}</p>
            <div class="mt-2 bg-gray-100 px-3 py-1 rounded-full">
              <span class="text-sm font-medium text-gray-700">{{ formatValue(leaderboardData[1]?.value) }}</span>
            </div>
          </div>

          <!-- 1st Place -->
          <div class="text-center">
            <div class="relative">
              <img 
                :src="leaderboardData[0]?.profileImage" 
                :alt="leaderboardData[0]?.name"
                class="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-yellow-400"
              >
              <div class="absolute -top-2 -right-2 w-10 h-10 bg-yellow-400 text-white rounded-full flex items-center justify-center font-bold">
                1
              </div>
              <div class="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <TrophyIcon class="w-8 h-8 text-yellow-400" />
              </div>
            </div>
            <h3 class="font-semibold text-gray-900 text-lg">{{ leaderboardData[0]?.name }}</h3>
            <p class="text-sm text-gray-600 capitalize">{{ leaderboardData[0]?.role.replace('-', ' ') }}</p>
            <div class="mt-2 bg-yellow-100 px-4 py-2 rounded-full">
              <span class="text-sm font-medium text-yellow-800">{{ formatValue(leaderboardData[0]?.value) }}</span>
            </div>
          </div>

          <!-- 3rd Place -->
          <div class="text-center">
            <div class="relative">
              <img 
                :src="leaderboardData[2]?.profileImage" 
                :alt="leaderboardData[2]?.name"
                class="w-20 h-20 rounded-full mx-auto mb-4 object-cover border-4 border-orange-400"
              >
              <div class="absolute -top-2 -right-2 w-8 h-8 bg-orange-400 text-white rounded-full flex items-center justify-center font-bold text-sm">
                3
              </div>
            </div>
            <h3 class="font-semibold text-gray-900">{{ leaderboardData[2]?.name }}</h3>
            <p class="text-sm text-gray-600 capitalize">{{ leaderboardData[2]?.role.replace('-', ' ') }}</p>
            <div class="mt-2 bg-orange-100 px-3 py-1 rounded-full">
              <span class="text-sm font-medium text-orange-700">{{ formatValue(leaderboardData[2]?.value) }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Full Leaderboard -->
    <section class="py-16 bg-gray-50">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-white rounded-xl shadow-lg overflow-hidden">
          <div class="p-6 border-b border-gray-200">
            <h2 class="text-xl font-semibold text-gray-900">
              {{ getCategoryTitle() }} - {{ getPeriodTitle() }}
            </h2>
          </div>
          
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rank
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {{ getValueLabel() }}
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Member Since
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr 
                  v-for="(user, index) in leaderboardData" 
                  :key="user.id"
                  class="hover:bg-gray-50 transition-colors"
                  :class="{ 'bg-yellow-50': index < 3 }"
                >
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <span 
                        class="text-lg font-bold"
                        :class="{
                          'text-yellow-600': index === 0,
                          'text-gray-500': index === 1,
                          'text-orange-600': index === 2,
                          'text-gray-700': index > 2
                        }"
                      >
                        #{{ index + 1 }}
                      </span>
                      <TrophyIcon 
                        v-if="index < 3" 
                        class="w-4 h-4 ml-2"
                        :class="{
                          'text-yellow-400': index === 0,
                          'text-gray-400': index === 1,
                          'text-orange-400': index === 2
                        }"
                      />
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <img 
                        :src="user.profileImage" 
                        :alt="user.name"
                        class="w-10 h-10 rounded-full object-cover"
                      >
                      <div class="ml-4">
                        <div class="text-sm font-medium text-gray-900">{{ user.name }}</div>
                        <div class="text-sm text-gray-500">{{ user.email }}</div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span 
                      class="badge"
                      :class="{
                        'badge-primary': user.role === 'end-user',
                        'badge-secondary': user.role === 'architect',
                        'badge-accent': user.role === 'super-admin'
                      }"
                    >
                      {{ user.role.replace('-', ' ') }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm font-medium text-gray-900">
                      {{ formatValue(user.value) }}
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ formatDate(user.joinedAt) }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="py-16 bg-white">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">Community Stats</h2>
          <p class="text-xl text-gray-600">
            See how our community is growing and thriving
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div class="bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl p-6 text-center">
            <div class="text-3xl font-bold text-primary-600 mb-2">2,547</div>
            <div class="text-gray-700">Total Members</div>
          </div>
          <div class="bg-gradient-to-br from-secondary-50 to-secondary-100 rounded-xl p-6 text-center">
            <div class="text-3xl font-bold text-secondary-600 mb-2">125,430</div>
            <div class="text-gray-700">Tokens Distributed</div>
          </div>
          <div class="bg-gradient-to-br from-accent-50 to-accent-100 rounded-xl p-6 text-center">
            <div class="text-3xl font-bold text-accent-600 mb-2">15,234</div>
            <div class="text-gray-700">Questions Answered</div>
          </div>
          <div class="bg-gradient-to-br from-success-50 to-success-100 rounded-xl p-6 text-center">
            <div class="text-3xl font-bold text-success-600 mb-2">8,192</div>
            <div class="text-gray-700">Tasks Completed</div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { TrophyIcon } from '@heroicons/vue/24/outline';
import type { User } from '@/types';

const selectedPeriod = ref('all-time');
const selectedCategory = ref('tokens');

// Mock leaderboard data
const mockLeaderboardData: (User & { value: number })[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    email: 'sarah.chen@example.com',
    role: 'architect',
    tokens: 2850,
    profileCompletion: 100,
    joinedAt: new Date('2023-06-15'),
    isVerified: true,
    profileImage: 'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
    value: 2850
  },
  {
    id: '2',
    name: 'Alex Rodriguez',
    email: 'alex.rodriguez@example.com',
    role: 'architect',
    tokens: 2340,
    profileCompletion: 95,
    joinedAt: new Date('2023-08-22'),
    isVerified: true,
    profileImage: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
    value: 2340
  },
  {
    id: '3',
    name: 'Emily Johnson',
    email: 'emily.johnson@example.com',
    role: 'architect',
    tokens: 1980,
    profileCompletion: 90,
    joinedAt: new Date('2023-09-10'),
    isVerified: true,
    profileImage: 'https://images.pexels.com/photos/3778876/pexels-photo-3778876.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
    value: 1980
  },
  {
    id: '4',
    name: 'Michael Kim',
    email: 'michael.kim@example.com',
    role: 'end-user',
    tokens: 1750,
    profileCompletion: 85,
    joinedAt: new Date('2023-07-05'),
    isVerified: true,
    profileImage: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
    value: 1750
  },
  {
    id: '5',
    name: 'Jessica Wang',
    email: 'jessica.wang@example.com',
    role: 'architect',
    tokens: 1620,
    profileCompletion: 88,
    joinedAt: new Date('2023-10-12'),
    isVerified: true,
    profileImage: 'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
    value: 1620
  },
  {
    id: '6',
    name: 'David Thompson',
    email: 'david.thompson@example.com',
    role: 'end-user',
    tokens: 1450,
    profileCompletion: 80,
    joinedAt: new Date('2023-11-18'),
    isVerified: true,
    profileImage: 'https://images.pexels.com/photos/3778876/pexels-photo-3778876.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
    value: 1450
  },
  {
    id: '7',
    name: 'Lisa Martinez',
    email: 'lisa.martinez@example.com',
    role: 'architect',
    tokens: 1320,
    profileCompletion: 92,
    joinedAt: new Date('2023-12-03'),
    isVerified: true,
    profileImage: 'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
    value: 1320
  },
  {
    id: '8',
    name: 'Robert Lee',
    email: 'robert.lee@example.com',
    role: 'end-user',
    tokens: 1180,
    profileCompletion: 75,
    joinedAt: new Date('2024-01-15'),
    isVerified: true,
    profileImage: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
    value: 1180
  }
];

const leaderboardData = computed(() => {
  // In a real app, this would filter based on selectedPeriod and selectedCategory
  return mockLeaderboardData.sort((a, b) => b.value - a.value);
});

const getCategoryTitle = () => {
  switch (selectedCategory.value) {
    case 'tokens': return 'Top Token Earners';
    case 'questions': return 'Top Question Answerers';
    case 'tasks': return 'Top Task Completers';
    case 'reputation': return 'Top Reputation';
    default: return 'Leaderboard';
  }
};

const getPeriodTitle = () => {
  switch (selectedPeriod.value) {
    case 'all-time': return 'All Time';
    case 'this-month': return 'This Month';
    case 'this-week': return 'This Week';
    default: return 'All Time';
  }
};

const getValueLabel = () => {
  switch (selectedCategory.value) {
    case 'tokens': return 'Tokens Earned';
    case 'questions': return 'Questions Answered';
    case 'tasks': return 'Tasks Completed';
    case 'reputation': return 'Reputation Score';
    default: return 'Score';
  }
};

const formatValue = (value: number) => {
  switch (selectedCategory.value) {
    case 'tokens': return `${value.toLocaleString()} tokens`;
    case 'questions': return `${value} answers`;
    case 'tasks': return `${value} tasks`;
    case 'reputation': return `${value} points`;
    default: return value.toString();
  }
};

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    year: 'numeric'
  }).format(new Date(date));
};
</script>