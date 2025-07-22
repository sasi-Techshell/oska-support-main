<template>
  <div id="app" class="min-h-screen bg-gray-50">
    <AppHeader />
    <main class="flex-1">
      <router-view />
    </main>
    <AppFooter v-if="!hideFooter" />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { useAppStore } from '@/stores/app';
import AppHeader from '@/components/layout/AppHeader.vue';
import AppFooter from '@/components/layout/AppFooter.vue';

const route = useRoute();
const authStore = useAuthStore();
const appStore = useAppStore();

// Hide footer on auth pages
const hideFooter = computed(() => {
  return ['/login', '/register'].includes(route.path);
});

onMounted(() => {
  // Initialize auth from localStorage
  authStore.initializeAuth();
  
  // Initialize mock data
  appStore.initializeMockData();
});
</script>