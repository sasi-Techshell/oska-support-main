<template>
  <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
    <h1 class="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Buy Tokens</h1>

     <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <!-- Left Side: Token Packages and Payment -->
      <div class="lg:col-span-2 space-y-8">
        <!-- Token Package Selection -->
        <div class="card p-6 ">
          <h2 class="text-lg font-semibold text-gray-900 mb-4">Select Token Package</h2>
          <div class="grid grid-cols-2 md:grid-cols-3 gap-4 d-flex ">
            <button
              v-for="(pkg, index) in tokenPackages"
              :key="index"
              @click="selectPackage(pkg)"
              class="border rounded-lg p-4 text-left hover:border-primary-500 bg-gradient-to-br from-primary-50 to-secondary-50"
              :class="selectedPackage?.amount === pkg.amount ? 'border-primary-500 ring-1 ring-primary-200' : 'border-gray-200'"
            >
            <div class="flex items-center justify-between ">
            <div>
              <p class="text-sm text-gray-600">{{ pkg.amount }} Tokens</p>
              <p class="text-3xl font-bold text-success-600">${{ pkg.price }}</p>
              <p class="text-sm text-gray-500">${{ (pkg.price / pkg.amount).toFixed(2) }}/token</p>
              </div>
            <div class="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
            <CurrencyDollarIcon class="w-6 h-6 text-white" />
          </div>
          </div>
              <span
                v-if="pkg.bestValue"
                class="inline-block mt-2 text-[10px] font-semibold text-primary-600 bg-primary-100 px-2 py-0.5 rounded"
              >Best Value</span>
            </button>
          </div>

          <!-- Custom Token Amount -->
          <div class="mt-6">
            <label class="block text-sm font-medium text-gray-700 mb-1">Custom Amount</label>
            <div class="flex items-center space-x-3">
              <input
                v-model.number="customAmount"
                type="number"
                min="1"
                class="input-field w-40"
                placeholder="Enter token amount"
              />
              <p class="text-gray-700 font-medium">${{ (customAmount * 0.10).toFixed(2) }}</p>
            </div>
          </div>
        </div>

        <!-- Payment Method -->
        <div class="card p-6">
          <h2 class="text-lg font-semibold text-gray-900 mb-4">Payment Method</h2>
          <div class="space-y-3">
            <button class="btn-outline w-full flex items-center justify-start">
              <CreditCardIcon class="w-5 h-5 mr-3" /> Credit/Debit Card
            </button>
            <button class="btn-outline w-full flex items-center justify-start">
               <img src="/paypal.svg" alt="PayPal" class="w-5 h-5 mr-3  text-blue-600" />PayPal
            </button>
            <button class="btn-outline w-full flex items-center justify-start">
              <BanknotesIcon class="w-5 h-5 mr-3" /> Bank Transfer
            </button>
          </div>
        </div>

     <!-- FAQ -->
      <div class="card p-6 bg-white shadow-sm rounded-xl border border-gray-200">
        <h2 class="text-xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
        <div class="space-y-5">
            <div 
            v-for="(faq, index) in faqs" 
            :key="index" 
            class="bg-gray-50 hover:bg-gray-100 transition-colors rounded-lg p-4 border border-gray-200"
            >
            <h3 class="text-base font-semibold text-gray-800 mb-1">{{ faq.question }}</h3>
            <p class="text-sm text-gray-600">{{ faq.answer }}</p>
        </div>
    </div>
</div>
</div>


      <!-- Right Side: Order Summary -->
      <div class="card p-6 space-y-6">
        <h2 class="text-lg font-semibold text-gray-900">Order Summary</h2>
        <div class="text-sm space-y-2">
          <div class="flex justify-between">
            <span>Tokens</span>
            <span>{{ selectedPackage?.amount || customAmount }}</span>
          </div>
          <div class="flex justify-between">
            <span>Price</span>
            <span>${{ totalPrice.toFixed(2) }}</span>
          </div>
          <div class="flex justify-between">
            <span>Tax</span>
            <span>${{ tax.toFixed(2) }}</span>
          </div>
        </div>
        <div class="flex justify-between font-semibold text-gray-900 border-t border-gray-100 pt-4">
          <span>Total</span>
          <span>${{ (totalPrice + tax).toFixed(2) }}</span>
        </div>

        <button class="btn-primary w-full">Proceed to Payment</button>
        <button @click="cancelPayment" class="btn-outline w-full">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import {
  CurrencyDollarIcon,

  CreditCardIcon,
  BanknotesIcon,
 

} from '@heroicons/vue/24/outline';

const tokenPackages = [
  { amount: 50, price: 5 },
  { amount: 100, price: 9 },
  { amount: 250, price: 20, bestValue: true },
  { amount: 500, price: 35 },
  { amount: 1000, price: 60 }
];

const selectedPackage = ref<any>(null);
const customAmount = ref<number>(0);

const totalPrice = computed(() => {
  if (selectedPackage.value) return selectedPackage.value.price;
  return (customAmount.value * 0.10) || 0;
});

const tax = computed(() => +(totalPrice.value * 0.05).toFixed(2));

function selectPackage(pkg: any) {
  selectedPackage.value = pkg;
  customAmount.value = 0;
}
function cancelPayment() {
  selectedPackage.value = null;
  customAmount.value = 0;
}

const faqs = [
  {
    question: 'How do tokens work?',
    answer: 'Tokens are used to participate in bounties and fund projects within our community.'
  },
  {
    question: 'Are there any refunds?',
    answer: 'Token purchases are non-refundable once the transaction is complete.'
  },
  {
    question: 'Where can I use tokens?',
    answer: 'Use tokens across our platform for bounties, rewards, and project funding.'
  }
];

</script>

