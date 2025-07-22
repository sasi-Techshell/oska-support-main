<template>
  <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="mb-8">
      <h1 class="text-2xl md:text-3xl font-bold text-gray-900">Token Wallet</h1>
      <p class="text-gray-600 mt-1">Manage your tokens and view transaction history</p>
    </div>

    <!-- Token Balance -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div class="card p-6 bg-gradient-to-br from-primary-50 to-secondary-50">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600">Current Balance</p>
            <p class="text-3xl font-bold text-gray-900">{{ authStore.user?.tokens || 0 }}</p>
            <p class="text-sm text-gray-500">Tokens</p>
          </div>
          <div class="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
            <CurrencyDollarIcon class="w-6 h-6 text-white" />
          </div>
        </div>
      </div>

      <div class="card p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600">Tokens Earned</p>
            <p class="text-2xl font-bold text-success-600">+245</p>
            <p class="text-sm text-gray-500">This month</p>
          </div>
          <div class="w-12 h-12 bg-success-100 rounded-full flex items-center justify-center">
            <ArrowTrendingUpIcon class="w-6 h-6 text-success-600" />
          </div>
        </div>
      </div>

      <div class="card p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600">Tokens Spent</p>
            <p class="text-2xl font-bold text-error-600">-125</p>
            <p class="text-sm text-gray-500">This month</p>
          </div>
          <div class="w-12 h-12 bg-error-100 rounded-full flex items-center justify-center">
            <ArrowTrendingDownIcon class="w-6 h-6 text-error-600" />
          </div>
        </div>
      </div>
    </div>

    <!-- Actions -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <router-link to="/buy-tokens" class="card p-4 hover:shadow-lg transition-shadow text-center block">
        <div class="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-3">
          <CreditCardIcon class="w-5 h-5 text-primary-600" />
        </div>
        <h3 class="font-medium text-gray-900">Buy Tokens</h3>
        <p class="text-xs text-gray-500">Purchase more tokens</p>
      </router-link>

      <button 
        v-if="authStore.isArchitect"
        class="card p-4 hover:shadow-lg transition-shadow text-center"
        @click="showWithdrawModal = true"
      >
        <div class="w-10 h-10 bg-success-100 rounded-lg flex items-center justify-center mx-auto mb-3">
          <BanknotesIcon class="w-5 h-5 text-success-600" />
        </div>
        <h3 class="font-medium text-gray-900">Withdraw</h3>
        <p class="text-xs text-gray-500">Convert to cash</p>
      </button>

      <router-link to="/questions/new" class="card p-4 hover:shadow-lg transition-shadow text-center">
        <div class="w-10 h-10 bg-secondary-100 rounded-lg flex items-center justify-center mx-auto mb-3">
          <QuestionMarkCircleIcon class="w-5 h-5 text-secondary-600" />
        </div>
        <h3 class="font-medium text-gray-900">Ask Question</h3>
        <p class="text-xs text-gray-500">Use tokens for bounty</p>
      </router-link>

      <router-link to="/tasks/new" v-if="authStore.isEndUser" class="card p-4 hover:shadow-lg transition-shadow text-center">
        <div class="w-10 h-10 bg-accent-100 rounded-lg flex items-center justify-center mx-auto mb-3">
          <ClipboardDocumentListIcon class="w-5 h-5 text-accent-600" />
        </div>
        <h3 class="font-medium text-gray-900">Post Task</h3>
        <p class="text-xs text-gray-500">Hire an architect</p>
      </router-link>
    </div>

    <!-- Transaction History -->
    <div class="card">
      <div class="p-6 border-b border-gray-100">
        <h2 class="text-lg font-semibold text-gray-900">Transaction History</h2>
      </div>
      <div class="divide-y divide-gray-100">
        <div 
          v-for="transaction in mockTransactions" 
          :key="transaction.id"
          class="p-6 hover:bg-gray-50 transition-colors"
        >
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-4">
              <div 
                class="w-10 h-10 rounded-full flex items-center justify-center"
                :class="{
                  'bg-success-100': transaction.type === 'earned',
                  'bg-error-100': transaction.type === 'spent',
                  'bg-primary-100': transaction.type === 'purchased'
                }"
              >
                <component 
                  :is="getTransactionIcon(transaction.type)" 
                  class="w-5 h-5"
                  :class="{
                    'text-success-600': transaction.type === 'earned',
                    'text-error-600': transaction.type === 'spent',
                    'text-primary-600': transaction.type === 'purchased'
                  }"
                />
              </div>
              <div>
                <p class="font-medium text-gray-900">{{ transaction.description }}</p>
                <p class="text-sm text-gray-500">{{ formatDate(transaction.createdAt) }}</p>
              </div>
            </div>
            <div class="text-right">
              <p 
                class="font-semibold"
                :class="{
                  'text-success-600': transaction.type === 'earned',
                  'text-error-600': transaction.type === 'spent',
                  'text-primary-600': transaction.type === 'purchased'
                }"
              >
                {{ transaction.type === 'spent' ? '-' : '+' }}{{ transaction.amount }}
              </p>
              <p class="text-sm text-gray-500 capitalize">{{ transaction.status }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Withdraw Modal -->
    <div v-if="showWithdrawModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Withdraw Tokens</h3>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Amount</label>
            <input
              v-model.number="withdrawAmount"
              type="number"
              :max="authStore.user?.tokens || 0"
              min="1"
              class="input-field"
              placeholder="Enter amount to withdraw"
            />
            <p class="text-xs text-gray-500 mt-1">
              Available: {{ authStore.user?.tokens || 0 }} tokens
            </p>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Bank Account</label>
            <select class="input-field">
              <option>**** **** **** 1234 (Primary)</option>
            </select>
          </div>
        </div>
        <div class="flex items-center justify-end space-x-3 mt-6">
          <button @click="showWithdrawModal = false" class="btn-outline">
            Cancel
          </button>
          <button class="btn-primary">
            Request Withdrawal
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import {
  CurrencyDollarIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  CreditCardIcon,
  BanknotesIcon,
  QuestionMarkCircleIcon,
  ClipboardDocumentListIcon,
  PlusIcon,
  MinusIcon,
  ShoppingCartIcon
} from '@heroicons/vue/24/outline';

const authStore = useAuthStore();

const showWithdrawModal = ref(false);
const withdrawAmount = ref(0);

// Mock transaction data
const mockTransactions = ref([
  {
    id: '1',
    type: 'earned',
    amount: 50,
    description: 'Bounty reward for answering "JWT authentication in Vue.js"',
    status: 'completed',
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000)
  },
  {
    id: '2',
    type: 'spent',
    amount: 25,
    description: 'Bounty posted for "React component optimization"',
    status: 'completed',
    createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000)
  },
  {
    id: '3',
    type: 'earned',
    amount: 100,
    description: 'Task completion: "Build a Todo App with React"',
    status: 'completed',
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
  },
  {
    id: '4',
    type: 'purchased',
    amount: 200,
    description: 'Token purchase via credit card',
    status: 'completed',
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
  }
]);

const getTransactionIcon = (type: string) => {
  switch (type) {
    case 'earned':
      return PlusIcon;
    case 'spent':
      return MinusIcon;
    case 'purchased':
      return ShoppingCartIcon;
    default:
      return CurrencyDollarIcon;
  }
};

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(new Date(date));
};
</script>