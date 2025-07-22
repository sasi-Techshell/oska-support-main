<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="mb-8">
      <router-link 
        :to="`/portfolio/${authStore.user?.id}`" 
        class="text-primary-600 hover:text-primary-700 text-sm flex items-center space-x-1 mb-4"
      >
        <ArrowLeftIcon class="w-4 h-4" />
        <span>Back to Portfolio</span>
      </router-link>
      <h1 class="text-2xl md:text-3xl font-bold text-gray-900">Edit Portfolio</h1>
      <p class="text-gray-600 mt-1">Customize your public portfolio to showcase your skills and experience</p>
    </div>

    <form @submit.prevent="handleSubmit" class="space-y-8">
      <!-- Basic Information -->
      <div class="card p-6">
        <h2 class="text-lg font-semibold text-gray-900 mb-4">Basic Information</h2>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Bio</label>
            <textarea
              v-model="form.bio"
              rows="4"
              placeholder="Write a brief bio about yourself, your experience, and what you're passionate about..."
              class="input-field"
            ></textarea>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Website</label>
            <input
              v-model="form.website"
              type="url"
              placeholder="https://your-website.com"
              class="input-field"
            />
          </div>
        </div>
      </div>

      <!-- Skills -->
      <div class="card p-6">
        <h2 class="text-lg font-semibold text-gray-900 mb-4">Skills & Expertise</h2>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Add Skill</label>
            <input
              v-model="skillInput"
              type="text"
              placeholder="e.g., JavaScript, React, Python"
              class="input-field"
              @keydown.enter.prevent="addSkill"
            />
          </div>
          <div class="flex flex-wrap gap-2">
            <span 
              v-for="skill in form.skills" 
              :key="skill"
              class="bg-primary-100 text-primary-800 text-sm px-3 py-1 rounded-full flex items-center space-x-2"
            >
              <span>{{ skill }}</span>
              <button type="button" @click="removeSkill(skill)" class="text-primary-600 hover:text-primary-800">
                <XMarkIcon class="w-4 h-4" />
              </button>
            </span>
          </div>
        </div>
      </div>

      <!-- Experience -->
      <div class="card p-6">
        <h2 class="text-lg font-semibold text-gray-900 mb-4">Professional Experience</h2>
        <textarea
          v-model="form.experience"
          rows="8"
          placeholder="Describe your work experience, including job titles, companies, and key achievements..."
          class="input-field"
        ></textarea>
      </div>

      <!-- Education -->
      <div class="card p-6">
        <h2 class="text-lg font-semibold text-gray-900 mb-4">Education</h2>
        <textarea
          v-model="form.education"
          rows="6"
          placeholder="List your educational background, degrees, certifications, and relevant courses..."
          class="input-field"
        ></textarea>
      </div>

      <!-- Portfolio Visibility -->
      <div class="card p-6">
        <h2 class="text-lg font-semibold text-gray-900 mb-4">Portfolio Visibility</h2>
        <div class="flex items-center space-x-3">
          <input
            id="portfolioPublic"
            v-model="form.portfolioPublic"
            type="checkbox"
            class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
          />
          <label for="portfolioPublic" class="text-sm text-gray-700">
            Make my portfolio public (visible to everyone)
          </label>
        </div>
        <p class="text-xs text-gray-500 mt-2">
          When enabled, anyone can view your portfolio using your public profile link
        </p>
      </div>

      <!-- Submit -->
      <div class="flex items-center justify-between">
        <router-link 
          :to="`/portfolio/${authStore.user?.id}`" 
          class="btn-outline"
        >
          Cancel
        </router-link>
        <button type="submit" class="btn-primary">
          Save Portfolio
        </button>
      </div>
    </form>

    <!-- Portfolio Link -->
    <div class="card p-6 mt-8">
      <h3 class="text-lg font-semibold text-gray-900 mb-4">Your Portfolio Link</h3>
      <div class="flex items-center space-x-2">
        <input 
          :value="portfolioUrl"
          readonly
          class="input-field flex-1"
        >
        <button 
          @click="copyToClipboard"
          class="btn-primary"
        >
          Copy Link
        </button>
      </div>
      <p v-if="copied" class="text-success-600 text-sm mt-2">Link copied to clipboard!</p>
      <p class="text-gray-500 text-sm mt-2">
        Share this link to showcase your portfolio to potential clients or employers
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { ArrowLeftIcon, XMarkIcon } from '@heroicons/vue/24/outline';

const router = useRouter();
const authStore = useAuthStore();

const form = ref({
  bio: '',
  website: '',
  skills: [] as string[],
  experience: '',
  education: '',
  portfolioPublic: true
});

const skillInput = ref('');
const copied = ref(false);

const portfolioUrl = computed(() => {
  return `${window.location.origin}/portfolio/${authStore.user?.id}`;
});

const addSkill = () => {
  const skill = skillInput.value.trim();
  if (skill && !form.value.skills.includes(skill)) {
    form.value.skills.push(skill);
    skillInput.value = '';
  }
};

const removeSkill = (skill: string) => {
  form.value.skills = form.value.skills.filter(s => s !== skill);
};

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

const handleSubmit = () => {
  // Update user profile with portfolio data
  authStore.updateProfile({
    bio: form.value.bio,
    website: form.value.website,
    skills: form.value.skills,
    experience: form.value.experience,
    education: form.value.education,
    portfolioPublic: form.value.portfolioPublic
  });

  // Redirect back to portfolio
  router.push(`/portfolio/${authStore.user?.id}`);
};

onMounted(() => {
  // Load existing data
  if (authStore.user) {
    form.value = {
      bio: authStore.user.bio || '',
      website: authStore.user.website || '',
      skills: authStore.user.skills || [],
      experience: authStore.user.experience || '',
      education: authStore.user.education || '',
      portfolioPublic: authStore.user.portfolioPublic ?? true
    };
  }
});
</script>