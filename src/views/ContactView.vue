<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Hero Section -->
    <section class="bg-gradient-to-br from-primary-600 to-secondary-600 text-white py-20">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 class="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
        <p class="text-xl text-blue-100 leading-relaxed">
          We'd love to hear from you. Get in touch with our team.
        </p>
      </div>
    </section>

    <!-- Contact Form Section -->
    <section class="py-20">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <!-- Contact Form -->
          <div class="bg-white rounded-xl shadow-lg p-8">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">Send us a message</h2>
            <form @submit.prevent="handleSubmit" class="space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <input
                    v-model="form.firstName"
                    type="text"
                    required
                    class="input-field"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <input
                    v-model="form.lastName"
                    type="text"
                    required
                    class="input-field"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  v-model="form.email"
                  type="email"
                  required
                  class="input-field"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <select v-model="form.subject" required class="input-field">
                  <option value="">Select a subject</option>
                  <option value="general">General Inquiry</option>
                  <option value="support">Technical Support</option>
                  <option value="partnership">Partnership</option>
                  <option value="feedback">Feedback</option>
                  <option value="bug">Bug Report</option>
                </select>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea
                  v-model="form.message"
                  rows="6"
                  required
                  class="input-field"
                  placeholder="Tell us how we can help you..."
                ></textarea>
              </div>

              <button type="submit" class="btn-primary w-full" :disabled="isSubmitting">
                <span v-if="isSubmitting">Sending...</span>
                <span v-else>Send Message</span>
              </button>
            </form>

            <div v-if="submitted" class="mt-6 p-4 bg-success-50 border border-success-200 rounded-lg">
              <p class="text-success-800 text-sm">
                Thank you for your message! We'll get back to you within 24 hours.
              </p>
            </div>
          </div>

          <!-- Contact Information -->
          <div class="space-y-8">
            <div class="bg-white rounded-xl shadow-lg p-8">
              <h3 class="text-xl font-semibold text-gray-900 mb-6">Get in touch</h3>
              <div class="space-y-6">
                <div class="flex items-start space-x-4">
                  <div class="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <EnvelopeIcon class="w-5 h-5 text-primary-600" />
                  </div>
                  <div>
                    <h4 class="font-medium text-gray-900">Email</h4>
                    <p class="text-gray-600">support@oskasupport.com</p>
                    <p class="text-gray-600">hello@oskasupport.com</p>
                  </div>
                </div>

                <div class="flex items-start space-x-4">
                  <div class="w-10 h-10 bg-secondary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <PhoneIcon class="w-5 h-5 text-secondary-600" />
                  </div>
                  <div>
                    <h4 class="font-medium text-gray-900">Phone</h4>
                    <p class="text-gray-600">+1 (555) 123-4567</p>
                    <p class="text-gray-600">Mon-Fri 9am-6pm PST</p>
                  </div>
                </div>

                <div class="flex items-start space-x-4">
                  <div class="w-10 h-10 bg-accent-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPinIcon class="w-5 h-5 text-accent-600" />
                  </div>
                  <div>
                    <h4 class="font-medium text-gray-900">Office</h4>
                    <p class="text-gray-600">123 Tech Street</p>
                    <p class="text-gray-600">San Francisco, CA 94105</p>
                  </div>
                </div>
              </div>
            </div>

            <div class="bg-white rounded-xl shadow-lg p-8">
              <h3 class="text-xl font-semibold text-gray-900 mb-6">Follow us</h3>
              <div class="flex space-x-4">
                <a href="#" class="w-10 h-10 bg-gray-100 hover:bg-primary-100 rounded-lg flex items-center justify-center transition-colors">
                  <svg class="w-5 h-5 text-gray-600 hover:text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" class="w-10 h-10 bg-gray-100 hover:bg-primary-100 rounded-lg flex items-center justify-center transition-colors">
                  <svg class="w-5 h-5 text-gray-600 hover:text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clip-rule="evenodd" />
                  </svg>
                </a>
                <a href="#" class="w-10 h-10 bg-gray-100 hover:bg-primary-100 rounded-lg flex items-center justify-center transition-colors">
                  <svg class="w-5 h-5 text-gray-600 hover:text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clip-rule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>

            <div class="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-xl p-8">
              <h3 class="text-xl font-semibold text-gray-900 mb-4">Need immediate help?</h3>
              <p class="text-gray-600 mb-6">
                Check out our community forums where you can get help from other users and our team.
              </p>
              <router-link to="/questions" class="btn-primary">
                Browse Community Questions
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon
} from '@heroicons/vue/24/outline';

const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  subject: '',
  message: ''
});

const isSubmitting = ref(false);
const submitted = ref(false);

const handleSubmit = async () => {
  isSubmitting.value = true;
  
  // Simulate form submission
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  submitted.value = true;
  isSubmitting.value = false;
  
  // Reset form
  form.value = {
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: ''
  };
  
  // Hide success message after 5 seconds
  setTimeout(() => {
    submitted.value = false;
  }, 5000);
};
</script>