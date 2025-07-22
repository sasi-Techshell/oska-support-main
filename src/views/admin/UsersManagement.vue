<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="mb-8">
      <h1 class="text-2xl md:text-3xl font-bold text-gray-900">User Management</h1>
      <p class="text-gray-600 mt-1">Manage platform users and their roles</p>
    </div>

    <!-- Filters -->
    <div class="card p-6 mb-8">
      <div class="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
        <div class="flex-1">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search users..."
            class="input-field"
          />
        </div>
        <select v-model="selectedRole" class="input-field md:w-auto">
          <option value="">All Roles</option>
          <option value="end-user">End User</option>
          <option value="architect">Architect</option>
          <option value="super-admin">Super Admin</option>
        </select>
        <select v-model="selectedStatus" class="input-field md:w-auto">
          <option value="">All Status</option>
          <option value="verified">Verified</option>
          <option value="unverified">Unverified</option>
        </select>
      </div>
    </div>

    <!-- Users Table -->
    <div class="card overflow-hidden">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tokens
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Joined
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="user in filteredUsers" :key="user.id" class="hover:bg-gray-50">
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
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ user.tokens }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span 
                  class="badge"
                  :class="{
                    'badge-success': user.isVerified,
                    'badge-warning': !user.isVerified
                  }"
                >
                  {{ user.isVerified ? 'Verified' : 'Unverified' }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ formatDate(user.joinedAt) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button class="text-primary-600 hover:text-primary-900 mr-3">
                  Edit
                </button>
                <button class="text-error-600 hover:text-error-900">
                  Suspend
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import type { User } from '@/types';

const searchQuery = ref('');
const selectedRole = ref('');
const selectedStatus = ref('');

// Mock users data
const mockUsers = ref<User[]>([
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'end-user',
    tokens: 150,
    profileCompletion: 75,
    joinedAt: new Date('2024-01-15'),
    isVerified: true,
    profileImage: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&dpr=2'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'architect',
    tokens: 850,
    profileCompletion: 95,
    joinedAt: new Date('2023-08-10'),
    isVerified: true,
    profileImage: 'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&dpr=2'
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike@example.com',
    role: 'end-user',
    tokens: 45,
    profileCompletion: 30,
    joinedAt: new Date('2024-02-20'),
    isVerified: false,
    profileImage: 'https://images.pexels.com/photos/3778876/pexels-photo-3778876.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&dpr=2'
  }
]);

const filteredUsers = computed(() => {
  let users = [...mockUsers.value];
  
  if (searchQuery.value) {
    users = users.filter(u => 
      u.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  }
  
  if (selectedRole.value) {
    users = users.filter(u => u.role === selectedRole.value);
  }
  
  if (selectedStatus.value) {
    const isVerified = selectedStatus.value === 'verified';
    users = users.filter(u => u.isVerified === isVerified);
  }
  
  return users;
});

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(new Date(date));
};
</script>