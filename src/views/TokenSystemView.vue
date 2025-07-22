<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Hero Section -->
    <section class="bg-gradient-to-br from-primary-600 to-secondary-600 text-white py-20">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div class="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-6">
          <CurrencyDollarIcon class="w-10 h-10 text-white" />
        </div>
        <h1 class="text-4xl md:text-5xl font-bold mb-6">Token System</h1>
        <p class="text-xl text-blue-100 leading-relaxed">
          Learn how our token-based reward system works and how you can earn, spend, and redeem tokens
        </p>
      </div>
    </section>

    <!-- How It Works Section -->
    <section class="py-20">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">How Tokens Work</h2>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto">
            Our token system rewards valuable contributions and enables fair compensation for expertise
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="bg-white rounded-xl p-8 shadow-lg text-center">
            <div class="w-16 h-16 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <PlusIcon class="w-8 h-8 text-success-600" />
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-4">Earn Tokens</h3>
            <p class="text-gray-600 mb-6">
              Get rewarded for answering questions, completing tasks, and helping the community grow.
            </p>
            <ul class="text-sm text-gray-500 space-y-2">
              <li>• Answer bounty questions</li>
              <li>• Complete assigned tasks</li>
              <li>• Refer new members</li>
              <li>• Profile completion bonus</li>
            </ul>
          </div>

          <div class="bg-white rounded-xl p-8 shadow-lg text-center">
            <div class="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <ArrowsRightLeftIcon class="w-8 h-8 text-primary-600" />
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-4">Spend Tokens</h3>
            <p class="text-gray-600 mb-6">
              Use tokens to get faster, higher-quality help from expert community members.
            </p>
            <ul class="text-sm text-gray-500 space-y-2">
              <li>• Set bounties on questions</li>
              <li>• Post premium tasks</li>
              <li>• Priority support</li>
              <li>• Platform features</li>
            </ul>
          </div>

          <div class="bg-white rounded-xl p-8 shadow-lg text-center">
            <div class="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <BanknotesIcon class="w-8 h-8 text-accent-600" />
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-4">Redeem Tokens</h3>
            <p class="text-gray-600 mb-6">
              Convert your earned tokens to real money or use them for platform benefits.
            </p>
            <ul class="text-sm text-gray-500 space-y-2">
              <li>• Cash withdrawal</li>
              <li>• Gift cards</li>
              <li>• Platform credits</li>
              <li>• Premium features</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Token Values Section -->
    <section class="py-20 bg-white">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">Token Values & Rates</h2>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto">
            Transparent pricing and fair exchange rates for all token transactions
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <!-- Earning Rates -->
          <div class="bg-gradient-to-br from-success-50 to-success-100 rounded-xl p-8">
            <h3 class="text-2xl font-semibold text-gray-900 mb-6">Earning Rates</h3>
            <div class="space-y-4">
              <div class="flex items-center justify-between py-3 border-b border-success-200">
                <span class="text-gray-700">Answer accepted (bounty question)</span>
                <span class="font-semibold text-success-700">Full bounty amount</span>
              </div>
              <div class="flex items-center justify-between py-3 border-b border-success-200">
                <span class="text-gray-700">Complete task (per project)</span>
                <span class="font-semibold text-success-700">50-500 tokens</span>
              </div>
              <div class="flex items-center justify-between py-3 border-b border-success-200">
                <span class="text-gray-700">Answer accepted (free question)</span>
                <span class="font-semibold text-success-700">5-15 tokens</span>
              </div>
              <div class="flex items-center justify-between py-3 border-b border-success-200">
                <span class="text-gray-700">Profile completion bonus</span>
                <span class="font-semibold text-success-700">25 tokens</span>
              </div>
              <div class="flex items-center justify-between py-3">
                <span class="text-gray-700">Referral bonus</span>
                <span class="font-semibold text-success-700">10 tokens</span>
              </div>
            </div>
          </div>

          <!-- Exchange Rates -->
          <div class="bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl p-8">
            <h3 class="text-2xl font-semibold text-gray-900 mb-6">Exchange Rates</h3>
            <div class="space-y-4">
              <div class="flex items-center justify-between py-3 border-b border-primary-200">
                <span class="text-gray-700">1 Token = USD</span>
                <span class="font-semibold text-primary-700">$0.10</span>
              </div>
              <div class="flex items-center justify-between py-3 border-b border-primary-200">
                <span class="text-gray-700">Minimum withdrawal</span>
                <span class="font-semibold text-primary-700">100 tokens ($10)</span>
              </div>
              <div class="flex items-center justify-between py-3 border-b border-primary-200">
                <span class="text-gray-700">Processing fee</span>
                <span class="font-semibold text-primary-700">2% (min $0.50)</span>
              </div>
              <div class="flex items-center justify-between py-3 border-b border-primary-200">
                <span class="text-gray-700">Processing time</span>
                <span class="font-semibold text-primary-700">3-5 business days</span>
              </div>
              <div class="flex items-center justify-between py-3">
                <span class="text-gray-700">Maximum per month</span>
                <span class="font-semibold text-primary-700">5,000 tokens ($500)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Token Economy Section -->
    <section class="py-20 bg-gray-50">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">Token Economy</h2>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto">
            Understanding the flow and distribution of tokens in our ecosystem
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div class="bg-white rounded-xl p-6 text-center shadow-lg">
            <div class="text-3xl font-bold text-primary-600 mb-2">125K+</div>
            <div class="text-gray-600 text-sm">Total Tokens Distributed</div>
          </div>
          <div class="bg-white rounded-xl p-6 text-center shadow-lg">
            <div class="text-3xl font-bold text-secondary-600 mb-2">45K+</div>
            <div class="text-gray-600 text-sm">Tokens Earned This Month</div>
          </div>
          <div class="bg-white rounded-xl p-6 text-center shadow-lg">
            <div class="text-3xl font-bold text-accent-600 mb-2">$8.5K</div>
            <div class="text-gray-600 text-sm">Total Withdrawals</div>
          </div>
          <div class="bg-white rounded-xl p-6 text-center shadow-lg">
            <div class="text-3xl font-bold text-success-600 mb-2">2.1K</div>
            <div class="text-gray-600 text-sm">Active Token Earners</div>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="py-20 bg-white">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          <p class="text-xl text-gray-600">
            Common questions about our token system
          </p>
        </div>

        <div class="space-y-6">
          <div class="bg-gray-50 rounded-xl p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-3">How do I start earning tokens?</h3>
            <p class="text-gray-600">
              Simply create an account and start participating! You can earn tokens by answering questions, completing tasks, and helping other community members. Complete your profile to get a 25-token welcome bonus.
            </p>
          </div>

          <div class="bg-gray-50 rounded-xl p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-3">When can I withdraw my tokens?</h3>
            <p class="text-gray-600">
              You can request a withdrawal once you have at least 100 tokens (equivalent to $10). Withdrawals are processed within 3-5 business days, and there's a 2% processing fee with a minimum of $0.50.
            </p>
          </div>

          <div class="bg-gray-50 rounded-xl p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-3">Do tokens expire?</h3>
            <p class="text-gray-600">
              No, tokens never expire! As long as your account remains active, your tokens will be available for use or withdrawal whenever you choose.
            </p>
          </div>

          <div class="bg-gray-50 rounded-xl p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-3">Can I buy tokens?</h3>
            <p class="text-gray-600">
              Yes, you can purchase tokens to use for bounties and premium tasks. This helps you get faster, higher-quality responses from our expert community members.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl md:text-4xl font-bold mb-6">
          Ready to Start Earning?
        </h2>
        <p class="text-xl text-blue-100 mb-8 leading-relaxed">
          Join our community today and start earning tokens for sharing your knowledge and expertise.
        </p>
        <div class="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
          <router-link to="/register" class="bg-white text-primary-600 font-semibold px-8 py-4 rounded-lg hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
            Create Free Account
          </router-link>
          <router-link to="/questions" class="border-2 border-white text-white font-semibold px-8 py-4 rounded-lg hover:bg-white hover:text-primary-600 transition-all duration-200">
            Start Answering Questions
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import {
  CurrencyDollarIcon,
  PlusIcon,
  ArrowsRightLeftIcon,
  BanknotesIcon
} from '@heroicons/vue/24/outline';
</script>