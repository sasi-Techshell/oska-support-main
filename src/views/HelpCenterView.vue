<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Hero Section -->
    <section class="bg-gradient-to-br from-primary-600 to-secondary-600 text-white py-20">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 class="text-4xl md:text-5xl font-bold mb-6">Help Center</h1>
        <p class="text-xl text-blue-100 leading-relaxed mb-8">
          Find answers to common questions and learn how to make the most of OSKA Support
        </p>
        
        <!-- Search Bar -->
        <div class="max-w-2xl mx-auto">
          <div class="relative">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search for help articles..."
              class="w-full px-6 py-4 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
            />
            <MagnifyingGlassIcon class="absolute right-4 top-4 w-6 h-6 text-gray-400" />
          </div>
        </div>
      </div>
    </section>

    <!-- Quick Links -->
    <section class="py-16 bg-white">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-2xl font-bold text-gray-900 text-center mb-12">Popular Help Topics</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div 
            v-for="topic in quickLinks" 
            :key="topic.id"
            class="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow cursor-pointer"
            @click="selectedTopic = topic.id"
          >
            <div class="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
              <component :is="topic.icon" class="w-6 h-6 text-primary-600" />
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ topic.title }}</h3>
            <p class="text-gray-600 text-sm">{{ topic.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="py-16">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-2xl font-bold text-gray-900 text-center mb-12">Frequently Asked Questions</h2>
        
        <div class="space-y-4">
          <div 
            v-for="faq in filteredFAQs" 
            :key="faq.id"
            class="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden"
          >
            <button
              @click="toggleFAQ(faq.id)"
              class="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <h3 class="text-lg font-semibold text-gray-900">{{ faq.question }}</h3>
              <ChevronDownIcon 
                class="w-5 h-5 text-gray-500 transition-transform"
                :class="{ 'rotate-180': openFAQs.includes(faq.id) }"
              />
            </button>
            
            <div 
              v-if="openFAQs.includes(faq.id)"
              class="px-6 pb-4 border-t border-gray-100"
            >
              <div class="prose max-w-none pt-4">
                <p class="text-gray-700 leading-relaxed" v-html="faq.answer"></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Support -->
    <section class="py-16 bg-white">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-2xl font-bold text-gray-900 mb-4">Still Need Help?</h2>
        <p class="text-gray-600 mb-8">
          Can't find what you're looking for? Our support team is here to help you succeed.
        </p>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="bg-gray-50 rounded-xl p-6">
            <ChatBubbleLeftRightIcon class="w-8 h-8 text-primary-600 mx-auto mb-4" />
            <h3 class="text-lg font-semibold text-gray-900 mb-2">Community Forum</h3>
            <p class="text-gray-600 text-sm mb-4">Ask questions and get help from the community</p>
            <router-link to="/questions" class="btn-primary text-sm">Browse Questions</router-link>
          </div>
          
          <div class="bg-gray-50 rounded-xl p-6">
            <EnvelopeIcon class="w-8 h-8 text-secondary-600 mx-auto mb-4" />
            <h3 class="text-lg font-semibold text-gray-900 mb-2">Email Support</h3>
            <p class="text-gray-600 text-sm mb-4">Send us a message and we'll respond within 24 hours</p>
            <router-link to="/contact" class="btn-secondary text-sm">Contact Us</router-link>
          </div>
          
          <div class="bg-gray-50 rounded-xl p-6">
            <BookOpenIcon class="w-8 h-8 text-accent-600 mx-auto mb-4" />
            <h3 class="text-lg font-semibold text-gray-900 mb-2">Documentation</h3>
            <p class="text-gray-600 text-sm mb-4">Detailed guides and tutorials</p>
            <button class="btn-outline text-sm">View Docs</button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import {
  MagnifyingGlassIcon,
  QuestionMarkCircleIcon,
  CurrencyDollarIcon,
  UserGroupIcon,
  ClipboardDocumentListIcon,
  CogIcon,
  ShieldCheckIcon,
  ChevronDownIcon,
  ChatBubbleLeftRightIcon,
  EnvelopeIcon,
  BookOpenIcon
} from '@heroicons/vue/24/outline';

const searchQuery = ref('');
const selectedTopic = ref('');
const openFAQs = ref<string[]>([]);

const quickLinks = [
  {
    id: 'getting-started',
    title: 'Getting Started',
    description: 'Learn the basics of using OSKA Support',
    icon: QuestionMarkCircleIcon
  },
  {
    id: 'tokens',
    title: 'Token System',
    description: 'How to earn, spend, and redeem tokens',
    icon: CurrencyDollarIcon
  },
  {
    id: 'community',
    title: 'Community Guidelines',
    description: 'Rules and best practices for our community',
    icon: UserGroupIcon
  },
  {
    id: 'tasks',
    title: 'Tasks & Projects',
    description: 'How to post and complete tasks',
    icon: ClipboardDocumentListIcon
  },
  {
    id: 'account',
    title: 'Account Settings',
    description: 'Manage your profile and preferences',
    icon: CogIcon
  },
  {
    id: 'security',
    title: 'Security & Privacy',
    description: 'Keep your account safe and secure',
    icon: ShieldCheckIcon
  }
];

const faqs = [
  {
    id: '1',
    question: 'How do I get started on OSKA Support?',
    answer: 'Getting started is easy! Simply <a href="/register" class="text-primary-600">create a free account</a>, complete your profile, and start exploring questions and tasks. You\'ll receive 50 welcome tokens to get you started.',
    category: 'getting-started'
  },
  {
    id: '2',
    question: 'What are tokens and how do I earn them?',
    answer: 'Tokens are our community currency that reward valuable contributions. You can earn tokens by:<br>• Answering questions (especially bounty questions)<br>• Completing tasks<br>• Helping other community members<br>• Completing your profile<br><br>Learn more about our <a href="/token-system" class="text-primary-600">token system</a>.',
    category: 'tokens'
  },
  {
    id: '3',
    question: 'How do I ask a good question?',
    answer: 'To ask a great question:<br>• Use a clear, descriptive title<br>• Provide context and background<br>• Include relevant code or error messages<br>• Explain what you\'ve already tried<br>• Use appropriate tags<br>• Consider offering a bounty for complex questions',
    category: 'questions'
  },
  {
    id: '4',
    question: 'Can I withdraw my tokens for real money?',
    answer: 'Yes! Architects can withdraw tokens once they reach the minimum threshold of 100 tokens ($10). There\'s a 2% processing fee, and withdrawals are processed within 3-5 business days.',
    category: 'tokens'
  },
  {
    id: '5',
    question: 'What\'s the difference between end users and architects?',
    answer: '<strong>End Users</strong> can ask questions, post tasks, and participate in the community. They typically seek help and hire architects for projects.<br><br><strong>Architects</strong> are experienced developers who answer questions, complete tasks, and earn tokens for their expertise. They can also withdraw tokens for cash.',
    category: 'getting-started'
  },
  {
    id: '6',
    question: 'How do I report inappropriate behavior?',
    answer: 'If you encounter harassment, spam, or other violations of our community guidelines, please report it immediately. You can use the report button on any content or <a href="/contact" class="text-primary-600">contact our support team</a> directly.',
    category: 'community'
  },
  {
    id: '7',
    question: 'How do task assignments work?',
    answer: 'When you post a task, architects can apply by submitting proposals. You can review applications and select the best candidate. Once assigned, the architect works on your project and submits the completed work for your review.',
    category: 'tasks'
  },
  {
    id: '8',
    question: 'Is my personal information safe?',
    answer: 'Yes, we take privacy and security seriously. We use industry-standard encryption, never share your personal information without consent, and follow strict data protection practices. Read our <a href="/privacy-policy" class="text-primary-600">privacy policy</a> for details.',
    category: 'security'
  },
  {
    id: '9',
    question: 'How do I create a portfolio?',
    answer: 'You can create a public portfolio to showcase your skills and experience. Go to your profile settings and fill out the portfolio sections. Once published, you can share your portfolio link with potential clients or employers.',
    category: 'account'
  },
  {
    id: '10',
    question: 'What happens if I\'m not satisfied with a task submission?',
    answer: 'If a task submission doesn\'t meet your requirements, you can provide feedback and request revisions. If issues persist, you can escalate to our admin team for mediation. We ensure fair resolution for both parties.',
    category: 'tasks'
  }
];

const filteredFAQs = computed(() => {
  if (!searchQuery.value) return faqs;
  
  const query = searchQuery.value.toLowerCase();
  return faqs.filter(faq => 
    faq.question.toLowerCase().includes(query) ||
    faq.answer.toLowerCase().includes(query)
  );
});

const toggleFAQ = (id: string) => {
  if (openFAQs.value.includes(id)) {
    openFAQs.value = openFAQs.value.filter(faqId => faqId !== id);
  } else {
    openFAQs.value.push(id);
  }
};
</script>