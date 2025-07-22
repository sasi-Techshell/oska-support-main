<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Hero Section -->
    <section class="bg-gradient-to-br from-primary-600 to-secondary-600 text-white py-20">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 class="text-4xl md:text-5xl font-bold mb-6">About OSKA Support</h1>
        <p class="text-xl text-blue-100 leading-relaxed">
          Building the future of community-driven problem solving and knowledge sharing
        </p>
      </div>
    </section>

    <!-- Mission Section -->
    <section class="py-20">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 class="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <p class="text-lg text-gray-600 mb-6 leading-relaxed">
              OSKA Support is dedicated to creating an open, inclusive community where developers, students, and professionals can collaborate to solve technical challenges and advance their careers.
            </p>
            <p class="text-lg text-gray-600 leading-relaxed">
              We believe that knowledge should be accessible to everyone, and that by working together, we can build better solutions and create opportunities for growth and learning.
            </p>
          </div>
          <div class="bg-white rounded-xl shadow-lg p-8">
            <div class="grid grid-cols-2 gap-6 text-center">
              <div>
                <div class="text-3xl font-bold text-primary-600 mb-2">2.5K+</div>
                <div class="text-gray-600">Community Members</div>
              </div>
              <div>
                <div class="text-3xl font-bold text-secondary-600 mb-2">15K+</div>
                <div class="text-gray-600">Problems Solved</div>
              </div>
              <div>
                <div class="text-3xl font-bold text-accent-600 mb-2">8.2K+</div>
                <div class="text-gray-600">Projects Completed</div>
              </div>
              <div>
                <div class="text-3xl font-bold text-success-600 mb-2">125K+</div>
                <div class="text-gray-600">Tokens Distributed</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Values Section -->
    <section class="py-20 bg-white">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto">
            The principles that guide everything we do
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="text-center">
            <div class="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <UsersIcon class="w-8 h-8 text-primary-600" />
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-4">Community First</h3>
            <p class="text-gray-600">
              We prioritize the needs of our community members and foster an environment of mutual support and collaboration.
            </p>
          </div>

          <div class="text-center">
            <div class="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <AcademicCapIcon class="w-8 h-8 text-secondary-600" />
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-4">Knowledge Sharing</h3>
            <p class="text-gray-600">
              We believe in the power of shared knowledge and encourage open learning and teaching within our community.
            </p>
          </div>

          <div class="text-center">
            <div class="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <HandRaisedIcon class="w-8 h-8 text-accent-600" />
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-4">Fair Recognition</h3>
            <p class="text-gray-600">
              We ensure that contributors are fairly recognized and rewarded for their expertise and time through our token system.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- How It Works Section -->
    <section class="py-20 bg-gray-50">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">How OSKA Support Works</h2>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto">
            A simple process that connects problem solvers with those who need help
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="bg-white rounded-xl p-8 shadow-lg">
            <div class="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-6">
              <span class="text-primary-600 font-bold text-xl">1</span>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-4">Ask or Browse</h3>
            <p class="text-gray-600">
              Post your technical questions or browse existing ones. Set bounties to attract expert answers faster.
            </p>
          </div>

          <div class="bg-white rounded-xl p-8 shadow-lg">
            <div class="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center mb-6">
              <span class="text-secondary-600 font-bold text-xl">2</span>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-4">Connect & Solve</h3>
            <p class="text-gray-600">
              Expert architects and developers provide solutions, complete tasks, and share their knowledge with the community.
            </p>
          </div>

          <div class="bg-white rounded-xl p-8 shadow-lg">
            <div class="w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center mb-6">
              <span class="text-accent-600 font-bold text-xl">3</span>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-4">Earn & Grow</h3>
            <p class="text-gray-600">
              Contributors earn tokens for their help, which can be redeemed for cash or used within the platform ecosystem.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Team Section -->
    <section class="py-20 bg-white">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">Our Team</h2>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto">
            Meet the passionate individuals behind OSKA Support
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="text-center">
            <img 
              src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2" 
              alt="Team Member"
              class="w-32 h-32 rounded-full mx-auto mb-6 object-cover"
            >
            <h3 class="text-xl font-semibold text-gray-900 mb-2">Alex Johnson</h3>
            <p class="text-primary-600 mb-4">Founder & CEO</p>
            <p class="text-gray-600 text-sm">
              Passionate about building communities that empower developers and foster innovation.
            </p>
          </div>

          <div class="text-center">
            <img 
              src="https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2" 
              alt="Team Member"
              class="w-32 h-32 rounded-full mx-auto mb-6 object-cover"
            >
            <h3 class="text-xl font-semibold text-gray-900 mb-2">Sarah Wilson</h3>
            <p class="text-secondary-600 mb-4">CTO</p>
            <p class="text-gray-600 text-sm">
              Expert in scalable systems and community platform architecture with 10+ years experience.
            </p>
          </div>

          <div class="text-center">
            <img 
              src="https://images.pexels.com/photos/3778876/pexels-photo-3778876.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2" 
              alt="Team Member"
              class="w-32 h-32 rounded-full mx-auto mb-6 object-cover"
            >
            <h3 class="text-xl font-semibold text-gray-900 mb-2">Mike Chen</h3>
            <p class="text-accent-600 mb-4">Head of Community</p>
            <p class="text-gray-600 text-sm">
              Dedicated to creating inclusive spaces where developers can learn, grow, and succeed together.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl md:text-4xl font-bold mb-6">
          Join Our Growing Community
        </h2>
        <p class="text-xl text-blue-100 mb-8 leading-relaxed">
          Be part of a movement that's changing how developers collaborate and learn from each other.
        </p>
        <div class="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
          <router-link to="/register" class="bg-white text-primary-600 font-semibold px-8 py-4 rounded-lg hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
            Get Started Today
          </router-link>
          <router-link to="/questions" class="border-2 border-white text-white font-semibold px-8 py-4 rounded-lg hover:bg-white hover:text-primary-600 transition-all duration-200">
            Explore Questions
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import {
  UsersIcon,
  AcademicCapIcon,
  HandRaisedIcon
} from '@heroicons/vue/24/outline';
</script>