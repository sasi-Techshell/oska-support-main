<template>
  <header class="bg-white border-b border-gray-200 sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo Only -->
        <div class="flex items-center">
          <router-link to="/" class="flex items-center hover:opacity-80 transition-opacity">
            <img src="/asss.jpg" alt="OSKA Support" class="w-20 h-20 object-contain rounded-2xl">
          </router-link>
        </div>

        <!-- Navigation -->
        <nav class="hidden md:flex items-center space-x-6">
          <router-link 
            to="/questions" 
            class="text-gray-600 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            active-class="text-primary-600 bg-primary-50"
          >
            Questions
          </router-link>
          <router-link 
            to="/tasks" 
            class="text-gray-600 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            active-class="text-primary-600 bg-primary-50"
          >
            Tasks
          </router-link>
          <router-link 
            to="/leaderboard" 
            class="text-gray-600 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            active-class="text-primary-600 bg-primary-50"
          >
            Leaderboard
          </router-link>
          <router-link 
            to="/token-system" 
            class="text-gray-600 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            active-class="text-primary-600 bg-primary-50"
          >
            Token System
          </router-link>
          <router-link 
            to="/dashboard" 
            v-if="authStore.isAuthenticated"
            class="text-gray-600 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            active-class="text-primary-600 bg-primary-50"
          >
            Dashboard
          </router-link>
          <router-link 
            to="/admin" 
            v-if="authStore.isSuperAdmin"
            class="text-gray-600 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            active-class="text-primary-600 bg-primary-50"
          >
            Admin
          </router-link>
        </nav>

        <!-- User Actions -->
        <div class="flex items-center space-x-4">
          <!-- Tokens Display -->
          <div v-if="authStore.isAuthenticated" class="flex items-center space-x-2 bg-gradient-to-r from-yellow-50 to-yellow-100 px-3 py-1.5 rounded-full">
            <div class="w-5 h-5 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center">
              <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <circle cx="10" cy="10" r="8" stroke="currentColor" stroke-width="2" fill="none"/>
                <text x="10" y="14" text-anchor="middle" class="text-xs font-bold">₹</text>
              </svg>
            </div>
            <span class="text-sm font-semibold text-gray-700">{{ authStore.user?.tokens || 0 }}</span>
          </div>

          <!-- Notifications -->
          <div v-if="authStore.isAuthenticated" class="relative">
            <button 
            @click="showNotifications = !showNotifications"
            class="p-2 text-gray-600 hover:text-primary-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
            <BellIcon class="w-5 h-5" />
            <span v-if="appStore.unreadNotificationsCount > 0"
              class="absolute -top-1 -right-1 bg-error-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium"
              >
              {{ appStore.unreadNotificationsCount }}
            </span>
          </button>
          <!-- Notifications Panel -->
           <div 
           v-if="showNotifications"
           @click.stop
           class="absolute mt-2 w-80 max-w-[90vw] bg-white rounded-lg shadow-xl border border-gray-200 z-50 max-h-96 overflow-y-auto
           left-1/2 -translate-x-1/2 sm:left-auto sm:translate-x-0 sm:right-0"
           >
           <div class="px-4 py-3 border-b border-gray-100">
            <h3 class="text-sm font-semibold text-gray-900">Notifications</h3>
          </div>
          <div class="py-2">
            <div 
            v-for="notification in appStore.notifications.slice(0, 5)" 
            :key="notification.id"
            class="px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors"
            :class="{ 'bg-blue-50': !notification.isRead }"
            @click="handleNotificationClick(notification)"
            >
            <div class="flex items-start space-x-3">
              <div class="flex-shrink-0">
                <div class="w-2 h-2 bg-primary-500 rounded-full mt-2" v-if="!notification.isRead"></div>
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-gray-900">{{ notification.title }}</p>
                <p class="text-xs text-gray-500 mt-1">{{ notification.message }}</p>
                <p class="text-xs text-gray-400 mt-1">{{ formatTimeAgo(notification.createdAt) }}</p>
              </div>
            </div>
          </div>
          <div v-if="appStore.notifications.length === 0" class="px-4 py-8 text-center text-gray-500 text-sm">
            No notifications yet
          </div>
        </div>
      </div>
    </div>

          <!-- User Menu -->
          <div v-if="authStore.isAuthenticated" class="relative">
            <button 
              @click="showUserMenu = !showUserMenu"
              class="flex items-center space-x-2 p-1 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <img 
                :src="authStore.user?.profileImage || 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&dpr=2'" 
                :alt="authStore.user?.name"
                class="w-8 h-8 rounded-full object-cover"
              >
              <ChevronDownIcon class="w-4 h-4 text-gray-500" />
            </button>

            <!-- User Dropdown -->
            <div 
              v-if="showUserMenu"
              class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50"
              @click.stop
            >
              <div class="px-4 py-3 border-b border-gray-100">
                <p class="text-sm font-medium text-gray-900">{{ authStore.user?.name }}</p>
                <p class="text-xs text-gray-500">{{ authStore.user?.email }}</p>
                <div class="flex items-center mt-1">
                  <div class="w-2 h-2 bg-success-500 rounded-full mr-2"></div>
                  <span class="text-xs text-gray-500 capitalize">{{ authStore.user?.role.replace('-', ' ') }}</span>
                </div>
              </div>
              <router-link 
                to="/profile" 
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                @click="showUserMenu = false"
              >
                <UserIcon class="w-4 h-4 inline mr-2" />
                Profile
              </router-link>
              <router-link 
                :to="`/portfolio/${authStore.user?.id}`"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                @click="showUserMenu = false"
              >
                <DocumentTextIcon class="w-4 h-4 inline mr-2" />
                My Portfolio
              </router-link>
              <router-link 
                to="/tokens" 
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                @click="showUserMenu = false"
              >
                <svg class="w-4 h-4 inline mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <circle cx="10" cy="10" r="8" stroke="currentColor" stroke-width="2" fill="none"/>
                  <text x="10" y="14" text-anchor="middle" class="text-xs font-bold">₹</text>
                </svg>
                Token Wallet
              </router-link>
              <button 
                @click="handleLogout"
                class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
              >
                <ArrowRightOnRectangleIcon class="w-4 h-4 inline mr-2" />
                Sign Out
              </button>
            </div>
          </div>

          <!-- Auth Buttons -->
          <div v-else class="flex items-center space-x-3">
            <router-link to="/login" class="text-gray-600 hover:text-primary-600 font-medium text-sm transition-colors">
              Sign In
            </router-link>
            <router-link to="/register" class="btn-primary text-sm">
              Get Started
            </router-link>
          </div>

          <!-- Mobile Menu Button -->
          <button 
            @click="showMobileMenu = !showMobileMenu"
            class="md:hidden p-2 text-gray-600 hover:text-primary-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Bars3Icon class="w-5 h-5" />
          </button>
        </div>
      </div>

      <!-- Mobile Navigation -->
      <div v-if="showMobileMenu" class="md:hidden border-t border-gray-200 py-4">
        <div class="flex flex-col space-y-2">
          <router-link 
            to="/questions" 
            class="text-gray-600 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            active-class="text-primary-600 bg-primary-50"
            @click="showMobileMenu = false"
          >
            Questions
          </router-link>
          <router-link 
            to="/tasks" 
            class="text-gray-600 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            active-class="text-primary-600 bg-primary-50"
            @click="showMobileMenu = false"
          >
            Tasks
          </router-link>
          <router-link 
            to="/leaderboard" 
            class="text-gray-600 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            active-class="text-primary-600 bg-primary-50"
            @click="showMobileMenu = false"
          >
            Leaderboard
          </router-link>
          <router-link 
            to="/token-system" 
            class="text-gray-600 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            active-class="text-primary-600 bg-primary-50"
            @click="showMobileMenu = false"
          >
            Token System
          </router-link>
          <router-link 
            to="/dashboard" 
            v-if="authStore.isAuthenticated"
            class="text-gray-600 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            active-class="text-primary-600 bg-primary-50"
            @click="showMobileMenu = false"
          >
            Dashboard
          </router-link>
          <router-link 
            to="/admin" 
            v-if="authStore.isSuperAdmin"
            class="text-gray-600 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            active-class="text-primary-600 bg-primary-50"
            @click="showMobileMenu = false"
          >
            Admin
          </router-link>
        </div>
      </div>
    </div>

    
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { useAppStore } from '@/stores/app';
import type { Notification } from '@/types';
import {
  BellIcon,
  UserIcon,
  ChevronDownIcon,
  ArrowRightOnRectangleIcon,
  Bars3Icon,
  DocumentTextIcon
} from '@heroicons/vue/24/outline';

const router = useRouter();
const authStore = useAuthStore();
const appStore = useAppStore();

const showUserMenu = ref(false);
const showNotifications = ref(false);
const showMobileMenu = ref(false);

const handleLogout = () => {
  authStore.logout();
  showUserMenu.value = false;
  router.push('/');
};

const handleNotificationClick = (notification: Notification) => {
  appStore.markNotificationAsRead(notification.id);
  if (notification.actionUrl) {
    router.push(notification.actionUrl);
  }
  showNotifications.value = false;
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

// Close dropdowns when clicking outside
const handleClickOutside = (event: Event) => {
  const target = event.target as HTMLElement;
  if (!target.closest('.relative')) {
    showUserMenu.value = false;
    showNotifications.value = false;
    showMobileMenu.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>