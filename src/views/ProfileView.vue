<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="mb-8">
      <h1 class="text-2xl md:text-3xl font-bold text-gray-900">Profile Settings</h1>
      <p class="text-gray-600 mt-1">Manage your account information and preferences</p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Profile Completion -->
      <div class="lg:col-span-1">
        <div class="card p-6 sticky top-8">
          <div class="text-center mb-6">
            <img 
              :src="authStore.user?.profileImage" 
              :alt="authStore.user?.name"
              class="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
            >
            <h3 class="text-lg font-semibold text-gray-900">{{ authStore.user?.name }}</h3>
            <p class="text-sm text-gray-600 capitalize">{{ authStore.user?.role.replace('-', ' ') }}</p>
          </div>
          
          <div class="mb-4">
            <div class="flex items-center justify-between mb-2">
              <span class="text-sm font-medium text-gray-700">Profile Completion</span>
              <span class="text-sm text-gray-600">{{ authStore.user?.profileCompletion || 0 }}%</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div 
                class="bg-gradient-to-r from-primary-500 to-secondary-500 h-2 rounded-full transition-all duration-500"
                :style="{ width: `${authStore.user?.profileCompletion || 0}%` }"
              ></div>
            </div>
          </div>
          
          <div class="space-y-2 text-sm">
            <div class="flex items-center justify-between">
              <span class="text-gray-600">Basic Info</span>
              <CheckIcon class="w-4 h-4 text-success-500" />
            </div>
            <div class="flex items-center justify-between">
              <span class="text-gray-600">Contact Details</span>
              <CheckIcon v-if="authStore.user?.mobile" class="w-4 h-4 text-success-500" />
              <XMarkIcon v-else class="w-4 h-4 text-gray-400" />
            </div>
            <div class="flex items-center justify-between">
              <span class="text-gray-600">Interests</span>
              <CheckIcon v-if="authStore.user?.interests?.length" class="w-4 h-4 text-success-500" />
              <XMarkIcon v-else class="w-4 h-4 text-gray-400" />
            </div>
            <div class="flex items-center justify-between">
              <span class="text-gray-600">Social Accounts</span>
              <CheckIcon v-if="authStore.user?.socialAccounts" class="w-4 h-4 text-success-500" />
              <XMarkIcon v-else class="w-4 h-4 text-gray-400" />
            </div>
          </div>
        </div>
      </div>

      <!-- Profile Form -->
      <div class="lg:col-span-2">
        <form @submit.prevent="handleSubmit" class="space-y-8">
          <!-- Basic Information -->
          <div class="card p-6">
            <h2 class="text-lg font-semibold text-gray-900 mb-4">Basic Information</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  v-model="form.name"
                  type="text"
                  class="input-field"
                  required
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  v-model="form.email"
                  type="email"
                  class="input-field"
                  required
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
                <input
                  v-model="form.mobile"
                  type="tel"
                  class="input-field"
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <input
                  v-model="form.location"
                  type="text"
                  class="input-field"
                  placeholder="City, Country"
                />
              </div>
            </div>
          </div>

          <!-- Interests -->
          <div class="card p-6">
            <h2 class="text-lg font-semibold text-gray-900 mb-4">Interests & Skills</h2>
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Add Interest</label>
                <input
                  v-model="interestInput"
                  type="text"
                  class="input-field"
                  placeholder="e.g., Web Development, AI/ML, Mobile Apps"
                  @keydown.enter.prevent="addInterest"
                />
              </div>
              <div class="flex flex-wrap gap-2">
                <span 
                  v-for="interest in form.interests" 
                  :key="interest"
                  class="bg-primary-100 text-primary-800 text-sm px-3 py-1 rounded-full flex items-center space-x-2"
                >
                  <span>{{ interest }}</span>
                  <button type="button" @click="removeInterest(interest)" class="text-primary-600 hover:text-primary-800">
                    <XMarkIcon class="w-4 h-4" />
                  </button>
                </span>
              </div>
            </div>
          </div>

          <!-- Social Accounts -->
          <div class="card p-6">
            <h2 class="text-lg font-semibold text-gray-900 mb-4">Social Accounts</h2>
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">LinkedIn</label>
                <input
                  v-model="form.socialAccounts.linkedin"
                  type="url"
                  class="input-field"
                  placeholder="https://linkedin.com/in/username"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">GitHub</label>
                <input
                  v-model="form.socialAccounts.github"
                  type="url"
                  class="input-field"
                  placeholder="https://github.com/username"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Twitter</label>
                <input
                  v-model="form.socialAccounts.twitter"
                  type="url"
                  class="input-field"
                  placeholder="https://twitter.com/username"
                />
              </div>
            </div>
          </div>

          <!-- Submit -->
          <div class="flex justify-end">
            <button type="submit" class="btn-primary">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { CheckIcon, XMarkIcon } from '@heroicons/vue/24/outline';

const authStore = useAuthStore();

const form = ref({
  name: '',
  email: '',
  mobile: '',
  location: '',
  interests: [] as string[],
  socialAccounts: {
    linkedin: '',
    github: '',
    twitter: ''
  }
});

const interestInput = ref('');

const addInterest = () => {
  const interest = interestInput.value.trim();
  if (interest && !form.value.interests.includes(interest)) {
    form.value.interests.push(interest);
    interestInput.value = '';
  }
};

const removeInterest = (interest: string) => {
  form.value.interests = form.value.interests.filter(i => i !== interest);
};

const handleSubmit = () => {
  authStore.updateProfile({
    name: form.value.name,
    email: form.value.email,
    mobile: form.value.mobile,
    location: form.value.location,
    interests: form.value.interests,
    socialAccounts: form.value.socialAccounts,
    profileCompletion: calculateProfileCompletion()
  });
};

const calculateProfileCompletion = () => {
  let completion = 25; // Base for having an account
  
  if (form.value.mobile) completion += 25;
  if (form.value.location) completion += 15;
  if (form.value.interests.length > 0) completion += 20;
  if (form.value.socialAccounts.linkedin || form.value.socialAccounts.github || form.value.socialAccounts.twitter) {
    completion += 15;
  }
  
  return Math.min(completion, 100);
};

onMounted(() => {
  if (authStore.user) {
    form.value = {
      name: authStore.user.name,
      email: authStore.user.email,
      mobile: authStore.user.mobile || '',
      location: authStore.user.location || '',
      interests: authStore.user.interests || [],
      socialAccounts: authStore.user.socialAccounts || {
        linkedin: '',
        github: '',
        twitter: ''
      }
    };
  }
});
</script>